import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import PropTypes from 'prop-types';
import { useState } from 'react';

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

export default function Dashboard({ auth, percentages, productQuantities = [], selectedDate }) {
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
        <div className="space-y-6 lg:flex lg:flex-wrap lg:-mx-4">
          {Object.entries(percentages || {}).map(([key, item], index) => (
            <div
              key={index}
              className="bg-white p-5 border border-gray-200 rounded-xl shadow-md lg:w-1/3 lg:mx-4 lg:mb-6"
            >
              <div className="text-lg font-semibold mb-4">{key}</div>
              <div className="flex justify-around items-center">
                <div className="text-center">
                  <CircleProgress percentage={item.validated} color="green" />
                  <div className="text-sm text-gray-600 mt-2">Validé</div>
                </div>
                <div className="text-center">
                  <CircleProgress percentage={item.nonValidated} color="red" />
                  <div className="text-sm text-gray-600 mt-2">Non Validé</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* <div className="mt-8">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Choisir la date (Année-Mois):
          </label>
          <input
            type="month"
            id="date"
            name="date"
            value={date}
            onChange={handleDateChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
          />
        </div> */}
        {/* <div className="mt-8">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produit</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantité Entrée</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantité Sortie</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {productQuantities.map((product, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.designation}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.quantite_entree}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.quantite_sortie}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> */}
      </div>
    </AuthenticatedLayout>
  );
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  percentages: PropTypes.object,
  productQuantities: PropTypes.array,
  selectedDate: PropTypes.string.isRequired,
};
