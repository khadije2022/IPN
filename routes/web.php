<?php

use App\Http\Controllers\BonSortieAchatController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\CatelogueProduitController;
use App\Http\Controllers\DetailsMouvementController;
use App\Http\Controllers\MagasinController;
use App\Http\Controllers\MouvementStockController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StockController;
use App\Http\Controllers\Details_ExpBesoinController;
use App\Http\Controllers\ExpressionBesoinController;
use App\Http\Controllers\UserController;
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
    Route::resource('stock',StockController::class);

    Route::resource('expressionbesoin',ExpressionBesoinController::class);
    Route::resource('detailsexpresionbesoin', Details_ExpBesoinController::class);
    Route::get('detailsexpresionbesoin/create/{id_expbesoin}', [Details_ExpBesoinController::class, 'create'])->name('detailsexpresionbesoin.create');
    Route::get('/detailsexpresionbesoin/index-par-expbesoin/{id_expbesoin}', [Details_ExpBesoinController::class, 'index_par_expbesoin'])->name('detailsexpresionbesoin.index_par_expbesoin');
    Route::get('/valider/{id_expbesoin}', [ExpressionBesoinController::class, 'valider'])->name('valider');

    Route::get('/export-pdf', [CategorieController::class, 'exportPdf'])->name('export-pdf');
    Route::get('/pdf-details-expbesoin/{id_expbesoin}', [ExpressionBesoinController::class, 'exportPdf'])->name('pdf-DetailsExpbesoin');




    Route::get('mouvmentStock/create/{bonSortie}', [MouvementStockController::class, 'create'])->name('mouvmentStock.create');

    Route::get('/export-pdf', [CategorieController::class, 'exportPdf'])->name('export-pdf');

    Route::get('/export-excel', [CategorieController::class, 'exportExcel'])->name('export-excel');



    // Route::get('/export-excel', [CategorieController::class, 'exportExcel'])->name('export-excel');
    Route::post('/mouvmentStock/finalize', [MouvementStockController::class, 'finalize'])->name('mouvmentStock.finalize');

});


Route::middleware('auth')->group(function () {
    // Route::resource('magasin',MagasinController::class);
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/magasin/{magasin}/edit', [MagasinController::class, 'edit'])->name('magasin.edit');


    Route::get('/magasin', [MagasinController::class, 'index'])->name('magasin.index');
    Route::get('/magasin/create', [MagasinController::class, 'create'])->name('magasin.create');
    // Route::post('/magasins', [MagasinController::class, 'store'])->name('magasin.store');
    // Route::get('/magasins/{magasin}/edit', [MagasinController::class, 'edit'])->name('magasin.edit');
    // Route::patch('/magasins/{magasin}', [MagasinController::class, 'update'])->name('magasin.update');
    // Route::delete('/magasins/{magasin}', [MagasinController::class, 'destroy'])->name('magasin.destroy');
    // Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');
});



require __DIR__.'/auth.php';
