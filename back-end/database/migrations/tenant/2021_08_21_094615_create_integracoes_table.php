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
        Schema::create('integracoes', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->dateTime('data_execucao')->comment("Data em que a rotina de integração foi executada");
            $table->boolean('atualizar_unidades')->comment("Define se a rotina deve atualizar as unidades");
            $table->boolean('atualizar_servidores')->comment("Define se a rotina deve atualizar os servidores");
            $table->boolean('atualizar_gestores')->comment("Define se a rotina deve atualizar os gestores");
            $table->boolean('usar_arquivos_locais')->comment("Define se a rotina deve importar os dados de um arquivo local em formato XML");
            $table->boolean('gravar_arquivos_locais')->comment("Define se a rotina deve salvar os dados importados do SIAPE em um arquivo local em formato XML");
            $table->json('resultado')->comment("Resultado da execução da rotina de integração");
            // Chaves estrangeiras:
            $table->foreignUuid('entidade_id')->constrained()->onDelete('restrict')->onUpdate('cascade')->comment("Entidade que executou a rotina de integração");
            $table->foreignUuid('usuario_id')->nullable()->constrained()->onDelete('restrict')->onUpdate('cascade')->comment("Usuário que executou a rotina de integração (opcional, porque pode ser executada por terminal)");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('integracoes');

    }
};
