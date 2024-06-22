import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState } from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import Pagination from '@/Components/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faPlus, faFileExcel, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

const styles = {
  statusValide: {
    backgroundColor: '#2ecc71',
    color: 'white',
    padding: '3px 8px',
    borderRadius: '5px',
    textAlign: 'center',
  },
  statusNonValide: {
    backgroundColor: '#e74c3c',
    color: 'white',
    padding: '3px 8px',
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
    width: '90%',
    maxWidth: '400px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    backgroundColor: 'white',
  },
  searchInput: {
    width: '100%',
  },
  tableRow: {
    transition: 'background-color 0.3s',
  },
  tableRowHover: {
    backgroundColor: '#d3d3d3',
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
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [validationErrors, setValidationErrors] = useState({});

  const { data, setData, post, put, errors, reset } = useForm({
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
    setValidationErrors({});
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentExpressionBesoin(null);
    reset();
  };

  const validateForm = () => {
    const errors = {};
    if (!data.id_service) {
      errors.id_service = 'Le champ "Service" est obligatoire.';
    }
    if (!data.description) {
      errors.description = 'Le champ "Description" est obligatoire.';
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
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
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce projet?')) {
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

  const filteredExpressionBesoins = expressionbesoins.data
    .filter((expressionbesoin) =>
      (expressionbesoin.id.toString().includes(searchQuery) ||
        getServiceName(expressionbesoin.id_service).toLowerCase().includes(searchQuery.toLowerCase()) ||
        expressionbesoin.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        expressionbesoin.status.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (searchStatus === '' || expressionbesoin.status === searchStatus) &&
      (searchService === '' || expressionbesoin.id_service.toString() === searchService) &&
      (searchDateStart === '' || new Date(expressionbesoin.created_at) >= new Date(searchDateStart)) &&
      (searchDateEnd === '' || new Date(expressionbesoin.created_at) <= new Date(searchDateEnd))
    )
    .sort((a, b) => {
      if (sortConfig.key) {
        const order = sortConfig.direction === 'ascending' ? 1 : -1;
        return a[sortConfig.key] > b[sortConfig.key] ? order : -order;
      }
      return 0;
    });

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className='flex justify-between items-center'>
          <h2 className='font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight'>
            Expression des Besoins
          </h2>
        </div>
      }
    >
      <Head title="Expression des Besoins" />

      <div className='py-12'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          {success != null && (
            <div className='bg-emerald-400 py-2 px-4 rounded mb-4'>
              {success}
            </div>
          )}
          <div className='bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg'>
            <div className='p-6 text-gray-900 dark:text-gray-100'>
              <div className='flex flex-col sm:flex-row justify-between mb-4'>
                <div className='font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight'>
                  <div>C'est la liste des Expressions de Besoins</div>
                  <div>Vous pouvez rechercher par services, statuts et entre des dates données</div>
                </div>
                <div className='flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2'>
                  <div>
                    <button
                      onClick={() => openModal('add')}
                      className='bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600 flex items-center'
                    >
                      <FontAwesomeIcon icon={faPlus} className="mr-2" />Ajouter
                    </button>
                  </div>
                  <div>
                    <a href={route('export-bonachat')} className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600 flex items-center">
                      <FontAwesomeIcon icon={faFileExcel} className="mr-2" />Excel</a>
                  </div>
                </div>
              </div>

              <div className="mb-4">
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
              </div>

              <div className="overflow-x-auto">
                <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                  <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500'>
                    <tr>
                      <th className='px-2 py-2 cursor-pointer' onClick={() => handleSort('id')}>
                        ID <FontAwesomeIcon icon={sortConfig.key === 'id' ? (sortConfig.direction === 'ascending' ? faSortUp : faSortDown) : ''} />
                      </th>
                      <th className='px-2 py-2 cursor-pointer' onClick={() => handleSort('id_service')}>
                        Service <FontAwesomeIcon icon={sortConfig.key === 'id_service' ? (sortConfig.direction === 'ascending' ? faSortUp : faSortDown) : ''} />
                      </th>
                      <th className='px-2 py-2 cursor-pointer' onClick={() => handleSort('description')}>
                        Description <FontAwesomeIcon icon={sortConfig.key === 'description' ? (sortConfig.direction === 'ascending' ? faSortUp : faSortDown) : ''} />
                      </th>
                      <th className='px-2 py-2 cursor-pointer' onClick={() => handleSort('status')}>
                        Statut <FontAwesomeIcon icon={sortConfig.key === 'status' ? (sortConfig.direction === 'ascending' ? faSortUp : faSortDown) : ''} />
                      </th>
                      <th className='px-2 py-2 cursor-pointer' onClick={() => handleSort('created_at')}>
                        Date <FontAwesomeIcon icon={sortConfig.key === 'created_at' ? (sortConfig.direction === 'ascending' ? faSortUp : faSortDown) : ''} />
                      </th>
                      <th className='px-2 py-2 text-right'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredExpressionBesoins.map((expressionbesoin) => (
                      <tr
                        key={expressionbesoin.id}
                        className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 cursor-pointer'
                        style={styles.tableRow}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = styles.tableRowHover.backgroundColor}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
                      >
                        <td className='px-2 py-1' onClick={() => handleRowClick(expressionbesoin.id)}>{expressionbesoin.id}</td>
                        <td className='px-2 py-1' onClick={() => handleRowClick(expressionbesoin.id)}>{getServiceName(expressionbesoin.id_service)}</td>
                        <td className='px-2 py-1' onClick={() => handleRowClick(expressionbesoin.id)}>{expressionbesoin.description}</td>
                        <td className='px-2 py-1' onClick={() => handleRowClick(expressionbesoin.id)}>
                          <span style={expressionbesoin.status === 'validé' ? styles.statusValide : styles.statusNonValide}>
                            {expressionbesoin.status}
                          </span>
                        </td>
                        <td className='px-2 py-1'>{formatDate(expressionbesoin.created_at)}</td>
                        <td className='px-2 py-1 text-nowrap'>
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
              </div>
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
                  <option value=''>Sélectionner un Service</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.nom_responsabiliter}
                    </option>
                  ))}
                </select>
                {validationErrors.id_service && (
                  <div className='text-red-500 mt-2'>{validationErrors.id_service}</div>
                )}
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
                {validationErrors.description && (
                  <div className='text-red-500 mt-2'>{validationErrors.description}</div>
                )}
                <InputError message={errors.description} className='mt-2' />
              </div>

              {modalMode === 'edit' && (
                <div className='mt-4'>
                  <InputLabel htmlFor='status' value='Statut' />
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
                  {modalMode === 'add' ? 'Ajouter' : 'Enregistrer'}
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
