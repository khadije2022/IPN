import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { Link } from '@inertiajs/react';

export default function valider({ auth, expressionbesoin,details_expbesoins }) {
  const { data, setData, put, errors } = useForm({
    id_service: expressionbesoin.id_service || "",
    description: expressionbesoin.description || "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    put(route('expressionbesoin.update', expressionbesoin.id));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className='flex justify-between items-center'>
          <h2 className='font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight'>
            valider ExpressionBesoin 
          </h2>
        </div>
      }
    >
      <Head title="valider ExpressionBesoin" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              Valider
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
