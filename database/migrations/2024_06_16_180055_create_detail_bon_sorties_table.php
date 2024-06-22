<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('detail_bon_sorties', function (Blueprint $table) {
            $table->id();
            $table->integer('quantite');
            $table->foreignId('produit')->constrained('catelogue_produits')->onDelete('cascade');
            $table->foreignId('idBonDeSortie')->constrained('bon_sorties')->onDelete('cascade');
            $table->foreignId('magasin')->constrained('magasins')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detail_bon_sorties');
    }
};
