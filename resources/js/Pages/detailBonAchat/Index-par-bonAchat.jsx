import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState , useEffect } from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import Pagination from '@/Components/Pagination';
import SelectInput from '@/Components/SelectInput';

function Index_par_expbesoin({
  auth,
  detailBonAchats = { data: [] },
  expressionbesoin,
  bonAchat,
  success,
  categories ,
  produits
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [currentDetail, setCurrentDetail] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (selectedCategory && produits?.data) {
      const filtered = produits.data.filter(product => product.type === parseInt(selectedCategory));
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [selectedCategory, produits]);

  const { data, setData, post, put, errors } = useForm({
  quantite: "",
  produit: "",
  prix:"",
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
        prix: detail.prix || "",
      });
    } else {
      setData({
        quantite: "",
        produit: "",
        prix:"",
        idBonAchat: bonAchat
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
    const routeName = modalMode === 'add' ? 'detailBonAchat.store' : `detailBonAchat.update`;
    const action = modalMode === 'add' ? post : put;

    action(route(routeName, currentDetail ? currentDetail.id : null));
    closeModal();
  };

  const deleteDetailsexpresionbesoin = (detailBonAchat) => {
    if (!confirm('Are you sure you want to delete this project?')) {
      return;
    }
    router.delete(route('detailBonAchat.destroy', detailBonAchat.id));
  };

  // Debugging: Log the expressionb to ensure it is defined
  console.log('bonAchat:', bonAchat);

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className='flex justify-between items-center'>
          <h2 className='font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight'>
            deatil Expression des Besoins
          </h2>
          <div>
            <button
              onClick={() => openModal('add')}
              className='bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600 mr-2'
            >
              Ajouter nouveau
            </button>
            {/* <a
              href={route('valider', { id_expbesoin: id_expbesoin })}
              className='bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600 mr-2'
            >
              Valider
            </a> */}
            {/* <a
              href={route('pdf-DetailsBonAchat', { idBonAchat: bonAchat })}
              className='bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600'
            >
              z */}
              {/* <FontAwesomeIcon icon={faFilePdf} className="mr-2" />PDF               */}
            {/* </a> */}
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
              <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500'>
                  <tr className='text-nowrap'>
                    <th className='px-3 py-3'>ID</th>
                    <th className='px-3 py-3'>produits</th>
                    <th className='px-3 py-3'>Categorie</th>
                    <th className='px-3 py-3'>Qte</th>
                    <th className='px-3 py-3'>Estimate Prix</th>
                    <th className='px-3 py-3 text-right'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {detailBonAchats.data.map((detailBonAchat) => (
                    <tr key={detailBonAchat.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                      <td className='px-3 py-2'>{detailBonAchat.id}</td>
                      <td className='px-3 py-2'>{detailBonAchat.produit.designation}</td>
                      <td className='px-3 py-2'>{detailBonAchat.produit.type.type}</td>
                      <td className='px-3 py-2'>{detailBonAchat.quantite}</td>
                      <td className='px-3 py-2'>{detailBonAchat.prix}</td>
                      <td className='px-3 py-2 text-nowrap'>
                        <button
                          onClick={() => openModal('edit', detailBonAchat)}
                          className='font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1'
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteDetailsexpresionbesoin(detailBonAchat)}
                          className='font-medium text-red-600 dark:text-red-500 hover:underline mx-1'
                        >
                          Delete
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
                      <InputLabel htmlFor='type' value='Categorie Type' />
                      <SelectInput
                        name="type"
                        id="type"
                        className="mt-1 block w-full"
                        onChange={(e) => {
                          setSelectedCategory(e.target.value);
                          setData('produit', ''); // Reset produit when category changes
                        }}
                      >
                        <option value=''>Select option</option>
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
                        {console.log(filteredProducts)}
                        <option value=''>Select Product</option>
                        {filteredProducts.map((product) => (
                          <option key={product.id} value={product.id}>{product.designation}</option>
                        ))}
                      </SelectInput>
                      <InputError message={errors.produit} className='mt-2' />
                    </div>

              <div className='mt-4'>
                <InputLabel htmlFor='quantite' value='Quantity' />
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
                      <InputError message={errors.prix} className='mt-2' />
                    </div>

              <div className='mt-4 text-right'>
                <button
                  type='button'
                  onClick={closeModal}
                  className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2'
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                >
                  {modalMode === 'add' ? 'Add' : 'Save'}
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
