<?php

namespace App\Exports;

use App\Http\Resources\CategorieResource;
use App\Models\CatalogueProduit;
use App\Models\Categorie;
use App\Models\CatelogueProduit;
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
        // Charger les produits avec les champs nécessaires
        // return CatelogueProduit::with('stock')->get();

        return CatelogueProduit::with("typeCategorie")->get();
    }

    public function headings(): array
    {
        return [

            'DESIGNATION',
            "TYPE",
            'STOCK',
        ];
    }

    public function map($bulk): array
    {
        return [
            $bulk->designation,
            $bulk->typeCategorie->type,
            $bulk->stock,
        ];
    }
}
