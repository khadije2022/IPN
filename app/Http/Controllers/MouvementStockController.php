<?php

namespace App\Http\Controllers;

use App\Models\Mouvement_stock;
use App\Http\Requests\StoreMouvement_stockRequest;
use App\Http\Requests\UpdateMouvement_stockRequest;
use App\Http\Resources\CategorieResource;
use App\Models\Categorie;
use App\Http\Controllers\Request;
use App\Models\CatelogueProduit;

class MouvementStockController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('MouvmentStock/Index',[
            'mouvmentStock' => "hello"
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create($bonSortie)
    {

        // Categorie
        $categorie = Categorie::all();
        $produits = CatelogueProduit::all();
        $MouvmentStck = Mouvement_stock::query()
            ->where('idBonDeSortieAchats', $bonSortie)
            ->get();

        return inertia('MouvmentStock/Index',[
            'categories' => CategorieResource::collection($categorie),
            'produits' => CategorieResource::collection($produits),
            'mouvmentStocks' => $MouvmentStck,
            'bonSortie' => $bonSortie
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMouvement_stockRequest $request)
{


        $data = $request->validate([
            'quantite' => 'required|integer',
            'id_produit' => 'required|integer',
            'idBonDeSortieAchats' => 'required|integer|exists:bon_sortie_achats,id',
        ]);

        Mouvement_stock::create($data);

        return redirect()->route('mouvmentStock.create', ['bonSortie' => $data['idBonDeSortieAchats']])
            ->with('success', 'Mouvement stock created successfully!');
    }

    // Rediriger vers la vue index avec les données nécessaires



// public function finalize($request)
// {
//     $idBonDeSortieAchats = $request->input('idBonDeSortieAchats');

//     // Add your finalization logic here.
//     // For example, update the status of the BonDeSortie or perform other business logic.

//     $categories = Categorie::all();
//     $produits = CatelogueProduit::all();
//     $mouvmentStocks = Mouvement_stock::all();

//     return redirect()->route('BonSortieAchat.index')->with([
//         'bon' => "wey"
//     ]);
// }

    /**
     * Display the specified resource.
     */
    public function show(Mouvement_stock $mouvement_stock)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Mouvement_stock $mouvement_stock)
    {
        
        return inertia('MouvmentStock/Edit',
        [
           'mouvementStock' => $mouvement_stock,
        ]);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMouvement_stockRequest $request, Mouvement_stock $mouvement_stock)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Mouvement_stock $mouvement_stock)
    {
        //
    }
}
