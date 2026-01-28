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
        Schema::create('programas', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->string('nome')->comment("Nome do programa");
            $table->string('normativa')->nullable()->comment("Normativa que regula o programa de gestão");
            $table->integer('prazo_max_plano_entrega')->comment("Limite máximo de dias corridos para o plano de entregas (Zero para não limitar)");
            $table->tinyInteger('termo_obrigatorio')->default(1)->comment("Se o termo é ou não obrigatório");
            $table->json('config')->nullable()->comment("Configurações do programa");
            $table->dateTime('data_inicio')->comment("Inicio da vigência do programa");
            $table->dateTime('data_fim')->comment("Fim da vigência do programa");
            $table->enum('periodicidade_consolidacao', ["DIAS", "SEMANAL", "QUINZENAL", "MENSAL", "BIMESTRAL", "TRIMESTRAL", "SEMESTRAL"])->default("MENSAL")->comment("Período para avaliação do plano de trabalho");
            $table->integer('periodicidade_valor')->default("1")->comment("Representa quantidade de dias para DIAS; dia da semana para SEMANAL e QUINZENAL; e dia do mês para o restante");
            $table->integer('dias_tolerancia_consolidacao')->default("10")->comment("Dias de tolerância para o lançamento do registro das atividades na consolidação, após esses dias será liberado automaticamente para avaliação");
            $table->integer('dias_tolerancia_avaliacao')->default("20")->comment("Dias de tolerância para realizar a avaliação, considerando a tolerância da consolidação. Caso seja zero não fará nada, caso contrário após esse prazo a consolidação será automaticamente avaliada com a nota padrão");
            $table->integer('dias_tolerancia_recurso_avaliacao')->default("20")->comment("Dias de tolerância para recorrer da avaliação");
            $table->json('nota_padrao_avaliacao')->nullable()->comment("Nota padrão de avaliação, para quando o gestor não realizar a avaliação dentro do prazo");
            $table->json('checklist_avaliacao_entregas_plano_entrega')->nullable()->comment("Checklist para avaliar das entregas do plano de entrega");
            $table->json('checklist_avaliacao_entregas_plano_trabalho')->nullable()->comment("Checklist para avaliar das entregas do plano de trabalho");
            $table->tinyInteger('registra_comparecimento')->default(1)->comment("Se utiliza registro de comparecimento nas consolidações do plano de trabalho");
            $table->tinyInteger('plano_trabalho_assinatura_participante')->default(1)->comment("Exigir assinatura do usuário no plano de trabalho");
            $table->tinyInteger('plano_trabalho_assinatura_gestor_lotacao')->default(0)->comment("Exigir assinatura do gestor da unidade de lotação do servidor");
            $table->tinyInteger('plano_trabalho_assinatura_gestor_unidade')->default(0)->comment("Exigir assinatura do gestor da unidade executora do plano de trabalho");
            $table->tinyInteger('plano_trabalho_assinatura_gestor_entidade')->default(0)->comment("Exigir assinatura do gestor da entidade do plano de trabalho");
            // Chaves estrangeiras:
            $table->foreignUuid('tipo_avaliacao_plano_trabalho_id')->constrained("tipos_avaliacoes")->onDelete('restrict')->onUpdate('cascade')->comment("Tipo de avaliação do plano de trabalho");
            $table->foreignUuid('tipo_avaliacao_plano_entrega_id')->constrained("tipos_avaliacoes")->onDelete('restrict')->onUpdate('cascade')->comment("Tipo de avaliação do plano de entrega");
            $table->foreignUuid('tipo_justificativa_id')->nullable()->constrained("tipos_justificativas")->onDelete('restrict')->onUpdate('cascade')->comment("Tipo de justificativa, para quando o gestor não realizar a avaliação dentro do prazo");
            $table->foreignUuid('unidade_id')->constrained()->onDelete('restrict')->onUpdate('cascade')->comment("Unidade do programa");
            $table->foreignUuid('template_tcr_id')->nullable()->constrained("templates")->onDelete('restrict')->onUpdate('cascade')->comment("Template para o TCR do programa");
            $table->foreignUuid('tipo_documento_tcr_id')->nullable()->constrained("tipos_documentos")->onDelete('restrict')->onUpdate('cascade')->comment("Tipo de documento para o TCR do programa");
            // Criada na tabela 'documentos' devido à referência cruzada
            //$table->foreignUuid('documento_id')->nullable()->constrained()->onDelete('restrict')->onUpdate('cascade')->comment("Documento relacionado ao programa");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('programas');
    }
};
