<?php

namespace App\Http\Controllers;
use App\Http\Resources\ExpressionBesoinResource;
use App\Models\ExpressionBesoin;
use App\Models\BonAchat;
use App\Models\DetailBonAchat;
use App\Models\Details_ExpBesoin;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Models\Service;
use App\Http\Requests\StoreExpressionBesoinRequest;
use App\Http\Requests\UpdateExpressionBesoinRequest;

class ExpressionBesoinController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Initialize the query builder for the expressionbesoin model
        $query = ExpressionBesoin::with('service'); // Assurez-vous de charger la relation avec Service

        // Execute the query with pagination
        $expressionbesoins = $query->paginate(10);
        $services = Service::all();

        // Return the Inertia.js response with the expressionbesoins data and any success message from the session
        return inertia('ExpressionBesoin/Index', [
            'expressionbesoins' => ExpressionBesoinResource::collection($expressionbesoins),
            'services' => $services,
            'success' => session('success'),
        ]);
    }



    public function create()
{
    $services = Service::all();
    return inertia('ExpressionBesoin/Create', [
        'services' => $services,
    ]);
}


public function store(StoreExpressionBesoinRequest $request)
{
    $data = $request->all();
    $expressionBesoin = ExpressionBesoin::create($data);

    // Redirection vers la page de création de détails d'expression de besoin en passant l'id_expbesoin
    return redirect()->route('detailsexpresionbesoin.index_par_expbesoin', ['id_expbesoin' => $expressionBesoin->id])->with('success', 'Detailsexpresionbesoin Bien créer');
}



    /**
     * Display the specified resource.
     */
    public function show(ExpressionBesoin $expressionbesoin)
    {

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ExpressionBesoin $expressionbesoin)
    {
        return inertia('ExpressionBesoin/Edit',[
            'expressionbesoin' => $expressionbesoin
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateexpressionbesoinRequest $request, expressionbesoin $expressionbesoin)
    {
        $data= $request->all();

        $expressionbesoin->update($data);
        return to_route('expressionbesoin.index')->with('success','expressionbesoin Bien modifier');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(expressionbesoin $expressionbesoin)
    {
        $expressionbesoin->delete();
        return to_route('expressionbesoin.index')->with('success','expressionbesoin Bien supprimer');
    }

    public function exportPdf($id_expbesoin)
    {
        $expressionbesoin = ExpressionBesoin::with('service')->findOrFail($id_expbesoin);

        $details_expbesoins = Details_ExpBesoin::where('id_expbesoin', $id_expbesoin)->with('categorie', 'catalogueProduit')->get();


        $totalQuantite = $details_expbesoins->sum('quantite');

        $pdf = Pdf::loadView('pdf.details_expbesoin', [
            'details_expbesoins' => $details_expbesoins,
            'expressionbesoin' => $expressionbesoin,
            'totalQuantite' => $totalQuantite
        ]);

        return $pdf->download('Expressionbesoin.pdf');
    }




    public function valider($id_expbesoin)
    {
        $expressionbesoin = ExpressionBesoin::with('service')->findOrFail($id_expbesoin);
        $details_expbesoins = Details_ExpBesoin::where('id_expbesoin', $id_expbesoin)->with('categorie', 'catalogueProduit')->get();


        $details_expbesoins = Details_ExpBesoin::where('id_expbesoin', $id_expbesoin)->get();


        $expressionbesoin->status = 'validé';
        $expressionbesoin->save();

        // Create a purchase order with the same description
        $bonAchat = BonAchat::create([
            'description' => $expressionbesoin->description,
            'status' => 'non-validé'
        ]);

        // Create purchase order details for each need expression detail
        foreach ($details_expbesoins as $detail) {
            DetailBonAchat::create([
                'idBonAchat' => $bonAchat->id,
                'produit' => $detail->id_catproduit,
                'quantite' => $detail->quantite,
                'prix' => 0 // Adjust this as needed

            ]);
        }

        return redirect()->route('detailsexpresionbesoin.index_par_expbesoin', ['id_expbesoin' => $id_expbesoin])->with('valider', 'Details Expresionbesoin Bien validé');
    }
    

}

