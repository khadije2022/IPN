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
        Schema::create('details_expbesoins', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_expbesoin')->constrained('expression_besoins')->onDelete('cascade'); // Add onDelete for referential integrity
            $table->foreignId('produit')->constrained('catelogue_produits')->onDelete('cascade'); // Add onDelete for referential integrity
            $table->integer('quantite');
            $table->timestamps();

               // Ajouter la contrainte d'unicité
               $table->unique(['id_expbesoin', 'produit']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::table('details_expbesoins', function (Blueprint $table) {
            // Supprimer la contrainte d'unicité avant de supprimer la table
            $table->dropUnique(['id_expbesoin', 'produit']);
        });

        Schema::dropIfExists('details_expbesoins');
    }
};
