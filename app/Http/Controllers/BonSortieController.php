<?php

namespace App\Http\Controllers;

use App\Models\BonSortie;
use App\Models\DetailBonSortie;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\StoreBonSortieRequest;
use App\Http\Requests\UpdateBonSortieRequest;
use App\Http\Resources\BonSortieResource;
use App\Http\Resources\MouvmentStockResource;
use Maatwebsite\Excel\Facades\Excel;
use App\Models\MouvmentStock;
use Illuminate\Support\Facades\View;
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
        return inertia('BonSortieAchat/Edit', [
            'bonSortie' => $bonSortie,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBonSortieRequest $request, BonSortie $bonSortie)
    {
        $data = $request->all();
        $bonSortie->update($data);
        return to_route('bonSortie.index')->with('success', 'Bien modifié');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BonSortie $bonSortie)
    {
        $bonSortie->delete();
        return to_route('bonSortie.index')->with('success', 'Bien supprimé');
    }

    public function valider($bonSortie)
    {
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

        $BonSortie->status = 'validé';
        $BonSortie->save();

        DB::table('catelogue_produits AS cp')
            ->join('product_stocks AS ps', 'cp.id', '=', 'ps.product_id')
            ->where('cp.id', '=', DB::raw('ps.product_id'))
            ->update([
                'cp.stock' => DB::raw('ps.stock'),
                'cp.entre' => DB::raw('ps.entre'),
                'cp.sortie' => DB::raw('ps.sortie'),
            ]);

        return redirect()->route('detailBonSortie.index_par_bonSortie', ['bonSortie' => $bonSortie])->with('valider', 'Bon de sortie bien validé avec succès.');
    }

    public function modifier($bonSortie)
    {
        $BonSortie = BonSortie::find($bonSortie);

        if (!$BonSortie) {
            return response()->json(['error' => 'BonSortie non trouvé'], 404);
        }

        // Delete the MouvmentStock records associated with the BonSortie
        MouvmentStock::where('idBonDeSortie', $BonSortie->id)->delete();

        // Update the status of the BonSortie to non-validé
        $BonSortie->status = 'non-validé';
        $BonSortie->save();

        return to_route('detailBonSortie.index_par_bonSortie', ['bonSortie' => $bonSortie])->with('success', 'Bien modifié le statut');
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
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Erreur lors de la génération du PDF']);
        }
    }

    public function exportExcel()
    {
        return Excel::download(new BonSortieExport, 'BonSortie.xlsx');
    }

    public function nonvaliderbonsortie()
    {
        $query = BonSortie::where('status', 'non-validé');
        $bonSorties = $query->paginate(10);

        // Return the view with the data of the BonSorties
        return inertia('BonSortieAchat/Index', [
            'bonSorties' => BonSortieResource::collection($bonSorties),
        ]);
    }
}
