<?php
namespace App\Exports;

use App\Models\ExpressionBesoin;
use App\Models\Service;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class ExpressionBesoinExport implements FromCollection, WithHeadings, WithMapping
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return ExpressionBesoin::with('service')->get();
    }

    public function headings(): array
    {
        return [
            'Nom du Service',
            'Description',
            'Status'
        ];
    }

    public function map($expressionBesoin): array
    {
        return [
            $expressionBesoin->service->nom_responsabiliter ?? 'N/A',
            $expressionBesoin->description,
            $expressionBesoin->status,
        ];
    }
}
