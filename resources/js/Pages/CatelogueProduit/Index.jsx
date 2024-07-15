import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState, useEffect } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import Pagination from '@/Components/Pagination';
import SelectInput from '@/Components/SelectInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faPlus, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

function Index({ auth, produits, categories, success, ent, queryParams = null }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [currentProduit, setCurrentProduit] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState(queryParams?.start_date || '');
  const [endDate, setEndDate] = useState(queryParams?.end_date || '');
  const [filteredProduits, setFilteredProduits] = useState(ent.data);
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
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  useEffect(() => {
    let filtered = ent.data;

    if (searchQuery) {
      filtered = filtered.filter(produit =>
        produit.product_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProduits(filtered);
  }, [searchQuery, ent.data]);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const deleteProduit = (produit) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette catégorie?')) {
      return;
    }
    router.delete(route('catelogueProduit.destroy', produit.product_id));
  };

  const openModal = (mode, produit = null) => {
    setModalMode(mode);
    setCurrentProduit(produit);
    setData(
      produit
        ? {
            designation: produit.product_name,
            type: produit.category_id,
            created_at: produit.created_at,
          }
        : {
            designation: '',
            type: '',
            created_at: '',
          }
    );
    setValidationErrors({});
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    reset();
  };

  const validateForm = () => {
    const errors = {};
    if (!data.designation) errors.designation = 'La désignation est requise.';
    if (!data.type) errors.type = 'La catégorie est requise.';
    if (!data.created_at) errors.created_at = 'La date de création est requise.';
    setValidationErrors(errors);
    return errors;
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (Object.keys(validateForm()).length) return;
    const action = modalMode === 'add' ? post : put;
    action(
      route(modalMode === 'add' ? 'catelogueProduit.store' : 'catelogueProduit.update', currentProduit?.category_id),
      {
        onSuccess: closeModal,
        onError: (errors) => console.error('Error submitting form:', errors),
      }
    );
  };

  const handleDateChange = (setter) => (e) => setter(e.target.value);

  const handleFilterByDate = () => {
    router.get(route('catelogueProduit.index'), {
      start_date: startDate,
      end_date: endDate,
    });
  };

  const handleSort = (key) =>
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'ascending' ? 'descending' : 'ascending',
    });

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
      <Head title='Catalogue Produit' />
      <div className='py-12'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          {successMessage && (
            <div className='bg-emerald-400 py-2 px-4 rounded mb-4'>
              {successMessage}
            </div>
          )}
          <div className='bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg'>
            <div className='p-6 text-gray-900 dark:text-gray-100'>
              <div className='flex flex-col sm:flex-row justify-between mb-4'>
                <div className='flex space-x-4'>
                  <TextInput
                    type='text'
                    name='search'
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder='Rechercher...'
                    className='mt-2 block w-full sm:w-60'
                  />
                </div>
                <div className='flex space-x-4 mt-2 sm:mt-0'>
                  <TextInput
                    type='date'
                    name='start_date'
                    value={startDate}
                    onChange={handleDateChange(setStartDate)}
                    className='block w-full sm:w-auto'
                  />

                  <TextInput
                    type='date'
                    name='end_date'
                    value={endDate}
                    onChange={handleDateChange(setEndDate)}
                    className='block w-full sm:w-auto'
                  />
                </div>
                <div className='flex items-center space-x-2 mt-2 sm:mt-0'>
                  <button
                    onClick={handleFilterByDate}
                    className='bg-emerald-500 text-white px-4 py-2 rounded shadow hover:bg-emerald-600 transition-all'
                  >
                    Filtrer par Date
                  </button>
                  <button
                    onClick={() => openModal('add')}
                    className='bg-emerald-500 py-2 px-4 text-white rounded shadow transition-all hover:bg-emerald-600 flex items-center'
                  >
                    <FontAwesomeIcon icon={faPlus} className='mr-2' /> Ajouter
                  </button>
                </div>
              </div>
              <div className='overflow-x-auto'>
                <table className='min-w-full bg-white dark:bg-gray-800'>
                  <thead className='bg-gray-50 dark:bg-gray-700'>
                    <tr>
                      <th
                        className='px-3 py-3 cursor-pointer'
                        onClick={() => handleSort('product_name')}
                      >
                        Nom du Produit
                        {sortConfig.key === 'product_name' && (
                          <FontAwesomeIcon
                            icon={
                              sortConfig.direction === 'ascending'
                                ? faSortUp
                                : faSortDown
                            }
                          />
                        )}
                      </th>
                      <th
                        className='px-3 py-3 cursor-pointer'
                        onClick={() => handleSort('category_name')}
                      >
                        Catégorie
                        {sortConfig.key === 'category_name' && (
                          <FontAwesomeIcon
                            icon={
                              sortConfig.direction === 'ascending'
                                ? faSortUp
                                : faSortDown
                            }
                          />
                        )}
                      </th>
                      <th
                        className='px-3 py-3 cursor-pointer'
                        onClick={() => handleSort('total_entree')}
                      >
                        Entrée
                        {sortConfig.key === 'total_entree' && (
                          <FontAwesomeIcon
                            icon={
                              sortConfig.direction === 'ascending'
                                ? faSortUp
                                : faSortDown
                            }
                          />
                        )}
                      </th>
                      <th
                        className='px-3 py-3 cursor-pointer'
                        onClick={() => handleSort('stock')}
                      >
                        Stock
                        {sortConfig.key === 'stock' && (
                          <FontAwesomeIcon
                            icon={
                              sortConfig.direction === 'ascending'
                                ? faSortUp
                                : faSortDown
                            }
                          />
                        )}
                      </th>
                      <th
                        className='px-3 py-3 cursor-pointer'
                        onClick={() => handleSort('created_at')}
                      >
                        Sortie
                        {sortConfig.key === 'created_at' && (
                          <FontAwesomeIcon
                            icon={
                              sortConfig.direction === 'ascending'
                                ? faSortUp
                                : faSortDown
                            }
                          />
                        )}
                      </th>
                      <th className='px-3 py-3'>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProduits.map((produit) => (
                      <tr
                        key={produit.product_id}
                        className='border-b dark:border-gray-700'
                      >
                        <td className='px-3 py-2'>{produit.product_name}</td>
                        <td className='px-3 py-2'>{produit.category_name}</td>
                        <td className='px-3 py-2'>{produit.total_entree}</td>
                        <td className='px-3 py-2'>{produit.stock <0 ? -produit.stock : produit.stock}</td>
                        <td className='px-3 py-2'>{produit.total_sortie < 0 ? -produit.total_sortie :produit.total_sortie }</td>

                        <td className='px-3 py-2 flex space-x-2'>
                          <button
                            onClick={() => openModal('edit', produit)}
                            className='text-blue-500 hover:text-blue-700'
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                          <button
                            onClick={() => deleteProduit(produit)}
                            className='text-red-500 hover:text-red-700'
                          >
                            <FontAwesomeIcon icon={faTrashAlt} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Pagination className='mt-6' links={ent.links} />
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className='fixed z-10 inset-0 overflow-y-auto'>
          <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
            <div className='fixed inset-0 transition-opacity' aria-hidden='true'>
              <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
            </div>
            <span
              className='hidden sm:inline-block sm:align-middle sm:h-screen'
              aria-hidden='true'
            >
              &#8203;
            </span>
            <div
              className='inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6'
              role='dialog'
              aria-modal='true'
              aria-labelledby='modal-headline'
            >
              <form onSubmit={handleFormSubmit}>
                <div>
                  <div className='text-lg leading-6 font-medium text-gray-900 dark:text-gray-200 mb-2'>
                    {modalMode === 'add' ? 'Ajouter Produit' : 'Modifier Produit'}
                  </div>
                  <div className='mb-4'>
                    <InputLabel forInput='designation' value='Désignation' />
                    <TextInput
                      id='designation'
                      name='designation'
                      value={data.designation}
                      className='mt-1 block w-full'
                      autoComplete='designation'
                      isFocused={true}
                      handleChange={(e) => setData('designation', e.target.value)}
                      required
                    />
                    <InputError message={validationErrors.designation} className='mt-2' />
                  </div>
                  <div className='mb-4'>
                    <InputLabel forInput='type' value='Catégorie' />
                    <SelectInput
                      id='type'
                      name='type'
                      value={data.type}
                      className='mt-1 block w-full'
                      autoComplete='type'
                      handleChange={(e) => setData('type', e.target.value)}
                      required
                    >
                      <option value=''>Sélectionnez une catégorie</option>
                      {categories.map((category) => (
                        <option key={category.category_id} value={category.category_id}>
                          {category.category_name}
                        </option>
                      ))}
                    </SelectInput>
                    <InputError message={validationErrors.type} className='mt-2' />
                  </div>
                  <div className='mb-4'>
                    <InputLabel forInput='created_at' value='Date de Création' />
                    <TextInput
                      id='created_at'
                      type='date'
                      name='created_at'
                      value={data.created_at}
                      className='mt-1 block w-full'
                      autoComplete='created_at'
                      handleChange={(e) => setData('created_at', e.target.value)}
                      required
                    />
                    <InputError message={validationErrors.created_at} className='mt-2' />
                  </div>
                </div>
                <div className='mt-5 sm:mt-6'>
                  <button
                    type='submit'
                    className='inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-500 text-base font-medium text-white hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:text-sm'
                  >
                    {modalMode === 'add' ? 'Ajouter' : 'Modifier'}
                  </button>
                  <button
                    type='button'
                    className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:mt-0 sm:text-sm'
                    onClick={closeModal}
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </AuthenticatedLayout>
  );
}

export default Index;
