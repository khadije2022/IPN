<?php

namespace App\Exports;

use App\Models\BonSortie;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class BonSortieExport implements FromCollection, WithHeadings, WithMapping
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

    /**
     * @return array
     */
    public function headings(): array
    {
        return [
            'DESCRIPTION',
            'STATUS',
        ];
    }

    /**
     * @param mixed $bonSortie
     * @return array
     */
    public function map($bonSortie): array
    {
        return [
            $bonSortie->description,
            $bonSortie->status,
        ];
    }
}
