<?php

namespace App\Exports;

use App\Models\Categorie;
use Maatwebsite\Excel\Concerns\FromCollection;

class CategoriesExport implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Categorie::all([
            'type' 
        ]);
    }
    public function headings(): array
    {
        return [
            
            'TYPE'
            
        ];
    }
    public function query()
    {
        return Categorie::query();
    }
    public function map($bulk): array
    {
        return [
            $bulk->type,
            
        ];
    }
}