<?php

use App\Http\Controllers\BonSortieAchatController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\CatelogueProduitController;
use App\Http\Controllers\DetailsMouvementController;
use App\Http\Controllers\MagasinController;
use App\Http\Controllers\MouvementStockController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\StockController;
use App\Http\Controllers\TaskController;
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

    Route::get('mouvmentStock/create/{bonSortie}', [MouvementStockController::class, 'create'])->name('mouvmentStock.create');

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
