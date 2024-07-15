<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BonSortie;
use App\Models\BonAchat;
use App\Models\ExpressionBesoin;


class NotificationController extends Controller
{
    public function getNotifications()
    {
        $bonSorties = BonSortie::where('status', 'non-validé')->count();
        $bonAchats = BonAchat::where('status', 'non-validé')->count();
        $expressionBesoins = ExpressionBesoin::where('status', 'non-validé')->count();



        return response()->json([
            'bonSorties' => $bonSorties,
            'bonAchats' => $bonAchats,
            'expressionBesoins' => $expressionBesoins,
        ]);
    }
}
