<?php

namespace App\Http\Controllers;

use App\Models\BonAchat;
use App\Http\Requests\StoreBonAchatRequest;
use App\Http\Requests\UpdateBonAchatRequest;
use App\Http\Resources\BonAchatResource;

class BonAchatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = BonAchat::query();

        // Execute the query with pagination
        $expressionbesoins = $query->paginate(10);

        // Return the Inertia.js response with the expressionbesoins data and any success message from the session
        return inertia('BonAchat/Index', [
            'bonAchats' => BonAchatResource::collection($expressionbesoins),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('BonAchat/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBonAchatRequest $request)
    {
        $data = $request->all();
        $bonAchat = BonAchat::create($data);
        return redirect()->route('detailBonAchat.index-par-bonAchat', ['bonAchat' => $bonAchat->id]);
    }

    /**
     * Display the specified resource.
     */
    public function show(BonAchat $bonAchat)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BonAchat $bonAchat)
    {
        

        return inertia('BonAchat/Edit',[
            'bonAchat' => $bonAchat
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBonAchatRequest $request, BonAchat $bonAchat)
    {
        $data= $request->all();
        $bonAchat->update($data);
        return to_route('bonAchat.index')->with('success','expressionbesoin was update');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BonAchat $bonAchat)
    {

        $bonAchat->delete();
        return to_route('bonAchat.index')->with('success','expressionbesoin was deleted');
    }
}

