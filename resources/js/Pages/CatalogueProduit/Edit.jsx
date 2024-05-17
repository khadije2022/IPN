import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head , useForm } from '@inertiajs/react'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import TextInputArea from '@/Components/TextInputArea'
import InputError from '@/Components/InputError'
import SelectInput from '@/Components/SelectInput'
import {Link} from '@inertiajs/react'

export default function Edit({auth , project}) {
  const {data , setData , put,errors} = useForm({
    'name': project.name || "",
    'description': project.description || "",
    'status': project.status || "",
    'due_Date':project.due_Date || "",
    'image_Path': "",

  })


  const onSubmit = (e) =>{
    e.preventDefault();
    put(route('project.update',project.id))
  }
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className='flex justify-between items-center'>
          <h2 className='font-semibold text-xl text-gray-800
          dark:text-gray-200 leading-tight'>
              Edit project "{project.name}"
          </h2>
        </div>
      }
      >
         <Head title="Project"/>

<div className="py-12">
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <form onSubmit={onSubmit}
              className='p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg'
              >
                <div className='mt-4'>
                  <InputLabel
                  htmlFor='name'
                  value='project_name'
                  />
                  <TextInput
                  type="text"
                  name="name"
                  id="name"
                  value={data.name}
                  className="mt-1 block w-full"
                  onChange={(e) => setData('name',e.target.value)}
                  />
                  <InputError message={errors.name} className='mt-2' />
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
                  value={data.due_Date}
                  className="mt-1 block w-full"
                  onChange={(e) => setData('due_Date',e.target.value)}
                  />
                  <InputError message={errors.due_Date} className='mt-2' />
                </div>

                <div className='mt-4'>
                <InputLabel
                  htmlFor='description'
                  value='project Description'
                  />
                  <TextInputArea
                  name="description"
                  id="description"
                  value={data.description}
                  className="mt-1 block w-full"
                  onChange={(e) => setData('description',e.target.value)}
                  />
                  <InputError message={errors.description} className='mt-2' />
                </div>

                <div>

                <InputLabel
                  htmlFor='Status'
                  value='project status'
                  />
                  <SelectInput
                  name="status"
                  id="Status"
                  value={data.status}
                  className="mt-1 block w-full"
                  onChange={(e) => setData('status',e.target.value)}
                  >
                  <option value="">Select Status</option>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  </SelectInput>
                </div>
                <div className='mt-4 text-right'>
                  <Link href={route('project.index')}
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
