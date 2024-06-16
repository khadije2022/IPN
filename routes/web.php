<?php

use App\Http\Controllers\BonAchatController;
use App\Http\Controllers\BonSortieAchatController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\CatelogueProduitController;
use App\Http\Controllers\DetailBonAchatController;
use App\Http\Controllers\DetailsMouvementController;
use App\Http\Controllers\MagasinController;
use App\Http\Controllers\MouvementStockController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StockController;
use App\Http\Controllers\Details_ExpBesoinController;
use App\Http\Controllers\ExpressionBesoinController;
use App\Http\Controllers\UserController;
use App\Models\BonAchat;
use App\Models\BonAchats;
use App\Models\DetailBonAchat;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use function Termwind\render;

Route::redirect('/','/dashboard');

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth','verified'])->group(function() {
    Route::get('/dashboard', fn() => Inertia::render('Dashboard'))
    ->name('dashboard');




    Route::resource('magasin',MagasinController::class);
    Route::resource('catelogueProduit',CatelogueProduitController::class);
    Route::resource('categorie',CategorieController::class);
    Route::resource('mouvmentStock',MouvementStockController::class);
    Route::resource('detailsMouvment',DetailsMouvementController::class);
    Route::resource('bonsortieAchat',BonSortieAchatController::class);
    Route::get('mouvmentStock/create/{bonSortie}', [MouvementStockController::class, 'create'])->name('mouvmentStock.create');
    // Route::get('mouvmentStock/{bonSortie}', [MouvementStockController::class, 'create'])->name('mouvmentStock.create');

    Route::resource('bonAchat',BonAchatController::class);
    Route::resource('detailBonAchat',DetailBonAchatController::class);
    Route::get('detailBonAchat/create/{bonAchat}', [DetailBonAchatController::class, 'create'])->name('detailBonAchat.create');
    Route::get('/detailBonAchat/index-par-bonAchat/{bonAchat}', [DetailBonAchatController::class, 'index_par_bonAchat'])->name('detailBonAchat.index-par-bonAchat');

    Route::resource('expressionbesoin',ExpressionBesoinController::class);
    Route::resource('detailsexpresionbesoin', Details_ExpBesoinController::class);
    Route::get('detailsexpresionbesoin/create/{id_expbesoin}', [Details_ExpBesoinController::class, 'create'])->name('detailsexpresionbesoin.create');
    Route::get('/detailsexpresionbesoin/index-par-expbesoin/{id_expbesoin}', [Details_ExpBesoinController::class, 'index_par_expbesoin'])->name('detailsexpresionbesoin.index_par_expbesoin');
    Route::get('/valider/{id_expbesoin}', [ExpressionBesoinController::class, 'valider'])->name('valider');

    Route::get('/export-pdf', [CategorieController::class, 'exportPdf'])->name('export-pdf');
    Route::get('/pdf-details-expbesoin/{id_expbesoin}', [ExpressionBesoinController::class, 'exportPdf'])->name('pdf-DetailsExpbesoin');




    Route::get('/export-pdf', [CategorieController::class, 'exportPdf'])->name('export-pdf');
    // Route::get('/export-excel', [CategorieController::class, 'exportExcel'])->name('export-excel');
    Route::post('/mouvmentStock/finalize', [MouvementStockController::class, 'finalize'])->name('mouvmentStock.finalize');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


});

require __DIR__.'/auth.php';
