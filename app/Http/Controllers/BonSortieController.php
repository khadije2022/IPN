<?php

namespace App\Http\Controllers;

use App\Models\BonSortie;
use App\Models\DetailBonSortie;

use App\Http\Requests\StoreBonSortieRequest;
use App\Http\Requests\UpdateBonSortieRequest;
use App\Http\Resources\BonSortieResource;

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


