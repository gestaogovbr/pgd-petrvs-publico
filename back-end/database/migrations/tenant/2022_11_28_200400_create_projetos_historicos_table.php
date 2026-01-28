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
        Schema::create('projetos_historicos', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->dateTime('data_modificacao')->useCurrent()->comment("Data e hora da modificação");
            $table->tinyInteger('completo')->default(0)->comment("Se o delta corresponde ao objeto completo");
            $table->json('delta')->comment("Delta do objeto (ou objeto completo)");
            // Chaves estrangeiras:
            $table->foreignUuid('projeto_id')->constrained()->onDelete('restrict')->onUpdate('cascade')->comment("Projeto");
            $table->foreignUuid('usuario_id')->constrained()->onDelete('restrict')->onUpdate('cascade')->comment("Usuário");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('projetos_historicos');
    }
};
