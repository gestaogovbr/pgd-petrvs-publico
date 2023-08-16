<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProgramasTable extends Migration
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
            $table->tinyInteger('termo_obrigatorio')->default(0)->comment("Se o termo é ou não obrigatório");
            $table->json('config')->nullable()->comment("Configurações do programa");
            $table->dateTime('data_inicio')->comment("Inicio da vigência do programa");
            $table->dateTime('data_fim')->comment("Fim da vigência do programa");
            $table->enum('periodicidade_consolidacao', ["DIAS", "SEMANAL", "QUINZENAL", "MENSAL", "BIMESTRAL", "TRIMESTRAL", "SEMESTRAL"])->default("MENSAL")->comment("Período para avaliação do plano de trabalho");
            $table->integer('periodicidade_valor')->default("1")->comment("Representa quantidade de dias para DIAS; dia da semana para SEMANAL e QUINZENAL; e dia do mês para o restante");
            $table->integer('dias_tolerancia_consolidacao')->default("10")->comment("Dias de tolerância para o lançamento do registro das atividades na consolidação, após esses dias será liberado automaticamente para avaliação");
            // Chaves estrangeiras:
            $table->foreignUuid('tipo_avaliacao_id')->constrained("tipos_avaliacoes")->onDelete('restrict')->onUpdate('cascade')->comment("Tipo de avaliação");
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
}
