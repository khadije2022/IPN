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
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\View; // Correctly import the View facade
use Maatwebsite\Excel\Facades\Excel;
use Mpdf\Mpdf;
use App\Exports\BonAchatExport;






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
            'success' => session('success'),
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
        return redirect()->route('detailBonAchat.index-par-bonAchat',
         ['bonAchat' => $bonAchat->id],
        );
    }


    public function show(BonAchat $bonAchat)
    {

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BonAchat $bonAchat)
    {

        return inertia('BonAchat/Edit',[
            'bonAchat' => $bonAchat,

        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBonAchatRequest $request, BonAchat $bonAchat)
    {
        $data= $request->all();
        $bonAchat->update($data);
        return to_route('bonAchat.index')->with('success','Bien modifier');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BonAchat $bonAchat)
    {
        $bonAchat->delete();
        return to_route('bonAchat.index')->with('success','Bien supprimer');
    }


    public function valider($bonAchat){

        $BonAchat = BonAchat::find($bonAchat);
        $totalQuantity = DetailBonAchat::where('idBonAchat', $bonAchat)->sum('quantite');
        // Create a new MouvmentStock record
        $mouvment = new MouvmentStock();
        $mouvment->idBonDeSortie = null;
        $mouvment->idBonAchat = $BonAchat->id; // Set to null or the appropriate value if available
        $mouvment->typeMouvments = 'Achat'; // or any type that you need to define
        $mouvment->stock = $totalQuantity;
        $mouvment->save();
        $mv = MouvmentStock::query();
        $BonAchat->status = 'validé';
        $BonAchat->save();
        DB::table('catelogue_produits AS cp')
        ->join('product_stock AS ps', 'cp.id', '=', 'ps.product_id')
     ->where('cp.id', '=', DB::raw('ps.product_id'))
        ->update(['cp.stock' => DB::raw('ps.stock')]);


        // Execute the query with pagination
        $mouvmentStock = $mv->paginate(10);

        return redirect()->route('detailBonAchat.index-par-bonAchat', ['bonAchat' => $bonAchat])
        ->with('valider', 'Bon de Achat bien validé avec succès');
    }


    public function modifier($bonAchat){
        $BonAchat = BonAchat::find($bonAchat);

        if (!$BonAchat) {
            return response()->json(['error' => 'Bon Achat non trouvé '], 404);
        }

        MouvmentStock::where('idBonAchat', $BonAchat->id)->delete();

        // Mettre à jour le statut du bon de sortie à non-validé
        $BonAchat->status = 'non-validé';
        $BonAchat->save();


        $mv = MouvmentStock::query();
        // Execute the query with pagination
        $mouvmentStock = $mv->paginate(10);
        return to_route('bonAchat.index')->with('success',"Bien Modifier le status");
    }



    public function exportPdf($bonAchat)
{
    $BonAchat = BonAchat::findOrFail($bonAchat);

    $details_BonAchats = DetailBonAchat::with('produits')->where('idBonAchat', $bonAchat)->get();

    $totalQuantite = $details_BonAchats->sum('quantite');

    $html = View::make('pdf.bonachat', [
        'details_BonAchats' => $details_BonAchats,
        'BonAchat' => $BonAchat,
        'totalQuantite' => $totalQuantite
    ])->render();

    try {
        $mpdf = new \Mpdf\Mpdf();
        $mpdf->autoScriptToLang = true;
        $mpdf->autoLangToFont = true;
        $mpdf->WriteHTML($html);
        return $mpdf->Output('BonAchat.pdf', 'D');
    } catch (\Mpdf\MpdfException $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
}




    public function exportExcel()
    {
        $categories = BonAchat::get();
        return Excel::download(new BonAchatExport, 'BonAchat.xlsx');
    }
}

