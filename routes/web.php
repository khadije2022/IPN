<?php

use App\Http\Controllers\Catatogue_produitController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DetailsMouvementController;
use App\Http\Controllers\MagasinController;
use App\Http\Controllers\MouvementStockController;
use App\Http\Controllers\StockController;
use App\Models\Catalogue_produit;
use App\Models\Categorie;
use App\Models\Details_mouvement;
use Database\Factories\CatalogueProduitFactory;
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

    Route::resource('user',UserController::class);
    Route::resource('catalogueProduit',Catatogue_produitController::class);
    Route::resource('categorie',CategorieController::class);
    Route::resource('detailsMouvement',DetailsMouvementController::class);
    Route::resource('mouvementStock',MouvementStockController::class);
    Route::resource('magasin',MagasinController::class);
    Route::resource('stock',StockController::class);
    // Route::resource('bonSortAchat');


});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
