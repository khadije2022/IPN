<?php

namespace App\Http\Controllers;

use App\Models\BonSortie;
use App\Models\DetailBonSortie;
use Illuminate\Support\Facades\DB;
// use Barryvdh\DomPDF\Facade\Pdf;
use App\Http\Requests\StoreBonSortieRequest;
use App\Http\Requests\UpdateBonSortieRequest;
use App\Http\Resources\BonSortieResource;
use App\Http\Resources\MouvmentStockResource;
use Maatwebsite\Excel\Facades\Excel;
use App\Models\MouvmentStock;
use Illuminate\Support\Facades\View; // Correctly import the View facade
use App\Exports\BonSortieExport;
use App\Models\Stock;
use Illuminate\Support\Facades\Auth;
use Mpdf\Mpdf;


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
            'success' => session('success'),
            'valider' => session('valider'),
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
        $data['created_by'] = Auth::id();
        // dd($data);
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
            'bonSortie' => $bonSortie,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBonSortieRequest $request, BonSortie $bonSortie)
    {
        $data= $request->all();
        $bonSortie->update($data);
        return to_route('bonSortie.index')->with('success','Bien modifier');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BonSortie $bonSortie)
    {
        $bonSortie->delete();
        return to_route('bonSortie.index')->with('success','Bien supprimer');
    }


    public function valider($bonSortie){
        $BonSortie = BonSortie::find($bonSortie);

        if (!$BonSortie) {
            return response()->json(['error' => 'Bon Sortie non trouvé'], 404);
        }

        // Sum the quantities for the given idBonDeSortie
        $details = DetailBonSortie::where('idBonDeSortie', $bonSortie)->get();

        // Create a new MouvmentStock record
        foreach ($details as $detail) {
            // Créer un nouvel enregistrement de MouvmentStock pour chaque détail
            $mouvment = new Stock();
            $mouvment->product = $detail->produit;
            $mouvment->typeMouvments = 'Sortie';
            $mouvment->quantity = $detail->quantite;
            $mouvment->date = $BonSortie->created_at;
            $mouvment->save();
        }

        // $mv = MouvmentStock::query();
        $BonSortie->status = 'validé';
        $BonSortie->save();

        DB::table('catelogue_produits AS cp')
        ->join('product_stocks AS ps', 'cp.id', '=', 'ps.product_id')
     ->where('cp.id', '=', DB::raw('ps.product_id'))
        ->update(['cp.stock' => DB::raw('ps.stock'),
        'cp.entre' => DB::raw('ps.entre'),
        'cp.sortie' => DB::raw('ps.sortie'),
    ]);

        // Execute the query with pagination
        // $mouvmentStock = $mv->paginate(10);



        return redirect()->route('detailBonSortie.index_par_bonSortie', ['bonSortie' => $bonSortie])->with('valider', 'Bon de sortie bien validé avec succès.');


    }
    public function modifier($bonSortie){
        $BonSortie = BonSortie::find($bonSortie);

        if (!$BonSortie) {
            return response()->json(['error' => 'BonSortie non trouvé'], 404);
        }


        // Create a new MouvmentStock record
        MouvmentStock::where('idBonDeSortie', $BonSortie->id)->delete();

        // Mettre à jour le statut du bon de sortie à non-validé
        $BonSortie->status = 'non-validé';
        $BonSortie->save();

    //     DB::table('catelogue_produits AS cp')
    //     ->join('product_stock AS ps', 'cp.id', '=', 'ps.product_id')
    //  ->where('cp.id', '=', DB::raw('ps.product_id'))
    //     ->update(['cp.stock' => DB::raw('ps.stock')]);

        $mv = MouvmentStock::query();


        // Execute the query with pagination
        $mouvmentStock = $mv->paginate(10);

        return to_route('detailBonSortie.index_par_bonSortie',['bonSortie' => $bonSortie])->with('success','Bien Modifier le status');
    }

    public function exportPdf($bonSortie)
    {


        $BonSortie = BonSortie::findOrFail($bonSortie);
        $details_BonSorties = DetailBonSortie::with('produits')->where('idBonDeSortie', $bonSortie)->get();
        $totalQuantite = $details_BonSorties->sum('quantite');


        $html = View::make('pdf.bonsortie', [
            'details_BonSorties' => $details_BonSorties,
            'BonSortie' => $BonSortie,
            'totalQuantite' => $totalQuantite
        ])->render();

        try {
            $mpdf = new Mpdf();
            $mpdf->autoScriptToLang = true;
            $mpdf->autoLangToFont = true;
            $mpdf->WriteHTML($html);
            return $mpdf->Output('BonSortie.pdf', 'D');
        } catch (\Mpdf\MpdfException $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function exportExcel()
    {
        $categories = BonSortie::get();
        return Excel::download(new BonSortieExport, 'BonSortie.xlsx');
  }




  public function nonvaliderbonsortie()
  {
      $query = BonSortie::where('status', 'non-validé');
      $bonSorties = $query->paginate(10); // Exécutez la requête avec la pagination

      // Retourner la vue avec les données des bons de sortie
      return inertia('BonSortieAchat/Index', [
          'bonSorties' => BonSortieResource::collection($bonSorties),
      ]);
  }

}
