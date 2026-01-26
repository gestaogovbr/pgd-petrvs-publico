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
        Schema::create('funcoes', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->string('nome', 256)->comment("Nome da Função");
            $table->string('nivel', 256)->nullable()->comment("Nível da Função");
            $table->string('descricao', 256)->nullable()->comment("Descrição da Função");
            $table->string('siape', 256)->nullable()->comment("código SIAPE da Função");
            $table->string('cbo', 256)->nullable()->comment("código CBO da Função");
            $table->tinyInteger('ativo')->default(1)->comment("Função ativo ou inativo");
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
        Schema::dropIfExists('funcoes');
    }
};
