import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState } from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faPlus, faFileExcel, faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import TextInput from '@/Components/TextInput';  // Assuming TextInput is a custom component

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
    maxWidth: '500px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    backgroundColor: 'white',
  },
  searchInput: {
    width: '100%', // Adjust the width as needed
  },
  tableRow: {
    transition: 'background-color 0.3s',
  },
  tableRowHover: {
    backgroundColor: '#d3d3d3',
  },
};

function Index({ auth, bonSorties, success }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [currentBonSortie, setCurrentBonSortie] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchStatus, setSearchStatus] = useState('');
  const [searchDateStart, setSearchDateStart] = useState('');
  const [searchDateEnd, setSearchDateEnd] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });

  const { data, setData, post, put, errors } = useForm({
    description: '',
  });

  const openModal = (mode, bonSortie = null) => {
    setModalMode(mode);
    setCurrentBonSortie(bonSortie);

    if (mode === 'edit' && bonSortie) {
      setData({
        description: bonSortie.description,
      });
    } else {
      setData({
        description: '',
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentBonSortie(null);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const routeName = modalMode === 'add' ? 'bonSortie.store' : 'bonSortie.update';
    const action = modalMode === 'add' ? post : put;

    action(route(routeName, currentBonSortie ? currentBonSortie.id : null), {
      onSuccess: () => {
        closeModal();
        setData({
          description: '',
        });
      },
    });
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('fr-CA', options);
  };

  const deleteBonSortie = (bonSortie) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      return;
    }
    router.delete(route('bonSortie.destroy', bonSortie.id));
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

  const sortedBonSorties = [...bonSorties.data].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const filteredBonSorties = sortedBonSorties.filter((bonSortie) =>
    (bonSortie.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bonSortie.status.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (searchStatus === '' || bonSortie.status === searchStatus) &&
    (searchDateStart === '' || new Date(bonSortie.created_at) >= new Date(searchDateStart)) &&
    (searchDateEnd === '' || new Date(bonSortie.created_at) <= new Date(searchDateEnd))
  );

  const handleRowClick = (id) => {
    router.visit(route('detailBonSortie.index_par_bonSortie', { bonSortie: id }));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className='flex justify-between items-center'>
          <h2 className='font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight'>
            Bon Sortie
          </h2>
        </div>
      }
    >
      <Head title="Bon Sortie" />

      <div className='py-12'>
        <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
          {success && (
            <div className='bg-emerald-400 py-2 px-4 rounded mb-4'>
              {success}
            </div>
          )}
          <div className='bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg'>
            <div className='p-6 text-gray-900 dark:text-gray-100'>

              <div className='flex justify-between'>

                <div className='flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2'>
                  <div>C'est la liste des Expressions de Besoin. Vous pouvez rechercher par services, statuts et dates données.</div>
                </div>
                <div className='flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2'>
                  <div>
                    <button
                      onClick={() => openModal('add')}
                      className='bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600 flex items-center'
                    >
                      <FontAwesomeIcon icon={faPlus} /> Ajouter
                    </button>
                  </div>

                  <div>
                    <a href={route('export-bonsortie')}
                      className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600 flex items-center"
                    >
                      <FontAwesomeIcon icon={faFileExcel} className="mr-2" />Excel
                    </a>
                  </div>
                </div>
              </div>
              <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500'>
                  <tr>
                    <th className='px-6 py-6'>
                      <TextInput
                        type="text"
                        name="search"
                        id="search"
                        value={searchQuery}
                        className="mt-1 block w-full"
                        onChange={handleSearchChange}
                        placeholder="Rechercher"
                        style={styles.searchInput}
                      />
                    </th>
                    <th className='px-2 py-1'>
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
                    <th className='px-2 py-1'>
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
                    <th className='px-2 py-1'></th>
                  </tr>
                  <tr>
                    <th className='px-2 py-2 cursor-pointer' onClick={() => handleSort('id')}>
                      ID <FontAwesomeIcon icon={sortConfig.key === 'id' ? (sortConfig.direction === 'asc' ? faSortUp : faSortDown) : faSort} />
                    </th>
                    <th className='px-2 py-2 cursor-pointer' onClick={() => handleSort('description')}>
                      Description <FontAwesomeIcon icon={sortConfig.key === 'description' ? (sortConfig.direction === 'asc' ? faSortUp : faSortDown) : faSort} />
                    </th>
                    <th className='px-2 py-2 cursor-pointer' onClick={() => handleSort('status')}>
                      Statut <FontAwesomeIcon icon={sortConfig.key === 'status' ? (sortConfig.direction === 'asc' ? faSortUp : faSortDown) : faSort} />
                    </th>
                    <th className='px-2 py-2 cursor-pointer' onClick={() => handleSort('created_at')}>
                      Date <FontAwesomeIcon icon={sortConfig.key === 'created_at' ? (sortConfig.direction === 'asc' ? faSortUp : faSortDown) : faSort} />
                    </th>
                    <th className='px-2 py-2 text-right'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBonSorties.map((bonSortie) => (
                    <tr
                      key={bonSortie.id}
                      className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 cursor-pointer'
                      style={styles.tableRow}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = styles.tableRowHover.backgroundColor}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
                    >
                      <td className='px-2 py-1' onClick={() => handleRowClick(bonSortie.id)}>{bonSortie.id}</td>
                      <td className='px-2 py-1' onClick={() => handleRowClick(bonSortie.id)}>{bonSortie.description}</td>
                      <td className='px-2 py-1' onClick={() => handleRowClick(bonSortie.id)}>
                        <span style={bonSortie.status === 'validé' ? styles.statusValide : styles.statusNonValide}>
                          {bonSortie.status}
                        </span>
                      </td>
                      <td className='px-2 py-1'>{formatDate(bonSortie.created_at)}</td>
                      <td className='px-2 py-1 text-right'>
                        <button
                          onClick={() => openModal('edit', bonSortie)}
                          className='font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1'
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button
                          onClick={() => deleteBonSortie(bonSortie)}
                          className='font-medium text-red-600 dark:text-red-500 hover:underline mx-1'
                        >
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination links={bonSorties.meta.links} />
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContainer}>
            <h1 className='text-lg font-semibold mb-3'>
              {modalMode === 'add' ? 'Ajouter Bon Sortie' : 'Modifier Bon Sortie'}
            </h1>
            <form onSubmit={handleFormSubmit}>
              <div className='mb-4'>
                <label htmlFor='description' className='block text-sm font-medium text-gray-700'>
                  Description
                </label>
                <input
                  id='description'
                  type='text'
                  className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50'
                  onChange={(e) => setData('description', e.target.value)}
                  value={data.description}
                  required
                />
              </div>
              <div className='flex justify-end'>
                <button
                  type='button'
                  className='mr-2 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500'
                  onClick={closeModal}
                >
                  Annuler
                </button>
                <button
                  type='submit'
                  className='py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-emerald-500 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500'
                >
                  {modalMode === 'add' ? 'Ajouter' : 'Modifier'}
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
