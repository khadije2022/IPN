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
    width: '400px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    backgroundColor: 'white',
  },
  searchInput: {
    width: '120px', // Adjust the width as needed
  },

  tableRow: {
    transition: 'background-color 0.3s',
  },
  tableRowHover: {
    backgroundColor: '#d3d3d3',
  },
};

function Index({ auth, bonAchats, success }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [currentBonAchat, setCurrentBonAchat] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchStatus, setSearchStatus] = useState('');
  const [searchDateStart, setSearchDateStart] = useState('');
  const [searchDateEnd, setSearchDateEnd] = useState('');

  const { data, setData, post, put, errors } = useForm({
    description: '',
    // status: 'non validé',
  });

  const openModal = async (mode, bonAchat = null) => {
    setModalMode(mode);
    setCurrentBonAchat(bonAchat);

    if (mode === 'edit' && bonAchat) {
      setData({
        description: bonAchat.description,
        // status: bonAchat.status,
      });
    } else {
      setData({
        description: '',
        // status: 'non validé',
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentBonAchat(null);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const routeName = modalMode === 'add' ? 'bonAchat.store' : 'bonAchat.update';
    const action = modalMode === 'add' ? post : put;

    action(route(routeName, currentBonAchat ? currentBonAchat.id : null), {
      onSuccess: () => {
        closeModal();
        setData({
          description: '',
          // status: 'non validé',
        });
      },
    });
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('fr-CA', options);
  };

  const deleteBonAchat = (bonAchat) => {
    if (!confirm('Are you sure you want to delete this project?')) {
      return;
    }
    router.delete(route('bonAchat.destroy', bonAchat.id));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleRowClick = (id) => {
    router.visit(route('detailBonAchat.index-par-bonAchat', {bonAchat: id}));
  };

  const filteredBonAchats = bonAchats.data.filter((bonAchat) =>
    (bonAchat.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bonAchat.status.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (searchStatus === '' || bonAchat.status === searchStatus) &&
    (searchDateStart === '' || new Date(bonAchat.created_at) >= new Date(searchDateStart)) &&
    (searchDateEnd === '' || new Date(bonAchat.created_at) <= new Date(searchDateEnd))
  );

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className='flex justify-between items-center'>
          <h2 className='font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight'>
            Bon Achat
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
      <Head title="Bon Achat" />

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
                    <th className='px-2 py-2'>Description</th>
                    <th className='px-2 py-2'>Status</th>
                    <th className='px-2 py-2'>Date</th>
                    <th className='px-2 py-2 text-right'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBonAchats.map((bonAchat) => (
                    <tr
                    key={bonAchat.id}
                    className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 cursor-pointer'
                    style={styles.tableRow}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = styles.tableRowHover.backgroundColor}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
                    onClick={() => handleRowClick(bonAchat.id)}
                    >
                      <td className='px-2 py-1'>{bonAchat.description}</td>
                      <td className='px-2 py-1'>
                        <span style={bonAchat.status === 'validé' ? styles.statusValide : styles.statusNonValide}>
                          {bonAchat.status}
                        </span>
                      </td>
                      <td className='px-2 py-1'>{formatDate(bonAchat.created_at)}</td>
                      <td className='px-2 py-1 text-right'>
                        <button
                          onClick={() => openModal('edit', bonAchat)}
                          className='text-blue-600 dark:text-blue-500 mx-1'
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteBonAchat(bonAchat);
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
              <Pagination links={bonAchats.meta.links} />
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl mb-4">
              {modalMode === 'add' ? 'Ajouter Bon Achat' : 'Modifier Bon Achat'}
            </h2>
            <form onSubmit={handleFormSubmit}>
              <InputLabel htmlFor="description" value="Description" />
              <TextInput
                id="description"
                name="description"
                value={data.description}
                className="mt-1 block w-full"
                onChange={(e) => setData('description', e.target.value)}
                required
              />
              <InputError message={errors.description} className="mt-2" />


              <InputError message={errors.status} className="mt-2" />

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-emerald-500 text-white py-2 px-4 rounded"
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
