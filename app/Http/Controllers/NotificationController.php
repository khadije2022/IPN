<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BonSortie;
use App\Models\BonAchat;
use App\Models\ExpressionBesoin;
use App\Models\CorrectionStock;

use Log;

class NotificationController extends Controller
{
    public function getNotifications()
    {
        $bonSorties = BonSortie::where('status', 'non-validé')->count();
        $bonAchats = BonAchat::where('status', 'non-validé')->count();
        $correctionstocks = CorrectionStock::where('status', 'non-validé')->count();
        $expressionBesoins = ExpressionBesoin::where('status', 'non-validé')->count();

        Log::info('Bon Sorties: ' . $bonSorties);
        Log::info('Bon Achats: ' . $bonAchats);
        Log::info('Expression Besoins: ' . $expressionBesoins);

        return response()->json([
            'bonSorties' => $bonSorties,
            'bonAchats' => $bonAchats,
            'correctionstocks' => $correctionstocks,
            'expressionBesoins' => $expressionBesoins
        ]);
    }
}
