<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateErrorsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection('log')->create('errors', function (Blueprint $table) {
            $table->id();
            $table->dateTime('date_time')->useCurrent()->comment('Data e hora do registro');
            $table->json('user')->nullable();
            $table->text('message')->nullable();
            $table->text('data')->nullable();
            $table->text('trace')->nullable();
            $table->enum('type', ['ERROR', 'WARNING', 'FRONT-WARNING', 'FRONT-ERROR'])->default('ERROR')->comment("Tipo da ocorrência");
        });
        Schema::dropIfExists('erros');
    }// CRIAR INDICE DE DATE_TIME

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::connection('log')->dropIfExists("errors");
    }
}
