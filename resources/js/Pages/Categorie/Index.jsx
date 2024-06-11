import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import React from 'react'
import { Head, Link, router } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';

function Index({ auth, categories, success }) {
  const deleteCategorie = (categorie) => {
    if (!confirm('Are you sure you want to delete this project?')) {
      return;
    }
    router.delete(route('categorie.destroy', categorie.id))
    
  }

  return (
    <AuthenticatedLayout user={auth.user}
      header={
        <div className='flex justify-between items-center'>
          <h2 className='font-semibold text-xl text-gray-800
              dark:text-gray-200 leading-tight'>
            categories
          </h2>
          <Link href={route('categorie.create')} className='bg-emerald-500 py-1 px-3 text-white rounded
              shadow transition-all hover:bg-emerald-600'>
            Add new
          </Link>
          <a href={route('export-pdf')} download className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
            Export en PDF
          </a>

          <a href={route('export-excel')} className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
            Export en Excel
          </a>



        </div>
      }    >
      <Head title="Categories" />


      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              {success && (<div className='bg-emerald-400  py-2 px-4 rounded mb-4'>
                {success}
              </div>)}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                  <tr className='text-nowrap'>
                    <th className='px-3 py-3'>ID</th>
                    <th className='px-3 py-3'>type</th>

                    <th className='px-3 py-3 text-right'>Action</th>
                  </tr>
                </thead>
                
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
                        >
                          Edit
                        </Link>


                        <button
                          onClick={(e) => deletecategorie(categorie)}
                          className='font-medium text-red-600
                                      dark:text-red-500 hover:underline mx-1'
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )}


                </tbody>
              </table>

              <Pagination links={categories.meta.links} />
            </div>
          </div>
        </div>
      </div>

    </AuthenticatedLayout>
  )
} export default Index;
