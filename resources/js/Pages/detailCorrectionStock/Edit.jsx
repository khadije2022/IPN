import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head , useForm } from '@inertiajs/react'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import TextInputArea from '@/Components/TextInputArea'
import InputError from '@/Components/InputError'
import SelectInput from '@/Components/SelectInput'
import {Link} from '@inertiajs/react'

export default function Edit({auth , detailBonAchat ,categories , produits }) {
  const {data , setData , put,errors} = useForm({
    produit: detailBonAchat.produit || "",
    idBonDeSortieAchats: detailBonAchat.idBonAchat || "",
    quantite: detailBonAchat.quantite || "",
    prix: detailBonAchat.prix || "",
  })
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (selectedCategory && produits?.data) {
      const filtered = produits.data.filter(product => product.type.id === parseInt(selectedCategory));
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [selectedCategory, produits]);


  const onSubmit = (e) =>{
    e.preventDefault();
    put(route('detailBonAchat.update',[detailBonAchat.id, { bonAchat: detailBonAchat.idBonAchat }]))
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className='flex justify-between items-center'>
          <h2 className='font-semibold text-xl text-gray-800
          dark:text-gray-200 leading-tight'>
              Edit
          </h2>
        </div>
      }
      >
         <Head title="details"/>

<div className="py-12">
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">

            <form className='p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg' onSubmit={onSubmit}>
                  <div>
                    <div className='mt-4'>
                      <InputLabel htmlFor='type' value='Categorie Type' />
                      <SelectInput
                        name="type"
                        id="type"
                        className="mt-1 block w-full"
                        value = {data.produit}
                        onChange={(e) => {
                          setSelectedCategory(e.target.value);
                          setData('produit', ''); // Reset produit when category changes
                        }}
                      >
                        <option value="">Select option</option>
                        {categories && categories.data && categories.data.map((categorie) => (
                          <option key={categorie.id} value={categorie.id}>{categorie.type}</option>
                        ))}
                      </SelectInput>
                      <InputError message={errors.type} className='mt-2' />
                    </div>
                    {JSON.stringify(detailBonAchat.idBonAchat)}
                    <div className='mt-4'>
                      <InputLabel htmlFor='produit' value='Produit' />
                      <SelectInput
                        name="produit"
                        id="produit"
                        value={data.produit}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('produit', e.target.value)}
                      >
                        <option value="">Select Product</option>
                        {filteredProducts.map((product) => (
                          <option key={product.id} value={product.id}>{product.designation}</option>
                        ))}
                      </SelectInput>
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
                      <Link href={route('detailBonAchat.index')}
                  className=" py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                  >
                    Cancel
                  </Link>
                      <button type="submit" className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
            </div>
        </div>
    </div>
</div>
    </AuthenticatedLayout>
  )
}
