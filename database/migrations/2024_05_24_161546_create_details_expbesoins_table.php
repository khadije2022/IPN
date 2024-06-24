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
            // $table->foreignId('id_categorie')->constrained('categories')->onDelete('cascade'); // Add onDelete for referential integrity
            $table->foreignId('produit')->constrained('catelogue_produits')->onDelete('cascade'); // Add onDelete for referential integrity
            $table->integer('quantite');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('details_expbesoins');
    }
};
