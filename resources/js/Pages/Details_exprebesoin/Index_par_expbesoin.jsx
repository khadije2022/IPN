import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState, useEffect } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import Pagination from '@/Components/Pagination';
import SelectInput from '@/Components/SelectInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faPlus, faFilePdf, faSort, faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Index_par_expbesoin({
  auth,
  detailsexpresionbesoins = { data: [] },
  expressionbesoin,
  id_expbesoin,
  success,
  valider,
  categories ,
  produits ,
  error,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [currentDetail, setCurrentDetail] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [validationErrors, setValidationErrors] = useState({});

  console.log(auth.user)
  useEffect(() => {
    if (selectedCategory && produits?.data) {
      const filtered = produits.data.filter(product => product.type.id === parseInt(selectedCategory));
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [selectedCategory, produits]);

  console.log(filteredProducts)
  const { data, setData, post, put, errors, reset } = useForm({
    id_expbesoin: id_expbesoin,
    produit: "",
    quantite: "",
  });

  useEffect(() => {
    if (valider) {
      toast.success(valider);
    }
  }, [valider]);

  useEffect(() => {
    if (error) {
      toast.warning(error);
    }
  }, [error]);

  const openModal = (mode, detail = null) => {
    setModalMode(mode);
    setCurrentDetail(detail);
    if (mode === 'edit' && detail) {
      setData({
        id_expbesoin: detail.id_expbesoin,
        produit: detail.produit,
        quantite: detail.quantite,
      });
      setSelectedCategory(detail.produit.type);
    } else {
      setData({
        id_expbesoin: id_expbesoin,
        produit: "",
        quantite: "",
      });
      setSelectedCategory('');
    }
    setValidationErrors({});
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentDetail(null);
    reset();
  };

  const validateForm = () => {
    const errors = {};
    // if (!data.id_categorie) {
    //   errors.id_categorie = 'Le champ "Catégorie" est obligatoire.';
    // }
    if (!data.produit) {
      errors.produit = 'Le champ "Produit" est obligatoire.';
    }
    if (!data.quantite || data.quantite <= 0) {
      errors.quantite = 'Le champ "Quantité" est obligatoire et doit être un nombre positif.';
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    const routeName = modalMode === 'add' ? 'detailsexpresionbesoin.store' : 'detailsexpresionbesoin.update';
    const action = modalMode === 'add' ? post : put;

    action(route(routeName, currentDetail ? currentDetail.id : null), {
      onSuccess: () => closeModal(),
    });
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if(value < 0){
      toast.error('La quantité ne peut être négative');
      return;
    }
    setData('quantite', value);
  };

  const deleteDetailsexpresionbesoin = (detailsexpresionbesoin) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce détail?')) {
      return;
    }
    router.delete(route('detailsexpresionbesoin.destroy', detailsexpresionbesoin.id));
  };



  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedDetails = [...detailsexpresionbesoins.data].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className='flex justify-between items-center'>
          <h2 className='font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight'>
           details expression des besoins
          </h2>
        </div>
      }
    >
      <Head title="Expression des Besoins" />
      <div className='py-12'>
        <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
          <ToastContainer />
          {success && (
            <div className='bg-emerald-400 py-2 px-4 rounded mb-4'>
              {success}
            </div>
          )}
          <div className='bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg'>
            <div className='p-6 text-gray-900 dark:text-gray-100'>
              <div className='flex flex-col lg:flex-row justify-between'>
                <div className='font-semibold'>
                  <h1>Expression du Besoin N° {expressionbesoin.id}</h1>
                  <h1>Service: {expressionbesoin.service.nom_responsabiliter}</h1>
                  <h1>Description: {expressionbesoin.description}</h1>
                </div>
                <div className='mt-7 mb-6  flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto'>
                  {expressionbesoin.status !== 'validé' &&  auth.user.role ==='service' && (
                    <button
                      onClick={() => openModal('add')}
                      className='bg-emerald-500 py-2 px-4 text-white rounded shadow transition-all hover:bg-emerald-600 w-full sm:w-auto flex items-center justify-center'
                    >
                      <FontAwesomeIcon icon={faPlus} /> Ajouter
                    </button>
                  )}
                  <a
                    href={route('export-detailexpbesoin',{id_expbesoin: id_expbesoin})}

                    className="bg-emerald-500 py-2 px-4 text-white rounded shadow transition-all hover:bg-emerald-600 w-full sm:w-auto flex items-center justify-center"
                  >
                    <FontAwesomeIcon icon={faFileExcel} /> Excel
                  </a>

                  {expressionbesoin.status !== 'validé'  && auth.user.role === 'admin' && (
                    <a
                      href={route('valider', { id_expbesoin: id_expbesoin })}
                      className='bg-emerald-500  px-4 text-white rounded shadow transition-all w-full sm:w-auto hover:bg-emerald-600 flex items-center justify-center'
                    >
                      Valider
                    </a>
                  )}
                  <a
                    href={route('pdf-DetailsExpbesoin', { id_expbesoin: id_expbesoin })}
                    className='bg-emerald-500 py-2 px-4 text-white rounded shadow transition-all w-full sm:w-auto hover:bg-emerald-600 flex items-center justify-center'
                  >
                    <FontAwesomeIcon icon={faFilePdf} className="mr-2" /> PDF
                  </a>
                </div>
              </div>
              <div className='overflow-x-auto'>
                <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                  <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500'>
                    <tr className='text-nowrap'>
                      <th className='px-3 py-3 cursor-pointer' onClick={() => requestSort('id')}>
                        ID <FontAwesomeIcon icon={faSort} />
                      </th>
                      <th className='px-3 py-3 cursor-pointer' onClick={() => requestSort('id_categorie')}>
                        Catégorie <FontAwesomeIcon icon={faSort} />
                      </th>
                      <th className='px-3 py-3 cursor-pointer' onClick={() => requestSort('id_catproduit')}>
                        Produit <FontAwesomeIcon icon={faSort} />
                      </th>
                      <th className='px-3 py-3 cursor-pointer' onClick={() => requestSort('quantite')}>
                        Quantité <FontAwesomeIcon icon={faSort} />
                      </th>
                      { expressionbesoin.status !== 'validé' &&  auth.user.role ==='service' && (<th className='px-3 py-3 text-right'>Action</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {sortedDetails.map((detailsexpresionbesoin) => (
                      <tr key={detailsexpresionbesoin.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                        <td className='px-3 py-2'>{detailsexpresionbesoin.id}</td>
                        <td className='px-3 py-2'>{detailsexpresionbesoin.produit.type.type}</td>
                        <td className='px-3 py-2'>{detailsexpresionbesoin.produit.designation}</td>
                        <td className='px-3 py-2'>{detailsexpresionbesoin.quantite}</td>
                        {expressionbesoin.status !== 'validé' &&  auth.user.role ==='service' && (<td className='px-3 py-2 text-nowrap'>
                          <button
                            onClick={() => openModal('edit', detailsexpresionbesoin)}
                            className='text-blue-600 dark:text-blue-500 mx-1'
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                          <button
                            onClick={() => deleteDetailsexpresionbesoin(detailsexpresionbesoin)}
                            className='text-red-600 dark:text-red-500 mx-1'
                          >
                            <FontAwesomeIcon icon={faTrashAlt} />
                          </button>
                        </td>)}
                      </tr>

                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center'>
          <div className='relative mx-auto p-5 border w-full sm:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white dark:bg-gray-800'>
            <form onSubmit={handleFormSubmit} className='p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg'>
              <div className='mt-4'>
                <InputLabel htmlFor='id_categorie' value='Catégorie' />
                <select
                  name="id_categorie"
                  id="id_categorie"

                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setData('produit', '');
                  }}
                  className="mt-1 block w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="" className="text-gray-500">Sélectionner une catégorie</option>
                  {categories.data.map((category) => (
                    <option key={category.id} value={category.id} className="text-gray-800 dark:text-gray-200">
                      {category.type}
                    </option>
                  ))}
                </select>
                {validationErrors.id_categorie && (
                  <div className='text-red-500 mt-2'>{validationErrors.id_categorie}</div>
                )}
                <InputError message={errors.type} className='mt-2' />
              </div>

              <div className='mt-4'>
                <InputLabel htmlFor='id_catproduit' value='Produit' />
                <select
                  name="id_catproduit"
                  id="id_catproduit"
                  value={data.produit}
                  onChange={(e) => setData('produit', e.target.value)}
                  className="mt-1 block w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="" className="text-gray-500">Sélectionner un produit</option>
                  {filteredProducts.map((product) => (
                    <option key={product.id} value={product.id} className="text-gray-800 dark:text-gray-200">
                      {product.designation}
                    </option>
                  ))}
                </select>
                {validationErrors.produit && (
                  <div className='text-red-500 mt-2'>{validationErrors.produit}</div>
                )}
                <InputError message={errors.produit} className='mt-2' />
              </div>

              <div className='mt-4'>
                <InputLabel htmlFor='quantite' value='Quantité' />
                <TextInput
                  type="number"
                  name="quantite"
                  id="quantite"
                  value={data.quantite}
                  className="mt-1 block w-full"
                  onChange={handleQuantityChange}
                />
                {validationErrors.quantite && (
                  <div className='text-red-500 mt-2'>{validationErrors.quantite}</div>
                )}
                <InputError message={errors.quantite} className='mt-2' />
              </div>

              <div className='mt-4 text-right flex flex-row'>
                <button
                  type='button'
                  onClick={closeModal}
                  className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2'
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-emerald-500 py-2 px-4 text-white rounded shadow transition-all hover:bg-emerald-600 w-full sm:w-auto"
                >
                  {modalMode === 'add' ? 'Ajouter' : 'Sauvegarder'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AuthenticatedLayout>
  );
}

export default Index_par_expbesoin;
