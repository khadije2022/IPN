import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import React from 'react'

import { Head, Link, router } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';


export default function Index({auth, produits,success}) {

  const deleteProduit = (produit) => {
      if(!confirm('Are you wan t to delete this' +' ' +produit.designation)){
        return;
      }
      router.delete(route('catelogueProduit.destroy',produit.id))
  }
  return (
    <AuthenticatedLayout
            user={auth.user}
            header={
              <div className='flex justify-between items-center'>
                <h2 className='font-semibold text-xl text-gray-800
                dark:text-gray-200 leading-tight'>
                    Catalogue Produit
                </h2>
                <Link href={route('catelogueProduit.create')} className='bg-emerald-500 py-1 px-3 text-white rounded
                shadow transition-all hover:bg-emerald-600'>
                  Add new
                </Link>
              </div>
            }
        >
            <Head title=""/>
            {/* {success & */}

            {/* } */}
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                {success && (<div className='bg-emerald-400  py-2 px-4 rounded mb-4'>
              {success}
            </div>)}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                          <table className='className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                            <thead className='className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500"'>
                              <tr className='text-nowrap'>
                                <th className='px-3 py-3'>ID</th>
                               <th className='px-3 py-3'>designation</th>
                                <th className='px-3 py-3'>Type</th>
                                <th className='px-3 py-3'>date</th>
                                <th className='px-3 py-3 text-right'>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {produits.data.map((produit)=>(
                                <tr key={produit.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                                  <td className='px-3 py-2' >{produit.id}</td>
                                  <td className='px-3 py-2'>{produit.designation}</td>
                                  <td className='px-3 py-2'>{produit.type.type}</td>
                                  <td className='px-3 py-2'>{produit.created_at}</td>
                                  <td className='px-3 py-2 text-nowrap'>
                                    <Link
                                      href={route("catelogueProduit.edit", produit.id)}
                                      className='font-medium text-blue-600
                                      dark:text-blue-500  hover:underline mx-1'
                                     >
                                      Edit
                                    </Link>


                                    <button
                                    onClick={ (e) => deleteProduit(produit)}
                                      className='font-medium text-red-600
                                      dark:text-red-500 hover:underline mx-1'
                                    >
                                      Delete
                                    </button>
                                  </td>
                                </tr>
                              ))}


                            </tbody>
                          </table>
                          <Pagination links={produits.meta.links}/>


                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
  )
}
