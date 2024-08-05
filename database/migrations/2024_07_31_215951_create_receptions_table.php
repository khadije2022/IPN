<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReceptionsTable extends Migration
{
    public function up()
    {
        Schema::create('receptions', function (Blueprint $table) {
            $table->id();
            $table->text('description');
            $table->foreignId('user_id')->constrained('users');
            $table->date('date');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('receptions');
    }
}
