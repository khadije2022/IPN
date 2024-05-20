<?php

namespace App\Http\Controllers;

use App\Models\CatelogueProduit;
use App\Http\Requests\StoreCatelogueProduitRequest;
use App\Http\Requests\UpdateCatelogueProduitRequest;

class CatelogueProduitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
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
    public function store(StoreCatelogueProduitRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(CatelogueProduit $catelogueProduit)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CatelogueProduit $catelogueProduit)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCatelogueProduitRequest $request, CatelogueProduit $catelogueProduit)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CatelogueProduit $catelogueProduit)
    {
        //
    }
}
