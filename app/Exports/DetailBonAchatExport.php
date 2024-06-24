<?php

namespace App\Exports;

use App\Models\DetailBonAchat;
use Maatwebsite\Excel\Concerns\FromCollection;

class DetailBonAchatExport implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return DetailBonAchat::all([
            'description',
            'created_at',
            'status'
        ]);
        
    }
    public function headings(): array
    {
        return [
            'id_expbesoin',
            'id_categorie',
            'id_catproduit'
        ];
    }
    public function query()
    {
        return DetailBonAchat::query();
    }
    public function map($bulk): array
    {
        return [
            $bulk->id_expbesoin,
            $bulk->id_categorie,
            $bulk->id_catproduit,
        ];
    }
}
