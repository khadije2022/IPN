<?php

namespace App\Http\Controllers;

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
        return inertia('BonSortieAchat/Create');
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
        $data = $request->all();
        $bonSortie = BonSortieAchat::create($data);
        return redirect()->route('mouvmentStock.create', ['bonSortie' => $bonSortie->id]);
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
