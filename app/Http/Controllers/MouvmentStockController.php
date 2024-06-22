<?php

namespace App\Http\Controllers;

use App\Models\MouvmentStock;
use App\Http\Requests\StoreMouvmentStockRequest;
use App\Http\Requests\UpdateMouvmentStockRequest;
use App\Http\Resources\MouvmentStockResource;

class MouvmentStockController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $mv = MouvmentStock::query();

        // Execute the query with pagination
        $mouvmentStock = $mv->paginate(10);

        return inertia('DetailsMouvement/Index', [
            'mouvmentStocks' => MouvmentStockResource::collection($mouvmentStock),
            'success' => session('success'),
        ]);
    }



    // public function index(Request $request)
    // {
    //     // Get the selected month from the request or use the current month
    //     $month = $request->input('month', now()->format('Y-m'));   

    //     // Parse the month into a Carbon instance
    //     $currentMonth = Carbon::parse($month)->startOfMonth();
    //     $nextMonth = $currentMonth->copy()->addMonth();

    //     $mouvmentStocks = MouvmentStock::paginate(10);

    //     $produits = CatelogueProduit::with(['detailsBonSorties', 'detailsBonAchats'])
    //         ->get()
    //         ->map(function($produit) use ($currentMonth, $nextMonth) {
    //             $produit->quantity_out = $produit->detailsBonSorties->whereBetween('created_at', [$currentMonth, $nextMonth])->sum('quantite');
    //             $produit->quantity_in = $produit->detailsBonAchats->whereBetween('created_at', [$currentMonth, $nextMonth])->sum('quantite');
    //             $produit->stock = $produit->stock ?? 0; // Ensure stock is set to 0 if null
    //             return $produit;
    //         });

    //     return inertia::render('DetailsMouvement/Index', [
    //         'mouvmentStocks' => MouvmentStockResource::collection($mouvmentStocks),
    //         'produits' => $produits,
    //         'selectedMonth' => $month,
    //         'success' => session('success'),
    //     ]);
    // }
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
