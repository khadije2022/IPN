import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { Link } from '@inertiajs/react';

export default function Create({ auth, categories, catelogue_produits, id_expbesoin }) {
  const { data, setData, post, errors } = useForm({
    id_expbesoin: id_expbesoin,
    id_categorie: "",
    id_catproduit: "",
    quantite: "",
    // Other fields if any
  });

  const onSubmit = (e) => {
    e.preventDefault();
    post(route("detailsexpresionbesoin.store"));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className='flex justify-between items-center'>
          <h2 className='font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight'>
            Create a new detailsexpresionbesoin
          </h2>
        </div>
      }
    >
      <Head title="Create detailsexpresionbesoin" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <form onSubmit={onSubmit} className='p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg'>
                <div className='mt-4'>
                  <InputLabel htmlFor='id_categorie' value='Category' />
                  <select
                    name="id_categorie"
                    id="id_categorie"
                    value={data.id_categorie}
                    onChange={(e) => setData('id_categorie', e.target.value)}
                    className="mt-1 block w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="" className="text-gray-500">Select a category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id} className="text-gray-800 dark:text-gray-200">
                        {category.type}
                      </option>
                    ))}
                  </select>
                  <InputError message={errors.id_categorie} className='mt-2' />
                </div>

                <div className='mt-4'>
                  <InputLabel htmlFor='id_catproduit' value='Product Category' />
                  <select
                    name="id_catproduit"
                    id="id_catproduit"
                    value={data.id_catproduit}
                    onChange={(e) => setData('id_catproduit', e.target.value)}
                    className="mt-1 block w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="" className="text-gray-500">Select a product category</option>
                    {catelogue_produits.map((productCategory) => (
                      <option key={productCategory.id} value={productCategory.id} className="text-gray-800 dark:text-gray-200">
                        {productCategory.designation}
                      </option>
                    ))}
                  </select>
                  <InputError message={errors.id_catproduit} className='mt-2' />
                </div>

                <div className='mt-4'>
                  <InputLabel htmlFor='quantite' value='Quantity' />
                  <TextInput
                    type="number"
                    name="quantite"
                    id="quantite"
                    value={data.quantite}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('quantite', e.target.value)}
                  />
                  <InputError message={errors.quantite} className='mt-2' />
                </div>

                {/* Autres champs du formulaire s'il y en a */}

                <div className='mt-4 text-right'>
                  <Link
                    href={route('detailsexpresionbesoin.index')}
                    className="py-1 px-3 text-white bg-emerald-500 rounded shadow transition-all hover:bg-emerald-600 mr-2"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
