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
        Schema::create('atividades_tarefas', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->text('descricao')->nullable()->comment("Descrição da tarefa");
            $table->dateTime('data_lancamento')->comment("Data hora do lançamento da tarefa");
            $table->float('tempo_estimado')->comment("Tempo estimado para a execução da tarefa (Horas decimais)");
            $table->dateTime('data_conclusao')->nullable()->comment("Data da conclusão");
            // Chaves estrangeiras:
            $table->foreignUuid('documento_id')->nullable()->constrained('documentos')->onDelete('restrict')->onUpdate('cascade')->comment("Documento");
            $table->foreignUuid('atividade_id')->constrained()->onDelete('restrict')->onUpdate('cascade')->comment("Atividade");
            $table->foreignUuid('usuario_id')->constrained()->onDelete('restrict')->onUpdate('cascade')->comment("Usuário");
            $table->foreignUuid('tipo_tarefa_id')->nullable()->constrained("tipos_tarefas")->onDelete('restrict')->onUpdate('cascade')->comment("Tipo de tarefa");
        });
        // Cria a chave estrangeira na tabela 'documentos' devido à referência cruzada com 'atividades_tarefas'
        Schema::table('documentos', function (Blueprint $table) {
            $table->foreignUuid('atividade_tarefa_id')->nullable()->constrained('atividades_tarefas')->onDelete('restrict')->onUpdate('cascade')->comment("Tarefa da Atividade");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Apaga a chave estrangeira na tabela 'documentos' devido à referência cruzada com 'atividades_tarefas'
        Schema::table('documentos', function (Blueprint $table) {
            $table->dropConstrainedForeignId('atividade_tarefa_id');
        });
        Schema::dropIfExists('atividades_tarefas');
    }
};
