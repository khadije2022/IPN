<?php

namespace App\Http\Controllers;

use App\Http\Resources\BonSortieResource;
use App\Models\BonSortieAchat;
use App\Http\Requests\StoreBonSortieAchatRequest;
use App\Http\Requests\UpdateBonSortieAchatRequest;
use App\Http\Resources\CategorieResource;
use App\Models\Categorie;
use App\Models\CatelogueProduit;
use App\Models\Mouvement_stock;

class BonSortieAchatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = BonSortieAchat::query();

        // Execute the query with pagination
        $expressionbesoins = $query->paginate(10);

        // Return the Inertia.js response with the expressionbesoins data and any success message from the session
        return inertia('/Index', [
            'bonAchats' => BonSortieResource::collection($expressionbesoins),
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
    public function store(StoreBonSortieAchatRequest $request)
    {
        return inertia('BonSortieAchat/Create');
    }

    /**
     * Display the specified resource.
     */
    public function show(BonSortieAchat $bonSortieAchat)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BonSortieAchat $bonSortieAchat)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBonSortieAchatRequest $request, BonSortieAchat $bonSortieAchat)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BonSortieAchat $bonSortieAchat)
    {
        //
    }
}
