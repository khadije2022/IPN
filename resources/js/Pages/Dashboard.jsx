import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
  const styles = {
    body: {
      backgroundColor: '#f8f9fa', // Fond légèrement gris pour un contraste avec le contenu blanc
      margin: '0',
      padding: '0',
      fontFamily: 'Arial, sans-serif',
    },
    page: {
      backgroundColor: '#ffffff', // Fond blanc pour le contenu principal
      padding: '20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Ombre pour un effet de profondeur
      borderRadius: '8px', // Bords arrondis pour un design plus doux
      margin: '20px',
    },
    header: {
      textAlign: 'center',
      marginBottom: '40px',
    },
    logo: {
      width: '100px',
      height: 'auto',
    },
    content: {
      maxWidth: '800px',
      margin: '0 auto',
    },
    title: {
      color: '#2c3e50',
      marginBottom: '20px',
      borderBottom: '2px solid #2c3e50', // Ligne de séparation sous le titre
      paddingBottom: '10px',
    },
    text: {
      fontSize: '16px',
      lineHeight: '1.6',
      color: '#333',
      marginBottom: '20px',
    },
    list: {
      listStyleType: 'disc',
      paddingLeft: '20px',
      color: '#333',
      marginBottom: '20px',
    },
    listItem: {
      marginBottom: '10px', 
    },
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Introduction</h2>}
    >
      <Head title="Introduction" />
      <div style={styles.body}>
        <div className="py-12">
          <div style={styles.page}>
            <header style={styles.header}>
             
              <h1>Gestion de Stock</h1>
            </header>
            <section style={styles.content}>
              <h2 style={styles.title}>Introduction</h2>
              <p style={styles.text}>
                La gestion de stock est essentielle pour assurer une bonne organisation et un suivi précis des produits disponibles. Voici comment nous procédons :
              </p>

              <h2 style={styles.title}>Procédures de Gestion de Stock</h2>
              <ul style={styles.list}>
                <li style={styles.listItem}><strong>Enregistrement des produits :</strong> Chaque produit est enregistré avec un code unique, une description, une quantité initiale et une date d'ajout.</li>
                <li style={styles.listItem}><strong>Mise à jour des stocks :</strong> Les stocks sont mis à jour en temps réel lors de l'ajout ou du retrait de produits.</li>
                <li style={styles.listItem}><strong>Suivi des mouvements :</strong> Chaque mouvement de stock (entrée ou sortie) est enregistré avec les détails pertinents tels que la date, la quantité et la raison du mouvement.</li>
                <li style={styles.listItem}><strong>Rapports :</strong> Des rapports réguliers sont générés pour analyser les niveaux de stock et prendre des décisions éclairées.</li>
              </ul>

              <h2 style={styles.title}>Outils Utilisés</h2>
              <p style={styles.text}>
                Pour la gestion de stock, nous utilisons les outils et technologies suivants :
              </p>
              <ul style={styles.list}>
                <li style={styles.listItem}>React pour le frontend</li>
                <li style={styles.listItem}>Laravel pour le backend</li>
                <li style={styles.listItem}>Mysql pour la base de données</li>
              </ul>

              <h2 style={styles.title}>explication de l'utilisation</h2>
              <p style={styles.text}>
Consulter les autres Links pour trouver le CRUD des tables de gestion
              </p>
              <ul style={styles.list}>
                <li style={styles.listItem}>Categories</li>
                <li style={styles.listItem}>Services</li>
                <li style={styles.listItem}>Catalogue Produit</li>
                <li style={styles.listItem}>Expression Bessoin avec leur details</li>
                <li style={styles.listItem}>Mouvements Stock</li>
                <li style={styles.listItem}>Bon Achats</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
