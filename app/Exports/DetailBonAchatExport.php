<?php

namespace App\Exports;

use App\Models\DetailBonAchat;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class DetailBonAchatExport implements FromQuery, WithHeadings, WithMapping
{
    protected $bonAchat;

    public function __construct($bonAchat)
    {
        $this->bonAchat = $bonAchat;
    }

    public function query()
    {
        return DetailBonAchat::with('produits')
            ->where('idBonAchat', $this->bonAchat);
    }

    public function headings(): array
    {
        return [
            'Produit',
            'Catégorie',
            'Quantité',
            
        ];
    }

    public function map($detailBonAchat): array
    {
        return [
            $detailBonAchat->produits->designation ?? 'N/A', 
            $detailBonAchat->produits->typeCategorie->type,
            $detailBonAchat->quantite,
        ];
    }
}
