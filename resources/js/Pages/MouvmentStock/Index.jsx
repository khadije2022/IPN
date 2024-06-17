// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
// import React, { useState, useEffect } from 'react';
// import { Head, Link, router, useForm } from '@inertiajs/react';
// import InputLabel from '@/Components/InputLabel';
// import TextInput from '@/Components/TextInput';
// import SelectInput from '@/Components/SelectInput';
// import InputError from '@/Components/InputError';

// export default function Index({ auth, categories, produits, mouvmentStocks, bonSortie, success }) {
//   const { data, setData, post, put, errors } = useForm({
//     quantite: "",
//     produit: "",
//     idBonDeSortieAchats: bonSortie
//   });

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalMode, setModalMode] = useState('add'); // 'add' ou 'edit'
//   const [currentMouvmentStock, setCurrentMouvmentStock] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [filteredProducts, setFilteredProducts] = useState([]);

//   useEffect(() => {
//     if (selectedCategory && produits?.data) {
//       const filtered = produits.data.filter(product => product.type.id === parseInt(selectedCategory));
//       setFilteredProducts(filtered);
//     } else {
//       setFilteredProducts([]);
//     }
//   }, [selectedCategory, produits]);

//   const openModal = (mode, mouvmentStock = null) => {
//     setModalMode(mode);
//     setCurrentMouvmentStock(mouvmentStock);
//     if (mode === 'edit' && mouvmentStock) {
//       setData({
//         quantite: mouvmentStock.quantite,
//         id_produit: mouvmentStock.id_produit,
//         idBonDeSortieAchats: mouvmentStock.idBonDeSortieAchats
//       });
//     } else {
//       setData({
//         quantite: "",
//         id_produit: "",
//         idBonDeSortieAchats: bonSortie
//       });
//     }
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setCurrentMouvmentStock(null);
//   };

//   const handleFormSubmit = (event) => {
//     event.preventDefault();
//     const routeName = modalMode === 'add' ? 'mouvmentStock.store' : 'mouvmentStock.update';
//     const action = modalMode === 'add' ? post : put;

//     action(route(routeName, currentMouvmentStock ? currentMouvmentStock.id : null));
//     closeModal();
//   };

//   const deleteProduit = (mouvmentStock) => {
//     if (!confirm('Are you sure you want to delete this project?')) {
//       return;
//     }
//     router.delete(route('mouvmentStock.destroy', mouvmentStock.id));
//   };

//   const handleFinalize = () => {
//     router.post(route('mouvmentStock.finalize', { idBonDeSortieAchats: bonSortie.id }));
//   };

//   return (
//     <AuthenticatedLayout
//       user={auth.user}
//       header={
//         <div className='flex justify-between items-center'>
//           <h2 className='font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight'>
//             Mouvment Stocks
//           </h2>
//           <button
//             onClick={() => openModal('add')}
//             className='bg-emerald-500 py-2 px-4 text-white rounded shadow transition-all hover:bg-emerald-600'
//           >
//             Ajouter
//           </button>
//         </div>
//       }
//     >
//       <Head title="Mouvment Stocks" />
//       <div className="py-12">
//         <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
//           {success && (<div className='bg-emerald-400 py-2 px-4 rounded mb-4'>{success}</div>)}
//           <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
//             <div className="p-6 text-gray-900 dark:text-gray-100">
//               <div className='overflow-auto'>
//                 <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//                   <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
//                     <tr className='text-nowrap'>
//                     <th className='px-3 py-3'>ID</th>

//                       <th className='px-3 py-3'>Produits</th>
//                       <th className='px-3 py-3'>Categorie</th>
//                       <th className='px-3 py-3'>Qte</th>
//                       <th className='px-3 py-3 text-right'>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>

