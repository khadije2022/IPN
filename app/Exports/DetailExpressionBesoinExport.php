<?php

namespace App\Exports;

use App\Models\Details_ExpBesoin;
use Maatwebsite\Excel\Concerns\FromCollection;

class DetailExpressionBesoinExport implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
     
        return Details_ExpBesoin::all([
            'id_expbesoin' ,'id_categorie', 'id_catproduit'  
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
        return Details_ExpBesoin::query();
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

