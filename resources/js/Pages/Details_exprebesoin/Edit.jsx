import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { Link } from '@inertiajs/react';

export default function Edit({ auth, detailsexpresionbesoin }) {
  const { data, setData, put, errors } = useForm({
    id_categorie: detailsexpresionbesoin.id_categorie || "",
    id_catproduit: detailsexpresionbesoin.id_catproduit || "",
    quantite: detailsexpresionbesoin.quantite || ""
  });

  const onSubmit = (e) => {
    e.preventDefault();
    put(route('detailsexpresionbesoin.update', { detailsexpresionbesoin: detailsexpresionbesoin.id }));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className='flex justify-between items-center'>
          <h2 className='font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight'>
            Edit detailsexpresionbesoin "{detailsexpresionbesoin.id_categorie}"
          </h2>
        </div>
      }
    >
      <Head title="Edit detailsexpresionbesoin" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <form onSubmit={onSubmit} className='p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg'>
                <div className='mt-4'>
                  <InputLabel htmlFor='id_categorie' value='ID Catégorie' />
                  <TextInput
                    type="number"
                    name="id_categorie"
                    id="id_categorie"
                    value={data.id_categorie}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('id_categorie', e.target.value)}
                  />
                  <InputError message={errors.id_categorie} className='mt-2' />
                </div>

                <div className='mt-4'>
                  <InputLabel htmlFor='id_catproduit' value='ID Catégorie Produit' />
                  <TextInput
                    type="number"
                    name="id_catproduit"
                    id="id_catproduit"
                    value={data.id_catproduit}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('id_catproduit', e.target.value)}
                  />
                  <InputError message={errors.id_catproduit} className='mt-2' />
                </div>

                <div className='mt-4'>
                  <InputLabel htmlFor='quantite' value='Quantité' />
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

                <div className='mt-4 text-right'>
                  <Link
                    href={route('detailsexpresionbesoin.index')}
                    className="py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
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
