// import React from 'react'
// import Pagination from "@/Components/Pagination";
// import TextInput from "@/Components/TextInput";
// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
// import { Head, Link, router } from "@inertiajs/react";
// import {ChevronUpIcon , ChevronDownIcon } from '@heroicons/react/16/solid';

// export default function Index({auth , magasins , queryParams = null , success}){
//     const suprimerMagasin = (magasin) =>{
//         if(!confirm('Vous voulez supprimer votre magasin : ' +' ' + magasin.nomMagasin)){
//             return;
//         }
//            dd(magasin);
//            router.delete(route('magasin.destroy', magasin.id))
//     }
//     queryParams = queryParams || {}
//     const serachfieldChanged = (name , value )=>{
//        if(value){
//         queryParams[name] = value
//        }else{
//         delete queryParams[name]
//        }
//        router.get(route('magasin.index') , queryParams)
//     }

//     const onKeyPress = (name , value)=>{
//       if(e.k !== 'Enter') return ;

//       serachfieldChanged(e.target.value)
//     }
//     const sortChanged = (name) => {
//       if (name === queryParams.sort_field) {
//         if (queryParams.sort_direction === "asc") {
//           queryParams.sort_direction = "desc";
//         } else {
//           queryParams.sort_direction = "asc";
//         }
//       } else {
//         queryParams.sort_field = name;
//         queryParams.sort_direction = "asc";
//       }
//       router.get(route("magasin.index"), queryParams);
//     };
//     return(
// <<<<<<< HEAD
//         <AuthenticatedLayout   user={auth.user}
//         header={
//             <div className='flex justify-between items-center'>
//               <h2 className='font-semibold text-xl text-gray-800
//               dark:text-gray-200 leading-tight'>
//                   Mouvments Stock
//               </h2>
//               <Link href={route('magasin.create')} className='bg-emerald-500 py-1 px-3 text-white rounded
//               shadow transition-all hover:bg-emerald-600'>

//               </Link>
//             </div>
//           }    >
//         <Head title="magasins" />


//                     <div className="py-12">
//                 <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
//                     <div className="bg-white dark:bg-gray-800 overflow-hidmagasinden shadow-sm sm:rounded-lg">
//                         <div className="p-6 text-gray-900 dark:text-gray-100">
//                         <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//                             <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
//                               <tr className='text-nowrap'>
//                                 <th className='px-3 py-3'>description</th>
//                                <th className='px-3 py-3'>qte</th>
//                                <th className='px-3 py-3'>type mouvments</th>
//                                <th className='px-3 py-3  text-wrap'>Action</th>
//                               </tr>
//                             </thead>
//                             {/* <tbody> */}
//                               {/* {magasins.data.map((magasin)=> */}
//                                 <tr  className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
//                                   <td className='px-3 py-2' >pour les feuilles du bac</td>
//                                   <td className='px-3 py-2'>7</td>
//                                   <td className='px-3 py-2'>sortie</td>


