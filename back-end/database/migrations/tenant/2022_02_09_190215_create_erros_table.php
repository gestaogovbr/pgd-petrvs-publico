<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateErrosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('erros', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->json('usuario')->nullable();
            $table->text('message')->nullable();
            $table->text('data')->nullable();
            $table->text('trace')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('erros');
    }
}
