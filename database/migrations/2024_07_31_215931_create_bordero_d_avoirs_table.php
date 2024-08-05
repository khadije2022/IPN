<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBorderoDAvoirsTable extends Migration
{
    public function up()
    {
        Schema::create('bordero_d_avoirs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('region_id')->constrained('regions');
            $table->text('description');
            $table->foreignId('user_id')->constrained('users');
            $table->string('type');
            $table->date('date');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('bordero_d_avoirs');
    }
}
