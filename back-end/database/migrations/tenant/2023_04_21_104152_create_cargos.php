<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCargos extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cargos', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            // Campos:
            $table->string('nome', 256)->comment("Nome do Cargo");
            $table->string('das', 256)->nullable()->comment("DAS do Cargo");
            $table->string('codigo', 256)->nullable()->comment("código do Cargo");
            $table->tinyInteger('ativo')->default(1)->comment("Cargo ativo ou inativo");
            // Chaves estrangeiras:
           
            //$table->foreignUuid('entrega_id')->constrained("planos_entregas_entregas")->onDelete('restrict')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cargos');
    }
}
