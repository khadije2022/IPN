import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import Pagination from '@/Components/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faPlus, faFilePdf } from '@fortawesome/free-solid-svg-icons';

function Index_par_expbesoin({
  auth,
  detailsexpresionbesoins = { data: [] },
  expressionbesoin,
  id_expbesoin,
  success,
  categories = [],
  catelogue_produits = [],
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [currentDetail, setCurrentDetail] = useState(null);

  const { data, setData, post, put, errors } = useForm({
    id_expbesoin: id_expbesoin,
    id_categorie: "",
    id_catproduit: "",
    quantite: "",
  });

  const openModal = (mode, detail = null) => {
    setModalMode(mode);
    setCurrentDetail(detail);
    if (mode === 'edit' && detail) {
      setData({
        id_expbesoin: detail.id_expbesoin,
        id_categorie: detail.id_categorie,
        id_catproduit: detail.id_catproduit,
        quantite: detail.quantite,
      });
    } else {
      setData({
        id_expbesoin: id_expbesoin,
        id_categorie: "",
        id_catproduit: "",
        quantite: "",
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentDetail(null);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (data.quantite <= 0) {
      alert('La quantité doit être un nombre positif.');
      return;
    }
    const routeName = modalMode === 'add' ? 'detailsexpresionbesoin.store' : `detailsexpresionbesoin.update`;
    const action = modalMode === 'add' ? post : put;

    action(route(routeName, currentDetail ? currentDetail.id : null));
    closeModal();
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (value >= 0) {
      setData('quantite', value);
    } else {
      alert('La quantité doit être un nombre positif.');
    }
  };

  const deleteDetailsexpresionbesoin = (detailsexpresionbesoin) => {
    if (!confirm('Are you sure you want to delete this project?')) {
      return;
    }
    router.delete(route('detailsexpresionbesoin.destroy', detailsexpresionbesoin.id));
  };

  const getProduitname = (id) => {
    const Produit = catelogue_produits.find((Produit) => Produit.id === id);
    return Produit ? Produit.designation : 'N/A';
  };

  const getcategoriename = (id) => {
    const categorie = categories.find((categorie) => categorie.id === id);
    return categorie ? categorie.type : 'N/A';
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className='flex justify-between items-center'>
          <h2 className='font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight'>
            Expression des Besoins
          </h2>
          <div>

            <a
              href={route('valider', { id_expbesoin: id_expbesoin })}
              className='bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600 mr-2'
            >
              Valider
            </a>
            <a
              href={route('pdf-DetailsExpbesoin', { id_expbesoin: id_expbesoin })}
              className='bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600'
            >
              <FontAwesomeIcon icon={faFilePdf} className="mr-2" />PDF
            </a>
          </div>
        </div>
      }
    >
      <Head title="Expression des Besoins" />

      <div className='py-12'>
        <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
          {success && (
            <div className='bg-emerald-400 py-2 px-4 rounded mb-4'>
              {success}
            </div>
          )}
          <div className='bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg'>
            <div className='p-6 text-gray-900 dark:text-gray-100'>
              <div className='flex justify-between'>
                <div className='font-semibold'>
                  <h1>Expression du Besoin N° {expressionbesoin.id}</h1>
                  <h1>Nom de Responsabilité: {expressionbesoin.service.nom_responsabiliter}</h1>
                  <h1>Description: {expressionbesoin.description}</h1>
                  <h1 className='text-red-600'>pour Ajouter il faut cliquer sur le button en face et remplie les champs</h1>
                </div>
                <div>
                  <button
                    onClick={() => openModal('add')}
                    className='bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600 mr-2'
                  >
                    <FontAwesomeIcon icon={faPlus} /> Ajouter
                  </button>
                </div>
              </div>
              <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500'>
                  <tr className='text-nowrap'>
                    <th className='px-3 py-3'>ID</th>
                    <th className='px-3 py-3'>Catégorie</th>
                    <th className='px-3 py-3'>Produit</th>
                    <th className='px-3 py-3'>Quantité</th>
                    <th className='px-3 py-3 text-right'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {detailsexpresionbesoins.data.map((detailsexpresionbesoin) => (
                    <tr key={detailsexpresionbesoin.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                      <td className='px-3 py-2'>{detailsexpresionbesoin.id}</td>
                      <td className='px-3 py-2'>{getcategoriename(detailsexpresionbesoin.id_categorie)}</td>
                      <td className='px-3 py-2'>{getProduitname(detailsexpresionbesoin.id_catproduit)}</td>
                      <td className='px-3 py-2'>{detailsexpresionbesoin.quantite}</td>
                      <td className='px-3 py-2 text-nowrap'>
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full'>
          <div className='relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white'>
            <form onSubmit={handleFormSubmit} className='p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg'>
              <div className='mt-4'>
                <InputLabel htmlFor='id_categorie' value='Catégorie' />
                <select
                  name="id_categorie"
                  id="id_categorie"
                  value={data.id_categorie}
                  onChange={(e) => setData('id_categorie', e.target.value)}
                  className="mt-1 block w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="" className="text-gray-500">Sélectionner une catégorie</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id} className="text-gray-800 dark:text-gray-200">
                      {category.type}
                    </option>
                  ))}
                </select>
                <InputError message={errors.id_categorie} className='mt-2' />
              </div>

              <div className='mt-4'>
                <InputLabel htmlFor='id_catproduit' value='Produit' />
                <select
                  name="id_catproduit"
                  id="id_catproduit"
                  value={data.id_catproduit}
                  onChange={(e) => setData('id_catproduit', e.target.value)}
                  className="mt-1 block w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="" className="text-gray-500">Sélectionner un produit</option>
                  {catelogue_produits.map((productCategory) => (
                    <option key={productCategory.id} value={productCategory.id} className="text-gray-800 dark:text-gray-200">
                      {productCategory.designation}
                    </option>
                  ))}
                </select>
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
                  onChange={handleQuantityChange}
                />
                <InputError message={errors.quantite} className='mt-2' />
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
                  className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
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