//                                   <td className='px-3 py-2 text-nowrap'>
//                                     <Link
//                                       // href={route("magasin.edit", magasin.idmagasin)}
// =======
//     <AuthenticatedLayout
//             user={auth.user}
//             header={
//         <div className="flex justify-between items-center">
//           <h2 className="font-semibold text-xl text-gray-800
//           dark:text-gray-200 leading-tight">
//             Magasins
//           </h2>
//           <Link
//             href={route("magasin.create")}
//             className="bg-emerald-500 py-1 px-3 text-white
//             rounded shadow transition-all hover:bg-emerald-600"
//           >
//             Ajouter
//           </Link>
//         </div>
//                 }
//        >
//          <Head title="Magasin" />
//          {success && (
//             <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
//               {success}
//             </div>
//           )}
//          <div className=""></div>
// <div className="py-12">
//     <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
//         <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
//             <div className="p-6 text-gray-900 dark:text-gray-100">
//                 <div className="overflow-auto">
//                    <table className="w-full-text-sm text-left rtl:text-right
//                             text-gray-500 dark:text-gray-400">
//                                 <thead className="text-xs text-gray-700 uppercase
//                                 bg-gray-50 dark:bg-gray-700 dark:text-gray-400
//                                 border-b-2 border-gray-500">
//                                     <tr className="text-nowrap">
//                                         <th onClick={e=>sortChanged('id')} className="px-3 py-3 flex items-center justify-betwee gap-1">
//                                           <div className="p-x py-3 flex items-center justify-betwee gap-1 cursor-pointer">ID
//                                           <div><ChevronUpIcon className={'w-4'
//                                             + (queryParams.sort_field === 'id' &&
//                                               queryParams.sort_direction === 'asc' ? 'text-white' : '')
//                                           }/>
//                                          <ChevronDownIcon className={'w-4 -mt-2'
//                                             + (queryParams.sort_field === 'nomMagasin' &&
//                                               queryParams.sort_direction === 'desc' ? 'text-white' : '')
//                                           }/>
//                                          </div></div>
//                                         </th>
//                                         <th onClick={e=>sortChanged('nomMagasin')} className="px-3 py-3 ">
//                                           <div className="p-x py-3 flex items-center justify-betwee gap-1">Nom
//                                           <div><ChevronUpIcon className='w-4'/>
//                                          <ChevronDownIcon className="w-4 -mt-2 "/>
//                                          </div>
//                                           </div>
//                                         </th>
//                                         <th  className="px-3 py-3 text-right">Action</th>
//                                     </tr>
//                                 </thead>
//                                 <thead className="text-xs text-gray-700 uppercase
//                                 bg-gray-50 dark:bg-gray-700 dark:text-gray-400
//                                 border-b-2 border-gray-500">
//                                     <tr className="text-nowrap">
//                                         <th className="px-3 py-3">
//                                         </th>
//                                         <th className="px-3 py-3 ">
//                                           <TextInput  className="w-full"
//                                           defaultValue={queryParams.name}
//                                           placeholder="Nom de magasin"
//                                           onBlur={(e) =>
//                                             serachfieldChanged("nomMagasin", e.target.value)
//                                           }
//                                           onKeyPress={(e) => onKeyPress("nomMagasin", e)}
//                                           />
//                                         </th>
//                                         <th  className="px-3 py-3 text-right">
//                                         </th>
//                                     </tr>
//                                 </thead>
//                                 <tbody >
//                                     {magasins.data.map((magasin)=>(

//                                         <tr key={magasin.id} className="bg-white border-b dark:bg-gray-800
//                                         dark:border-gray-700">
//                                             <td    className="px-3 py-2 ">{magasin.id}</td>
//                                             <td className="px-3 py-2 ">{magasin.nomMagasin}</td>
//                                         <td  className="px-3 py-2 text-right text-nowrap">
//                                         <Link
//                                       href={route('magasin.create', magasin.id)}
// >>>>>>> 7342363ad9872adf1943780d4edca445c9643aeb
//                                       className='font-medium text-blue-600
//                                       dark:text-blue-500  hover:underline mx-1'
//                                      >
//                                       Modifier
//                                     </Link>
// <<<<<<< HEAD
//                                     <Link
//                                       // href={route("magasin.edit", magasin.idmagasin)}
//                                       className='font-medium text-blue-600
//                                       dark:text-blue-500  hover:underline mx-1'
//                                      >
//                                       detaille
//                                     </Link>


// =======
// >>>>>>> 7342363ad9872adf1943780d4edca445c9643aeb
//                                     <button
//                                     onClick={(e) => suprimerMagasin(magasin)}
//                                       className='font-medium text-red-600
//                                       dark:text-red-500  hover:underline mx-1'
//                                      >
//                                       Supprimer
//                                     </button>
// <<<<<<< HEAD
//                                   </td>
//                                 </tr>
//                                 <tr  className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
//                                   <td className='px-3 py-2' >ram de paquets</td>
//                                   <td className='px-3 py-2'>4</td>
//                                   <td className='px-3 py-2'>achat</td>


//                                   <td className='px-3 py-2 text-nowrap'>
//                                     <Link
//                                       // href={route("magasin.edit", magasin.idmagasin)}
//                                       className='font-medium text-blue-600
//                                       dark:text-blue-500  hover:underline mx-1'
//                                      >
//                                       Edit
//                                     </Link>
//                                     <Link
//                                       // href={route("magasin.edit", magasin.idmagasin)}
//                                       className='font-medium text-blue-600
//                                       dark:text-blue-500  hover:underline mx-1'
//                                      >
//                                       detaille
//                                     </Link>


//                                     <button
//                                     onClick={ (e) => deletemagasin(magasin)}
//                                       className='font-medium text-red-600
//                                       dark:text-red-500 hover:underline mx-1'
//                                     >
//                                       Delete
//                                     </button>
//                                   </td>
//                                 </tr>



//                             </tbody>
//                           </table>

//                         <Pagination links={magasins.meta.links}/>
//                         </div>
//                     </div>
// =======
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
// >>>>>>> 7342363ad9872adf1943780d4edca445c9643aeb
//                 </div>
//                             <Pagination links={magasins.meta.links} />

//             </div>
//         </div>
//     </div>
// </div>
//     </AuthenticatedLayout>
//     )
// }
