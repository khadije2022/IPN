<?php


namespace App\Exports;

use App\Models\BonSortie;
use Maatwebsite\Excel\Concerns\FromCollection;

class BonSortieExport implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return BonSortie::all([
            'description',
            'status',   
        ]);
    }
    public function headings(): array
    {
        return [
            'DDESCRIPTION',
            'STATUS',
        ];
    }
    public function query()
    {
        return BonSortie::query();
    }
    public function map($bulk): array
    {
        return [
            $bulk->description,
            $bulk->status,
        ];
    }
}