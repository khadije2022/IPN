<?php

namespace App\Exports;

use App\Models\Details_ExpBesoin;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class DetailExpressionBesoinExport implements FromQuery, WithHeadings, WithMapping
{
    protected $id_expbesoin;

    public function __construct($id_expbesoin)
    {
        $this->id_expbesoin = $id_expbesoin;
    }

    public function query()
    {
        return Details_ExpBesoin::with('Produit')
            ->where('id_expbesoin', $this->id_expbesoin);
    }

    public function headings(): array
    {
        return [
            'Catégorie',
            'Produit',
            'Quantité'
        ];
    }

    public function map($detail): array
    {
        return [
            $detail->Produit->typeCategorie->type ?? 'N/A',
            $detail->Produit->designation ?? 'N/A',
            $detail->quantite,
        ];
    }
}

