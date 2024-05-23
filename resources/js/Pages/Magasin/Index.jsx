import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import React from 'react'

import { Head, Link, router } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
function Index({auth,magasins,success}){
    const deletemagasin = (magasin) => {
        if(!confirm('Are you wan t to delete this prject')){
          return;
        }
        router.delete(route('magasin.destroy',magasin.idmagasin))
    }
    return(
        <AuthenticatedLayout   user={auth.user}
        header={
            <div className='flex justify-between items-center'>
              <h2 className='font-semibold text-xl text-gray-800
              dark:text-gray-200 leading-tight'>
                  magasins
              </h2>
              <Link href={route('magasin.create')} className='bg-emerald-500 py-1 px-3 text-white rounded
              shadow transition-all hover:bg-emerald-600'>
                Add new
              </Link>
            </div>
          }    >
        <Head title="magasins" />


                    <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidmagasinden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                              <tr className='text-nowrap'>
                                <th className='px-3 py-3'>idMagasin</th>
                               <th className='px-3 py-3'>nomMagasin</th>

                                <th className='px-3 py-3 text-right'>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {magasins.data.map((magasin)=>
                                <tr key={magasin.idMagasin} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                                  <td className='px-3 py-2' >{magasin.idMagasin}</td>
                                  <td className='px-3 py-2'>{magasin.nomMagasin}</td>

                                  <td className='px-3 py-2 text-nowrap'>
                                    <Link
                                      href={route("magasin.edit", magasin.idmagasin)}
                                      className='font-medium text-blue-600
                                      dark:text-blue-500  hover:underline mx-1'
                                     >
                                      Edit
                                    </Link>


                                    <button
                                    onClick={ (e) => deletemagasin(magasin)}
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

                        <Pagination links={magasins.meta.links}/>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}export default Index;
