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
        Schema::create('detail_correction_stocks', function (Blueprint $table) {
            $table->id();
            $table->integer('quantite');
            $table->foreignId('produit')->constrained('catelogue_produits')->onDelete('cascade');
            $table->foreignId('idCorrectionStock')->constrained('correction_stocks')->onDelete('cascade');
            $table->timestamps();

            $table->unique(['produit', 'idCorrectionStock']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('detail_correction_stocks', function (Blueprint $table) {
            $table->dropUnique(['produit', 'idCorrectionStock']);
        });

        Schema::dropIfExists('detail_correction_stocks');

    }

};
