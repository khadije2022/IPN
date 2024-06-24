import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState, useEffect } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import Pagination from '@/Components/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faPlus, faFileExcel, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

function Index({ auth, magasins, success }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [currentMagasin, setCurrentMagasin] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [successMessage, setSuccessMessage] = useState(success);
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
  const [validationErrors, setValidationErrors] = useState({});

  const { data, setData, post, put, errors, reset } = useForm({
    nomMagasin: '',
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

  const openModal = (mode, magasin = null) => {
    setModalMode(mode);
    setCurrentMagasin(magasin);
    if (mode === 'edit' && magasin) {
      setData({
        nomMagasin: magasin.nomMagasin,
      });
    } else {
      setData({
        nomMagasin: '',
      });
    }
    setValidationErrors({});
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentMagasin(null);
    reset();
  };

  const validateForm = () => {
    const errors = {};
    if (!data.nomMagasin) {
      errors.nomMagasin = 'Le champ "Nom du Magasin" est obligatoire.';
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    const routeName = modalMode === 'add' ? 'magasin.store' : 'magasin.update';
    const action = modalMode === 'add' ? post : put;

    action(route(routeName, currentMagasin ? currentMagasin.id : null), {
      onSuccess: () => closeModal(),
      onError: (error) => console.error("Error submitting form:", error),
    });
  };

  const deleteMagasin = (magasin) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce magasin ?')) {
      return;
    }
    router.delete(route('magasin.destroy', magasin.id));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedMagasins = magasins?.data?.sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  }) || [];

  const filteredMagasins = sortedMagasins.filter((magasin) =>
    magasin && (magasin.id.toString().includes(searchQuery) ||
      magasin.nomMagasin.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className='flex justify-between items-center'>
          <h2 className='font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight'>
            Magasin
          </h2>
        </div>
      }
    >
      <Head title="Magasin" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {successMessage && (
            <div className='bg-emerald-400 py-2 px-4 rounded mb-4'>
              {successMessage}
            </div>
          )}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className='font-semibold'>
                <h1>Liste de Magasins</h1>
              </div>
              <div className='flex flex-col sm:flex-row justify-between mb-4'>
                <TextInput
                  type="text"
                  name="search"
                  id="search"
                  value={searchQuery}
                  className="mt-1 block w-full sm:w-60 mb-2 sm:mb-0"
                  onChange={handleSearchChange}
                  placeholder="Rechercher..."
                />
                <div className='flex flex-col sm:flex-row items-center justify-end space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto'>
                  <button
                    onClick={() => openModal('add')}
                    className='bg-emerald-500 py-2 px-4 text-white rounded shadow transition-all w-full sm:w-auto hover:bg-emerald-600 flex items-center'
                  >
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    Ajouter
                  </button>
                  <a
                    href={route('export-magasin')}
                    className="bg-emerald-500 py-2 px-4 text-white rounded shadow transition-all w-full sm:w-auto hover:bg-emerald-600 flex items-center"
                  >
                    <FontAwesomeIcon icon={faFileExcel} className="mr-2" />
                    Excel
                  </a>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                    <tr className='text-nowrap'>
                      <th className='px-4 py-3 cursor-pointer' onClick={() => handleSort('id')}>
                        ID
                        {sortConfig.key === 'id' && (sortConfig.direction === 'asc' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />)}
                      </th>
                      <th className='px-4 py-3 cursor-pointer' onClick={() => handleSort('nomMagasin')}>
                        Nom Magasin
                        {sortConfig.key === 'nomMagasin' && (sortConfig.direction === 'asc' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />)}
                      </th>
                      <th className='px-4 py-3 text-right'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMagasins.map((magasin) => (
                      <tr key={magasin.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                        <td className='px-4 py-3'>{magasin.id}</td>
                        <td className='px-4 py-3'>{magasin.nomMagasin}</td>
                        <td className='px-4 py-3 text-right flex justify-end'>
                          <button
                            onClick={() => openModal('edit', magasin)}
                            className='text-blue-600 dark:text-blue-500 mx-1'
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                          <button
                            onClick={() => deleteMagasin(magasin)}
                            className='text-red-600 dark:text-red-500 mx-1'
                          >
                            <FontAwesomeIcon icon={faTrashAlt} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Pagination links={magasins.meta.links} />
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center'>
          <div className='relative p-5 border w-11/12 sm:w-96 shadow-lg rounded-md bg-white'>
            <form onSubmit={handleFormSubmit} className='p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg'>
              <div className='mt-4'>
                <InputLabel htmlFor='nomMagasin' value='Nom du Magasin' />
                <TextInput
                  type="text"
                  name="nomMagasin"
                  id="nomMagasin"
                  value={data.nomMagasin}
                  className='mt-1 block w-full'
                  onChange={(e) => setData('nomMagasin', e.target.value)}
                />
                {validationErrors.nomMagasin && (
                  <div className='text-red-500 mt-2'>{validationErrors.nomMagasin}</div>
                )}
                <InputError message={errors.nomMagasin} className='mt-2' />
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
                  type="submit"
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
