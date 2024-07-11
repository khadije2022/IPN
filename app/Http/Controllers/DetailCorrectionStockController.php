<?php

namespace App\Http\Controllers;

use App\Models\DetailCorrectionStock;
use App\Http\Requests\StoreDetailCorrectionStockRequest;
use App\Http\Requests\UpdateDetailCorrectionStockRequest;
use App\Http\Resources\CategorieResource;
use App\Http\Resources\CatelogueResource;
use App\Http\Resources\DetailCorrectionStockResource;
use App\Models\Categorie;
use App\Models\CatelogueProduit;
use App\Models\CorrectionStock;
use Illuminate\Support\Facades\DB;

class DetailCorrectionStockController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create($idCorrection)
    {
        $categorie = Categorie::all();
        $produits = CatelogueProduit::all();

        return inertia('detailBonAchat/Create',[
            'categories' => CategorieResource::collection($categorie),
            'produits' => CatelogueResource::collection($produits),
            'corrctionStock' => $idCorrection
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDetailCorrectionStockRequest $request)
{
    // Afficher toutes les données de la requête pour débogage
    // dd($request->all());

    // Valider les données de la requête
    $data = $request->validate([
        'quantite' => 'required|integer',
        'produit' => 'required|integer',
        'typeMouvment' => 'required|string',
        'idCorrectionStock' => 'required|integer|exists:correction_stocks,id',
    ]);

    // Afficher les données validées pour débogage
    // dd($data);

    // Vérifier si le produit existe déjà pour cette correction de stock
    $exists = DetailCorrectionStock::where('produit', $data['produit'])
                                    ->where('idCorrectionStock', $data['idCorrectionStock'])
                                    ->exists();

    if ($exists) {
        return redirect()->route('detailCorrectionStock.correctionStock', ['idCorrection' => $data['idCorrectionStock']])
                         ->with(['error' => 'Le produit existe déjà pour cette correction de stock.']);
    }

    // Récupérer la quantité disponible pour le produit dans la table catelogue_produits
    $produit = DB::table('catelogue_produits')->where('id', $data['produit'])->first();

    // Vérifier si le produit existe dans la table catelogue_produits
    if (!$produit) {
        return redirect()->route('detailCorrectionStock.correctionStock', ['idCorrection' => $data['idCorrectionStock']])
                         ->with(['error' => 'Le produit n\'existe pas dans le catalogue.']);
    }

    // Vérifier si la quantité de sortie demandée est inférieure ou égale à la quantité disponible
    if ($data['typeMouvment'] === 'sortie' && $produit->stock < $data['quantite']) {
        return redirect()->route('detailCorrectionStock.correctionStock', ['idCorrection' => $data['idCorrectionStock']])
                         ->with(['error' => 'La quantité demandée pour la sortie dépasse la quantité disponible dans le stock.']);
    }

    // Ajuster la quantité en fonction du type de mouvement
    if ($data['typeMouvment'] === 'sortie') {
        $data['quantite'] = -abs($data['quantite']); // Mettre la quantité en négatif
    } else if ($data['typeMouvment'] === 'entré') {
        $data['quantite'] = abs($data['quantite']); // Mettre la quantité en positif
    } else {
        return redirect()->route('detailCorrectionStock.correctionStock', ['idCorrection' => $data['idCorrectionStock']])
                         ->with(['error' => 'Type de mouvement invalide.']);
    }

    // Créer un nouveau détail de correction de stock
    DetailCorrectionStock::create($data);

    return redirect()->route('detailCorrectionStock.correctionStock', ['idCorrection' => $data['idCorrectionStock']])
                     ->with('success', 'Détail de correction de stock créé avec succès.');
}


    /**
     * Display the specified resource.
     */
    public function show(DetailCorrectionStock $detailCorrectionStock , $idCorrection)
    {
        $CorrectionStock = CorrectionStock::findOrFail($idCorrection);
        $detailCorrectionStocks = DetailCorrectionStock::where('idCorrectionStock', $idCorrection)->get();

        $categories = Categorie::all();
        $catelogue_produits = CatelogueProduit::all();

        return inertia('detailCorrectionStock/Index-par-Correction', [
            'detailCorrectionStocks' => DetailCorrectionStockResource::collection($detailCorrectionStocks),
            'correctionStock' => $idCorrection,
            'CorrectionStock' => $CorrectionStock,
            'Status' => $CorrectionStock->status,
            'success' => session('success'),
            'error' => session('error'),
            'valider' => session('valider'),
            'categories' => CategorieResource::collection($categories),
            'produits' => CatelogueResource::collection($catelogue_produits),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(DetailCorrectionStock $detailCorrectionStock)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDetailCorrectionStockRequest $request, DetailCorrectionStock $detailCorrectionStock)
    {
        $data= $request->all();

        $detailCorrectionStock->update($data);

        return to_route('detailCorrectionStock.correctionStock',['idCorrection' => $data['idCorrectionStock']])->with('success','Bien modifié');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DetailCorrectionStock $detailCorrectionStock)
    {
        $detailCorrectionStock->delete();
        return to_route('detailCorrectionStock.correctionStock',['idCorrection' => $detailCorrectionStock['idCorrectionStock']])->with('success','Bien supprimé');
    }
}