//                     {mouvmentStocks && mouvmentStocks.data  && mouvmentStocks.data.map((mouvmentStock) =>
//                       <tr key={mouvmentStock.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
//                         <td className='px-3 py-2'>{mouvmentStock.id}</td>
//                         <td className='px-3 py-2'>{mouvmentStock.produit.designation}</td>
//                         <td className='px-3 py-2'>{mouvmentStock.produit.type.type}</td>
//                     {mouvmentStocks && mouvmentStocks.map((mouvmentStock) =>
//                       <tr key={mouvmentStock.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
//                         <td className='px-3 py-2'>{mouvmentStock.id_produit}</td>
//                         <td className='px-3 py-2'>{mouvmentStock.idBonDeSortieAchats}</td>
//                         <td className='px-3 py-2'>{mouvmentStock.quantite}</td>
//                         <td className='px-3 py-2 text-nowrap'>
//                           <button
//                             onClick={() => openModal('edit', mouvmentStock)}
//                             className='font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1'
//                           >
//                             Modifier
//                           </button>
//                           <button
//                             onClick={() => deleteProduit(mouvmentStock)}
//                             className='font-medium text-red-600 dark:text-red-500 hover:underline mx-1'
//                           >
//                             Suprimer
//                           </button>
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//                 <form className='p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg' onSubmit={handleSubmit}>
//                   <div>
//                     <div className='mt-4'>
//                       <InputLabel htmlFor='type' value='Categorie Type' />
//                       <SelectInput
//                         name="type"
//                         id="type"
//                         className="mt-1 block w-full"
//                         onChange={(e) => {
//                           setSelectedCategory(e.target.value);
//                           setData('produit', ''); // Reset produit when category changes
//                         }}
//                       >
//                         <option value="">Select option</option>
//                         {categories && categories.data && categories.data.map((categorie) => (
//                           <option key={categorie.id} value={categorie.id}>{categorie.type}</option>
//                         ))}
//                       </SelectInput>
//                       <InputError message={errors.type} className='mt-2' />
//                     </div>

//                     <div className='mt-4'>
//                       <InputLabel htmlFor='produit' value='Produit' />
//                       <SelectInput
//                         name="produit"
//                         id="produit"
//                         value={data.produit}
//                         className="mt-1 block w-full"
//                         onChange={(e) => setData('produit', e.target.value)}
//                       >
//                         <option value="">Select Product</option>
//                         {filteredProducts.map((product) => (
//                           <option key={product.id} value={product.id}>{product.designation}</option>
//                         ))}
//                       </SelectInput>
//                       <InputError message={errors.produit} className='mt-2' />
//                     </div>

//                     <div className='mt-4'>
//                       <InputLabel htmlFor='quantite' value='Quantité' />
//                       <TextInput
//                         type="number"
//                         name="quantite"
//                         id="quantite"
//                         value={data.quantite}
//                         className="mt-1 block w-full"
//                         onChange={(e) => setData('quantite', e.target.value)}
//                       />
//                       <InputError message={errors.quantite} className='mt-2' />
//                     </div>

//                     <div className='mt-4 text-right'>
//                       <button type="submit" className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600" onClick={handleSubmit}>
//                         Submit
//                       </button>
//                       <button type="button" className="bg-blue-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-blue-600 ml-2" onClick={handleFinalize}>
//                         Valider
//                       </button>
//                     </div>
//                   </div>
//                 </form>

//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {isModalOpen && (
//         <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full'>
//           <div className='relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white'>
//             <form onSubmit={handleFormSubmit} className='p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg'>
//               <div className='mt-4'>
//                 <InputLabel htmlFor='type' value='Categorie Type' />
//                 <SelectInput
//                   name="type"
//                   id="type"
//                   className="mt-1 block w-full"
//                   onChange={(e) => {
//                     setSelectedCategory(e.target.value);
//                     setData('id_produit', ''); // Reset produit when category changes
//                   }}
//                 >
//                   <option value="">Select option</option>
//                   {categories && categories.data && categories.data.map((categorie) => (
//                     <option key={categorie.id} value={categorie.id}>{categorie.type}</option>
//                   ))}
//                 </SelectInput>
//                 <InputError message={errors.type} className='mt-2' />
//               </div>

//               <div className='mt-4'>
//                 <InputLabel htmlFor='produit' value='Produit' />
//                 <SelectInput
//                   name="id_produit"
//                   id="produit"
//                   value={data.id_produit}
//                   className="mt-1 block w-full"
//                   onChange={(e) => setData('id_produit', e.target.value)}
//                 >
//                   <option value="">Select Product</option>
//                   {filteredProducts.map((product) => (
//                     <option key={product.id} value={product.id}>{product.designation}</option>
//                   ))}
//                 </SelectInput>
//                 <InputError message={errors.id_produit} className='mt-2' />
//               </div>

//               <div className='mt-4'>
//                 <InputLabel htmlFor='quantite' value='Quantité' />
//                 <TextInput
//                   type="number"
//                   name="quantite"
//                   id="quantite"
//                   value={data.quantite}
//                   className="mt-1 block w-full"
//                   onChange={(e) => setData('quantite', e.target.value)}
//                 />
//                 <InputError message={errors.quantite} className='mt-2' />
//               </div>

//               <div className='mt-4 text-right'>
//                 <button
//                   type='button'
//                   onClick={closeModal}
//                   className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2'
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="bg-emerald-500 py-2 px-4 text-white rounded shadow transition-all hover:bg-emerald-600"
//                 >
//                   {modalMode === 'add' ? 'Add' : 'Save'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </AuthenticatedLayout>
//   );
// }
