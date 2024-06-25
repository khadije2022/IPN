import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import moment from 'moment';
import React from 'react';
import { Link, router } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

import { ArrowTrendingDownIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';

const CircleProgress = ({ percentage, color }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg width="120" height="120" className="mb-2">
      <circle
        stroke={color}
        fill="transparent"
        strokeWidth="10"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        r={radius}
        cx="60"
        cy="60"
      />
      <text x="50%" y="50%" textAnchor="middle" dy=".3em" fontSize="20" fill={color}>
        {percentage.toFixed(2)}%
      </text>
    </svg>
  );
};

CircleProgress.propTypes = {
  percentage: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

export default function Dashboard({ auth, percentages, productQuantities = [], selectedDate, mouvmentStocks, produits }) {
  const { get } = useForm();
  const [date, setDate] = useState(selectedDate);

  const handleDateChange = (event) => {
    setDate(event.target.value);
    get(route('mouvement'), { date: event.target.value });
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Accueil</h2>}
    >
      <Head title="Accueil" />
      <div className="p-6">
        <div className="flex flex-wrap -mx-2">
          {Object.entries(percentages || {}).map(([key, item], index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-5 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md flex-1 mx-2 mb-6"
              style={{ minWidth: '250px' }}
            >
              <div className="text-lg font-semibold mb-4 dark:text-gray-200">{key}</div>
              <div className="flex justify-around items-center">
                <div className="text-center">
                  <CircleProgress percentage={item.validated} color="green" />
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">Validé</div>
                </div>
                <div className="text-center">
                  <CircleProgress percentage={item.nonValidated} color="red" />
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">Non Validé</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
        <div className="p-6 text-gray-900 dark:text-gray-100">
          <div className="flex flex-col sm:flex-row justify-between mb-4">
            <div className="font-semibold">
              <h1 > Liste de mouvement stock</h1>

            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                <tr className="text-nowrap">
                  <th className="px-3 py-3">ID</th>
                  <th className="px-3 py-3">Date</th>
                  <th className="px-3 py-3">Stock</th>
                  <th className="px-3 py-3">Type</th>
                </tr>
              </thead>
              <tbody>
                {mouvmentStocks.data.map((mouvmentStock) => (
                  <tr key={mouvmentStock.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-3 py-2">{mouvmentStock.id}</td>
                    <td className="px-3 py-2">{moment(mouvmentStock.created_at).format('YYYY-MM-DD')}</td>
                    <td className="px-3 py-2">{mouvmentStock.stock}</td>
                    <td className="px-3 py-2">
                      {mouvmentStock.typeMouvments === 'Achat' ? (
                        <ArrowTrendingDownIcon className="h-5 w-5 text-green-500" />
                      ) : (
                        <ArrowTrendingUpIcon className="h-5 w-5 text-red-500" />
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
    </AuthenticatedLayout>
  );
}
