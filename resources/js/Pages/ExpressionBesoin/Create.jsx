import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState } from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import Pagination from '@/Components/Pagination';

function Index({ auth, expressionbesoins, services, success }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [currentExpressionBesoin, setCurrentExpressionBesoin] = useState(null);

  const { data, setData, post, put, errors } = useForm({
    id_service: '',
    description: '',
  });

  const openModal = (mode, expressionbesoin = null) => {
    setModalMode(mode);
    setCurrentExpressionBesoin(expressionbesoin);
    if (mode === 'edit' && expressionbesoin) {
      setData({
        id_service: expressionbesoin.id_service,
        description: expressionbesoin.description,
      });
    } else {
      setData({
        id_service: '',
        description: '',
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
        });
      },
    });
  };

  const deleteExpressionBesoin = (expressionbesoin) => {
    if (!confirm('Are you sure you want to delete this project?')) {
      return;
    }
    router.delete(route('expressionbesoin.destroy', expressionbesoin.id));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className='flex justify-between items-center'>
          <h2 className='font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight'>

            Cree  expressionbesoin

          </h2>
          <div>
            <button
              onClick={() => openModal('add')}
              className='bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600 mr-2'
            >
              Add New
            </button>
            <a
              href={route('export-pdf')}
              download
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
                    <th className='px-3 py-3'>Service ID</th>
                    <th className='px-3 py-3'>Description</th>
                    <th className='px-3 py-3 text-right'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {expressionbesoins.data.map((expressionbesoin) => (
                    <tr key={expressionbesoin.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                      <td className='px-3 py-2'>{expressionbesoin.id}</td>
                      <td className='px-3 py-2'>{expressionbesoin.id_service}</td>
                      <td className='px-3 py-2'>{expressionbesoin.description}</td>
                      <td className='px-3 py-2 text-nowrap'>
                        <button
                          onClick={() => openModal('edit', expressionbesoin)}
                          className='font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1'
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => deleteExpressionBesoin(expressionbesoin)}
                          className='font-medium text-red-600 dark:text-red-500 hover:underline mx-1'
                        >
                          Delete
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
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full'>
          <div className='relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white'>
            <form onSubmit={handleFormSubmit} className='p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg'>
              <div className='mt-4'>
                <InputLabel htmlFor='id_service' value='Service' />
                <select
                  name="id_service"
                  id="id_service"
                  value={data.id_service}
                  onChange={(e) => setData('id_service', e.target.value)}
                  className="mt-1 block w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="" className="text-gray-500">Select a service</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id} className="text-gray-800 dark:text-gray-200">
                      {service.nom_responsabiliter}
                    </option>
                  ))}
                </select>
                <InputError message={errors.id_service} className='mt-2' />
              </div>

              <div className='mt-4'>
                <InputLabel htmlFor='description' value='Description' />
                <TextInput
                  type="text"
                  name="description"
                  id="description"
                  value={data.description}
                  className="mt-1 block w-full"
                  onChange={(e) => setData('description', e.target.value)}
                />
                <InputError message={errors.description} className='mt-2' />
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
