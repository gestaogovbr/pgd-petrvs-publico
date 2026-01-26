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
    public function up()
    {
        Schema::create('questionarios', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->string('tipo',256)->comment("Tipo interno | personalizado | anonimo");
            $table->string('nome',256)->comment("Nome do questionário");
            $table->string('codigo',256)->comment("Código do questionario");
            $table->json('perguntas')->nullable()->comment("Perguntas do questionário");
            // Chaves estrangeiras:
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('questionarios');
    }
};
