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
            $table->foreignId('idBonDeSortie')->nullable()->constrained('bon_sorties');
            $table->foreignId('idBonAchat')->nullable()->constrained('bon_achats');
            $table->string('typeMouvments');
            $table->integer('stock');
            $table->timestamps();
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
