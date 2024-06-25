<?php

namespace App\Exports;

use App\Models\CatelogueProduit; // Correction du nom du modèle utilisé
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class CatalogueProduitExport implements FromCollection, WithHeadings, WithMapping
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        // Assurer que la méthode with() est appelée avec les relations correctes du modèle CatalogueProduit
        return CatelogueProduit::with('typeCategorie')->get(); // Assurez-vous que 'categorie' est la relation correcte dans votre modèle
    }

    public function headings(): array
    {
        return [
            'DESIGNATION',
            'TYPE DE CATÉGORIE',
            'QUANTITÉ EN STOCK',
        ];
    }

    public function map($produit): array
    {
        // Assurer que chaque champ est correctement mappé, surtout les relations
        return [
            $produit->designation,
            $produit->typeCategorie->type, // Remplacez 'categorie' et 'type' par les noms corrects si nécessaire
            $produit->stock,
        ];
    }
}
