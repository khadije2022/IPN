import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import React from 'react'

import { Head, Link, router } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
function Index({auth,mouvmentStocks,success}){
    // const deletedetailsMouvment = (detailsMouvment) => {
    //     if(!confirm('Are you wan t to delete this prject')){
    //       return;
    //     }
    //     router.delete(route('detailsMouvment.destroy',detailsMouvment.idDetails))
    // }
    return(
        <AuthenticatedLayout   user={auth.user}
        header={
            <div className='flex justify-between items-center'>
              <h2 className='font-semibold text-xl text-gray-800
              dark:text-gray-200 leading-tight'>
                  Mouvments Stock
              </h2>

            </div>
          }    >
        <Head title="detailsMouvments" />


                    <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                {success && (<div className='bg-emerald-400  py-2 px-4 rounded mb-4'>
              {success}
            </div>)}
            </div>
            </div>
                    <div className="bg-white dark:bg-gray-800 overflow-hidDetailsden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                        <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500'>
                              <tr className='text-nowrap'>
                              <th className='px-3 py-3'>idDetails</th>
                               <th className='px-3 py-3'>idMouvement</th>
                               <th className='px-3 py-3'>id_magasin</th>
                               <th className='px-3 py-3'>qte</th>
                               <th className='px-3 py-3'>qte</th>
                                {/* <th className='px-3 py-3 text-right'>Action</th> */}
                              </tr>
                            </thead>
                            <tbody>
                              {mouvmentStocks.data.map((mouvmentStock)=>
                                <tr key={mouvmentStock.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                                   <td className='px-3 py-2' >{mouvmentStock.id}</td>
                                  <td className='px-3 py-2'>{mouvmentStock.idBonDeSortie}</td>
                                  <td className='px-3 py-2'>{mouvmentStock.idBonAchat}</td>
                                  <td className='px-3 py-2'>{mouvmentStock.Stock}</td>
                                  <td className='px-3 py-2'>{mouvmentStock.typeMouvments}</td>
                                  <td className='px-3 py-2 text-nowrap'>
                                    {/* <Link
                                      href={route("detailsMouvment.edit", detailsMouvment.idDetails)}
                                      className='font-medium text-blue-600
                                      dark:text-blue-500  hover:underline mx-1'
                                     >
                                      Edit
                                    </Link> */}


                                    {/* <button
                                    onClick={ (e) => deletedetailsMouvment(detailsMouvment)}
                                      className='font-medium text-red-600
                                      dark:text-red-500 hover:underline mx-1'
                                    >
                                      Delete
                                    </button> */}
                                  </td>
                                </tr>
                              )}


                            </tbody>
                          </table>

                        <Pagination links={mouvmentStocks.meta.links}/>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}export default Index;
