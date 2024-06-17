import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState } from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import Pagination from '@/Components/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';

const styles = {
  statusValide: {
    backgroundColor: '#2ecc71',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '5px',
    textAlign: 'center',
  },
  statusNonValide: {
    backgroundColor: '#e74c3c',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '5px',
    textAlign: 'center',
  },
  modalOverlay: {
    position: 'fixed',
    inset: '0',
    backgroundColor: 'rgba(96, 125, 139, 0.5)',
    overflowY: 'auto',
    height: '100%',
    width: '100%',
  },
  modalContainer: {
    position: 'relative',
    top: '20%',
    margin: 'auto',
    padding: '20px',
    border: '1px solid #ddd',
    width: '400px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    backgroundColor: 'white',
  },
  searchInput: {
    width: '150px', // Adjust the width as needed
  },
};

function Index({ auth, expressionbesoins, services, success }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [currentExpressionBesoin, setCurrentExpressionBesoin] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchStatus, setSearchStatus] = useState('');
  const [searchService, setSearchService] = useState('');
  const [searchDateStart, setSearchDateStart] = useState('');
  const [searchDateEnd, setSearchDateEnd] = useState('');

  const { data, setData, post, put, errors } = useForm({
    id_service: '',
    description: '',
    status: 'non validé',
  });

  const openModal = async (mode, expressionbesoin = null) => {
    setModalMode(mode);
    setCurrentExpressionBesoin(expressionbesoin);

    if (mode === 'edit' && expressionbesoin) {
      setData({
        id_service: expressionbesoin.id_service,
        description: expressionbesoin.description,
        status: expressionbesoin.status,
      });
    } else {
      setData({
        id_service: '',
        description: '',
        status: 'non validé',
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentExpressionBesoin(null);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const routeName = modalMode === 'add' ? 'expressionbesoin.store' : 'expressionbesoin.update';
    const action = modalMode === 'add' ? post : put;

    action(route(routeName, currentExpressionBesoin ? currentExpressionBesoin.id : null), {
      onSuccess: () => {
        closeModal();
        setData({
          id_service: '',
          description: '',
          status: 'non validé',
        });
      },
    });
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('fr-CA', options);
  };

  const deleteExpressionBesoin = (expressionbesoin) => {
    if (!confirm('Are you sure you want to delete this project?')) {
      return;
    }
    router.delete(route('expressionbesoin.destroy', expressionbesoin.id));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const getServiceName = (id) => {
    const service = services.find(service => service.id === id);
    return service ? service.nom_responsabiliter : 'N/A';
  };

  const handleRowClick = (id) => {
    router.visit(route('detailsexpresionbesoin.index_par_expbesoin', { id_expbesoin: id }));
  };

  const filteredExpressionBesoins = expressionbesoins.data.filter((expressionbesoin) =>
    (expressionbesoin.id.toString().includes(searchQuery) ||
      getServiceName(expressionbesoin.id_service).toLowerCase().includes(searchQuery.toLowerCase()) ||
      expressionbesoin.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expressionbesoin.status.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (searchStatus === '' || expressionbesoin.status === searchStatus) &&
    (searchService === '' || expressionbesoin.id_service.toString() === searchService) &&
    (searchDateStart === '' || new Date(expressionbesoin.created_at) >= new Date(searchDateStart)) &&
    (searchDateEnd === '' || new Date(expressionbesoin.created_at) <= new Date(searchDateEnd))
  );

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className='flex justify-between items-center'>
          <h2 className='font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight'>
            Expression des Besoins
          </h2>
          <div>
            <button
              onClick={() => openModal('add')}
              className='bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600 mr-2'
            >
              <FontAwesomeIcon icon={faPlus} /> Ajouter
              </button>
          </div>
        </div>
      }
    >
      <Head title="Expression des Besoins" />

      <div className='py-12'>
        <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
          {success && (
            <div className='bg-emerald-400 py-2 px-4 rounded mb-4'>
              {success}
            </div>
          )}
          <div className='bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg'>
            <div className='p-6 text-gray-900 dark:text-gray-100'>
              <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500'>
                  <tr>
                    <th className='px-3 py-1'>
                      <TextInput
                        type="text"
                        name="search"
                        id="search"
                        value={searchQuery}
                        className="mt-1 block w-full"
                        onChange={handleSearchChange}
                        placeholder="Rechercher ID"
                        style={styles.searchInput}
                      />
                    </th>
                    <th className='px-3 py-1'>
                      <select
                        name="searchService"
                        id="searchService"
                        value={searchService}
                        className="mt-1 block w-full"
                        onChange={(e) => setSearchService(e.target.value)}
                        style={styles.searchInput}
                      >
                        <option value=''>Services</option>
                        {services.map((service) => (
                          <option key={service.id} value={service.id}>
                            {service.nom_responsabiliter}
                          </option>
                        ))}
                      </select>
                    </th>
                    <th className='px-3 py-1'></th>
                    <th className='px-3 py-1'>
                      <select
                        name="searchStatus"
                        id="searchStatus"
                        value={searchStatus}
                        className="mt-1 block w-full"
                        onChange={(e) => setSearchStatus(e.target.value)}
                        style={styles.searchInput}
                      >
                        <option value=''>Statut</option>
                        <option value='validé'>Validé</option>
                        <option value='non validé'>Non Validé</option>
                      </select>
                    </th>
                    <th className='px-3 py-1'>
                      <TextInput
                        type="date"
                        name="searchDateStart"
                        id="searchDateStart"
                        value={searchDateStart}
                        className="mt-1 block w-full"
                        onChange={(e) => setSearchDateStart(e.target.value)}
                        style={styles.searchInput}
                      />
                      <TextInput
                        type="date"
                        name="searchDateEnd"
                        id="searchDateEnd"
                        value={searchDateEnd}
                        className="mt-1 block w-full"
                        onChange={(e) => setSearchDateEnd(e.target.value)}
                        style={styles.searchInput}
                      />
                    </th>
                    <th className='px-3 py-1'></th>
                  </tr>
                  <tr>
                    <th className='px-3 py-3'>ID</th>
                    <th className='px-3 py-3'>Service</th>
                    <th className='px-3 py-3'>Description</th>
                    <th className='px-3 py-3'>Status</th>
                    <th className='px-3 py-3'>Date</th>
                    <th className='px-3 py-3 text-right'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredExpressionBesoins.map((expressionbesoin) => (
                    <tr 
                      key={expressionbesoin.id} 
                      className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 cursor-pointer' 
                      onClick={() => handleRowClick(expressionbesoin.id)}
                    >
                      <td className='px-3 py-2'>{expressionbesoin.id}</td>
                      <td className='px-3 py-2'>{getServiceName(expressionbesoin.id_service)}</td>
                      <td className='px-3 py-2'>{expressionbesoin.description}</td>
                      <td className='px-3 py-2'>
                        <span style={expressionbesoin.status === 'validé' ? styles.statusValide : styles.statusNonValide}>
                          {expressionbesoin.status}
                        </span>
                      </td>
                      <td className='px-3 py-2'>{formatDate(expressionbesoin.created_at)}</td>
                      <td className='px-3 py-2 text-nowrap'>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openModal('edit', expressionbesoin);
                          }}
                          className='text-blue-600 dark:text-blue-500 mx-1'
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteExpressionBesoin(expressionbesoin);
                          }}
                          className='text-red-600 dark:text-red-500 mx-1'
                        >
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination links={expressionbesoins.meta.links} />
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContainer}>
            <form onSubmit={handleFormSubmit} className='p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg'>
              <div className='mt-4'>
                <InputLabel htmlFor='id_service' value='Service' />
                <select
                  name='id_service'
                  id='id_service'
                  value={data.id_service}
                  className='mt-1 block w-full'
                  onChange={(e) => setData('id_service', e.target.value)}
                >
                  <option value=''>Select a Service</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.nom_responsabiliter}
                    </option>
                  ))}
                </select>
                <InputError message={errors.id_service} className='mt-2' />
              </div>

              <div className='mt-4'>
                <InputLabel htmlFor='description' value='Description' />
                <TextInput
                  type='text'
                  name='description'
                  id='description'
                  value={data.description}
                  className='mt-1 block w-full'
                  onChange={(e) => setData('description', e.target.value)}
                />
                <InputError message={errors.description} className='mt-2' />
              </div>

              {modalMode === 'edit' && (
                <div className='mt-4'>
                  <InputLabel htmlFor='status' value='Status' />
                  <select
                    name='status'
                    id='status'
                    value={data.status}
                    className='mt-1 block w-full'
                    onChange={(e) => setData('status', e.target.value)}
                  >
                    <option value='validé'>Validé</option>
                    <option value='non validé'>Non Validé</option>
                  </select>
                  <InputError message={errors.status} className='mt-2' />
                </div>
              )}

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
                  className='bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600'
                >
                  {modalMode === 'add' ? 'Add' : 'Save'}
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
