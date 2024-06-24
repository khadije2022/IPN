<?php
namespace App\Exports;

use App\Models\DetailBonAchat;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class DetailBonAchatExport implements FromCollection, WithHeadings, WithMapping
{
    /**
     * Récupère la collection de détails de bon d'achat
     *
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return DetailBonAchat::with('produit')->get();
    }

    /**
     * Définit les en-têtes du fichier Excel
     *
     * @return array
     */
    public function headings(): array
    {
        return [
            'Quantité',
            'Produit',
        ];
    }

    /**
     * Mappe les données de chaque détail de bon d'achat
     *
     * @param mixed $detailBonAchat
     * @return array
     */
    public function map($detailBonAchat): array
    {
        return [
            $detailBonAchat->quantite,
            $detailBonAchat->produit->designation, // Assuming 'produit' relationship returns the related product model
        ];
    }
}
