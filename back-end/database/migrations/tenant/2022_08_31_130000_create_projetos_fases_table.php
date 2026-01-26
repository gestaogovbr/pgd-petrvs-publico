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
        Schema::create('projetos_fases', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->dateTime('data_inicio')->nullable()->comment("Inicio (opcional)");
            $table->dateTime('data_fim')->nullable()->comment("Fim (opcional)");
            $table->string('cor', 100)->comment("Código da cor em formato hex"); // style="color: #AABBCC00"
            $table->string('nome', 100)->comment("Nome");
            $table->string('descricao', 256)->comment("Descrição");
            // Chaves estrangeira criada na tabela 'projetos' devido à referência cruzada:
            //$table->foreignUuid('projeto_id')->constrained()->onDelete('restrict')->onUpdate('cascade')->comment("Projeto");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('projetos_fases');
    }
};
