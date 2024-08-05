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

class ProduitsExport implements FromCollection, WithHeadings, WithMapping, WithTitle, WithEvents , WithCustomStartCell
{
    protected $magasinName;

    public function __construct($magasinName)
    {
        $this->magasinName = $magasinName;
    }

    public function title(): string
    {
        return $this->magasinName;
    }

    public function startCell(): string
    {
        return 'A2';
    }
    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event) {
                // Merge cells for title
                $event->sheet->mergeCells('A1:C1');
                $event->sheet->setCellValue('A1', 'Liste des produits - ' . $this->magasinName);
                $event->sheet->getStyle('A1')->getFont()->setBold(true);
                $event->sheet->getStyle('A1')->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);

                // Apply heading styles
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

                // Set custom column widths
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
        $products = DB::table('catelogue_produits')
            ->leftJoin('ipn.product_movements', 'catelogue_produits.id', '=', 'product_movements.product_id')
            ->join('categories', 'catelogue_produits.type', '=', 'categories.id')
            ->join('magasins', 'categories.id_magasin', '=', 'magasins.id')
            ->select(
                'catelogue_produits.id as product_id',
                'catelogue_produits.designation as product_name',
                'categories.type as category_name',
                'categories.id as category_id',
                'magasins.nomMagasin as magasin_name',
                DB::raw("SUM(CASE
                    WHEN detail_type COLLATE utf8mb4_unicode_ci IN ('achat', 'correction_entree') THEN quantite
                    WHEN detail_type COLLATE utf8mb4_unicode_ci = 'sortie' THEN -quantite
                    WHEN detail_type COLLATE utf8mb4_unicode_ci = 'correction_sortie' THEN quantite
                    ELSE 0
                END) AS stock")
            )
            ->where('magasins.nomMagasin', '=', $this->magasinName)
            ->groupBy('catelogue_produits.id', 'catelogue_produits.designation', 'categories.type', 'categories.id', 'magasins.nomMagasin')
            ->get();

        return $products->map(function ($produit) {
            return (object) $produit;
        });
    }

    public function map($produit): array
    {
        return [
            $produit->product_name,
            $produit->category_name,
            $produit->stock,
        ];
    }
}
