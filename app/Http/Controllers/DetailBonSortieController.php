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
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\DetailBonSortieExport;
use App\Http\Resources\CatelogueResource;

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
            'detailBonSorties' => DetailSortieResource::collection($detailsexpresionbesoins),
            'bonSortie' => $bonSortie,
            'BonSortie' => $BonSortie,
            'Status' => $BonSortie->status,
            'success' => session('success'),
            'error' => session('error'),
            'valider' => session('valider'),
            'categories' => CategorieResource::collection($categories),
            'produits' => CatelogueResource::collection($catelogue_produits),
        ]);
    }


    public function store(StoreDetailBonSortieRequest $request)
    {
        $data = $request->validated();

        // Vérifier si le produit existe déjà pour ce bon de sortie
        $exists = DetailBonSortie::where('produit', $data['produit'])
                                ->where('idBonDeSortie', $data['idBonDeSortie'])
                                ->exists();

        if ($exists) {
            return redirect()->route('detailBonSortie.index_par_bonSortie', ['bonSortie' => $data['idBonDeSortie']])
                             ->with(['error' => 'Le produit existe déjà pour ce bon de sortie.']);
        }

        // Vérifier si la quantité demandée est disponible
        $produit = CatelogueProduit::find($data['produit']);
        if ($produit['stock'] < $data['quantite']) {
            return redirect()->route('detailBonSortie.index_par_bonSortie', ['bonSortie' => $data['idBonDeSortie']])
                             ->with(['error' => 'Quantité demandée supérieure à la quantité disponible.']);
        }

        // Créer un nouveau détail bon sortie
        DetailBonSortie::create($data);

        return redirect()->route('detailBonSortie.index_par_bonSortie', ['bonSortie' => $data['idBonDeSortie']])
                         ->with('success', 'Bon de sortie créé avec succès.');
    }



    // public function edit(DetailBonSortie $detailBonSortie)
    // {
    //     $categorie = Categorie::all();
    //     $produits = CatelogueProduit::all();

    //     return inertia('detailBonAchat/Edit', [
    //        'detailBonAchat' => $detailBonAchat,
    //        'categories' => CategorieResource::collection($categorie),
    //         'produits' => CatelogueResource::collection($produits),
    //     ]);
    // }


    public function update(UpdateDetailBonSortieRequest $request, DetailBonSortie $detailBonSortie)
    {
        $data = $request->all();
        // dd($data);
        $detailBonSortie->update($data);
        return redirect()->route('detailBonSortie.index_par_bonSortie', ['bonSortie' => $detailBonSortie->idBonDeSortie])->with('success', 'Le detail a été mis à jour');
    }

    public function destroy(DetailBonSortie $detailBonSortie)
    {
        $detailBonSortie->delete();
        return redirect()->route('detailBonSortie.index_par_bonSortie', ['bonSortie' => $detailBonSortie->idBonDeSortie])->with('success', 'Le detail a été supprimé');
    }

    public function exportExcel($bonSortie)
    {
        return Excel::download(new DetailBonSortieExport($bonSortie), 'Details_BonSortie.xlsx');
    }




    public function exportPdf($idBonSortie)
    {
        $BonSortie = BonSortie::findOrFail($idBonSortie);
        $details_BonSorties = DetailBonSortie::with('catalogueProduit')
            ->where('idBonSortie', $idBonSortie)
            ->get();
        $totalQuantite = $details_BonSorties->sum('quantite');
        $pdf = Pdf::loadView('pdf.bonsortie', [
            'details_BonSorties' => $details_BonSorties,
            'BonSortie' => $BonSortie,
            'totalQuantite' => $totalQuantite
        ])->setPaper('a4');
        return $pdf->download('BonSortie.pdf');
    }
}

