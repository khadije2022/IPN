<?php

namespace App\Exports;

use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class MultiSheetExport implements WithMultipleSheets
{
    use Exportable;

    public function sheets(): array
    {
        $sheets = [];

        $magasins = DB::table('magasins')->select('nomMagasin')->get();

        foreach ($magasins as $magasin) {
            $sheets[] = new ProduitsExport($magasin->nomMagasin);
        }

        return $sheets;
    }
}

