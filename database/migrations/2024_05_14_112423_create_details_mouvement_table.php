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
        Schema::create('details_mouvement', function (Blueprint $table) {
            $table->id('idDetails');
            $table->foreignId('idMouvement')->constrained('mouvement_stock', 'idMouvement');
            $table->foreignId('idProduit')->constrained('catalogue_produit', 'NProduit');
            $table->foreignId('id_Magasin')->constrained('magasin', 'idMagasin');
            $table->integer('qte');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('details_mouvement');
    }
};
