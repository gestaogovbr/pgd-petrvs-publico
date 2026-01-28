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
        Schema::create('projetos_regras', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->string('nome', 256)->comment("Nome da regra");
            $table->enum('tipo_recurso', ['HUMANO', 'MATERIAL', 'SERVICO', 'CUSTO', 'DEPARTAMENTO'])->default("MATERIAL")->comment('Tipo do recurso que se aplica a regra');            
            $table->enum('finalidade', ['OUTRA', 'ESCRITORIO_PROJETO', 'GERENTE_PROJETO', 'GERENTE_RISCO', 'GERENTE_COMUNICACAO', 'GERENTE_RECURSO', 'PATROCINADOR', 'GESTOR_NEGOCIAL', 'MEMBRO'])->comment("Finalidade/Papel");
            $table->json('perfis')->nullable()->comment("Perfis de capacidade aplicáveis a quem possuir a regra");
            // Chaves estrangeiras:
            $table->foreignUuid('projeto_id')->constrained()->onDelete('restrict')->onUpdate('cascade')->comment("Projeto");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('projetos_regras');
    }
};
