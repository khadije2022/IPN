import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head , router, useForm } from '@inertiajs/react'
import TextInput from '@/Components/TextInput'
import InputLabel from '@/Components/InputLabel'
import InputError from '@/Components/InputError'
import {Link} from '@inertiajs/react'
import SelectInput from '@/Components/SelectInput'


export default function Create({auth,categories}) {
  const {data , setData , post , errors} =useForm({
    'designation':"",
    'created_at':"",
  })

  const onSubmit = (e) =>{
    e.preventDefault();
    post(route("catelogueProduit.store"));
  }
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className='flex justify-between items-center'>
          <h2 className='font-semibold text-xl text-gray-800
          dark:text-gray-200 leading-tight'>
              Create a new Produits
          </h2>
        </div>
      }
      >
         <Head title="categorie"/>


<div className="py-12">
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
            {/* <pre>{JSON.stringify(categories,undefined,2)}</pre> */}
              <form onSubmit={onSubmit}
              className='p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg'
              >
                <div className='mt-4'>
                  <InputLabel
                  htmlFor='designation'
                  value='produit'
                  />
                  <TextInput
                  type="text"
                  name="produit"
                  id="designation"
                  value={data.designation}
                  className="mt-1 block w-full"
                  onChange={(e) => setData('designation',e.target.value)}
                  />
                  <InputError message={errors.type} className='mt-2' />
                </div>
                <div className='mt-4'>
                  <InputLabel
                  htmlFor='date'
                  value='prduct_Date'
                  />
                  <TextInput
                  type="date"
                  name="due_Date"
                  id="date"
                  value={data.created_at}
                  className="mt-1 block w-full"
                  onChange={(e) => setData('created_at',e.target.value)}
                  />
                  <InputError message={errors.due_Date} className='mt-2' />
                </div>

                <div className='mt-4'>
                  <InputLabel
                  htmlFor='type'
                  value='categorie_type'
                  />
                   <SelectInput
                  name="type"
                  id="type"
                  className="mt-1 block w-full"
                  onChange={(e) => setData('type',e.target.value)}
                  >
                    <option value="">Select option</option>
                   {categories.data.map((categorie)=>(
                      <option key={categorie.id} value={categorie.id}>{categorie.type}</option>
                   ))}

                  </SelectInput>
                  <InputError message={errors.type} className='mt-2' />
                </div>



                <div className='mt-4 text-right'>
                  <Link href={route('catelogueProduit.index')}
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
