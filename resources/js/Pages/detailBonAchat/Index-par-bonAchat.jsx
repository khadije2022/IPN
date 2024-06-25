import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState, useEffect } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import SelectInput from '@/Components/SelectInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faPlus, faFileExcel, faFilePdf, faSort } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Index_par_expbesoin({
  auth,
  detailBonAchats = { data: [] },
  expressionbesoin,
  Status,
  bonAchat,
  BonAchat,
  success,
  valider,
  categories,
  produits
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [currentDetail, setCurrentDetail] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [successMessage, setSuccessMessage] = useState(success);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
  const [validationErrors, setValidationErrors] = useState({});
// console.log(categories.data)
  useEffect(() => {
    if (success) {
      setSuccessMessage(success);
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  useEffect(() => {
    if (valider) {
      toast.success(valider);
    }
  }, [valider]);

  useEffect(() => {
    if (selectedCategory && produits?.data) {
      const filtered = produits.data.filter(product => product.type.id === parseInt(selectedCategory));
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [selectedCategory, produits]);

  const { data, setData, post, put, errors, reset } = useForm({
    quantite: "",
    produit: "",
    idBonAchat: bonAchat
  });

  const openModal = (mode, detail = null) => {
    setModalMode(mode);
    setCurrentDetail(detail);
    if (mode === 'edit' && detail) {
      setData({
        produit: detail.produit.id || "",
        idBonAchat: detail.idBonAchat.id || "",
        quantite: detail.quantite || "",
      });
      setSelectedCategory(detail.produit.type.id);
    } else {
      setData({
        quantite: "",
        produit: "",
        idBonAchat: bonAchat
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
    const routeName = modalMode === 'add' ? 'detailBonAchat.store' : 'detailBonAchat.update';
    const action = modalMode === 'add' ? post : put;

    action(route(routeName, currentDetail ? currentDetail.id : null), {
      onSuccess: () => closeModal(),
    });
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    setData('quantite', value >= 0 ? value : '');
  };

  const deleteDetailsexpresionbesoin = (detailBonAchat) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce projet?')) {
      return;
    }
    router.delete(route('detailBonAchat.destroy', detailBonAchat.id));
  };

  const sortedData = [...detailBonAchats.data].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  console.log(produits)
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className='flex justify-between items-center'>
          <h2 className='font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight'>
            Détail Bon d'achat
          </h2>
        </div>
      }
    >
      <Head title="BonAchat" />

      <div className='py-12'>
        <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
          <ToastContainer />
          {successMessage && (
            <div className='bg-emerald-400 py-2 px-4 rounded mb-4'>
              {successMessage}
            </div>
          )}
          <div className='bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg'>
            <div className='p-6 text-gray-900 dark:text-gray-100'>
              <div className='flex flex-col sm:flex-row justify-between mb-4'>
                <div>
                  <h1 className='font-semibold text-lg'>Bon Sortie N° {BonAchat.id}</h1>
                  <h1>Description: {BonAchat.description}</h1>
                </div>
                <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
                  <a href={route('export-Details_bonAchat')}
                    className="bg-emerald-500 py-2 px-4 text-white rounded shadow transition-all hover:bg-emerald-600 w-full sm:w-auto"
                  ><FontAwesomeIcon icon={faFileExcel} /> Excel
                  </a>
                  {Status === 'non-validé' &&

                      (<button
                        onClick={() => openModal('add')}
                        className='bg-emerald-500 py-2 px-4 text-white rounded shadow transition-all hover:bg-emerald-600 w-full sm:w-auto'
                      >
                        <FontAwesomeIcon icon={faPlus} /> Ajouter
                      </button>)
}
                     { Status === 'non-validé' && auth.user.role === 'admin' &&( <a
                        href={route('bonAchat.valider', { bonAchat: bonAchat })}
                        className='bg-emerald-500 py-2 px-4 text-white rounded shadow transition-all hover:bg-emerald-600 w-full sm:w-auto'
                      >
                        Valider
                      </a>)}


                  {Status === 'validé' && (
                    <a
                      href={route('bonAchat.modify', { bonAchat: bonAchat })}
                      className='bg-emerald-500 py-2 px-4 text-white rounded shadow transition-all hover:bg-emerald-600 w-full sm:w-auto'
                    >
                      Modifier
                    </a>
                  )}
                  <a
                    href={route('pdf-DetailsBonAchat', { bonAchat: bonAchat })}
                    className='bg-emerald-500 py-2 px-4 text-white rounded shadow transition-all hover:bg-emerald-600 w-full sm:w-auto'
                  >
                    <FontAwesomeIcon icon={faFilePdf} className="mr-2" /> PDF
                  </a>
                </div>
              </div>

              <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500'>
                  <tr className='text-nowrap'>
                    <th className='px-3 py-3'>
                      ID
                      <button onClick={() => requestSort('id')}>
                        <FontAwesomeIcon icon={faSort} className="ml-1" />
                      </button>
                    </th>
                    <th className='px-3 py-3'>
                      Produits
                      <button onClick={() => requestSort('produit.designation')}>
                        <FontAwesomeIcon icon={faSort} className="ml-1" />
                      </button>
                    </th>
                    <th className='px-3 py-3'>
                      Catégorie
                      <button onClick={() => requestSort('produit.type.type')}>
                        <FontAwesomeIcon icon={faSort} className="ml-1" />
                      </button>
                    </th>
                    <th className='px-3 py-3'>
                      Quantité
                      <button onClick={() => requestSort('quantite')}>
                        <FontAwesomeIcon icon={faSort} className="ml-1" />
                      </button>
                    </th>
                    {Status === 'non-validé' && (<th className='px-3 py-3 text-right'>Action</th>)}
                  </tr>
                </thead>
                <tbody>
                  {sortedData.map((detailBonAchat) => (
                    <tr key={detailBonAchat.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                      <td className='px-3 py-2'>{detailBonAchat.id}</td>
                      <td className='px-3 py-2'>{detailBonAchat.produit.designation}</td>
                      <td className='px-3 py-2'>{detailBonAchat.produit.type.type}</td>
                      <td className='px-3 py-2'>{detailBonAchat.quantite}</td>
                      {Status === 'non-validé' && (
                        <td className='px-3 py-2 text-nowrap'>
                          <button
                            onClick={() => openModal('edit', detailBonAchat)}
                            className='font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1'
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                          <button
                            onClick={() => deleteDetailsexpresionbesoin(detailBonAchat)}
                            className='font-medium text-red-600 dark:text-red-500 hover:underline mx-1'
                          >
                            <FontAwesomeIcon icon={faTrashAlt} />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full' onClick={closeModal}>
          <div className='relative top-20 mx-auto p-5 border w-11/12 sm:w-96 shadow-lg rounded-md bg-white dark:bg-gray-800' onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleFormSubmit} className='p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg'>
              <div className='mt-4'>
                <InputLabel htmlFor='type' value='Catégorie Type' />
                <SelectInput
                  name="type"
                  id="type"
                  className="mt-1 block w-full"
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setData('produit', ''); // Reset produit when category changes
                  }}
                >
                  <option value=''>Sélectionner une option</option>
                  {categories && categories.data && categories.data.map((categorie) => (
                    <option key={categorie.id} value={categorie.id}>{categorie.type}</option>
                  ))}
                </SelectInput>
                <InputError message={errors.type} className='mt-2' />
              </div>
              <div className='mt-4'>
                <InputLabel htmlFor='produit' value='Produit' />
                <SelectInput
                  name="produit"
                  id="produit"
                  value={data.produit}
                  className="mt-1 block w-full"
                  onChange={(e) => setData('produit', e.target.value)}
                >

                  <option value=''>Sélectionner un produit</option>
                  {filteredProducts.map((product) => (
                    <option key={product.id} value={product.id} >{product.designation}</option>
                  ))}
                </SelectInput>
                <InputError message={validationErrors.produit || errors.produit} className='mt-2' />
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
                <InputError message={validationErrors.quantite || errors.quantite} className='mt-2' />
              </div>

              <div className='mt-4'>
                <InputLabel htmlFor='prix' value='Estimation prix' />
                <TextInput
                  type="number"
                  name="prix"
                  id="prix"
                  value={data.prix}
                  className="mt-1 block w-full"
                  onChange={(e) => setData('prix', e.target.value)}
                />
                <InputError message={validationErrors.prix || errors.prix} className='mt-2' />
              </div>

              <div className='mt-4 text-right'>
                <button
                  type='button'
                  onClick={closeModal}
                  className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2'
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-emerald-500 py-2 px-4 text-white rounded shadow transition-all hover:bg-emerald-600"
                >
                  {modalMode === 'add' ? 'Ajouter' : 'Enregistrer'}
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
