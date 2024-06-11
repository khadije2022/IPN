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
        Schema::create('mouvementstock', function (Blueprint $table) {
            $table->id();
            // $table->foreignId('idBonDeSortieAchats')->nullable()->constrained('bon_sortie_achats');
            // $table->foreignId('idBonDeSortieAchats')->nullable()->constrained('bon_sortie_achats');
            // $table->string('type');
            // $table->integer('description'); 
            // $table->integer('quantite');
            // $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mouvementstock');
    }
};
