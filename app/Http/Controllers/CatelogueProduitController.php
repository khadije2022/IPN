<?php

namespace App\Http\Controllers;

use App\Models\CatelogueProduit;
use App\Http\Requests\StoreCatelogueProduitRequest;
use App\Http\Requests\UpdateCatelogueProduitRequest;
use App\Http\Resources\CategorieResource;
use App\Http\Resources\CatelogueResource;
use App\Models\Categorie;
use App\Models\DetailBonAchat;
use App\Models\DetailBonSortie;
use App\Models\MouvmentStock;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\CatalogueProduitExport;



class CatelogueProduitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
   public function index()
{
    $categories = Categorie::all();
    $produits = CatelogueProduit::all();

    // Base query to get product movements and calculate total_entree, total_sortie, and stock
    $query = DB::table('catelogue_produits')
        ->leftJoin('ipn.product_movements', 'catelogue_produits.id', '=', 'product_movements.product_id')
        ->join('categories', 'catelogue_produits.type', '=', 'categories.id')
        ->select(
            'catelogue_produits.id as product_id',
            'catelogue_produits.designation as product_name',
            'categories.type as category_name',
            'categories.id as category_id',
            DB::raw("SUM(CASE
                WHEN detail_type COLLATE utf8mb4_unicode_ci IN ('achat', 'correction_entree') THEN quantite
                ELSE 0
            END) AS total_entree"),
            DB::raw("SUM(CASE
                WHEN detail_type COLLATE utf8mb4_unicode_ci = 'sortie' THEN -quantite
                WHEN detail_type COLLATE utf8mb4_unicode_ci = 'correction_sortie' THEN quantite
                ELSE 0
            END) AS total_sortie"),
            DB::raw("SUM(CASE
                WHEN detail_type COLLATE utf8mb4_unicode_ci IN ('achat', 'correction_entree') THEN quantite
                WHEN detail_type COLLATE utf8mb4_unicode_ci = 'sortie' THEN -quantite
                WHEN detail_type COLLATE utf8mb4_unicode_ci = 'correction_sortie' THEN quantite
                ELSE 0
            END) AS stock")
        )
        ->groupBy('catelogue_produits.id', 'catelogue_produits.designation', 'categories.type');

    // Handle search by product name
    if (request()->has('product_name') && request('product_name') !== '') {
        $query->where('catelogue_produits.designation', 'like', '%' . request('product_name') . '%');
    }

    // Handle search by date range
    if (request()->has('start_date') && request()->has('end_date') && request('start_date') !== '' && request('end_date') !== '') {
        $start_date = request('start_date');
        $end_date = request('end_date');

        // Filter product movements by date range
        $query->whereBetween('product_movements.date', [$start_date, $end_date]);
    }

    // Paginate the results
    $products = $query->paginate(10)->appends(request()->query());

    // Return the data to the Inertia.js view
    return inertia('CatelogueProduit/Index', [
        'produits' => CatelogueResource::collection($produits),
        'categories' => CategorieResource::collection($categories),
        'success' => session('success'),
        'ent' => $products,
        'queryParams' => request()->query() ?: null
    ]);
}







    public function store(StoreCatelogueProduitRequest $request)
    {
        $data = $request->all();
        $data['stock'] = 0; // Initialiser le stock à 0
        CatelogueProduit::create($data);

        return to_route('catelogueProduit.index')->with('success', "Le produit a été créé avec succès");
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCatelogueProduitRequest $request, CatelogueProduit $catelogueProduit)
    {
        $data = $request->all();
        $catelogueProduit->update($data);
        return to_route('catelogueProduit.index')->with('success', "Le produit a été mis à jour avec succès");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CatelogueProduit $catelogueProduit)
    {
        $catelogueProduit->delete();
        return to_route('catelogueProduit.index')->with('success', 'Le produit a été supprimé avec succès');
    }




public function exportExcel()
    {
        $categories = CatelogueProduit::get();
        return Excel::download(new CatalogueProduitExport(), 'Produits.xlsx');
    }


}

