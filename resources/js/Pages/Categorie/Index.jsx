import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState } from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import Pagination from '@/Components/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faFilePdf, faFileExcel,faPlus } from '@fortawesome/free-solid-svg-icons';

function Index({ auth, categories, success }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [currentCategorie, setCurrentCategorie] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const { data, setData, post, put, errors } = useForm({
    type: '',
  });

  const openModal = (mode, categorie = null) => {
    setModalMode(mode);
    setCurrentCategorie(categorie);
    if (mode === 'edit' && categorie) {
      setData({
        type: categorie.type,
      });
    } else {
      setData({
        type: '',
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentCategorie(null);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const routeName = modalMode === 'add' ? 'categorie.store' : 'categorie.update';
    const action = modalMode === 'add' ? post : put;

    action(route(routeName, currentCategorie ? currentCategorie.id : null));
    closeModal();
  };

  const deleteCategorie = (categorie) => {
    if (!confirm('Are you sure you want to delete this category?')) {
      return;
    }
<<<<<<< HEAD
    router.delete(route('categorie.destroy', categorie.id))

  }
=======
    router.delete(route('categorie.destroy', categorie.id));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredCategories = categories.data.filter((categorie) => 
    categorie.id.toString().includes(searchQuery) || 
    categorie.type.toLowerCase().includes(searchQuery.toLowerCase())
  );
>>>>>>> a6f378fd87c829b1a559bd6d1aac271cd1c33ea3

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className='flex justify-between items-center'>
          <h2 className='font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight'>
            Catégories
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={() => openModal('add')}
              className='bg-emerald-500 py-2 px-4 text-white rounded shadow transition-all hover:bg-emerald-600'
            >
                          <FontAwesomeIcon icon={faPlus} className="mr-2" />

            </button>
            <a 
              href={route('export-pdf')} 
              download 
              className="bg-emerald-500 py-2 px-4 text-white rounded shadow transition-all hover:bg-emerald-600 flex items-center"
            >
              <FontAwesomeIcon icon={faFilePdf} className="mr-2" />
              Export PDF
            </a>
            <a 
              href={route('export-excel')} 
              className="bg-emerald-500 py-2 px-4 text-white rounded shadow transition-all hover:bg-emerald-600 flex items-center"
            >
              <FontAwesomeIcon icon={faFileExcel} className="mr-2" />
              Export Excel
            </a>
          </div>
        </div>
      }
    >
      <Head title="Catégories" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {success && (
            <div className='bg-emerald-400 py-2 px-4 rounded mb-4'>
              {success}
            </div>
          )}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
<<<<<<< HEAD
<<<<<<< HEAD
              <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500"'>
=======
=======
              <div className="mb-4">
                <TextInput
                  type="text"
                  name="search"
                  id="search"
                  value={searchQuery}
                  className="mt-1 block w-full"
                  onChange={handleSearchChange}
                  placeholder="Search ....."
                />
              </div>
>>>>>>> a6f378fd87c829b1a559bd6d1aac271cd1c33ea3
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
>>>>>>> 7342363ad9872adf1943780d4edca445c9643aeb
                  <tr className='text-nowrap'>
                    <th className='px-4 py-3'>ID</th>
                    <th className='px-4 py-3'>Type</th>
                    <th className='px-4 py-3 text-right'>Action</th>
                  </tr>
                </thead>
<<<<<<< HEAD
<<<<<<< HEAD
                <tbody>
                  {categories.data.map((categorie) =>
                    <tr key={categorie.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                      <td className='px-3 py-2' >{categorie.id}</td>
                      <td className='px-3 py-2'>{categorie.type}</td>

                      <td className='px-3 py-2 text-nowrap'>
                        <Link
                          href={route("categorie.edit", categorie.id)}
                          className='font-medium text-blue-600 dark:text-blue-500  hover:underline mx-1'
=======
                
                            <tbody>
                              {categories.data.map((categorie)=>
                                <tr key={categorie.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                                  <td className='px-3 py-2' >{categorie.id}</td>
                                  <td className='px-3 py-2'>{categorie.type}</td>

                                  <td className='px-3 py-2 text-nowrap'>
                                    <Link
                                      href={route("categorie.edit", categorie.id)}
                                      className='font-medium text-blue-600

                                      dark:text-blue-500  hover:underline mx-1'
>>>>>>> 7342363ad9872adf1943780d4edca445c9643aeb
                        >
                          Edit
                        </Link>


=======
                <tbody>
                  {filteredCategories.map((categorie) => (
                    <tr key={categorie.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                      <td className='px-4 py-3'>{categorie.id}</td>
                      <td className='px-4 py-3'>{categorie.type}</td>
                      <td className='px-4 py-3 text-right flex justify-end'>
>>>>>>> a6f378fd87c829b1a559bd6d1aac271cd1c33ea3
                        <button
                          onClick={() => openModal('edit', categorie)}
                          className='text-blue-600 dark:text-blue-500 mx-1'
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button
                          onClick={() => deleteCategorie(categorie)}
                          className='text-red-600 dark:text-red-500 mx-1'
                        >
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination links={categories.meta.links} />
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full'>
          <div className='relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white'>
            <form onSubmit={handleFormSubmit} className='p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg'>
              <div className='mt-4'>
                <InputLabel htmlFor='type' value='Category Type' />
                <TextInput
                  type="text"
                  name="type"
                  id="type"
                  value={data.type}
                  className="mt-1 block w-full"
                  onChange={(e) => setData('type', e.target.value)}
                />
                <InputError message={errors.type} className='mt-2' />
              </div>
              <div className='mt-4 text-right'>
                <button
                  type='button'
                  onClick={closeModal}
                  className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2'
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-500 py-2 px-4 text-white rounded shadow transition-all hover:bg-emerald-600"
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
