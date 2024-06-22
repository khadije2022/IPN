<?php

namespace App\Http\Controllers;

use App\Models\MouvmentStock;
use App\Http\Requests\StoreMouvmentStockRequest;
use App\Http\Requests\UpdateMouvmentStockRequest;
use App\Http\Resources\MouvmentStockResource;
use App\Models\CatelogueProduit;

class MouvmentStockController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $mouvmentStocks = MouvmentStock::paginate(10);
    
        $produits = CatelogueProduit::with(['detailsBonSorties', 'detailsBonAchats'])
            ->get()
            ->map(function($produit) {
                $currentMonth = now()->startOfMonth();
                $produit->quantity_out = $produit->detailsBonSorties->where('created_at', '>=', $currentMonth)->sum('quantite');
                $produit->quantity_in = $produit->detailsBonAchats->where('created_at', '>=', $currentMonth)->sum('quantite');
                $produit->stock = $produit->stock ?? 0; // Ensure stock is set
                return $produit;
            });
    
        return inertia('DetailsMouvement/Index', [
            'mouvmentStocks' => MouvmentStockResource::collection($mouvmentStocks),
            'produits' => $produits,
            'success' => session('success'),
        ]);
    }
    

    

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMouvmentStockRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(MouvmentStock $mouvmentStock)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MouvmentStock $mouvmentStock)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMouvmentStockRequest $request, MouvmentStock $mouvmentStock)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MouvmentStock $mouvmentStock)
    {
        //
    }
}
