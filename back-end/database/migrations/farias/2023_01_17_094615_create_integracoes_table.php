<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateIntegracoesTable extends Migration
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
            // Campos:
            $table->dateTime('data_execucao')->comment("Data em que a rotina de Integração foi executada");
            $table->boolean('atualizar_unidades')->comment("Define se a rotina deve atualizar as Unidades");
            $table->boolean('atualizar_servidores')->comment("Define se a rotina deve atualizar os Servidores");
            $table->boolean('atualizar_gestores')->comment("Define se a rotina deve atualizar os Gestores");
            $table->boolean('usar_arquivos_locais')->comment("Define se a rotina deve importar os dados de um arquivo local em XML");
            $table->boolean('gravar_arquivos_locais')->comment("Define se a rotina deve salvar os dados importados do SIAPE em um arquivo local em XML");
            $table->json('resultado')->comment("Resultado da execução da rotina de Integração");

            // Chaves estrangeiras:
            $table->foreignUuid('entidade_id')->constrained()->onDelete('restrict')->onUpdate('cascade');
            $table->foreignUuid('usuario_id')->nullable()->constrained()->onDelete('restrict')->onUpdate('cascade');
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
}
