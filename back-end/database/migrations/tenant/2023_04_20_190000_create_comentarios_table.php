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
        Schema::create('comentarios', function (Blueprint $table) {
            // Configurações
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->text('texto')->comment("Texto do comentário");
            $table->text('path')->nullable()->comment("Path dos ids dos comentários");
            $table->dateTime('data_comentario')->comment("Data e horário em que foi feito o comentário");
            $table->enum('tipo', ["COMENTARIO", "TECNICO", "GERENCIAL", "AVALIACAO", 'TAREFA', 'ATIVIDADE', 'TIPO_ATIVIDADE'])->default("COMENTARIO")->comment("Tipo do comentário");
            $table->enum('privacidade', ["PUBLICO", "PRIVADO"])->default("PUBLICO")->comment("Nível de acesso ao comentário");
            // Chaves estrangeiras:
            $table->foreignUuid('usuario_id')->constrained()->onDelete('restrict')->onUpdate('cascade')->comment("Usuário do comentário");
            $table->foreignUuid('comentario_pai_id')->nullable()->constrained("comentarios")->onDelete('restrict')->onUpdate('cascade')->comment("Comentário pai");
            $table->foreignUuid('atividade_id')->nullable()->constrained("atividades")->onDelete('restrict')->onUpdate('cascade')->comment("Atividade onde estão os comentários");
            $table->foreignUuid('atividade_tarefa_id')->nullable()->constrained("atividades_tarefas")->onDelete('cascade')->onUpdate('cascade')->comment("Comentário da tarefa da atividade");
            $table->foreignUuid('projeto_id')->nullable()->constrained("projetos")->onDelete('restrict')->onUpdate('cascade')->comment("Projeto onde estão os comentários");
            $table->foreignUuid('projeto_tarefa_id')->nullable()->constrained("projetos_tarefas")->onDelete('restrict')->onUpdate('cascade')->comment("Comentário da Tarefa do projeto");
            $table->foreignUuid('plano_entrega_entrega_id')->nullable()->constrained("planos_entregas_entregas")->onDelete('restrict')->onUpdate('cascade')->comment("Comentário da entrega do plano de entrega");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('comentarios');
    }
};
