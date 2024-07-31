<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDetailsReceptionsTable extends Migration
{
    public function up()
    {
        Schema::create('details_receptions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('reception_id')->constrained('receptions');
            $table->foreignId('manuel_id')->constrained('manuels');
            $table->string('embalage');
            $table->string('caisse');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('details_receptions');
    }
}
