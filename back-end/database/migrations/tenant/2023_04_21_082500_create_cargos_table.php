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
        Schema::create('cargos', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->string('nome', 256)->comment("Nome do Cargo");
            $table->string('nivel', 256)->nullable()->comment("Nível do Cargo");
            $table->string('descricao', 256)->nullable()->comment("Descrição do Cargo");
            $table->string('siape', 256)->nullable()->comment("código SIAPE do Cargo");
            $table->string('cbo', 256)->nullable()->comment("código CBO do Cargo");
            $table->tinyInteger('efetivo')->default(1)->comment("Cargo efetivo ou comissionado");
            $table->tinyInteger('ativo')->default(1)->comment("Cargo ativo ou inativo");
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
        Schema::dropIfExists('cargos');
    }
};
