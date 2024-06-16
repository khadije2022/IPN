<?php

namespace App\Http\Controllers;

use App\Models\Mouvement_stock;
use App\Http\Requests\StoreMouvement_stockRequest;
use App\Http\Requests\UpdateMouvement_stockRequest;
use App\Http\Resources\CategorieResource;
use App\Models\Categorie;
use App\Http\Controllers\Request;
use App\Http\Resources\CatelogueResource;
use App\Http\Resources\MouvementStockResource;
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
            'produits' => CatelogueResource::collection($produits),
            'mouvmentStocks' => MouvementStockResource::collection($MouvmentStck),
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
            'idBonDeSortieAchats' => 'required|integer|exists:bon_sortie_achats,id',
            'produit' => 'required|integer',
        ]);
        // dd($data);
        Mouvement_stock::create($data);

        return redirect()->route('mouvmentStock.create', ['bonSortie' => $data['idBonDeSortieAchats']])
            ->with('success', 'Mouvement stock created successfully!');
    }

    // Rediriger vers la vue index avec les données nécessaires




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
    public function edit( $mouvement_stock)
    {
        $categorie = Categorie::all();
        $produits = CatelogueProduit::all();
        $mouvements_stock = Mouvement_stock::find($mouvement_stock);

        // dd($mouvements_stock);
        return inertia('MouvmentStock/Edit',
        [
           'mouvementStock' => $mouvements_stock,
           'categories' => CategorieResource::collection($categorie),
            'produits' => CatelogueResource::collection($produits),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMouvement_stockRequest $request, Mouvement_stock $mouvement_stock)
    {
        $data= $request->all();

        $mouvement_stock->update($data);
        return to_route('mouvmentStock.index')->with('success','mouvmentStock was update');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Mouvement_stock $mouvement_stock)
    {
        //
    }
}
