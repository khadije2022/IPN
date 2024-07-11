<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::table('stocks', function (Blueprint $table) {
            $table->bigInteger('quantity')->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::table('stocks', function (Blueprint $table) {
            $table->integer('quantity')->change(); // Revenir au type précédent si nécessaire
        });
    }
};
