<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDemandasEntregasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('demandas_entregas', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            // Campos:
            $table->text('descricao')->nullable()->comment("Descrição da tarefa");
            $table->dateTime('data_hora')->comment("Data hora do lançamento da tarefa");
            $table->float('tempo_estimado')->comment("Tempo estimado para a execução da tarefa (Horas decimais)");
            $table->integer('id_processo')->nullable()->comment("ID do processo de entrega, caso seja Sei será o ID do procedimento");
            $table->string('numero_processo', 50)->nullable()->comment("Número do processo de entrega, com a formatação de origem");
            $table->integer('id_documento')->nullable()->comment("ID da entrega, caso seja o Sei será o ID_Documento");
            $table->string('numero_documento', 11)->nullable()->comment("Numero do documento de entrega, caso seja o Sei é o numero Sei");
            $table->text('titulo_documento')->nullable()->comment("Numeração do tipo de documento no sistema integrado");
            $table->tinyInteger('concluido')->default(0)->comment("Se a tarefa foi concluída");
            // Chaves estrangeiras:
            $table->foreignUuid('tipo_documento_id')->nullable()->constrained('tipos_documentos')->onDelete('restrict')->onUpdate('cascade');
            $table->foreignUuid('tipo_processo_id')->nullable()->constrained('tipos_processos')->onDelete('restrict')->onUpdate('cascade');
            $table->foreignUuid('demanda_id')->constrained()->onDelete('restrict')->onUpdate('cascade');
            $table->foreignUuid('usuario_id')->constrained()->onDelete('restrict')->onUpdate('cascade');
            $table->foreignUuid('tarefa_id')->nullable()->constrained()->onDelete('restrict')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('demandas_entregas');
    }
}
