import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
       <h1></h1>
      }
    >

      <Head title="Introduction" />
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="py-12">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mx-4 md:mx-auto md:max-w-4xl">
            <header className="text-center mb-10">
              <h1 className="text-3xl font-bold">Gestion de Stock</h1>
            </header>
            <section className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 border-b-2 border-gray-800 pb-2">
                Introduction
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                La gestion de stock est essentielle pour assurer une bonne organisation et un suivi précis des produits disponibles. Voici comment nous procédons :
              </p>

              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 border-b-2 border-gray-800 pb-2">
                Procédures de Gestion de Stock
              </h2>
              <ul className="list-disc pl-5 text-lg text-gray-700 dark:text-gray-300 mb-6">
                <li className="mb-2">
                  <strong>Enregistrement des produits :</strong> Chaque produit est enregistré avec un code unique, une description, une quantité initiale et une date d'ajout.
                </li>
                <li className="mb-2">
                  <strong>Mise à jour des stocks :</strong> Les stocks sont mis à jour en temps réel lors de l'ajout ou du retrait de produits.
                </li>
                <li className="mb-2">
                  <strong>Suivi des mouvements :</strong> Chaque mouvement de stock (entrée ou sortie) est enregistré avec les détails pertinents tels que la date, la quantité et la raison du mouvement.
                </li>
                <li className="mb-2">
                  <strong>Rapports :</strong> Des rapports réguliers sont générés pour analyser les niveaux de stock et prendre des décisions éclairées.
                </li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 border-b-2 border-gray-800 pb-2">
                Outils Utilisés
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Pour la gestion de stock, nous utilisons les outils et technologies suivants :
              </p>
              <ul className="list-disc pl-5 text-lg text-gray-700 dark:text-gray-300 mb-6">
                <li className="mb-2">React pour le frontend</li>
                <li className="mb-2">Laravel pour le backend</li>
                <li className="mb-2">MySQL pour la base de données</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 border-b-2 border-gray-800 pb-2">
                Explication de l'utilisation
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Consulter les autres links pour trouver le CRUD des tables de gestion :
              </p>
              <ul className="list-disc pl-5 text-lg text-gray-700 dark:text-gray-300 mb-6">
                <li className="mb-2">Catégories</li>
                <li className="mb-2">Services</li>
                <li className="mb-2">Catalogue Produit</li>
                <li className="mb-2">Expression Besoin avec leurs détails</li>
                <li className="mb-2">Mouvements Stock</li>
                <li className="mb-2">Bon Achats</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
