<?php

namespace App\Http\Controllers;

use App\Models\BonSortie;
use App\Models\DetailBonSortie;
use Illuminate\Support\Facades\DB;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Http\Requests\StoreDetailBonSortieRequest;
use App\Http\Requests\UpdateDetailBonSortieRequest;
use App\Http\Resources\DetailSortieResource;
use App\Http\Resources\MouvmentStockResource;
use App\Models\MouvmentStock;
use App\Models\Categorie;
use App\Models\CatelogueProduit;
use App\Http\Resources\CategorieResource;



class DetailBonSortieController extends Controller
{
    public function index()
    {
        $query = DetailBonSortie::query();
        $expressionbesoins = $query->paginate(10);
        return inertia('BonSortieAchat/Index', [
            'bonSorties' => DetailSortieResource::collection($expressionbesoins),
            'success' => session('success'),
            'error' => session('error'),

        ]);
    }

    public function index_par_bonSortie($bonSortie)
    {
        $BonSortie = BonSortie::findOrFail($bonSortie);
        $detailsexpresionbesoins = DetailBonSortie::where('idBonDeSortie', $bonSortie)->get();
        $categories = Categorie::all();
        $catelogue_produits = CatelogueProduit::all();

        return inertia('MouvmentStock/Index-par-bonSortie', [
            'detailSorties' => DetailSortieResource::collection($detailsexpresionbesoins),
            'bonSortie' => $bonSortie,
            'BonSortie' => $BonSortie,
            'Status' => $BonSortie->status,
            'success' => session('success'),
            'error' => session('error'),
            'categories' => CategorieResource::collection($categories),
            'produits' => CategorieResource::collection($catelogue_produits),
        ]);
    }

    public function store(StoreDetailBonSortieRequest $request)
    {
        $data = $request->validated();
        $produit = CatelogueProduit::find($data['produit']);
        if ($produit->quantite < $data['quantite']) {
            return redirect()->back()->with('error', 'Quantité demandée supérieure à la quantité disponible.');
        }
        $bonSortie = DetailBonSortie::create($data);
        return redirect()->route('detailBonSortie.index_par_bonSortie', ['bonSortie' => $bonSortie->bonSortie->id])->with('success', 'Bon de sortie créé avec succès.');
    }

    public function update(UpdateDetailBonSortieRequest $request, DetailBonSortie $detailBonSortie)
    {
        $data = $request->validated();
        $detailBonSortie->update($data);
        return redirect()->route('detailBonSortie.index_par_bonSortie', ['bonSortie' => $detailBonSortie->idBonDeSortie])->with('success', 'Le bon de sortie a été mis à jour');
    }

    public function destroy(DetailBonSortie $detailBonSortie)
    {
        $detailBonSortie->delete();
        return redirect()->route('detailBonSortie.index_par_bonSortie', ['bonSortie' => $detailBonSortie->idBonDeSortie])->with('success', 'Le bon de sortie a été supprimé');
    }

    public function valider($bonSortie)
    {
        $BonSortie = BonSortie::find($bonSortie);
        if (!$BonSortie) {
            return response()->json(['error' => 'BonSortie non trouvé'], 404);
        }
        $totalQuantity = DetailBonSortie::where('idBonDeSortie', $bonSortie)->sum('quantite');
        $mouvment = new MouvmentStock();
        $mouvment->idBonDeSortie = $BonSortie->id;
        $mouvment->idBonAchat = null;
        $mouvment->typeMouvments = 'Sortie';
        $mouvment->stock = $totalQuantity;
        $mouvment->save();
        $BonSortie->status = 'valider';
        $BonSortie->save();
        DB::table('catalogue_produits AS cp')
            ->join('product_stock AS ps', 'cp.id', '=', 'ps.product_id')
            ->where('cp.id', '=', DB::raw('ps.product_id'))
            ->update(['cp.stock' => DB::raw('ps.stock')]);
        $mv = MouvmentStock::query();
        $mouvmentStock = $mv->paginate(10);
        return inertia('DetailsMouvement/Index', [
            'mouvmentStocks' => MouvmentStockResource::collection($mouvmentStock),
        ]);
    }

    public function modifier($bonSortie)
    {
        $BonSortie = BonSortie::find($bonSortie);
        if (!$BonSortie) {
            return response()->json(['error' => 'BonSortie non trouvé'], 404);
        }
        MouvmentStock::where('idBonDeSortie', $BonSortie->id)->delete();
        $BonSortie->status = 'Non-Valider';
        $BonSortie->save();
        DB::table('catalogue_produits AS cp')
            ->join('product_stock AS ps', 'cp.id', '=', 'ps.product_id')
            ->where('cp.id', '=', DB::raw('ps.product_id'))
            ->update(['cp.stock' => DB::raw('ps.stock')]);
        $mv = MouvmentStock::query();
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
        return $pdf->download('BonSortie.pdf');
    }
}

