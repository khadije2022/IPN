import React from 'react';

const ProductCard = ({ product }) => {
  const quantityOut = product.quantity_out || 0;
  const stock = product.stock || 0;
  const percentage = stock > 0 ? (quantityOut / stock) * 100 : 0;

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{product.designation}</h2>
      </div>
      <div className="mt-4">
        <div className="flex items-center">
          <div className="w-16 h-16 rounded-full border-4 border-orange-500 flex items-center justify-center">
            <span className="text-xl font-bold text-orange-500">{percentage.toFixed(0)}%</span>
          </div>
          <div className="ml-4">
            <p className="text-gray-600 dark:text-gray-400">Savings: ${product.quantity_in}</p>
            <p className="text-gray-600 dark:text-gray-400">Target Reached: ${product.quantity_out}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
