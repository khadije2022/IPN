import React, { useState, useEffect } from "react";
import { Head, router, useForm ,Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { faEdit, faTrashAlt, faPlus, faFileExcel, faFilePdf, faSort } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function index_par_bonSortie({
  auth,
  detailBonSorties = { data: [] },
  Status,
  BonSortie,
  bonSortie, // ID de bon sortie
  success,
  error,
  valider,
  categories,
  produits,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // 'add' or 'edit'
  const [currentDetail, setCurrentDetail] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [validationErrors, setValidationErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(success);
  const [errorMessage, seterrorMessage] = useState(error);

  useEffect(() => {
    if (error) {
      seterrorMessage(error);
      const timer = setTimeout(() => {
        seterrorMessage(null);
      }, 10000); // 30000 milliseconds = 30 seconds
      return () => clearTimeout(timer);
    }
  }, [error]);

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
    idBonDeSortie: bonSortie || "",  // Assurez-vous que bonSortie est présent
  });
// console.log(bonSortie)
  const openModal = (mode, detail = null) => {
    setModalMode(mode);
    setCurrentDetail(detail);
    if (mode === "edit" && detail) {
      setData({
        produit: detail.produit.id || "",
        idBonDeSortie: detail.idBonDeSortie.id || "",
        quantite: detail.quantite || "",
      });
      setSelectedCategory(detail.produit.type.id);
    } else {
      setData({
        quantite: "",
        produit: "",
        idBonDeSortie: bonSortie || "",  // Assurez-vous que bonSortie est présent
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

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    const routeName = modalMode === "add" ? "detailBonSortie.store" : `detailBonSortie.update`;
    const action = modalMode === "add" ? post : put;

    try {
      action(
        route(routeName, currentDetail ? currentDetail.id : null),
        data
      );
      closeModal();
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire:", error);
    }
  };

  const handel = (e) => {
    const value = e.target.value;
    if(value < 0){
      toast.error('La quantité ne peut être négative');
      return;
    }
    setData('quantite', value);
  };

  const deleteDetailsexpresionbesoin = (detailBonSortie) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette detail ?")) {
      return;
    }
    router.delete(route("detailBonSortie.destroy", detailBonSortie.id));
  };

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedDetails = React.useMemo(() => {
    let sortableItems = [...detailBonSorties.data];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [detailBonSorties.data, sortConfig]);

  if (!bonSortie) {
    console.error("L'ID du bon de sortie est manquant.");
    return (
      <AuthenticatedLayout
        user={auth.user}
        header={
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
              Erreur
            </h2>
          </div>
        }
      >
        <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
              <div className="p-6 text-gray-900 dark:text-gray-100">
                <h1 className="text-red-600">L'ID du bon de sortie est manquant. Veuillez vérifier les données passées au composant.</h1>
              </div>
            </div>
          </div>
        </div>
      </AuthenticatedLayout>
    );
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Détail Bon Sortie
          </h2>
        </div>
      }
    >
      <Head title="Bon Sortie" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <ToastContainer />
          {success && (
            <div className='bg-emerald-400 py-2 px-4 rounded mb-4'>
              {success}
            </div>
          )}

          {/* {errorMessage && (
            <div className='bg-red-400 py-2 px-4 rounded mb-4'>
              {errorMessage}
            </div>
          )} */}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className='flex flex-col sm:flex-row justify-between mb-4'>
                <div>
                  <h1 className='font-semibold text-lg'>Bon Sortie N° {BonSortie.id}</h1>
                  <h1>Description: {BonSortie.description}</h1>

                </div>
                <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
                {Status === "non-validé" &&   auth.user.role ==='service' &&(
                    <button
                      onClick={() => openModal("add")}
                      className="bg-emerald-500 py-2 px-4 text-white rounded shadow transition-all hover:bg-emerald-600 w-full sm:w-auto flex items-center justify-center"
                    >
                      <FontAwesomeIcon icon={faPlus} className="mr-2" /> Ajouter
                    </button>
                  )}
                <a href={route('export-Details_Sortie', { bonSortie: bonSortie })}
                    className="bg-emerald-500 py-2 px-4 text-white rounded shadow transition-all hover:bg-emerald-600 w-full sm:w-auto flex items-center justify-center"
                  ><FontAwesomeIcon icon={faFileExcel} /> Excel
                  </a>
                  <a
                    href={route("pdf-DetailsBonSortie", { bonSortie: bonSortie })}
                    className="bg-emerald-500 py-2 px-4 text-white rounded shadow transition-all hover:bg-emerald-600 w-full sm:w-auto flex items-center justify-center"
                  >
                    <FontAwesomeIcon icon={faFilePdf} className="mr-2" />
                    PDF
                  </a>
                  {Status === "non-validé" &&  auth.user.role ==='admin' && (
                    <a
                      href={route("bonSortie.valider", { bonSortie: bonSortie })}
                      className="bg-emerald-500 py-2 px-4 text-white rounded shadow transition-all hover:bg-emerald-600 w-full sm:w-auto flex items-center justify-center"
                    >
                      Valider
                    </a>
                  )}



                  
                </div>
              </div>
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                  <tr className="text-nowrap">
                    <th className="px-3 py-3 cursor-pointer" onClick={() => requestSort('id')}>ID <FontAwesomeIcon icon={faSort} /></th>
                    <th className="px-3 py-3 cursor-pointer" onClick={() => requestSort('produit.designation')}>Produits <FontAwesomeIcon icon={faSort} /></th>
                    <th className="px-3 py-3 cursor-pointer" onClick={() => requestSort('produit.type.type')}>Catégorie <FontAwesomeIcon icon={faSort} /></th>
                    <th className="px-3 py-3 cursor-pointer" onClick={() => requestSort('quantite')}>Qté <FontAwesomeIcon icon={faSort} /></th>

                    {Status === "non-validé" &&   auth.user.role ==='service' &&(
                      <th className="px-3 py-3 text-right">Action</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {sortedDetails.map((detailBonSortie) => (
                    <tr
                      key={detailBonSortie.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td className="px-3 py-2">{detailBonSortie.id}</td>
                      <td className="px-3 py-2">{detailBonSortie.produit.designation}</td>
                      <td className="px-3 py-2">{detailBonSortie.produit.type.type}</td>
                      <td className="px-3 py-2">{detailBonSortie.quantite}</td>
                      {Status === "non-validé" &&  auth.user.role ==='service' && (
                        <td className="px-3 py-2 text-nowrap">
                          <button
                            onClick={() => openModal("edit", detailBonSortie)}
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                          <button
                            onClick={() => deleteDetailsexpresionbesoin(detailBonSortie)}
                            className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                          >
                            <FontAwesomeIcon icon={faTrashAlt} />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                  {/* {JSON.stringify(detailBonSorties)} */}
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
                  value={selectedCategory}
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
                    <option key={product.id} value={product.id}>{product.designation}</option>
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
                  onChange={handel}
                />
                <InputError message={validationErrors.quantite || errors.quantite} className='mt-2' />
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

export default index_par_bonSortie;
