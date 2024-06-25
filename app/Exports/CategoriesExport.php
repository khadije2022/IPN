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
        return Categorie::query(); // Ici, il n'est pas nécessaire de spécifier les colonnes car `WithMapping` s'en chargera.
    }

    /**
     * @return array
     */
    public function headings(): array
    {
        return ['TYPE']; // En-têtes pour la feuille Excel
    }

    /**
     * @param Categorie $categorie - instance de Categorie à mapper
     * @return array
     */
    public function map($categorie): array
    {
        return [
            $categorie->type,
        ];
    }
}
