import React from 'react';
import { createPortal } from 'react-dom';

const Model = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg w-full max-w-lg">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 dark:text-gray-400">
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Model;
