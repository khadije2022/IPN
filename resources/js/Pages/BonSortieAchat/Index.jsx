import React, { useState, useEffect } from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faPlus, faFileExcel, faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

// import {

//   Bon_STATUS_CLASS_MAP,
//   Bon_STATUS_TEXT_MAP,

// } from "@/constants.jsx";

function Index({ auth, bonSorties, success, valider }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [currentBonSortie, setCurrentBonSortie] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchStatus, setSearchStatus] = useState('');
  const [searchDateStart, setSearchDateStart] = useState('');
  const [searchDateEnd, setSearchDateEnd] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [validationErrors, setValidationErrors] = useState({});

  const { data, setData, post, put, errors, reset } = useForm({
    description: '',
  });

  useEffect(() => {
    if (valider) {
      toast.success(success);
    }
  }, [valider]);

  const openModal = async (mode, bonSortie = null) => {
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
    setValidationErrors({});
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentBonSortie(null);
    reset();
  };

  const validateForm = () => {
    const errors = {};
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
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce bon sortie?')) {
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

  const sortedBonSorties = React.useMemo(() => {
    let sortableBonSorties = [...bonSorties.data];
    if (sortConfig.key !== null) {
      sortableBonSorties.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableBonSorties;
  }, [bonSorties.data, sortConfig]);

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
        <div className="flex justify-between items-center flex-wrap">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Bons de Sortie
          </h2>
        </div>
      }
    >
      <Head title="Bons de Sortie" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {success && (
            <div className="bg-emerald-400 py-2 px-4 rounded mb-4">
              {success}
            </div>
          )}
          <div className='bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg'>
            <div className='p-6 text-gray-900 dark:text-gray-100'>
              <div className='mb-4'>
                <div className='font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight'>
                  <div>Liste des Bons de Sortie</div>
                </div>
              </div>
              <div className='flex flex-col sm:flex-row justify-between mb-4 space-y-2 sm:space-y-0'>
                <TextInput
                  type="text"
                  name="search"
                  id="search"
                  value={searchQuery}
                  className="mt-1 block w-full sm:w-60 dark:bg-gray-700 dark:text-gray-300"
                  onChange={handleSearchChange}
                  placeholder="Rechercher..."
                />
                <select
                  name="searchStatus"
                  id="searchStatus"
                  value={searchStatus}
                  className="mt-1 block w-full sm:w-auto dark:bg-gray-700 dark:text-gray-300"
                  onChange={(e) => setSearchStatus(e.target.value)}
                >
                  <option value="">Statut</option>
                  <option value="validé">Validé</option>
                  <option value="non-validé">Non Validé</option>
                </select>
                <div className="flex flex-col sm:flex-row items-center justify-end space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
                  {auth.user.role ==='service' &&(<button
                    onClick={() => openModal('add')}
                    className="bg-emerald-500 py-2 px-4 text-white rounded shadow transition-all w-full sm:w-auto hover:bg-emerald-600 flex items-center"
                  >
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    Ajouter
                  </button>)}
                  <a
                    href={route('export-bonsortie')}
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
                    <tr>
                      <th className="px-2 py-1"></th>
                      <th className="px-2 py-1"></th>
                      <th className="px-2 py-1"></th>
                      <th className="px-2 py-1">
                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                          <TextInput
                            type="date"
                            name="searchDateStart"
                            id="searchDateStart"
                            value={searchDateStart}
                            className="mt-1 block w-full sm:w-auto h-10 dark:bg-gray-700 dark:text-gray-300"
                            onChange={(e) => setSearchDateStart(e.target.value)}
                          />
                          <TextInput
                            type="date"
                            name="searchDateEnd"
                            id="searchDateEnd"
                            value={searchDateEnd}
                            className="mt-1 block w-full sm:w-auto h-10 dark:bg-gray-700 dark:text-gray-300"
                            onChange={(e) => setSearchDateEnd(e.target.value)}
                          />
                        </div>
                      </th>
                      <th className="px-2 py-1"></th>
                      <th className="px-2 py-1"></th>
                    </tr>
                    <tr>
                      <th className="px-2 py-2 cursor-pointer" onClick={() => handleSort('id')}>
                        ID
                        {sortConfig.key === 'id' && (sortConfig.direction === 'asc' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />)}
                      </th>
                      <th className="px-2 py-2 cursor-pointer" onClick={() => handleSort('description')}>
                        Description
                        {sortConfig.key === 'description' && (sortConfig.direction === 'asc' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />)}
                      </th>
                      <th className="px-2 py-2 cursor-pointer" onClick={() => handleSort('status')}>
                        Statut
                        {sortConfig.key === 'status' && (sortConfig.direction === 'asc' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />)}
                      </th>
                      <th className="px-2 py-2 cursor-pointer" onClick={() => handleSort('created_at')}>
                        Date
                        {sortConfig.key === 'created_at' && (sortConfig.direction === 'asc' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />)}
                      </th>
                      <th className="px-2 py-2 cursor-pointer" onClick={() => handleSort('created_by')}>
                        Créé par
                        {sortConfig.key === 'created_by' && (sortConfig.direction === 'asc' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />)}
                      </th>
                      {auth.user.role ==='service' && (<th className="px-2 py-2 text-right">Action</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBonSorties.map((bonSortie) => (
                      <tr
                        key={bonSortie.id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300"
                        onClick={() => handleRowClick(bonSortie.id)}
                      >
                        <td className="px-2 py-1">{bonSortie.id}</td>

                        <th className="px-3 py-2 text-gray-100 text-nowrap hover:underline" onClick={() => handleRowClick(bonSortie.id)}>
                        
                          {bonSortie.description}
                          
                        </th>
                        <td className="px-2 py-1">
                        <span
          className={
            "px-2 py-1 rounded text-white " +
            (bonSortie.status === 'validé' ? 'bg-green-500' : 'bg-red-500')
          }
        >
          {bonSortie.status === 'validé' ? 'Valide' : 'Non Valide'}
        </span>
                        </td>
                        <td className="px-2 py-1" onClick={() => handleRowClick(bonSortie.id)}>{bonSortie.created_at}</td>
                        <td className="px-2 py-1" onClick={() => handleRowClick(bonSortie.id)}>{bonSortie.createdBy.email}</td>
                       { auth.user.role ==='service' && ( <td className="px-2 py-1 text-right">
                          <button
                            onClick={() => openModal('edit', bonSortie)}
                            className="text-blue-600 dark:text-blue-500 mx-1"
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteBonSortie(bonSortie);
                            }}
                            className="text-red-600 dark:text-red-500 mx-1"
                          >
                            <FontAwesomeIcon icon={faTrashAlt} />
                          </button>
                        </td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Pagination links={bonSorties.meta.links} />
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" onClick={closeModal}>
          <div className="relative top-20 mx-auto p-5 border w-11/12 sm:w-96 shadow-lg rounded-md bg-white dark:bg-gray-800" onClick={(e) => e.stopPropagation()}>
            <h2 className="mt-1 block w-full dark:bg-gray-700 dark:text-gray-300">
              {modalMode === 'add' ? 'Ajouter Bon de Sortie' : 'Modifier Bon de Sortie'}
            </h2>
            <form onSubmit={handleFormSubmit}>
              <InputLabel htmlFor="description" value="Description" />
              <TextInput
                id="description"
                name="description"
                value={data.description}
                className="mt-1 block w-full dark:bg-gray-700 dark:text-gray-300"
                onChange={(e) => setData('description', e.target.value)}
                required
              />
              {validationErrors.description && (
                <div className='text-red-500 mt-2'>{validationErrors.description}</div>
              )}
              <InputError message={errors.description} className="mt-2" />

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
