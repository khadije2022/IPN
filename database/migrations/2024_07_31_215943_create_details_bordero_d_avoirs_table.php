<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDetailsBorderoDAvoirsTable extends Migration
{
    public function up()
    {
        Schema::create('details_bordero_d_avoirs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('bordero_d_avoir_id')->constrained('bordero_d_avoirs');
            $table->foreignId('manuel_id')->constrained('manuels');
            $table->string('embalage');
            $table->string('caisse');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('details_bordero_d_avoirs');
    }
}
