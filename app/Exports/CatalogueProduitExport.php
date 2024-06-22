<?php


namespace App\Exports;

use App\Models\CatelogueProduit;
use Maatwebsite\Excel\Concerns\FromCollection;

class CatalogueProduitExport implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return CatelogueProduit::all([
            'type',
            'designation',   
        ]);
    }
    public function headings(): array
    {
        return [
            'DESIGNQTION',
            'TYPE',
        ];
    }
    public function query()
    {
        return CatalogueProduitExport::query();
    }
    public function map($bulk): array
    {
        return [
            $bulk->designation,
            $bulk->type,
        ];
    }
}