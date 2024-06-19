<?php

namespace App\Http\Controllers;

use App\Http\Resources\CatelogueResource;
use App\Models\DetailBonSortie;
use App\Http\Requests\StoreDetailBonSortieRequest;
use App\Http\Requests\UpdateDetailBonSortieRequest;
use App\Http\Resources\CategorieResource;
use App\Http\Resources\DetailSortieResource;
use App\Models\BonSortie;
use App\Models\Categorie;
use App\Models\CatelogueProduit;

class DetailBonSortieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = DetailBonSortie::query();
        dd($query);
        // Execute the query with pagination
        $detailsexpresionbesoins = $query->paginate(10);
        // $d=DetailBonAchatResource::collection($detailsexpresionbesoins);


        // Return the Inertia.js response with the detailsexpresionbesoins data and any success message from the session
        return inertia('MouvmentStock/Index', [
            'detailBonSorties' => DetailSortieResource::collection($detailsexpresionbesoins),
        ]);

    }


    public function index_par_bonSortie($bonSortie)
    {
        $Bonsortie = BonSortie::findOrFail($bonSortie);

        $detailsexpresionbesoins = DetailBonSortie::where('idBonDeSortie', $bonSortie)->get();

        $categories = Categorie::all();
        $catelogue_produits = CatelogueProduit::all();

        return inertia('MouvmentStock/Index-par-bonSortie', [
            'detailBonSorties' => DetailSortieResource::collection($detailsexpresionbesoins),
            'expressionbesoin' => $Bonsortie,
            'bonSortie' => $bonSortie,
            'Status' => $Bonsortie->status,
            'categories' => CategorieResource::collection($categories),
            'produits' => CategorieResource::collection($catelogue_produits)
        ]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create($bonSortie)
    {
        $categorie = Categorie::all();
        $produits = CatelogueProduit::all();


            return inertia('MouvmentStock/Create',[
                'categories' => CategorieResource::collection($categorie),
                'produits' => CatelogueResource::collection($produits),
                // 'detailBonAchats' => DetailBonAchatResource::Collection($MouvmentStck),
                'bonSortie' => $bonSortie,
            ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDetailBonSortieRequest $request)
    {
        // Valider les données entrantes
        $data = $request->validate([
            'quantite' => 'required|integer',
            'idBonDeSortie' => 'required|integer|exists:bon_sorties,id',
            'produit' => 'required|integer|exists:catelogue_produits,id', // Assurez-vous que le produit existe
        ]);
    
        // Récupérer le produit de la base de données
        $produit = CatelogueProduit::findOrFail($data['produit']);

        // Vérifier si la quantité demandée est disponible en stock
        if ($produit->stock >= $data['quantite']) {
            // Si le stock est suffisant, créer le détail
            DetailBonSortie::create($data);

            return redirect()->route('detailBonSortie.index_par_bonSortie', ['bonSortie' => $data['idBonDeSortie']])
                ->with('success', 'Details created successfully!');
        } else {
            // Si le stock n'est pas suffisant, renvoyer un message d'erreur
            return redirect()->route('detailBonSortie.index_par_bonSortie', ['bonSortie' => $data['idBonDeSortie']])
            ->with('success', 'Stock insuffisant pour le produit sélectionné.');
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(DetailBonSortie $detailBonSortie)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(DetailBonSortie $detailBonSortie)
    {
        $categorie = Categorie::all();
        $produits = CatelogueProduit::all();


        // dd($mouvements_stock);
        return inertia('MouvmentStock/Edit',
        [
            'detailBonSortie' => $detailBonSortie,
            'categories' => CategorieResource::collection($categorie),
             'produits' => CatelogueResource::collection($produits),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDetailBonSortieRequest $request, DetailBonSortie $detailBonSortie)
    {
        $data= $request->all();

        $detailBonSortie->update($data);

        return to_route('detailBonSortie.index_par_bonSortie',['bonSortie' => $data['idBonDeSortie']])->with('success','mouvmentStock was update');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DetailBonSortie $detailBonSortie)
    {


        $detailBonSortie->delete();
        return redirect()->route('detailBonSortie.index_par_bonSortie', ['bonSortie' => $detailBonSortie->idBonDeSortie]);
    }


    public function valider($bonSortie){

    }
}


