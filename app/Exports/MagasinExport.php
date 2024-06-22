<?php


namespace App\Exports;

use App\Models\Categorie;
use App\Models\Magasin;
use Maatwebsite\Excel\Concerns\FromCollection;

class MagasinExport implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Magasin::all([
            "id",'nomMagasin', 
        ]);
    }
    public function headings(): array
    {
        return [
            'ID',
            'NOM',
        ];
    }
    public function query()
    {
        return Magasin::query();
    }
    public function map($bulk): array
    {
        return [
            $bulk->id,
            $bulk->nomMagasin,
        ];
    }
}