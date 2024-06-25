<?php
namespace App\Exports;

use App\Models\BonAchat;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\FromQuery;

class BonAchatExport implements FromCollection, WithHeadings, WithMapping
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return BonAchat::all([
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
     * @param mixed $bonAchat
     * @return array
     */
    public function map($bonAchat): array
    {
        return [
            $bonAchat->description,
            $bonAchat->status,
        ];
    }
}
