<?php
namespace App\Exports;

use App\Models\BonAchat;
use Maatwebsite\Excel\Concerns\FromCollection;

class BonAchatExport implements FromCollection
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
    public function headings(): array
    {
        return [
            'DDESCRIPTION',
            'STATUS',
        ];
    }
    public function query()
    {
        return BonAchat::query();
    }
    public function map($bulk): array
    {
        return [
            $bulk->description,
            $bulk->status,
        ];
    }
}