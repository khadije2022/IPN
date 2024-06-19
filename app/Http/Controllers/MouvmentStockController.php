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
