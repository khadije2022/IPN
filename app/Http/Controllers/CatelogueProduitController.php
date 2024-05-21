<?php

namespace App\Http\Controllers;

use App\Models\CatelogueProduit;
use App\Http\Requests\StoreCatelogueProduitRequest;
use App\Http\Requests\UpdateCatelogueProduitRequest;
use App\Http\Resources\CategorieResource;
use App\Http\Resources\CatelogueResource;
use App\Models\Categorie;
use Illuminate\Support\Facades\DB;

class CatelogueProduitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()

    {
        $query = CatelogueProduit::query();


        // Execute the query with pagination
        $Produits = $query->paginate(10);
        // dd(CatelogueResource::collection($Produits));
        return inertia('CatelogueProduit/Index',[
            'produits' => CatelogueResource::collection($Produits),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        $categories = Categorie::all();



return inertia('CatelogueProduit/Create', [
    'categories' => CategorieResource::collection($categories),
]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCatelogueProduitRequest $request)
    {
        $data = $request->all();
        $produit = CatelogueProduit::create($data);

        return to_route('catelogueProduit.index')->with('success',"was created");
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
        $categories = Categorie::all();

        // dd($catelogueProduit);
        return inertia('CatelogueProduit/Edit',[
            'produit' =>$catelogueProduit,
            'categories' => CategorieResource::collection($categories),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCatelogueProduitRequest $request, CatelogueProduit $catelogueProduit)
    {
        $data = $request->all();
        $catelogueProduit->update($data);
        return to_route('catelogueProduit.index')->with('succes',"was created");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CatelogueProduit $catelogueProduit)
    {
        $catelogueProduit->delete();
        return to_route('catelogueProduit.index')->with('success','produits was deleted');
    }
}
