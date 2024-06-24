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
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\CatalogueProduitExport;



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
            'success' => session('success'),
        ]);
    }

    // public function index()
    // {
    //     $query = CatelogueProduit::query();

    //     // Exécuter la requête avec pagination
    //     $Produits = $query->paginate(10);
    //     $categories = Categorie::all();

    //     // Ajouter les quantités entrantes et sortantes à chaque produit
    //     foreach ($Produits as $produit) {
    //         $produit->incoming_quantity = $produit->getIncomingQuantity();
    //         $produit->outgoing_quantity = $produit->getOutgoingQuantity();
    //         $produit->initial_quantity = $produit->getInitialQuantity();
    //     }

    //     return inertia('CatelogueProduit/Index', [
    //         'produits' => CatelogueResource::collection($Produits),
    //         'categories' => $categories,
    //         'success' => session('success'),
    //     ]);
    // }


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
    



public function exportExcel()
    {
        $categories = CatelogueProduit::get();
        return Excel::download(new CatalogueProduitExport(), 'Produits.xlsx');
    }


}
