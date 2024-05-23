<?php
namespace App\Exports;
use App\Models\CategorieModel;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
class CategoriesExport implements FromQuery, WithHeadings
{
    public function headings(): array
    {
        return [
            'ID',
            'type',
        ];
    }

    public function query(){
            return CategorieModel:: query();
    }

    public function map($bulk): array{
        return [
            $bulk->id,
            $bulk->type,
        ];
    } 
    
}
?>