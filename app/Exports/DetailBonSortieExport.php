<?php

namespace App\Exports;

use App\Models\DetailBonSortie;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class DetailBonSortieExport implements FromQuery, WithHeadings, WithMapping
{
    protected $bonSortie;

    public function __construct($bonSortie)
    {
        $this->bonSortie = $bonSortie;
    }

    public function query()
    {
        return DetailBonSortie::with('produits')
            ->where('idBonDeSortie', $this->bonSortie);
    }

    public function headings(): array
    {
        return [
            'Produit',
            'Catégorie',
            'Quantité',
        ];
    }

    public function map($detailBonSortie): array
    {
        return [
            $detailBonSortie->produits->designation ?? 'N/A',
            $detailBonSortie->produits->typeCategorie->type ?? 'N/A',
            $detailBonSortie->quantite,
        ];
    }
}
