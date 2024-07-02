<?php

namespace App\Exports;

use App\Models\Categorie;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class CategoriesExport implements FromQuery, WithHeadings, WithMapping
{
    /**
    * @return \Illuminate\Database\Query\Builder
    */
    public function query()
    {
        return Categorie::query(); // Ici, nous n'avons pas besoin d'utiliser `->get()` car `FromQuery` s'en charge.
    }

    /**
     * @return array
     */
    public function headings(): array
    {
        return ['Type de Catégorie', 'Nom du Magasin']; // En-têtes pour la feuille Excel
    }

    /**
     * @param Categorie $categorie - instance de Categorie à mapper
     * @return array
     */
    public function map($categorie): array
    {
        return [
            $categorie->type,
            $categorie->magasin->nomMagasin, // Assurez-vous que `magasin` est une relation définie dans le modèle `Categorie`
        ];
    }
}
