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
    $query = Magasin::query();

    $sortField = request("sort_field", 'created_at');
    $sortDirection = request("sort_direction", "desc");

    if (request("nomMagasin")) {
        $query->where("nomMagasin", "like", "%" . request("nomMagasin") . "%");
    }

    $magasins = $query->orderBy($sortField, $sortDirection)
        ->paginate(10)
        ->onEachSide(1);
    return inertia("Magasin/Index", [
        'magasins' => MagasinResource::collection($magasins),
        'queryParams' => request()->query() ?: null,
        'success' => session('success'),
    ]);
}



    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Magasin/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMagasinRequest $request)
    {
        $data = $request->all();
        Magasin::create($data);
        return to_route('magasin.index')
            ->with('success' , 'Vous avez cree votre magasin');
    }

    /**
     * Display the specified resource.
     */
    public function show(Magasin $magasin)
    {
        
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Magasin $magasin)
    {
        return inertia('Magasin/Edit' , [
            'magasin' => $magasin,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMagasinRequest $request, Magasin $magasin)
    {
        $magasin->update($request->all());
        return to_route('magasin.index')
            ->with('success', "Vous avez modifier votre Magasin .");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Magasin $magasin)
    {
        $magasin->delete();
        return to_route('magasin.index')
        ->with('success', "Vous avez supprimer votre Magasin .");
    }
}
