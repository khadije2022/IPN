<?php


namespace App\Exports;

use App\Models\ExpressionBesoin;
use Maatwebsite\Excel\Concerns\FromCollection;

class ExpressionBesoinExport implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return ExpressionBesoin::all([
            'id_service' ,'description', 'status'  
        ]);
    }
    public function headings(): array
    {
        return [
            'ID',
            'DESCRIPTION',
            'Status'
        ];
    }
    public function query()
    {
        return ExpressionBesoin::query();
    }
    public function map($bulk): array
    {
        return [
            $bulk->id_service,
            $bulk->status,
            $bulk->description,
        ];
    }
}