<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use App\Http\Requests\StoreCategorieRequest;
use App\Http\Requests\UpdateCategorieRequest;
use App\Http\Resources\CategorieResource;
use Inertia\Inertia;

class CategorieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Categorie::paginate(10);

        return Inertia::render('Categorie/Index', [
            // 'categories' => CategorieResource::collection($categories),
            'success' => session('success')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia("Categorie/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store( $request)
    {
        $data=$request->validated();
        Categorie::create($data);

        return to_route('categorie.index')->with('success','Categorie was create');
    }

    /**
     * Display the specified resource.
     */
    public function show(Categorie $categorie)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Categorie $categorie)
    {
        return Inertia('Categorie/Edit',[
            'categorie' => $categorie
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update( $request, Categorie $categorie)
    {
        $data= $request->all();

        $categorie->update($data);
        return to_route('categorie.index')->with('success','Categorie was update');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Categorie $categorie)
    {
        $categorie->delete();
        return to_route('categorie.index')->with('success','Categorie was deleted');
    }
}
