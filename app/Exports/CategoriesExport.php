<?php
namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithMapping;
use App\Models\Categorie;

class CategoriesExport implements FromQuery, WithHeadings, FromCollection, WithMapping
{
    public function collection()
    {
        return Categorie::all([
            'id', 'type'
        ]);
    }

    public function headings(): array
    {
        return [
            'ID',
            'Type',
        ];
    }

    public function query()
    {
        return Categorie::query();
    }

    public function map($bulk): array
    {
        return [
            $bulk->id,
            $bulk->type,
        ];
    }
}

?>