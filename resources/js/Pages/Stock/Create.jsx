import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head , router, useForm } from '@inertiajs/react'
import TextInput from '@/Components/TextInput'
import InputLabel from '@/Components/InputLabel'
import InputError from '@/Components/InputError'
import {Link} from '@inertiajs/react'


export default function Create({auth}) {
  const {data , setData , post , errors} =useForm({
    'type': "",
    
  })

  const onSubmit = (e) =>{
    e.preventDefault();
    post(route("categorie.store"));
  }
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className='flex justify-between items-center'>
          <h2 className='font-semibold text-xl text-gray-800
          dark:text-gray-200 leading-tight'>
              Create a new Categorie
          </h2>
        </div>
      }
      >
         <Head title="categorie"/>

<div className="py-12">
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <form onSubmit={onSubmit}
              className='p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg'
              >
                <div className='mt-4'>
                  <InputLabel
                  htmlFor='type'
                  value='categorie_type'
                  />
                  <TextInput
                  type="text"
                  name="type"
                  id="type"
                  value={data.type}
                  className="mt-1 block w-full"
                  onChange={(e) => setData('type',e.target.value)}
                  />
                  <InputError message={errors.type} className='mt-2' />
                </div>
         


                <div className='mt-4 text-right'>
                  <Link href={route('categorie.index')}
                  className=" py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                  >
                    Cancel
                  </Link>
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
    </AuthenticatedLayout>
  )
}
