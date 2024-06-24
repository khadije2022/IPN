<?php

namespace App\Http\Controllers;

use App\Http\Resources\Details_ExpBesoinResource;
use App\Models\Details_ExpBesoin;
use App\Models\Categorie;
use App\Models\CatelogueProduit;
use App\Models\ExpressionBesoin;
use Barryvdh\DomPDF\Facade\Pdf;
use Mpdf\Mpdf;
use App\Exports\DetailExpressionBesoinExport;
use App\Http\Requests\StoreDetails_ExpBesoinRequest;
use App\Http\Requests\UpdateDetails_ExpBesoinRequest;

use App\Http\Resources\CategorieResource;
use App\Http\Resources\CatelogueResource;
use Maatwebsite\Excel\Facades\Excel;




class Details_ExpBesoinController extends Controller
{
    /**
     * Display a listing of the resource.
     */

     public function index()
     {
         // Initialize the query builder for the detailsexpresionbesoin model
         $query = Details_ExpBesoin::query();
          // Assurez-vous de charger les relations

         // Execute the query with pagination
         $detailsexpresionbesoins = $query->paginate(10);
         $categories = Categorie::all();
         $catelogue_produits = CatelogueProduit::all();

         // Return the Inertia.js response with the detailsexpresionbesoins data and any success message from the session
         return inertia('Details_exprebesoin/Index', [
             'detailsexpresionbesoins' => Details_ExpBesoinResource::collection($detailsexpresionbesoins),
             'categories' => CategorieResource::collection($categories),
             'produits' => CatelogueResource::collection($catelogue_produits),
             'success' => session('success'),
         ]);
     }



     public function index_par_expbesoin($id_expbesoin)
     {
         $expressionbesoin = ExpressionBesoin::with('service')->findOrFail($id_expbesoin);

         $detailsexpresionbesoins = Details_ExpBesoin::where('id_expbesoin', $id_expbesoin)->get();

         $categories = Categorie::all();
         $catelogue_produits = CatelogueProduit::all();
    //  dd($catelogue_produits );
         return inertia('Details_exprebesoin/Index_par_expbesoin', [
             'detailsexpresionbesoins' => Details_ExpBesoinResource::collection($detailsexpresionbesoins),
             'expressionbesoin' => $expressionbesoin,
             'id_expbesoin' => $id_expbesoin,
             'categories' => CategorieResource::collection($categories),
             'produits' => CatelogueResource::collection($catelogue_produits),
             'success' => session('success'),
             'valider' => session('valider'),

         ]);
     }

     public function create($id_expbesoin)
     {
         $categories = Categorie::all();
         $catelogue_produits = CatelogueProduit::all();

         return inertia('Details_exprebesoin/Create', [
             'categories' => $categories,
             'catelogue_produits' => $catelogue_produits,
             'id_expbesoin' => $id_expbesoin
         ]);
     }

     public function store(StoreDetails_ExpBesoinRequest $request)
     {
         $data = $request->all();
         $detailsexpresionbesoin = Details_ExpBesoin::create($data);

         return redirect()->route('detailsexpresionbesoin.index_par_expbesoin', ['id_expbesoin' => $detailsexpresionbesoin->id_expbesoin])->with('success', 'Detailsexpresionbesoin Bien créer');
     }

     public function show(Details_ExpBesoin $detailsexpresionbesoin)
     {
         //
     }

     public function edit(Details_ExpBesoin $detailsexpresionbesoin)
     {
         // dd($detailsexpresionbesoin);
         return inertia('Details_exprebesoin/Edit',[
             'detailsexpresionbesoin' => $detailsexpresionbesoin
         ]);
     }

     public function update(UpdateDetails_ExpBesoinRequest $request, Details_ExpBesoin $detailsexpresionbesoin)
     {
         $data = $request->all();
         // dd($data); // Correction : Retirez les guillemets autour de $data

         $detailsexpresionbesoin->update($data);
         return redirect()->route('detailsexpresionbesoin.index_par_expbesoin', ['id_expbesoin' => $detailsexpresionbesoin->id_expbesoin])->with('success', 'Detailsexpresionbesoin Bien modifier');
     }

     public function destroy(Details_ExpBesoin $detailsexpresionbesoin)
     {
         $detailsexpresionbesoin->delete();
         return redirect()->route('detailsexpresionbesoin.index_par_expbesoin', ['id_expbesoin' => $detailsexpresionbesoin->id_expbesoin])->with('success', 'Detailsexpresionbesoin Bien supprimer');
     }


     public function exportExcel()
    {
        $details_expbesoins = Details_ExpBesoin::get();
        return Excel::download(new DetailExpressionBesoinExport(), 'detailexpbesoin.xlsx');
    }
}
