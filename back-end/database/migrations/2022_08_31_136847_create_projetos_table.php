<?php

use Google\Service\Sheets\ManualRule;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjetosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projetos', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            // Campos:
            $table->integer('numero')->default(0)->comment("Número do projeto (Gerado pelo sistema)");
            $table->string('nome', 256)->comment("Nome do projeto");
            $table->string('descricao', 256)->comment("Descrição do projeto");
            $table->string('finalidade', 256)->comment("Descrição do projeto");
            $table->enum('status', ['PLANEJADO', 'INICIADO', 'CONCLUIDO', 'SUSPENSO', 'CANCELADO'])->comment("Status do projeto");
            $table->dateTime('data_inicio')->comment("Data de criação");
            $table->dateTime('data_fim')->nullable()->comment("Data final do registro");
            $table->dateTime('inicio')->comment("Inicio do projeto");
            $table->dateTime('termino')->comment("Fim do projeto");
            $table->tinyInteger('calcula_custos')->default(1)->comment("Se o projeto calcula custos");
            $table->tinyInteger('tempo_corrido')->default(0)->comment("Se o tempo é corrido ou usa a configuração de fins de semana, feriados e horário do expediente (quando usar horas)");
            $table->tinyInteger('usar_horas')->default(1)->comment("Se usa horas nas datas");
            $table->tinyInteger('calcula_intervalo')->default(1)->comment("Se calcula o inicio e termino automaticamente pelos filhos");
            $table->tinyInteger('agrupador')->default(0)->comment("Se é apenas um registro para agrupar tarefas filhas (somente se tem_filhos e não possui progresso)");
            $table->tinyInteger('soma_progresso_filhos')->default(1)->comment("Se o progresso é calculado pela média do progresso dos filhos ou lançado manual (somente se tem_filhos)");
            $table->tinyInteger('aloca_proprios_recursos')->default(1)->comment("Se possui recursos próprios");
            $table->tinyInteger('soma_recusos_alocados_filhos')->default(1)->comment("Mostra o somatório dos recursos filhos");
            $table->tinyInteger('custos_proprios')->default(1)->comment("Se possui custos próprios");
            $table->tinyInteger('soma_custos_filhos')->default(1)->comment("Se possui custos filhos");
            $table->float('duracao')->comment("Duração do projeto");
            $table->decimal('progresso', 5, 2)->default(0)->comment("Percentual de progresso do projeto");
            // Chaves estrangeiras:
            $table->foreignUuid('usuario_id')->nullable()->constrained()->onDelete('restrict')->onUpdate('cascade');
            $table->foreignUuid('tipo_projeto_id')->constrained("tipos_projetos")->onDelete('restrict')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('projetos');
    }
}
