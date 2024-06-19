<?php

namespace App\Http\Controllers;

use App\Models\BonAchat;
use App\Models\DetailBonAchat;

use App\Http\Requests\StoreBonAchatRequest;
use App\Http\Requests\UpdateBonAchatRequest;
use App\Http\Resources\BonAchatResource;

use App\Http\Resources\MouvmentStockResource;

use App\Models\MouvmentStock;

use Barryvdh\DomPDF\Facade\Pdf;


class BonAchatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = BonAchat::query();

        // Execute the query with pagination
        $expressionbesoins = $query->paginate(10);

        // Return the Inertia.js response with the expressionbesoins data and any success message from the session
        return inertia('BonAchat/Index', [
            'bonAchats' => BonAchatResource::collection($expressionbesoins),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('BonAchat/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBonAchatRequest $request)
    {
        $data = $request->all();
        $bonAchat = BonAchat::create($data);
        return redirect()->route('detailBonAchat.index-par-bonAchat', ['bonAchat' => $bonAchat->id]);
    }

    /**
     * Display the specified resource.
     */
    public function show(BonAchat $bonAchat)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BonAchat $bonAchat)
    {


        return inertia('BonAchat/Edit',[
            'bonAchat' => $bonAchat
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBonAchatRequest $request, BonAchat $bonAchat)
    {
        $data= $request->all();
        $bonAchat->update($data);
        return to_route('bonAchat.index')->with('success','expressionbesoin was update');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BonAchat $bonAchat)
    {

        $bonAchat->delete();
        return to_route('bonAchat.index')->with('success','expressionbesoin was deleted');
    }


    public function valider($bonAchat){
        $BonAchat = BonAchat::find($bonAchat);


        // Sum the quantities for the given idBonDeSortie
        $totalQuantity = DetailBonAchat::where('idBonAchat', $bonAchat)->sum('quantite');

        // Create a new MouvmentStock record
        $mouvment = new MouvmentStock();
        $mouvment->idBonDeSortie = null;
        $mouvment->idBonAchat = $BonAchat->id; // Set to null or the appropriate value if available
        $mouvment->typeMouvments = 'Achat'; // or any type that you need to define
        $mouvment->stock = $totalQuantity;
        $mouvment->save();




        $mv = MouvmentStock::query();

        $BonAchat->status = 'valider';
        $BonAchat->save();


        // Execute the query with pagination
        $mouvmentStock = $mv->paginate(10);

        return inertia('DetailsMouvement/Index', [
            'mouvmentStocks' => MouvmentStockResource::collection($mouvmentStock),
        ]);
    }
    public function modifier($bonAchat){
        $BonAchat = BonAchat::find($bonAchat);

        if (!$BonAchat) {
            return response()->json(['error' => 'BonSortie not found'], 404);
        }

        MouvmentStock::where('idBonAchat', $BonAchat->id)->delete();

        // Mettre à jour le statut du bon de sortie à non-validé
        $BonAchat->status = 'Non-Valider';
        $BonAchat->save();





        $mv = MouvmentStock::query();
        // Execute the query with pagination
        $mouvmentStock = $mv->paginate(10);

        return inertia('DetailsMouvement/Index', [
            'mouvmentStocks' => MouvmentStockResource::collection($mouvmentStock),
        ]);
    }




    public function exportPdf($idBonAchat)
    {
        $BonAchat = BonAchat::findOrFail($idBonAchat);
    
        $details_BonAchats = DetailBonAchat::with('produits')->where('idBonAchat', $idBonAchat)->get();
    
        $totalQuantite = $details_BonAchats->sum('quantite');
    
        $pdf = Pdf::loadView('pdf.bonachat', [
            'details_BonAchats' => $details_BonAchats,
            'BonAchat' => $BonAchat,
            'totalQuantite' => $totalQuantite
        ])->setPaper('a4');
    
        return $pdf->download('BonAchat.pdf');
    }
    

    // public function exportPdf($idBonAchat)
    // {
    //     $BonAchat = BonAchat::findOrFail($idBonAchat);

    //     $details_BonAchats = DetailBonAchat::with('catelogueProduit')->where('idBonAchat', $idBonAchat)->get();

    //     $totalQuantite = $details_BonAchats->sum('quantite');

    //     $pdf = Pdf::loadView('pdf.bonachat', [
    //     'details_BonAchats' => $details_BonAchats,
    //     'BonAchat' => $BonAchat,
    //     'totalQuantite' => $totalQuantite
    // ])->setPaper('a4');

    //     return $pdf->download('BonAchat.pdf');
    // }

}

