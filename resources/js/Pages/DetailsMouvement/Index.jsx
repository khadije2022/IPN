import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React from 'react';
import { Head } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import ProductCard from '@/Pages/DetailsMouvement/ProductCard';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import moment from 'moment';

function Index({ auth, mouvmentStocks, produits, success }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center flex-wrap">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Mouvments Stock
          </h2>
        </div>
      }
    >
      <Head title="detailsMouvments" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {success && (
            <div className="bg-emerald-400 py-2 px-4 rounded mb-4">
              {success}
            </div>
          )}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="flex flex-col sm:flex-row justify-between mb-4">
                <div className="font-semibold">
                  <h1>C'est la liste de mouvement stock</h1>
                  <h1 className="text-red-600">pour bien visiter le mouvement</h1>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {produits.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                      <th className="px-3 py-3">ID</th>
                      <th className="px-3 py-3">Date</th>
                      <th className="px-3 py-3">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mouvmentStocks.data.map((mouvmentStock) => (
                      <tr key={mouvmentStock.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-3 py-2">{mouvmentStock.id}</td>
                        <td className="px-3 py-2">{moment(mouvmentStock.created_at).format('YYYY-MM-DD')}</td>
                        <td className="px-3 py-2">
                          {mouvmentStock.typeMouvments === 'Achat' ? (
                            <FaArrowUp className="text-green-500" />
                          ) : (
                            <FaArrowDown className="text-red-500" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Pagination links={mouvmentStocks.meta.links} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default Index;
