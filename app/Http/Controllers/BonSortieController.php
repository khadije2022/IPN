<?php

namespace App\Http\Controllers;

use App\Models\BonSortie;
use App\Models\DetailBonSortie;
use Illuminate\Support\Facades\DB;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Http\Requests\StoreBonSortieRequest;
use App\Http\Requests\UpdateBonSortieRequest;
use App\Http\Resources\BonSortieResource;
use App\Http\Resources\MouvmentStockResource;

use App\Models\MouvmentStock;

class BonSortieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = BonSortie::query();

        // Execute the query with pagination
        $expressionbesoins = $query->paginate(10);

        // Return the Inertia.js response with the expressionbesoins data and any success message from the session
        return inertia('BonSortieAchat/Index', [
            'bonSorties' => BonSortieResource::collection($expressionbesoins),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('BonSortieAchat/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBonSortieRequest $request)
    {
        $data = $request->all();
        $bonSortie = BonSortie::create($data);
        return redirect()->route('detailBonSortie.index_par_bonSortie', ['bonSortie' => $bonSortie->id]);
    }

    /**
     * Display the specified resource.
     */
    public function show(BonSortie $bonSortie)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BonSortie $bonSortie)
    {
        return inertia('BonSortieAchat/Edit',[
            'bonSortie' => $bonSortie
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBonSortieRequest $request, BonSortie $bonSortie)
    {
        $data= $request->all();
        $bonSortie->update($data);
        return to_route('bonSortie.index')->with('success','bonsortie was update');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BonSortie $bonSortie)
    {
        $bonSortie->delete();
        return to_route('bonSortie.index')->with('success','bonSortie was deleted');
    }


    public function valider($bonSortie){
        $BonSortie = BonSortie::find($bonSortie);

        if (!$BonSortie) {
            return response()->json(['error' => 'BonSortie not found'], 404);
        }

        // Sum the quantities for the given idBonDeSortie
        $totalQuantity = DetailBonSortie::where('idBonDeSortie', $bonSortie)->sum('quantite');

        // Create a new MouvmentStock record
        $mouvment = new MouvmentStock();
        $mouvment->idBonDeSortie = $BonSortie->id;
        $mouvment->idBonAchat = null; // Set to null or the appropriate value if available
        $mouvment->typeMouvments = 'Sortie'; // or any type that you need to define
        $mouvment->stock = $totalQuantity;
        $mouvment->save();




        $mv = MouvmentStock::query();
        $BonSortie->status = 'valider';
        $BonSortie->save();

        DB::table('catelogue_produits AS cp')
        ->join('product_stock AS ps', 'cp.id', '=', 'ps.product_id')
     ->where('cp.id', '=', DB::raw('ps.product_id'))
        ->update(['cp.stock' => DB::raw('ps.stock')]);

        // Execute the query with pagination
        $mouvmentStock = $mv->paginate(10);



        return inertia('DetailsMouvement/Index', [
            'mouvmentStocks' => MouvmentStockResource::collection($mouvmentStock),
        ]);

    }
    public function modifier($bonSortie){
        $BonSortie = BonSortie::find($bonSortie);

        if (!$BonSortie) {
            return response()->json(['error' => 'BonSortie not found'], 404);
        }


        // Create a new MouvmentStock record
        MouvmentStock::where('idBonDeSortie', $BonSortie->id)->delete();

        // Mettre à jour le statut du bon de sortie à non-validé
        $BonSortie->status = 'Non-Valider';
        $BonSortie->save();

        DB::table('catelogue_produits AS cp')
        ->join('product_stock AS ps', 'cp.id', '=', 'ps.product_id')
     ->where('cp.id', '=', DB::raw('ps.product_id'))
        ->update(['cp.stock' => DB::raw('ps.stock')]);

        $mv = MouvmentStock::query();


        // Execute the query with pagination
        $mouvmentStock = $mv->paginate(10);

        return inertia('DetailsMouvement/Index', [
            'mouvmentStocks' => MouvmentStockResource::collection($mouvmentStock),
        ]);
    }

    public function exportPdf($idBonSortie)
    {
        $BonSortie = BonSortie::findOrFail($idBonSortie);

        $details_BonSorties = DetailBonSortie::with('catalogueProduit')
            ->where('idBonSortie', $idBonSortie)
            ->get();

        $totalQuantite = $details_BonSorties->sum('quantite');

        $pdf = Pdf::loadView('pdf.bonachat', [
        'details_BonSorties' => $details_BonSorties,
        'BonSortie' => $BonSortie,
        'totalQuantite' => $totalQuantite
    ])->setPaper('a4');
<<<<<<< HEAD

        return $pdf->download('BonSortie.pdf');

    }
}
=======
>>>>>>> e5afd192c8c7b2c86c0845f664d7dc6f020014fc

        return $pdf->download('BonSortie.pdf');

    }
}