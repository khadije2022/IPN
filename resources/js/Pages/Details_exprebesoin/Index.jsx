import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import Pagination from '@/Components/Pagination';
import InputError from '@/Components/InputError';

function Index({ auth, detailsexpresionbesoins, categories, catelogue_produits, success }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDetail, setCurrentDetail] = useState(null);

  const { data, setData, put, errors } = useForm({
    id_categorie: '',
    id_catproduit: '',
    quantite: ''
  });

  const deletedetailsexpresionbesoin = (detailsexpresionbesoin) => {
    if (!confirm('Are you sure you want to delete this project?')) {
      return;
    }
    router.delete(route('detailsexpresionbesoin.destroy', detailsexpresionbesoin.id));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const getCategoryName = (id) => {
    const category = categories.find(category => category.id === id);
    return category ? category.type : 'N/A';
  };

  const getProductName = (id) => {
    const product = catelogue_produits.find(product => product.id === id);
    return product ? product.designation : 'N/A';
  };

  const filteredDetails = detailsexpresionbesoins.data.filter((detail) => 
    detail.id.toString().includes(searchQuery) || 
    getCategoryName(detail.id_categorie).toLowerCase().includes(searchQuery.toLowerCase()) || 
    getProductName(detail.id_catproduit).toLowerCase().includes(searchQuery.toLowerCase()) || 
    detail.quantite.toString().includes(searchQuery) || 
    detail.id_expbesoin.toString().includes(searchQuery)
  );

  const openEditModal = (detail) => {
    setCurrentDetail(detail);
    setData({
      id_categorie: detail.id_categorie,
      id_catproduit: detail.id_catproduit,
      quantite: detail.quantite
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentDetail(null);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    put(route('detailsexpresionbesoin.update', { detailsexpresionbesoin: currentDetail.id }), {
      onSuccess: () => closeModal(),
    });
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
        <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
          {success && (
            <div className='bg-emerald-400 py-2 px-4 rounded mb-4'>
              {success}
            </div>
          )}
          <div className='bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg'>
            <div className='p-6 text-gray-900 dark:text-gray-100'>
              <div className="mb-4">
                <TextInput
                  type="text"
                  name="search"
                  id="search"
                  value={searchQuery}
                  className="mt-1 block w-full"
                  onChange={handleSearchChange}
                  placeholder="Search...."
                />
              </div>
              <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500'>
                  <tr className='text-nowrap'>
                    <th className='px-3 py-3'>ID</th>
                    <th className='px-3 py-3'>Categorie</th>
                    <th className='px-3 py-3'>Produit</th>
                    <th className='px-3 py-3'>Quantite</th>
                    <th className='px-3 py-3 text-right'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDetails.map((detail) => (
                    <tr key={detail.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                      <td className='px-3 py-2'>{detail.id}</td>
                      <td className='px-3 py-2'>{getCategoryName(detail.id_categorie)}</td>
                      <td className='px-3 py-2'>{getProductName(detail.id_catproduit)}</td>
                      <td className='px-3 py-2'>{detail.quantite}</td>
                      <td className='px-3 py-2 text-nowrap'>
                        <button
                          onClick={() => openEditModal(detail)}
                          className='font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1'
                        >
                          Modifier
                        </button>
                        <button
                          onClick={() => deletedetailsexpresionbesoin(detail)}
                          className='font-medium text-red-600 dark:text-red-500 hover:underline mx-1'
                        >
                          Suprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination links={detailsexpresionbesoins.meta.links} />
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full'>
          <div className='relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white'>
            <form onSubmit={handleFormSubmit} className='p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg'>
              <div className='mt-4'>
                <InputLabel htmlFor='id_categorie' value='Categorie' />
                <select
                  name='id_categorie'
                  id='id_categorie'
                  value={data.id_categorie}
                  className='mt-1 block w-full'
                  onChange={(e) => setData('id_categorie', e.target.value)}
                >
                  <option value=''>Select a Categorie</option>
                  {categories.map((categorie) => (
                    <option key={categorie.id} value={categorie.id}>
                      {categorie.type}
                    </option>
                  ))}
                </select>
                <InputError message={errors.id_categorie} className='mt-2' />
              </div>

              <div className='mt-4'>
                <InputLabel htmlFor='id_catproduit' value='Produit' />
                <select
                  name='id_catproduit'
                  id='id_catproduit'
                  value={data.id_catproduit}
                  className='mt-1 block w-full'
                  onChange={(e) => setData('id_catproduit', e.target.value)}
                >
                  <option value=''>Select a Produit</option>
                  {catelogue_produits.map((produit) => (
                    <option key={produit.id} value={produit.id}>
                      {produit.designation}
                    </option>
                  ))}
                </select>
                <InputError message={errors.id_catproduit} className='mt-2' />
              </div>

              <div className='mt-4'>
                <InputLabel htmlFor='quantite' value='Quantité' />
                <TextInput
                  type='number'
                  name='quantite'
                  id='quantite'
                  value={data.quantite}
                  className='mt-1 block w-full'
                  onChange={(e) => setData('quantite', e.target.value)}
                />
                <InputError message={errors.quantite} className='mt-2' />
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
                  className='bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600'
                >
                  Submit
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
