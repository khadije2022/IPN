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
        Schema::create('expression_besoins', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_service')->constrained('services')->onDelete('cascade');
            $table->string('status')->default('Non-Valide') ;// Add onDelete for referential integrity
            $table->text('description');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('expression_besoins');
    }
};
