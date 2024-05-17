<?php

namespace App\Http\Controllers;

use App\Models\Magasin;
use App\Http\Requests\StoreMagasinRequest;
use App\Http\Requests\UpdateMagasinRequest;
use App\Http\Resources\MagasinResource;

class MagasinController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $magasins=Magasin::paginate(10);
        return Inertia('Magasin/Index',[
            'magasins' =>MagasinResource::collection($magasins)
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
    public function store(StoreMagasinRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Magasin $magasin)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Magasin $magasin)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMagasinRequest $request, Magasin $magasin)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Magasin $magasin)
    {
        //
    }
}
