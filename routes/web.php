<?php
use App\Http\Controllers\DetailBonSortieController;

use App\Http\Controllers\BonAchatController;
use App\Http\Controllers\BonSortieAchatController;
use App\Http\Controllers\BonSortieController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\CatelogueProduitController;
use App\Http\Controllers\DetailBonAchatController;
use App\Http\Controllers\Details_ExpBesoinController;
use App\Http\Controllers\DetailsMouvementController;
use App\Http\Controllers\MagasinController;
use App\Http\Controllers\MouvementStockController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StockController;
use App\Http\Controllers\ExpressionBesoinController;
use App\Http\Controllers\MouvmentStockController;
use App\Http\Controllers\UserController;
use App\Models\BonAchat;
use App\Models\BonSortie;
use App\Models\DetailBonAchat;
use App\Models\MouvmentStock;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use function Termwind\render;

Route::redirect('/','/Accueil');



Route::middleware(['auth'])->group(function() {
    Route::get('/dashboard', fn() => Inertia::render('Dashboard'))
    ->name('dashboard');

    Route::resource('user', UserController::class);


    Route::resource('magasin',MagasinController::class);
    Route::resource('catelogueProduit',CatelogueProduitController::class);
    Route::get('/update-stock', [CatelogueProduitController::class,'updateStockFromMouvmentStocks']);
    Route::resource('categorie',CategorieController::class);
    // Route::resource('detailsMouvment',::class);


    Route::resource('bonSortie', BonSortieController::class);
    Route::resource('detailBonSortie', DetailBonSortieController::class);
    Route::get('detailBonSortie/create/{bonSortie}', [DetailBonSortieController::class, 'create'])->name('detailBonSortie.create');
    Route::get('detailBonSortie/index-par-bonSortie/{bonSortie}', [DetailBonSortieController::class, 'index_par_bonSortie'])->name('detailBonSortie.index_par_bonSortie');
    Route::get('/validerSortie/{bonSortie}', [BonSortieController::class, 'valider'])->name('bonSortie.valider');
    Route::get('/ModifierSortie/{bonSortie}', [BonSortieController::class, 'modifier'])->name('bonSortie.modify');


    Route::resource('bonAchat',BonAchatController::class);
    Route::resource('detailBonAchat',DetailBonAchatController::class);
    Route::get('detailBonAchat/create/{bonAchat}', [DetailBonAchatController::class, 'create'])->name('detailBonAchat.create');
    Route::get('/detailBonAchat/index-par-bonAchat/{bonAchat}', [DetailBonAchatController::class, 'index_par_bonAchat'])->name('detailBonAchat.index-par-bonAchat');
    Route::get('/validerAchat/{bonAchat}', [BonAchatController::class, 'valider'])->name('bonAchat.valider');
    Route::get('/ModifierAchat/{bonAchat}', [BonAchatController::class, 'modifier'])->name('bonAchat.modify');
    Route::resource('stock',StockController::class);

    Route::get('/MouvmentStock', [MouvmentStockController::class, 'index'])->name('mouvmentStock.index');
    Route::get('/Accueil', [MouvmentStockController::class, 'Mouvement'])->name('mouvmentStock.Accueil');


    Route::resource('expressionbesoin',ExpressionBesoinController::class);
    Route::resource('detailsexpresionbesoin', Details_ExpBesoinController::class);
    Route::get('detailsexpresionbesoin/create/{id_expbesoin}', [Details_ExpBesoinController::class, 'create'])->name('detailsexpresionbesoin.create');
    Route::get('/detailsexpresionbesoin/index_par_expbesoin/{id_expbesoin}', [Details_ExpBesoinController::class, 'index_par_expbesoin'])->name('detailsexpresionbesoin.index_par_expbesoin');
    Route::get('/expressionbesoin/valider/{id_expbesoin}', [ExpressionBesoinController::class, 'valider'])->name('valider');

    Route::get('/export-pdf', [CategorieController::class, 'exportPdf'])->name('export-pdf');
    Route::get('/pdf-details-expbesoin/{id_expbesoin}', [ExpressionBesoinController::class, 'exportPdf'])->name('pdf-DetailsExpbesoin');
    Route::get('/pdf-DetailsBonAchat/{bonAchat}', [BonAchatController::class, 'exportPdf'])->name('pdf-DetailsBonAchat');
    Route::get('/pdf-DetailsBonSortie/{bonSortie}', [BonSortieController::class, 'exportPdf'])->name('pdf-DetailsBonSortie');


    Route::get('/export-expressionbesoin', [ExpressionBesoinController::class, 'exportExceld'])->name('export-expressionbesoin');
    Route::get('/export-categories', [CategorieController::class, 'exportExcel'])->name('export-categories');
    Route::get('/export-magasin', [MagasinController::class, 'exportExcel'])->name('export-magasin');
    Route::get('/export-produit', [CatelogueProduitController::class, 'exportExcel'])->name('export-produit');
    Route::get('/export-bonachat', [BonAchatController::class, 'exportExcel'])->name('export-bonachat');
    Route::get('/export-bonsortie', [BonSortieController::class, 'exportExcel'])->name('export-bonsortie');

    // Route::get('/export-mouvement', [MouvementStockController::class, 'exportExcel'])->name('export-mouvement');



    // Route::get('/export-mouvement', [MouvementStockController::class, 'exportExcel'])->name('export-mouvement');
    Route::get('/export-detailexpbesoin/{id_expbesoin}', [Details_ExpBesoinController::class, 'exportExcel'])->name('export-detailexpbesoin');
    Route::get('/export-Details_bonAchat/{bonAchat}', [DetailBonAchatController::class, 'exportExcel'])->name('export-Details_bonAchat');
    Route::get('/export-Details_bonSortie', [DetailBonSortieController::class, 'exportExcel'])->name('export-Details_Sortie');



    Route::get('/export-pdf', [CategorieController::class, 'exportPdf'])->name('export-pdf');

    Route::get('/export-excel', [CategorieController::class, 'exportExcel'])->name('export-excel');



    // Route::get('/export-excel', [CategorieController::class, 'exportExcel'])->name('export-excel');
    Route::post('/mouvmentStock/finalize', [Details_ExpBesoinController::class, 'finalize'])->name('mouvmentStock.finalize');

});


Route::middleware('auth')->group(function () {
    // Route::resource('magasin',MagasinController::class);
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    // Route::get('/magasin/{magasin}/edit', [MagasinController::class, 'edit'])->name('magasin.edit');


    // Route::get('/magasin', [MagasinController::class, 'index'])->name('magasin.index');
    // Route::get('/magasin/create', [MagasinController::class, 'create'])->name('magasin.create');
    // Route::post('/magasins', [MagasinController::class, 'store'])->name('magasin.store');
    // Route::get('/magasins/{magasin}/edit', [MagasinController::class, 'edit'])->name('magasin.edit');
    // Route::patch('/magasins/{magasin}', [MagasinController::class, 'update'])->name('magasin.update');
    // Route::delete('/magasins/{magasin}', [MagasinController::class, 'destroy'])->name('magasin.destroy');
    Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');
});



require __DIR__.'/auth.php';
