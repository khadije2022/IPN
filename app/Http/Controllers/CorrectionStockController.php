<?php

namespace App\Http\Controllers;

use App\Models\CorrectionStock;
use App\Http\Requests\StoreCorrectionStockRequest;
use App\Http\Requests\UpdateCorrectionStockRequest;
use App\Http\Resources\CorrectionResource;
use App\Http\Resources\CorrectionStockResource;
use App\Http\Resources\DetailCorrectionStockResource;
use App\Models\DetailCorrectionStock;
use App\Models\Stock;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CorrectionStockController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = CorrectionStock::query();

        // Execute the query with pagination
        $correctionStock = $query->paginate(10);

        // Return the Inertia.js response with the expressionbesoins data and any success message from the session
        return inertia('CorrectionStock/Index', [
            'correctionStocks' => CorrectionStockResource::collection($correctionStock),
            'success' => session('success'),
            'valider' => session('valider'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('CorrectionStock/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCorrectionStockRequest $request)
    {
        $data = $request->all();
        $data['created_by'] = Auth::id();
        $correctionStock = CorrectionStock::create($data);
        return redirect()->route('detailCorrectionStock.correctionStock', ['idCorrection' => $correctionStock->id]);
    }

    /**
     * Display the specified resource.
     */
    public function show(CorrectionStock $correctionStock)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CorrectionStock $correctionStock)
    {
        return inertia('CorrectionStock/Edit',[
            'correctionStock' => $correctionStock,

        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCorrectionStockRequest $request, CorrectionStock $correctionStock)
    {
        $data= $request->all();
        $correctionStock->update($data);
        return to_route('correctionStock.index')->with('success','Bien modifier');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CorrectionStock $correctionStock)
    {
        $correctionStock->delete();
        return to_route('correctionStock.index')->with('success','Bien supprimer');
    }

    public function valider($idCorrection)
    {
        $CorrectionStock = CorrectionStock::find($idCorrection);
        // dd($CorrectionStock->created_at);
        if (!$CorrectionStock) {
            return response()->json(['error' => 'Correction Stock non trouvé'], 404);
        }

        // Récupérer les détails de la correction de stock pour le idCorrection donné
        $details = DetailCorrectionStock::where('idCorrectionStock', $idCorrection)->get();

        // Vérifier si des détails existent
        if ($details->isEmpty()) {
            return response()->json(['error' => 'Aucun détail de correction de stock trouvé'], 404);
        }

        foreach ($details as $detail) {
            // Créer un nouvel enregistrement de MouvmentStock pour chaque détail
            $mouvment = new Stock();
            $mouvment->product = $detail->produit;
            $mouvment->typeMouvments = 'Correction';
            $mouvment->quantity = $detail->quantite;
            $mouvment->date = $CorrectionStock->created_at;
            $mouvment->save();
        }

        $CorrectionStock->status = 'validé';
        $CorrectionStock->save();

        // Mettre à jour les stocks des produits dans la table catalogue_produits

    //     DB::table('catelogue_produits AS cp')
    //     ->join('product_stocks AS ps', 'cp.id', '=', 'ps.product_id')
    //  ->where('cp.id', '=', DB::raw('ps.product_id'))
    //     ->update(['cp.stock' => DB::raw('ps.stock'),
    //     'cp.entre' => DB::raw('ps.entre'),
    //     'cp.sortie' => DB::raw('ps.sortie'),
    // ]);


        return redirect()->route('detailCorrectionStock.correctionStock', ['idCorrection' => $idCorrection])
                         ->with('valider', 'Bon de sortie bien validé avec succès.');
    }

}
