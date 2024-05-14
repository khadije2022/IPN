<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('mouvement_stock', function (Blueprint $table) {
            $table->id('idMouvement');
            $table->timestamp('date');
            $table->string('typeStock');
            $table->foreignId('idBonDeSortie')->nullable()->constrained('bon_de_sortie');
            $table->timestamps();
        });
    }


    public function down(): void
    {
        Schema::dropIfExists('mouvement_stock');
    }
};
