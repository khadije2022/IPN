import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState, useEffect } from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import Pagination from '@/Components/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faFilePdf, faFileExcel, faPlus, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import SelectInput from '@/Components/SelectInput';

function Index({ auth, regions, queryParams = null, success }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
    const [currentRegion, setCurrentRegion] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [successMessage, setSuccessMessage] = useState(success);
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });

    queryParams = queryParams || {};
    const searchFieldChanged = (type, value) => {
        if (value) {
            queryParams[type] = value;
        } else {
            delete queryParams[type];
        }
        router.get(route("region.index"), queryParams);
    };

    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return;
        searchFieldChanged(name, e.target.value);
    };

    const { data, setData, post, put, errors, reset } = useForm({
        nomRegion: '',
    });

    const [validationErrors, setValidationErrors] = useState({});

    const openModal = (mode, region = null) => {
        setModalMode(mode);
        setCurrentRegion(region);
        if (mode === 'edit' && region) {
            setData({
                nomRegion: region.nomRegion,
            });
        } else {
            setData({
                nomRegion: '',
            });
        }
        setValidationErrors({});
        setIsModalOpen(true);
    };

    useEffect(() => {
        if (success) {
            setSuccessMessage(success);
            const timer = setTimeout(() => {
                setSuccessMessage(null);
            }, 10000); // 10 seconds
            return () => clearTimeout(timer);
        }
    }, [success]);

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentRegion(null);
        reset();
    };

    const validateForm = () => {
        const errors = {};
        if (!data.nomRegion) {
            errors.nomRegion = 'Le champ nom de région est obligatoire.';
        }
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (!validateForm()) {
            return;
        }
        const routeName = modalMode === 'add' ? 'region.store' : 'region.update';
        const action = modalMode === 'add' ? post : put;

        action(route(routeName, currentRegion ? currentRegion.id : null), data);
        closeModal();
    };

    const deleteRegion = (region) => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer cette région?')) {
            return;
        }
        router.delete(route('region.destroy', region.id));
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

    const sortedRegions = regions.data.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
    });

    const filteredRegions = sortedRegions.filter((region) =>
        region.id.toString().includes(searchQuery) ||
        region.nomRegion.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className='flex justify-between items-center'>
                    <h2 className='font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight'>
                        Régions
                    </h2>
                </div>
            }
        >
            <Head title="Régions" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {successMessage && (
                        <div className='bg-emerald-400 py-2 px-4 rounded mb-4'>
                            {successMessage}
                        </div>
                    )}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="flex flex-col sm:flex-row justify-between mb-4">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center w-full sm:w-auto">
                                    <TextInput
                                        type="text"
                                        name="search"
                                        id="search"
                                        value={searchQuery}
                                        className="mt-1 block w-full sm:w-auto mb-2 sm:mb-0 sm:mr-2"
                                        onChange={handleSearchChange}
                                        placeholder="Rechercher ..."
                                    />
                                </div>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 sm:mb-0">
                                    <button
                                        onClick={() => openModal('add')}
                                        className='bg-emerald-500 py-2 px-4 text-white rounded shadow transition-all hover:bg-emerald-600 w-full sm:w-auto mb-4 sm:mb-0 sm:mr-2'
                                    >
                                        <FontAwesomeIcon icon={faPlus} className="mr-2" />
                                        Ajouter
                                    </button>

                                    
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th className='px-4 py-3 cursor-pointer' onClick={() => handleSort('id')}>
                                                ID {sortConfig.key === 'id' && (
                                                    <FontAwesomeIcon icon={sortConfig.direction === 'asc' ? faSortUp : faSortDown} />
                                                )}
                                            </th>
                                            <th className='px-4 py-3 cursor-pointer' onClick={() => handleSort('nomRegion')}>
                                                Nom de la région {sortConfig.key === 'nomRegion' && (
                                                    <FontAwesomeIcon icon={sortConfig.direction === 'asc' ? faSortUp : faSortDown} />
                                                )}
                                            </th>
                                            <th className='px-4 py-3 text-right'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredRegions.map((region) => (
                                            <tr key={region.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                                                <td className='px-4 py-3'>{region.id}</td>
                                                <td className='px-4 py-3'>{region.nomRegion}</td>
                                                <td className='px-4 py-3 text-right flex justify-end'>
                                                    <button
                                                        onClick={() => openModal('edit', region)}
                                                        className='text-blue-600 dark:text-blue-500 mx-1'
                                                    >
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </button>
                                                    <button
                                                        onClick={() => deleteRegion(region)}
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
                            <Pagination links={regions.meta.links} />
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full'>
                    <div className='relative top-20 mx-auto p-5 border w-11/12 sm:w-96 shadow-lg rounded-md bg-white'>
                        <form onSubmit={handleFormSubmit} className='p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg'>
                            <div className='mt-4'>
                                <InputLabel htmlFor='nomRegion' value='Nom de la région' />
                                <TextInput
                                    type="text"
                                    name="nomRegion"
                                    id="nomRegion"
                                    value={data.nomRegion}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('nomRegion', e.target.value)}
                                />
                                {validationErrors.nomRegion && (
                                    <div className='text-red-500 mt-2'>{validationErrors.nomRegion}</div>
                                )}
                                <InputError message={errors.nomRegion} className='mt-2' />
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
                                    className="bg-emerald-500 py-2 px-4 text-white rounded shadow transition-all hover:bg-emerald-600"
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
