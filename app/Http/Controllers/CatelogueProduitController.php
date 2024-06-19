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


    public function updateStockFromMouvmentStocks()
    {
        // Récupérer les IDs distincts de BonSortie et BonAchat depuis MouvmentStock
        $mouvmentStocks = MouvmentStock::select('idBonDeSortie', 'idBonAchat')
            ->distinct()
            ->get();

        foreach ($mouvmentStocks as $mouvment) {
            // Mettre à jour le stock pour BonSortie s'il existe
            if ($mouvment->idBonDeSortie) {
                $this->updateStockForBonSortie($mouvment->idBonDeSortie);
            }

            // Mettre à jour le stock pour BonAchat s'il existe
            if ($mouvment->idBonAchat) {
                $this->updateStockForBonAchat($mouvment->idBonAchat);
            }
        }
    }

    private function updateStockForBonSortie($idBonDeSortie)
    {
        try {
            DB::beginTransaction();

            // Calculer le stock pour chaque produit associé à ce BonSortie
            $details = DetailBonSortie::where('idBonDeSortie', $idBonDeSortie)->get();

            foreach ($details as $detail) {
                $produit = CatelogueProduit::find($detail->produit_id);
                if ($produit) {
                    $produit->stock -= $detail->quantite; // Soustraire la quantité du stock actuel
                    $produit->save();
                }
            }

            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }
    }

    private function updateStockForBonAchat($idBonAchat)
    {
        try {
            DB::beginTransaction();

            // Calculer le stock pour chaque produit associé à ce BonAchat
            $details = DetailBonAchat::where('idBonAchat', $idBonAchat)->get();

            foreach ($details as $detail) {
                $produit = CatelogueProduit::find($detail->produit_id);
                if ($produit) {
                    $produit->stock += $detail->quantite; // Ajouter la quantité au stock actuel
                    $produit->save();
                }
            }

            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }
    }

}
