<?php


namespace App\Exports;

use App\Models\MouvmentStock;
use Maatwebsite\Excel\Concerns\FromCollection;

class MouvmentStockExport implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return MouvmentStock::all([
        'id',
        'idBonDeSortie',
        'idBonAchat',
        'typeMouvments',
        'stock'
        ]);
    }
    public function headings(): array
    {
        return [
            'id',
        'idBonDeSortie',
        'idBonAchat',
        'typeMouvments',
        'stock'
        ];
    }
    public function query()
    {
        return MouvmentStock::query();
    }
    public function map($bulk): array
    {
        return [
            $bulk->id,
            $bulk->idBonDeSortie,
            $bulk->idBonAchat,
            $bulk->typeMouvments,
            $bulk->stock,
        ];
    }
}