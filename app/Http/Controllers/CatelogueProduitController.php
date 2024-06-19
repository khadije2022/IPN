<?php

namespace App\Http\Controllers;

use App\Models\CatelogueProduit;
use App\Http\Requests\StoreCatelogueProduitRequest;
use App\Http\Requests\UpdateCatelogueProduitRequest;
use App\Http\Resources\CategorieResource;
use App\Http\Resources\CatelogueResource;
use App\Models\Categorie;
use App\Models\DetailBonAchat;
use App\Models\DetailBonSortie;
use App\Models\MouvmentStock;
use Illuminate\Support\Facades\DB;



class CatelogueProduitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = CatelogueProduit::query();

        // Execute the query with pagination
        $Produits = $query->paginate(10);
        $categories = Categorie::all();

        return inertia('CatelogueProduit/Index', [
            'produits' => CatelogueResource::collection($Produits),
            'categories' => CategorieResource::collection($categories),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCatelogueProduitRequest $request)
    {
        $data = $request->all();
        $data['stock'] = 0; // Initialiser le stock à 0
        CatelogueProduit::create($data);

        return to_route('catelogueProduit.index')->with('success', "Le produit a été créé avec succès");
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCatelogueProduitRequest $request, CatelogueProduit $catelogueProduit)
    {
        $data = $request->all();
        $catelogueProduit->update($data);
        return to_route('catelogueProduit.index')->with('success', "Le produit a été mis à jour avec succès");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CatelogueProduit $catelogueProduit)
    {
        $catelogueProduit->delete();
        return to_route('catelogueProduit.index')->with('success', 'Le produit a été supprimé avec succès');
    }


    // public function updateStockFromMouvmentStocks()
    // {
    //     // Récupérer les IDs distincts de BonSortie et BonAchat depuis MouvmentStock
    //     $mouvmentStocks = MouvmentStock::select('idBonDeSortie', 'idBonAchat')
    //         ->distinct()
    //         ->get();

    //     foreach ($mouvmentStocks as $mouvment) {
    //         // Mettre à jour le stock pour BonSortie s'il existe
    //         if ($mouvment->idBonDeSortie) {
    //             $this->updateStockForBonSortie($mouvment->idBonDeSortie);
    //         }

    //         // Mettre à jour le stock pour BonAchat s'il existe
    //         if ($mouvment->idBonAchat) {
    //             $this->updateStockForBonAchat($mouvment->idBonAchat);
    //         }
    //     }

    //     return response()->json(['message' => 'Stock des produits mis à jour à partir de MouvmentStocks']);
    // }

//     private function updateStockForBonSortie($idBonDeSortie)
// {
//     // Initialize an array to aggregate quantities for each product
//     $quantities = [];

//     // Retrieve details of BonSortie for the given idBonDeSortie
//     $details = DetailBonSortie::where('idBonDeSortie', $idBonDeSortie)->get();

//     // Aggregate quantities for each product
//     foreach ($details as $detail) {
//         if (!isset($quantities[$detail->produit])) {
//             $quantities[$detail->produit] = 0;
//         }
//         $quantities[$detail->produit] = $detail->quantite; // Subtract quantity for BonSortie
//     }

//     // Update stock for each product based on aggregated quantities
//     foreach ($quantities as $produitId => $quantite) {
//         $produit = CatelogueProduit::find($produitId);
//         if ($produit) {
//             $produit->stock = $quantite; // Add the aggregated quantity to the stock
//             $produit->save();
//         }
//     }
// }


// private function updateStockForBonAchat($idBonAchat)
// {
//     // Initialize an array to aggregate quantities for each product
//     $quantities = [];

//     // Retrieve details of BonAchat for the given idBonAchat
//     $details = DetailBonAchat::where('idBonAchat', $idBonAchat)->get();

//     // Aggregate quantities for each product
//     foreach ($details as $detail) {
//         if (!isset($quantities[$detail->produit])) {
//             $quantities[$detail->produit] = 0;
//         }
//         $quantities[$detail->produit] += $detail->quantite; // Add quantity for BonAchat
//     }

//     // Update stock for each product based on aggregated quantities
//     foreach ($quantities as $produitId => $quantite) {
//         $produit = CatelogueProduit::find($produitId);
//         if ($produit) {
//             $produit->stock += $quantite; // Add the aggregated quantity to the stock
//             $produit->save();
//         }
//     }
// }

}
