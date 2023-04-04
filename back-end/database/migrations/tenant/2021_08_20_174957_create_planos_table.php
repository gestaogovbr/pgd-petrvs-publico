<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlanosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('planos', function (Blueprint $table) {
            // Configurações
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            // Campos:
            $table->integer('carga_horaria')->comment("Carga horária diária do usuário");
            $table->integer('tempo_total')->comment("Horas úteis de trabalho no período de data_inicio_vigencia à data_fim_vigencia considerando carga_horaria, feriados, fins de semana");
            $table->integer('tempo_proporcional')->comment("tempo_total menos os afastamentos");
            $table->dateTime('data_inicio_vigencia')->comment("Inicio do plano");
            $table->dateTime('data_fim_vigencia')->comment("Fim do plano");
            $table->dateTime('data_inicio')->comment("Data inicio da vigência");
            $table->dateTime('data_fim')->nullable()->comment("Data fim da vigência");
            // Chaves estrangeiras:
            $table->foreignUuid('programa_id')->constrained()->onDelete('restrict')->onUpdate('cascade');
            $table->foreignUuid('usuario_id')->constrained()->onDelete('restrict')->onUpdate('cascade');
            $table->foreignUuid('unidade_id')->constrained()->onDelete('restrict')->onUpdate('cascade');
            $table->foreignUuid('tipo_modalidade_id')->constrained('tipos_modalidades')->onDelete('restrict')->onUpdate('cascade');
            /* OBS:
            - Referencia para tabela de atividades do plano, caso esteja vazia o usuário pode receber todas as atividades
            - documento_id criado em 2021_10_19_211130_create_documentos_table
            */
        });
        // Cria o campo plano_id devido a referência cruzada
        Schema::table('demandas', function (Blueprint $table) {
            $table->foreignUuid('plano_id')->nullable()->constrained()->onDelete('set null')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('planos');
    }
}
