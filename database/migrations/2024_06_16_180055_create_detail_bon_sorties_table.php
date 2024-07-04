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
            $table->timestamps();
            
            $table->unique(['produit', 'idBonDeSortie']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::table('detail_bon_sorties', function (Blueprint $table) {
            // Supprimer la contrainte d'unicité avant de supprimer la table
            $table->dropUnique(['produit', 'idBonDeSortie']);
        });

        Schema::dropIfExists('detail_bon_sorties');
    }
};
