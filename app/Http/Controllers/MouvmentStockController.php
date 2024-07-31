<?php

namespace App\Http\Controllers;
use App\Models\BonAchat;
use App\Models\BonSortie;
use App\Models\ExpressionBesoin;

use App\Models\MouvmentStock;
use App\Http\Requests\StoreMouvmentStockRequest;
use App\Http\Requests\UpdateMouvmentStockRequest;
use App\Http\Resources\MouvmentStockResource;
use Illuminate\Support\Facades\DB;

class MouvmentStockController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $mv = MouvmentStock::query();

        // Execute the query with pagination
        $mouvmentStock = $mv->paginate(10);
        
        return inertia('DetailsMouvement/Index', [
            'mouvmentStocks' => MouvmentStockResource::collection($mouvmentStock),
            'success' => session('success'),
        ]);
    }
    public function Mouvement()
    {
        $mv = MouvmentStock::query();

        // Execute the query with pagination
        $mouvmentStock = $mv->paginate(10);



        // Calculate percentages for BonAchat
        $totalBonAchat = BonAchat::count();
        $validatedBonAchat = BonAchat::where('status', 'validé')->count();
        $nonValidatedBonAchat = BonAchat::where('status', 'non-validé')->count();

        // $percentageValidatedBonAchat = $totalBonAchat > 0 ? ($validatedBonAchat / $totalBonAchat) * 100 : 0;
        // $percentageNonValidatedBonAchat = $totalBonAchat > 0 ? ($nonValidatedBonAchat / $totalBonAchat) * 100 : 0;

        // Calculate percentages for BonSortie
        $totalBonSortie = BonSortie::count();
        $validatedBonSortie = BonSortie::where('status', 'validé')->count();
        $nonValidatedBonSortie = BonSortie::where('status', 'non-validé')->count();

        // $percentageValidatedBonSortie = $totalBonSortie > 0 ? ($validatedBonSortie / $totalBonSortie) * 100 : 0;
        // $percentageNonValidatedBonSortie = $totalBonSortie > 0 ? ($nonValidatedBonSortie / $totalBonSortie) * 100 : 0;

        // Calculate percentages for ExpressionBesoin
        $totalExpressionBesoin = ExpressionBesoin::count();
        $validatedExpressionBesoin = ExpressionBesoin::where('status', 'validé')->count();
        $nonValidatedExpressionBesoin = ExpressionBesoin::where('status', 'non-validé')->count();

        $query = DB::table('stocks')
        ->join('catelogue_produits', 'stocks.product', '=', 'catelogue_produits.id')
        ->join('categories', 'catelogue_produits.type', '=', 'categories.id')
        ->select('stocks.*', 'catelogue_produits.designation as product_name', 'categories.type as category_name');

    if (request()->has('product_name')) {
        $query->where('catelogue_produits.designation', 'like', '%' . request('product_name') . '%');
    }
    if (request()->has('typeMouvments')) {
        $query->where('stocks.typeMouvments', request('typeMouvments'));
    }
    // dd(request()->query());

    $stocks = $query->paginate(10);
        return inertia('Accueil', [
            'percentages' => [
                'Bon d\'achat' => [
                    'validated' => $validatedBonAchat,
                    'nonValidated' => $nonValidatedBonAchat,
                    'total' => $totalBonAchat
                ],
                'Bon de sortie' => [
                    'validated' => $validatedBonSortie,
                    'nonValidated' => $nonValidatedBonSortie,
                    'total' => $totalBonSortie
                ],
                'Expression du besoin' => [
                    'validated' => $validatedExpressionBesoin,
                    'nonValidated' => $nonValidatedExpressionBesoin,
                    'total' => $totalExpressionBesoin
                ],
            ],
            'mouvmentStocks' => $stocks,

            'queryParams' => request()->query() ?: null,
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
    public function store(StoreMouvmentStockRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(MouvmentStock $mouvmentStock)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MouvmentStock $mouvmentStock)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMouvmentStockRequest $request, MouvmentStock $mouvmentStock)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MouvmentStock $mouvmentStock)
    {
        //
    }
}
