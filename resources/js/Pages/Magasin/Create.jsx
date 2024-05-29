import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create(auth){
    const{data , setData , post, errors , reset} = useForm({
        'nomMagasin':'',
    })
    const onSubmit = (e)=> {
        e.preventDefault();

        post(route('magasin.store'));
    }
    return (
        <AuthenticatedLayout
        // user={auth.user}
        header={
            <div className="flex justify-between items-center">
      <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
      Ajouter une nouvelle magasin
      </h2>
      
    </div>
            }
            >
    <Head title="Magasins" />
    <div className="py-12">
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
                <div className="p-6 text-gray y-900 dark:text-gray-100">Nom du magasin</div>
                <form 
                onSubmit={onSubmit}
                className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                    <div>
                       <TextInput
                       id="nomMagasin"
                       type="text"
                       name="nomMagasin"
                       value={data.nomMagasin}
                       className="mt-1 block w-full"
                       isFocused={true}
                       onChange={(e) => setData("nomMagasin" , e.target.value)}
                       />
                       <InputError message={errors.nomMagasin} className="mt-2"/>
                    </div>
                    <div className="mt-4 text-right">
                <Link
                  href={route("magasin.index")}
                  className="inline-block bg-gray-100 py-1 px-3 text-gray-800 rounded 
                  shadow transition-all hover:bg-gray-200 mr-2 text-sm h-8"
                >
                  Annuler
                </Link>
                <button className="bg-emerald-500 py-1 px-3 text-white rounded shadow 
                transition-all hover:bg-emerald-600 text-sm h-8">
                  Enregistrer
                </button>
              </div>
                </form>
                </div>
                </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}