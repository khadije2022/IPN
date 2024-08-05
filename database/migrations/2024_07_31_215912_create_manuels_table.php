<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateManuelsTable extends Migration
{
    public function up()
    {
        Schema::create('manuels', function (Blueprint $table) {
            $table->id();
            $table->foreignId('titre_id')->constrained('titres');
            $table->foreignId('annee_id')->constrained('annees');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('manuels');
    }
}
