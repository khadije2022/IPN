<?php

namespace App\Http\Controllers;

use App\Models\DetailBonAchat;
use App\Http\Requests\StoreDetailBonAchatRequest;
use App\Http\Requests\UpdateDetailBonAchatRequest;
use App\Http\Resources\CategorieResource;
use App\Http\Resources\CatelogueResource;
use App\Http\Resources\DetailBonAchatResource;
use App\Models\BonAchat;
use App\Models\Categorie;
use App\Models\CatelogueProduit;


class DetailBonAchatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = DetailBonAchat::query();

         // Execute the query with pagination
         $detailsexpresionbesoins = $query->paginate(10);
         $d=DetailBonAchatResource::collection($detailsexpresionbesoins);


         // Return the Inertia.js response with the detailsexpresionbesoins data and any success message from the session
         return inertia('detailBonAchat/Index', [
             'detailBonAchats' => DetailBonAchatResource::collection($detailsexpresionbesoins),
         ]);
    }


    public function index_par_bonAchat($bonAchat)
    {
        $BonAchat = BonAchat::findOrFail($bonAchat);

        $detailsexpresionbesoins = DetailBonAchat::where('idBonAchat', $bonAchat)->get();

        $categories = Categorie::all();
        $catelogue_produits = CatelogueProduit::all();

        return inertia('detailBonAchat/Index-par-bonAchat', [
            'detailBonAchats' => DetailBonAchatResource::collection($detailsexpresionbesoins),
            'bonAchat' => $bonAchat,
            'Status' => $BonAchat->status,
            'categories' => CategorieResource::collection($categories),
            'produits' => CategorieResource::collection($catelogue_produits)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create($bonAchat)
    {
        $categorie = Categorie::all();
        $produits = CatelogueProduit::all();
        // $MouvmentStck = DetailBonAchat::query()
        //     ->where('idBonAchat', $bonAchat)
        //     ->get();

        return inertia('detailBonAchat/Create',[
            'categories' => CategorieResource::collection($categorie),
            'produits' => CatelogueResource::collection($produits),
            // 'detailBonAchats' => DetailBonAchatResource::Collection($MouvmentStck),
            'bonAchat' => $bonAchat
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDetailBonAchatRequest $request)
    {
        $data = $request->validate([
            'quantite' => 'required|integer',
            'produit' => 'required|integer',
            'idBonAchat' => 'required|integer|exists:bon_achats,id',
            'prix' => 'required|numeric',
        ]);

        DetailBonAchat::create($data);

        return redirect()->route('detailBonAchat.index-par-bonAchat', ['bonAchat' => $data['idBonAchat']])
            ->with('success', 'Mouvement stock created successfully!');
    }


    /**
     * Display the specified resource.
     */
    public function show(DetailBonAchat $detailBonAchat)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(DetailBonAchat $detailBonAchat)
    {
        $categorie = Categorie::all();
        $produits = CatelogueProduit::all();


        // dd($mouvements_stock);
        return inertia('detailBonAchat/Edit',
        [
           'detailBonAchat' => $detailBonAchat,
           'categories' => CategorieResource::collection($categorie),
            'produits' => CatelogueResource::collection($produits),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDetailBonAchatRequest $request, DetailBonAchat $detailBonAchat)
    {
        $data= $request->all();

        $detailBonAchat->update($data);

        return to_route('detailBonAchat.index-par-bonAchat',['bonAchat' => $data['idBonAchat']])->with('success','mouvmentStock was update');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DetailBonAchat $detailBonAchat)
    {
        dd($detailBonAchat);
        $detailBonAchat->delete();
        return redirect()->route('detailBonAchat.index-par-bonAchat', ['bonAchat' => $detailBonAchat->idBonAchat]);
    }
}
