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
            $table->integer('prazo_execucao')->comment("Limite máximo de dias corridos para o plano de entregas (Zero para não limitar)");
            $table->tinyInteger('termo_obrigatorio')->default(0)->comment("Se o termo é ou não obrigatório");
            $table->json('config')->nullable()->comment("Configurações do programa");
            $table->dateTime('data_inicio_vigencia')->comment("Inicio da vigência do programa");
            $table->dateTime('data_fim_vigencia')->comment("Fim da vigência do programa");
            $table->enum('periodo_avaliacao', ["SEMANAL", "QUINZENAL", "MENSAL", "BIMESTRAL", "TRIMESTRAL", "SEMESTRAL"])->default("MENSAL")->comment("Período para avaliação do plano de trabalho");
            // Chaves estrangeiras:
            $table->foreignUuid('unidade_id')->constrained()->onDelete('restrict')->onUpdate('cascade')->comment("Unidade do programa");
            $table->foreignUuid('template_tcr_id')->nullable()->constrained("templates")->onDelete('restrict')->onUpdate('cascade')->comment("Template para o TCR do programa");
            $table->foreignUuid('tipo_documento_tcr_id')->nullable()->constrained("tipos_documentos")->onDelete('restrict')->onUpdate('cascade')->comment("Tipo de documento para o TCR do programa");
            /* OBS:
            - documento_id será criado em 2021_10_19_211130_create_documentos_table
            */            
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
