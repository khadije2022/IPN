import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState, useEffect } from 'react';
import { Head, router, useForm, Link } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import Pagination from '@/Components/Pagination';
import SelectInput from '@/Components/SelectInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faPlus, faFileExcel, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

function Index({ auth, produits, categories, success, stock }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' ou 'edit'
  const [currentProduit, setCurrentProduit] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
  const [successMessage, setSuccessMessage] = useState(success);
  const [validationErrors, setValidationErrors] = useState({});

  const { data, setData, post, put, errors, reset } = useForm({
    designation: '',
    type: '',
    created_at: '',
  });

  useEffect(() => {
    if (success) {
      setSuccessMessage(success);
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 10000); // 10000 milliseconds = 10 seconds
      return () => clearTimeout(timer);
    }
  }, [success]);

  const openModal = (mode, produit = null) => {
    setModalMode(mode);
    setCurrentProduit(produit);
    if (mode === 'edit' && produit) {
      setData({
        designation: produit.designation,
        type: produit.type.id,
        created_at: produit.created_at,
      });
    } else {
      setData({
        designation: '',
        type: '',
        created_at: '',
      });
    }
    setValidationErrors({});
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentProduit(null);
    reset();
    router.reload();
  };

  const validateForm = () => {
    const errors = {};
    if (!data.designation) {
      errors.designation = 'Le champ "Nom du Produit" est obligatoire.';
    }
    if (!data.type) {
      errors.type = 'Le champ "Type de Catégorie" est obligatoire.';
    }
    if (!data.created_at) {
      errors.created_at = 'Le champ "Date de Création" est obligatoire.';
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    const routeName = modalMode === 'add' ? 'catelogueProduit.store' : 'catelogueProduit.update';
    const action = modalMode === 'add' ? post : put;

    action(route(routeName, currentProduit ? currentProduit.id : null), {
      onSuccess: () => closeModal(),
      onError: (error) => console.error("Error submitting form:", error),
    });
  };

  const deleteProduit = (produit) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer le produit ${produit.designation} ?`)) {
      return;
    }
    router.delete(route('catelogueProduit.destroy', produit.id)).then(() => {
      router.reload();
    });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedProduits = [...(produits?.data || [])].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const filteredProduits = sortedProduits.filter((produit) =>
    produit &&
    (produit.id.toString().includes(searchQuery) ||
      produit.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      produit.type.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      produit.stock.toString().includes(searchQuery) ||
      produit.created_at.includes(searchQuery))
  );

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className='flex justify-between items-center'>
          <h2 className='font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight'>
            Catalogue Produit
          </h2>
        </div>
      }
    >
      <Head title="Catalogue Produit" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {successMessage && (
            <div className='bg-emerald-400 py-2 px-4 rounded mb-4'>
              {successMessage}
            </div>
          )}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className='flex flex-col sm:flex-row justify-between mb-4'>
                <div className='font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight'>
                  <h1>C'est la liste des Produits disponible et Sa Stock</h1>
                </div>
                {/* <div className='flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2'>
                  <button
                    onClick={() => openModal('add')}
                    className='bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600 flex items-center'
                  >
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    Ajouter
                  </button>
                  <a
                    href={route('export-produit')}
                    className="bg-emerald-500 py-2 px-4 text-white rounded shadow transition-all hover:bg-emerald-600 flex items-center"
                  >
                    <FontAwesomeIcon icon={faFileExcel} className="mr-2" />
                    Export Excel
                  </a>
                </div> */}
              </div>
              <div className="mb-4">
                <TextInput
                  type="text"
                  name="search"
                  id="search"
                  value={searchQuery}
                  className="mt-1 block w-full"
                  onChange={handleSearchChange}
                  placeholder="Rechercher..."
                />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th className='px-3 py-3 cursor-pointer' onClick={() => handleSort('id')}>
                        ID
                        {sortConfig.key === 'id' && (
                          <FontAwesomeIcon icon={sortConfig.direction === 'ascending' ? faSortUp : faSortDown} />
                        )}
                      </th>
                      <th className='px-3 py-3 cursor-pointer' onClick={() => handleSort('designation')}>
                        Désignation
                        {sortConfig.key === 'designation' && (
                          <FontAwesomeIcon icon={sortConfig.direction === 'ascending' ? faSortUp : faSortDown} />
                        )}
                      </th>
                      <th className='px-3 py-3 cursor-pointer' onClick={() => handleSort('type')}>
                        Catégorie
                        {sortConfig.key === 'type' && (
                          <FontAwesomeIcon icon={sortConfig.direction === 'ascending' ? faSortUp : faSortDown} />
                        )}
                      </th>
                      <th className='px-3 py-3 cursor-pointer' onClick={() => handleSort('stock')}>
                        Stock
                        {sortConfig.key === 'stock' && (
                          <FontAwesomeIcon icon={sortConfig.direction === 'ascending' ? faSortUp : faSortDown} />
                        )}
                      </th>
                      <th className='px-3 py-3 cursor-pointer' onClick={() => handleSort('created_at')}>
                        Date
                        {sortConfig.key === 'created_at' && (
                          <FontAwesomeIcon icon={sortConfig.direction === 'ascending' ? faSortUp : faSortDown} />
                        )}
                      </th>
                      <th className='px-3 py-3 text-right'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProduits.map((produit) => (
                      <tr key={produit.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                        <td className='px-3 py-2'>{produit.id}</td>
                        <td className='px-3 py-2'>{produit.designation}</td>
                        <td className='px-3 py-2'>{produit.type.type}</td>
                        <td className='px-3 py-2'>{produit.stock}</td>
                        <td className='px-3 py-2'>{produit.created_at}</td>
                        <td className='px-3 py-2 text-right flex justify-end'>
                          <button
                            onClick={() => openModal('edit', produit)}
                            className='text-blue-600 dark:text-blue-500 mx-1 flex items-center'
                          >
                            <FontAwesomeIcon icon={faEdit} className="mr-1" />
                          </button>
                          <button
                            onClick={() => deleteProduit(produit)}
                            className='text-red-600 dark:text-red-500 mx-1 flex items-center'
                          >
                            <FontAwesomeIcon icon={faTrashAlt} className="mr-1" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Pagination links={produits.meta.links} />
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center'>
          <div className='relative p-5 border w-11/12 sm:w-96 shadow-lg rounded-md bg-white dark:bg-gray-800'>
            <form
              onSubmit={handleFormSubmit}
              className='p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg'
            >
              <div className='mt-4'>
                <InputLabel htmlFor='designation' value='Nom du Produit' />
                <TextInput
                  type='text'
                  name='designation'
                  id='designation'
                  value={data.designation}
                  className='mt-1 block w-full'
                  onChange={(e) => setData('designation', e.target.value)}
                />
                {validationErrors.designation && (
                  <div className='text-red-500 mt-2'>{validationErrors.designation}</div>
                )}
                <InputError message={errors.designation} className='mt-2' />
              </div>
              <div className='mt-4'>
                <InputLabel htmlFor='date' value='Date de Création' />
                <TextInput
                  type='date'
                  name='created_at'
                  id='date'
                  value={data.created_at}
                  className='mt-1 block w-full'
                  onChange={(e) => setData('created_at', e.target.value)}
                />
                {validationErrors.created_at && (
                  <div className='text-red-500 mt-2'>{validationErrors.created_at}</div>
                )}
                <InputError message={errors.created_at} className='mt-2' />
              </div>
              <div className='mt-4'>
                <InputLabel htmlFor='type' value='Catégorie' />
                <SelectInput
                  name='type'
                  id='type'
                  className='mt-1 block w-full'
                  value={data.type}
                  onChange={(e) => setData('type', e.target.value)}
                >
                  <option value=''>Sélectionnez une option</option>
                  {categories.data.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.type}
                    </option>
                  ))}
                </SelectInput>
                {validationErrors.type && (
                  <div className='text-red-500 mt-2'>{validationErrors.type}</div>
                )}
                <InputError message={errors.type} className='mt-2' />
              </div>
              <div className='mt-4 text-right'>
                <button
                  type='button'
                  onClick={closeModal}
                  className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2'
                >
                  Annuler
                </button>
                <button
                  type='submit'
                  className='bg-emerald-500 py-2 px-4 text-white rounded shadow transition-all hover:bg-emerald-600'
                >
                  {modalMode === 'add' ? 'Ajouter' : 'Sauvegarder'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AuthenticatedLayout>
  );
}

export default Index;
