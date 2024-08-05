<?php
namespace App\Exports;

use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithCustomStartCell;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Events\AfterSheet;

class IPNLiveExport implements FromCollection, WithHeadings, WithMapping,WithTitle,WithEvents,WithCustomStartCell
{
    /**
    * @return \Illuminate\Support\Collection
    */

    protected $sheetNumber;

    public function __construct($sheetNumber)
    {
        $this->sheetNumber = $sheetNumber;
    }
    public function startCell(): string
    {
        return 'A2';
    }

    public function title(): string
    {
        return "ipn-livre" ;
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function(AfterSheet $event) {
                $event->sheet->mergeCells('A1:C1');
                $event->sheet->setCellValue('A1', 'Liste des Livres ');
                $event->sheet->getStyle('A1')->getFont()->setBold(true);
                $event->sheet->getStyle('A1')->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);

                $headingRange = 'A2:C2'; // Range for the headings
                $event->sheet->getStyle($headingRange)->applyFromArray([
                    'font' => [
                        'bold' => true,
                    ],
                    'alignment' => [
                        'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
                    ],
                    'fill' => [
                        'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                        'color' => ['argb' => 'FFFFE0B2'], // Light orange background color
                    ],
                ]);

                $event->sheet->getColumnDimension('A')->setWidth(30);
                $event->sheet->getColumnDimension('B')->setWidth(30);
                $event->sheet->getColumnDimension('C')->setWidth(20);
            },
        ];
    }

    public function collection()
    {
        return $this->getProducts();
    }

    public function headings(): array
    {
        return [
            'Produit',
            'Catégorie',
            'Stock',
        ];
    }



    public function getProducts()
    {
        // Execute the query to fetch the products
        $products = DB::table('catelogue_produits')
        ->leftJoin('ipn.product_movements', 'catelogue_produits.id', '=', 'product_movements.product_id')
        ->join('categories', 'catelogue_produits.type', '=', 'categories.id')
        ->join('magasins', 'categories.id_magasin', '=', 'magasins.id') // Ajoutez cette ligne
        ->select(
            'catelogue_produits.id as product_id',
            'catelogue_produits.designation as product_name',
            'categories.type as category_name',
            'categories.id as category_id',
            'magasins.nomMagasin as magasin_name', // Ajoutez cette ligne
            DB::raw("SUM(CASE
                WHEN detail_type COLLATE utf8mb4_unicode_ci IN ('achat', 'correction_entree') THEN quantite
                WHEN detail_type COLLATE utf8mb4_unicode_ci = 'sortie' THEN -quantite
                WHEN detail_type COLLATE utf8mb4_unicode_ci = 'correction_sortie' THEN quantite
                ELSE 0
            END) AS stock")
        )
        ->where('magasins.nomMagasin', '=', 'Livre-Magasin') // Ajoutez cette ligne pour filtrer par magasin
        ->groupBy('catelogue_produits.id', 'catelogue_produits.designation', 'categories.type', 'categories.id', 'magasins.nomMagasin') // Ajoutez 'magasins.nom' ici
        ->get();

        // Ensure each product is treated as an object
        return $products->map(function ($produit) {
            return (object) $produit;
        });
    }

    public function map($produit): array
    {
        // dd($produit);
        return [
            $produit->product_name,
            $produit->category_name,
            $produit->stock,
        ];
    }
}

