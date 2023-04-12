<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEntidadesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('entidades', function (Blueprint $table) {
            // Configurações
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            // Campos:
            $table->string('sigla', 100)->comment("Sigla da entidade");
            $table->string('nome', 256)->comment("Nome da entidade");
            $table->enum("abrangencia", ["NACIONAL", "ESTADUAL", "MUNICIPAL"])->comment("Abrangência da entidade");
            $table->string("codigo_ibge", 8)->nullable()->comment("Código da UF ou do município (IBGE)");
            $table->string("uf", 2)->nullable()->comment("UF para feriados estaduais");
            $table->integer("carga_horaria_padrao")->default(8)->comment("Carga horária utilizada ao criar plano de trabalho");
            $table->tinyInteger("gravar_historico_processo")->default(0)->comment("Se grava andamento da demanda dentro do processo vinculado (Caso seja o Sei, será em Consultar Andamento)");
            $table->enum("layout_formulario_demanda", ["COMPLETO", "SIMPLIFICADO"])->default("COMPLETO")->comment("Layout para a tela do formulário de demandas (cadastro simplificado ou completo)");
            $table->json("campos_ocultos_demanda")->nullable()->comment("Campos que se deseja ocultar do formulário de daemanda, com seu respectivo valor padrão, em caso de null será utilizado o valor default do banco");
            $table->json("nomenclatura")->nullable()->comment("Nomenclatura utilizada no sistema");
            $table->string("url_sei", 100)->nullable()->comment("URL base do sei da entidade");
            // Chaves estrangeiras:
            $table->foreignUuid('tipo_modalidade_id')->constrained('tipos_modalidades')->onDelete('restrict')->onUpdate('cascade')->comment("Tipo de modalidade utilizada ao criar plano de trabalho");
            $table->foreignUuid('cidade_id')->nullable()->constrained('cidades')->onDelete('restrict')->onUpdate('cascade');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('entidades');
    }
}
