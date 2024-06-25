<?php

namespace App\Exports;

use App\Models\Magasin;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class MagasinExport implements FromQuery, WithHeadings, WithMapping
{
    /**
    * @return \Illuminate\Database\Query\Builder
    */
    public function query()
    {
        return Magasin::query(); // Pas besoin de spécifier les colonnes ici, elles seront spécifiées dans la méthode map()
    }

    /**
     * @return array
     */
    public function headings(): array
    {
        return ['NOM']; // En-têtes pour la feuille Excel
    }

    /**
     * @param Magasin $magasin - instance de Magasin à mapper
     * @return array
     */
    public function map($magasin): array
    {
        return [
            $magasin->nomMagasin, // Assurez-vous que le champ 'nomMagasin' correspond à votre modèle de base de données
        ];
    }
}
