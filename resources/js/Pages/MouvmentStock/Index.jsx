import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import React from 'react'
import Create from './Create';
import { Head, Link, router } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import TextInputArea from '@/Components/TextInputArea';
import SelectInput from '@/Components/SelectInput';

// import Pagination from '@/Components/Pagination';


export default function Index({auth, mouvmentStocks = null,BSA,success}) {

  const deleteProduit = (mouvmentStock) => {
      if(!confirm('Are you wan t to delete this prject')){
        return;
      }
      router.delete(route('mouvmentStock.destroy',mouvmentStock.id))
  }
  return (
    <AuthenticatedLayout
            user={auth.user}
            header={
              <div className='flex justify-between items-center'>
                <h2 className='font-semibold text-xl text-gray-800
                dark:text-gray-200 leading-tight'>
                    mouvmentStocks
                </h2>
                <Link href={route('mouvmentStock.create')} className='bg-emerald-500 py-1 px-3 text-white rounded
                shadow transition-all hover:bg-emerald-600'>
                  Add new
                </Link>
              </div>
            }
        >
            <Head title=""/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                {success && (<div className='bg-emerald-400  py-2 px-4 rounded mb-4'>
              {success}
            </div>)}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                          <div className='overflow-auto'>
                          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                              <tr className='text-nowrap'>
                              <th className='px-3 py-3'>ID</th>
                               <th className='px-3 py-3'>Type</th>
                                <th className='px-3 py-3'>Date</th>
                                <th className='px-3 py-3'>Qte</th>
                                <th className='px-3 py-3 text-right'>Action</th>
                              </tr>
                            </thead>
                            {/* <tbody>
                              {mouvmentStocks.data.map((mouvmentStock)=>
                                <tr key={mouvmentStock.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                                  <td className='px-3 py-2' >{mouvmentStock.id}</td>
                                  <td className='px-3 py-2'>{mouvmentStock.typeStock}</td>
                                  <td className='px-3 py-2'>{mouvmentStock.date}</td>
                                  <td className='px-3 py-2'>{}</td>
                                  <td className='px-3 py-2 text-nowrap'>
                                    <Link
                                      href={route("mouvmentStock.edit", mouvmentStock.id)}
                                      className='font-medium text-blue-600
                                      dark:text-blue-500  hover:underline mx-1'
                                     >
                                      Edit
                                    </Link>
                                    <button
                                    onClick={ (e) => deleteProject(mouvmentStock)}
                                      className='font-medium text-red-600
                                      dark:text-red-500 hover:underline mx-1'
                                    >
                                      Delete
                                    </button>
                                  </td>
                                </tr>
                              )}


                            </tbody> */}
                          </table>
                          <form className='p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg' >
              <div>
                <InputLabel
                  htmlFor='Categorie'
                  value='Categorie'
                  />
                  <SelectInput
                  name="categorie"
                  id="Categorie"
                  // value={data.status}
                  className="mt-1 block w-full"
                  onChange={(e) => setData('status',e.target.value)}
                  >
                  <option value="">Select Status</option>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  </SelectInput>

                <InputLabel
                  htmlFor='produit'
                  value='produit'
                  /> 
                  <SelectInput
                  name="produit"
                  id="produit"
                  // value={data.status}
                  className="mt-1 block w-full"
                  onChange={(e) => setData('status',e.target.value)}
                  >
                  <option value="">Select Status</option>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  </SelectInput>
                </div>
                <div className='mt-4'>
                  <InputLabel
                  htmlFor='name'
                  value='project_name'
                  />
                  <TextInput
                  type="text"
                  name="name"
                  id="name"
                  // value={data.name}
                  className="mt-1 block w-full"
                  onChange={(e) => setData('name',e.target.value)}
                  />
                  {/* <InputError message={errors.name} className='mt-2' /> */}
                </div>

                <div className='mt-4'>
                  <InputLabel
                  htmlFor='date'
                  value='project_date'
                  />
                  <TextInput
                  type="date"
                  name="due_Date"
                  id="date"
                  // value={data.due_Date}
                  className="mt-1 block w-full"
                  onChange={(e) => setData('due_Date',e.target.value)}
                  />
                  {/* <InputError message={errors.due_Date} className='mt-2' /> */}
                </div>

                <div className='mt-4'>
                <InputLabel
                  htmlFor='description'
                  value='project Description'
                  />
                  <TextInputArea
                  name="description"
                  id="description"
                  // value={data.description}
                  className="mt-1 block w-full"
                  onChange={(e) => setData('description',e.target.value)}
                  />
                  {/* <InputError message={errors.description} className='mt-2' /> */}
                </div>

                <div className='mt-4 text-right'>
                  {/* <Link href={route('project.index')}
                  className=" py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                  >
                    Cancel
                  </Link> */}
                  <button
                  className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                  >
                    submit
                  </button>
                  </div>
                          </form>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
  )
}
