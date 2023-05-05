<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjetosTarefasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projetos_tarefas', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            // Campos:
            $table->integer('indice')->comment("Indice da sequencia da tarefa");
            $table->text('path')->comment("Path dos nós pais");
            $table->string('nome', 256)->comment("Nome da tarefa");
            $table->string('descricao', 256)->comment("Descricao da tarefa");
            $table->integer('id_processo')->nullable()->comment("ID do processo SEI");
            $table->string('numero_processo', 50)->nullable()->comment("Número do processo SEI");
            $table->integer('id_documento')->nullable()->comment("ID do documento SEI");
            $table->string('numero_documento', 50)->nullable()->comment("Numero do documento SEI");
            $table->dateTime('inicio')->comment("Inicio da tarefa");
            $table->dateTime('termino')->comment("Fim da tarefa");
            $table->float('duracao')->comment("Duração da atividade. Se a duração for 0 e sintéfico for falso então irá se comportar apenas como um grupo");
            $table->decimal('progresso', 5, 2)->default(0)->comment("Percentual de progresso da tarefa");
            $table->tinyInteger('inicio_marco')->default(0)->comment("Se o inicio é um marco");
            $table->tinyInteger('termino_marco')->default(0)->comment("Se o termino é um marco");
            $table->tinyInteger('tem_filhos')->default(0)->comment("Se é um registro sintético (resumo)");
            $table->tinyInteger('agrupador')->default(0)->comment("Se é apenas um registro para agrupar tarefas filhas (somente se tem_filhos e não possui progresso)");
            $table->tinyInteger('soma_progresso_filhos')->default(1)->comment("Se o progresso é calculado pela média do progresso dos filhos ou lançado manual (somente se tem_filhos)");
            $table->enum('status', ["PLANEJADO", "INICIADO", "CONCLUIDO", "FALHO", "SUSPENSO", "CANCELADO", "AGUARDANDO"])->comment("Status");
            $table->tinyInteger('contraido')->default(0)->comment("Se esta contraído");
            $table->decimal('custo', 15, 2)->comment("Custo: Será a soma dos recursos, ou a soma dos filhos caso tem_filhos e soma_custos_filhos");
            $table->tinyInteger('calcula_intervalo')->default(1)->comment("Se calcula o inicio e termino automaticamente pelos filhos (somente se tem_filhos)");
            $table->tinyInteger('aloca_proprios_recursos')->default(1)->comment("Se possui recursos próprios (somente se tem_filhos)");
            $table->tinyInteger('soma_recusos_alocados_filhos')->default(1)->comment("Mostra o somatório dos recursos filhos (somente se tem_filhos)");
            $table->tinyInteger('custos_proprios')->default(1)->comment("Se possui custos próprios (somente se tem_filhos), se não tem filhos sempre será true");
            $table->tinyInteger('soma_custos_filhos')->default(1)->comment("Mostra o somatório dos custos filhos (somente se tem_filhos)");
            $table->json('etiquetas')->nullable()->comment("Etiquetas");
            // Chaves estrangeiras:
            $table->foreignUuid('projeto_id')->constrained()->onDelete('restrict')->onUpdate('cascade');
            $table->foreignUuid('tarefa_pai_id')->nullable()->constrained('projetos_tarefas')->onDelete('restrict')->onUpdate('cascade');
            $table->foreignUuid('tarefa_projeto_id')->nullable()->constrained("projetos")->onDelete('restrict')->onUpdate('cascade'); /* Projeto que será incorporado como uma tarefa */
            $table->foreignUuid('demanda_id')->nullable()->constrained()->onDelete('restrict')->onUpdate('cascade');
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
        Schema::dropIfExists('projetos_tarefas');
    }
}