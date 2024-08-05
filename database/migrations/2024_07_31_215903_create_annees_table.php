<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAnneesTable extends Migration
{
    public function up()
    {
        Schema::create('annees', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('niveau');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('annees');
    }
}
