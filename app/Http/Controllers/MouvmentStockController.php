<?php

namespace App\Http\Controllers;
use App\Models\BonAchat;
use App\Models\BonSortie;
use App\Models\ExpressionBesoin;

use App\Models\MouvmentStock;
use App\Http\Requests\StoreMouvmentStockRequest;
use App\Http\Requests\UpdateMouvmentStockRequest;
use App\Http\Resources\MouvmentStockResource;

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

        $percentageValidatedBonAchat = $totalBonAchat > 0 ? ($validatedBonAchat / $totalBonAchat) * 100 : 0;
        $percentageNonValidatedBonAchat = $totalBonAchat > 0 ? ($nonValidatedBonAchat / $totalBonAchat) * 100 : 0;

        // Calculate percentages for BonSortie
        $totalBonSortie = BonSortie::count();
        $validatedBonSortie = BonSortie::where('status', 'validé')->count();
        $nonValidatedBonSortie = BonSortie::where('status', 'non-validé')->count();

        $percentageValidatedBonSortie = $totalBonSortie > 0 ? ($validatedBonSortie / $totalBonSortie) * 100 : 0;
        $percentageNonValidatedBonSortie = $totalBonSortie > 0 ? ($nonValidatedBonSortie / $totalBonSortie) * 100 : 0;

        // Calculate percentages for ExpressionBesoin
        $totalExpressionBesoin = ExpressionBesoin::count();
        $validatedExpressionBesoin = ExpressionBesoin::where('status', 'validé')->count();
        $nonValidatedExpressionBesoin = ExpressionBesoin::where('status', 'non-validé')->count();

        $percentageValidatedExpressionBesoin = $totalExpressionBesoin > 0 ? ($validatedExpressionBesoin / $totalExpressionBesoin) * 100 : 0;
        $percentageNonValidatedExpressionBesoin = $totalExpressionBesoin > 0 ? ($nonValidatedExpressionBesoin / $totalExpressionBesoin) * 100 : 0;

        return inertia('Accueil', [
            'percentages' => [
                'BonAchat' => [
                    'validated' => $percentageValidatedBonAchat,
                    'nonValidated' => $percentageNonValidatedBonAchat,
                ],
                'BonSortie' => [
                    'validated' => $percentageValidatedBonSortie,
                    'nonValidated' => $percentageNonValidatedBonSortie,
                ],
                'ExpressionBesoin' => [
                    'validated' => $percentageValidatedExpressionBesoin,
                    'nonValidated' => $percentageNonValidatedExpressionBesoin,
                ],
            ],
            'mouvmentStocks' => MouvmentStockResource::collection($mouvmentStock),
        ]);
    }



//     public function Mouvement(Request $request)
// {
//     $date = $request->input('date', now()->format('Y-m'));
//     $year = substr($date, 0, 4);
//     $month = substr($date, 5, 2);

//     // Calculate percentages for BonAchat
//     $totalBonAchat = BonAchat::count();
//     $validatedBonAchat = BonAchat::where('status', 'validé')->count();
//     $nonValidatedBonAchat = BonAchat::where('status', 'non-validé')->count();

//     $percentageValidatedBonAchat = $totalBonAchat > 0 ? ($validatedBonAchat / $totalBonAchat) * 100 : 0;
//     $percentageNonValidatedBonAchat = $totalBonAchat > 0 ? ($nonValidatedBonAchat / $totalBonAchat) * 100 : 0;

//     // Calculate percentages for BonSortie
//     $totalBonSortie = BonSortie::count();
//     $validatedBonSortie = BonSortie::where('status', 'validé')->count();
//     $nonValidatedBonSortie = BonSortie::where('status', 'non-validé')->count();

//     $percentageValidatedBonSortie = $totalBonSortie > 0 ? ($validatedBonSortie / $totalBonSortie) * 100 : 0;
//     $percentageNonValidatedBonSortie = $totalBonSortie > 0 ? ($nonValidatedBonSortie / $totalBonSortie) * 100 : 0;

//     // Calculate percentages for ExpressionBesoin
//     $totalExpressionBesoin = ExpressionBesoin::count();
//     $validatedExpressionBesoin = ExpressionBesoin::where('status', 'validé')->count();
//     $nonValidatedExpressionBesoin = ExpressionBesoin::where('status', 'non-validé')->count();

//     $percentageValidatedExpressionBesoin = $totalExpressionBesoin > 0 ? ($validatedExpressionBesoin / $totalExpressionBesoin) * 100 : 0;
//     $percentageNonValidatedExpressionBesoin = $totalExpressionBesoin > 0 ? ($nonValidatedExpressionBesoin / $totalExpressionBesoin) * 100 : 0;

//     // Fetch product quantities based on the selected date
//     $products = CatelogueProduit::with(['detailsBonAchats' => function ($query) use ($year, $month) {
//         $query->whereYear('created_at', $year)->whereMonth('created_at', $month);
//     }, 'detailsBonSorties' => function ($query) use ($year, $month) {
//         $query->whereYear('created_at', $year)->whereMonth('created_at', $month);
//     }])->get();

//     $productQuantities = $products->map(function ($product) {
//         return [
//             'designation' => $product->designation,
//             'quantite_entree' => $product->detailsBonAchats->sum('quantite'),
//             'quantite_sortie' => $product->detailsBonSorties->sum('quantite'),
//         ];
//     });

//     return inertia('Accueil', [
//         'percentages' => [
//             'BonAchat' => [
//                 'validated' => $percentageValidatedBonAchat,
//                 'nonValidated' => $percentageNonValidatedBonAchat,
//             ],
//             'BonSortie' => [
//                 'validated' => $percentageValidatedBonSortie,
//                 'nonValidated' => $percentageNonValidatedBonSortie,
//             ],
//             'ExpressionBesoin' => [
//                 'validated' => $percentageValidatedExpressionBesoin,
//                 'nonValidated' => $percentageNonValidatedExpressionBesoin,
//             ],
//         ],
//         'productQuantities' => $productQuantities,
//         'selectedDate' => $date,
//     ]);
// }

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
