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
        Schema::create('bon_sortie_achats', function (Blueprint $table) {
            $table->id();
            $table->enum('type',['Sortie','Achat']);
            $table->text('description');
            // $table->foreignId('id_magasin')->constrained('magasins');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bon_sortie_achats');
    }
};
