import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';

function Index_par_expbesoin({ auth, detailsexpresionbesoins, expressionb, id_expbesoin, success }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
    const [currentDetail, setCurrentDetail] = useState(null);

    const openModal = (mode, detail = null) => {
        setModalMode(mode);
        setCurrentDetail(detail);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentDetail(null);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        if (modalMode === 'add') {
            router.post(route('detailsexpresionbesoin.store'), formData);
        } else if (modalMode === 'edit') {
            router.put(route('detailsexpresionbesoin.update', currentDetail.id), formData);
        }

        closeModal();
    };

    const deleteDetailsexpresionbesoin = (detailsexpresionbesoin) => {
        if (!confirm('Are you sure you want to delete this project?')) {
            return;
        }
        router.delete(route('detailsexpresionbesoin.destroy', detailsexpresionbesoin.id));
    };

    // Debugging: Log the expressionb to ensure it is defined
    console.log('expressionb:', id_expbesoin);

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
          Add New
        </button>
        <a
          href={route('valider', { id_expbesoin: id_expbesoin })}
          className='bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600 mr-2'
        >
          Valider
        </a>
        <a
          href={route('pdf-DetailsExpbesoin', { id_expbesoin: id_expbesoin })}
          className='bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600'
        >
          Export PDF
        </a>
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
                                    <tr className='text-nowrap'>
                                        <th className='px-3 py-3'>ID</th>
                                        <th className='px-3 py-3'>id_expbesoin</th>
                                        <th className='px-3 py-3'>id_categorie</th>
                                        <th className='px-3 py-3'>id_catproduit</th>
                                        <th className='px-3 py-3'>quantite</th>
                                        <th className='px-3 py-3 text-right'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {detailsexpresionbesoins.data.map((detailsexpresionbesoin) => (
                                        <tr key={detailsexpresionbesoin.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                                            <td className='px-3 py-2'>{detailsexpresionbesoin.id}</td>
                                            <td className='px-3 py-2'>{detailsexpresionbesoin.id_expbesoin}</td>
                                            <td className='px-3 py-2'>{detailsexpresionbesoin.id_categorie}</td>
                                            <td className='px-3 py-2'>{detailsexpresionbesoin.id_catproduit}</td>
                                            <td className='px-3 py-2'>{detailsexpresionbesoin.quantite}</td>
                                            <td className='px-3 py-2 text-nowrap'>
                                                <button
                                                    onClick={() => openModal('edit', detailsexpresionbesoin)}
                                                    className='font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1'
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => deleteDetailsexpresionbesoin(detailsexpresionbesoin)}
                                                    className='font-medium text-red-600 dark:text-red-500 hover:underline mx-1'
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full'>
                    <div className='relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white'>
                        <form onSubmit={handleFormSubmit}>
                            <div className='mt-3 text-center'>
                                <h3 className='text-lg leading-6 font-medium text-gray-900'>
                                    {modalMode === 'add' ? 'Add New Detail' : 'Edit Detail'}
                                </h3>
                                <div className='mt-2'>
                                    <input type='hidden' name='id_expbesoin' value={id_expbesoin} />
                                    <div className='my-4'>
                                        <label className='block text-gray-700 text-sm font-bold mb-2'>
                                            Catégorie:
                                        </label>
                                        <input
                                            type='text'
                                            name='id_categorie'
                                            defaultValue={modalMode === 'edit' ? currentDetail.id_categorie : ''}
                                            required
                                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                        />
                                    </div>
                                    <div className='my-4'>
                                        <label className='block text-gray-700 text-sm font-bold mb-2'>
                                            Produit:
                                        </label>
                                        <input
                                            type='text'
                                            name='id_catproduit'
                                            defaultValue={modalMode === 'edit' ? currentDetail.id_catproduit : ''}
                                            required
                                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                        />
                                    </div>
                                    <div className='my-4'>
                                        <label className='block text-gray-700 text-sm font-bold mb-2'>
                                            Quantité:
                                        </label>
                                        <input
                                            type='number'
                                            name='quantite'
                                            defaultValue={modalMode === 'edit' ? currentDetail.quantite : ''}
                                            required
                                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='mt-4'>
                                <button
                                    type='button'
                                    onClick={closeModal}
                                    className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2'
                                >
                                    Cancel
                                </button>
                                <button
                                    type='submit'
                                    className='bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
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

export default Index_par_expbesoin;
