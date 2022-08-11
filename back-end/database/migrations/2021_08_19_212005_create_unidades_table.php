<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUnidadesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('unidades', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            // Campos
            $table->string('codigo', 12)->comment('Código da unidade');
            $table->string('sigla', 100)->comment("Sigla da unidade");
            $table->string('nome', 256)->comment("Nome da unidade");
            $table->text('path')->nullable()->comment('Path dos nós pais separados por /, ou null caso sejam nós raiz');
            $table->tinyInteger("atividades_arquivamento_automatico")->default(0)->comment("Se arquiva automaticamente após avaliação");
            $table->tinyInteger("atividades_avaliacao_automatico")->default(0)->comment("Se avalia automaticamente ao final do prazo para avaliação com nota 10 (pela IN65/2020-ME é 45 dias após a entrega)");
            $table->integer("planos_prazo_comparecimento")->default(1)->comment("Prazo de antecedência para comunicar o usuário de seu comparecimento na unidade");
            $table->set("planos_tipo_prazo_comparecimento", ["HORAS", "DIAS"])->default("DIAS")->comment("Unidade de medida para contagem do planos_prazo_comparecimento");
            $table->time("horario_trabalho_inicio")->default("00:00")->comment("Referência do início da jornada de trabalho diária da unidade para fins de distribuição de demanda (contar a partir deste horário)");
            $table->time("horario_trabalho_fim")->default("24:00")->comment("Referência do fim da jornada de trabalho diária da unidade para fins de distribuição de demanda (até este horário, caso seja superior será contado do dia seguinte)");
            $table->time("horario_trabalho_intervalo")->default("00:00")->comment("Intervalo realizado dentro da jornada de trabalho (Ex.: horário de almoço). Para fins de computo de jornada de trabalho na ausência do plano de trabalho.");
            $table->set("distribuicao_forma_contagem_prazos", ["HORAS_CORRIDAS", "DIAS_CORRIDOS", "HORAS_UTEIS", "DIAS_UTEIS"])->default("DIAS_UTEIS")->comment("Forma da contagem de prazo");
            $table->set("entrega_forma_contagem_prazos", ["HORAS_CORRIDAS", "HORAS_UTEIS"])->default("HORAS_UTEIS")->comment("Forma da contagem de horas para entrega");
            $table->json("distribuicao_notificacao")->nullable()->comment("Mensagem das notificações geradas pela demanda. (texto_criacao, texto_conclusao)");
            $table->tinyInteger("autoedicao_subordinadas")->default(1)->comment("Permitir a autoedição de informações gerais pelas unidades subordinadas (nome, sigla, codigo_pai)");
            $table->json("etiquetas")->nullable()->comment("Configuração das etiquetas que serão utilizadas nas demandas (contém nome, icone e cor)");
            $table->json('checklist')->nullable()->comment("Nome dos checklist predefinidas");
            $table->dateTime('data_inicio')->comment("Data inicio da vigência");
            $table->dateTime('data_fim')->nullable()->comment("Data final da vigência");
            // Chaves estrangeiras:
            $table->foreignUuid('cidade_id')->nullable()->constrained()->onDelete('restrict')->onUpdate('cascade')->comment('Cidade da unidade');
            $table->foreignUuid('unidade_id')->nullable()->constrained()->onDelete('restrict')->onUpdate('cascade')->comment('Unidade superior (nó pai hierárquico)');
            $table->foreignUuid('entidade_id')->constrained()->onDelete('restrict')->onUpdate('cascade');
            // Indices
            $table->index('codigo');
        });
        DB::statement('ALTER TABLE unidades ADD FULLTEXT(path)');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('unidades');
    }
}