<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('planos_trabalhos', function (Blueprint $table) {
            // Configurações
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->double('carga_horaria', 8, 2)->default(0.00)->comment("Carga horária diária do usuário");
            $table->double('tempo_total', 8, 2)->default(0.00)->comment("Horas úteis de trabalho no período de data_inicio à data_fim considerando carga_horaria, feriados, fins de semana");
            $table->double('tempo_proporcional', 8, 2)->default(0.00)->comment("tempo_total menos os afastamentos");
            $table->integer('numero')->default(0)->unique()->comment("Número do plano de trabalho (Gerado pelo sistema)");
            $table->dateTime('data_inicio')->comment("Inicio do plano de trabalho");
            $table->dateTime('data_fim')->comment("Fim do plano de trabalho");
            $table->dateTime('data_arquivamento')->nullable()->comment("Data de arquivamento do plano de trabalho");
            $table->enum('forma_contagem_carga_horaria', ["DIA", "SEMANA", "MES"])->default("DIA")->comment("Forma de contagem padrão da carga horária");
            $table->enum('status', ["INCLUIDO","AGUARDANDO_ASSINATURA","ATIVO","CONCLUIDO","AVALIADO","SUSPENSO","CANCELADO"])->default("INCLUIDO")->comment("Status atual do plano de trabalho");
            // Chaves estrangeiras:
            $table->foreignUuid('programa_id')->constrained()->onDelete('restrict')->onUpdate('cascade')->comment("Programa do plano de trabalho");
            $table->foreignUuid('usuario_id')->constrained()->onDelete('restrict')->onUpdate('cascade')->comment("Usuário do plano de trabalho");
            $table->foreignUuid('unidade_id')->constrained()->onDelete('restrict')->onUpdate('cascade')->comment("Unidade do plano de trabalho");
            $table->foreignUuid('tipo_modalidade_id')->constrained('tipos_modalidades')->onDelete('restrict')->onUpdate('cascade')->comment("Tipo de modalidade do plano de trabalho");
            $table->foreignUuid('criacao_usuario_id')->constrained("usuarios")->onDelete('restrict')->onUpdate('cascade')->comment("Usuário responsável pela criação do plano de trabalho");
            //Criada na tabela 'documentos' devido à referência cruzada
            //$table->foreignUuid('documento_id')->nullable()->constrained()->onDelete('restrict')->onUpdate('cascade')->comment("Termo do plano de trabalho");
        });
        // Cria na tabela 'sequences' o campo plano_trabalho_numero
        Schema::table('sequences', function (Blueprint $table) {
            $table->integer('plano_trabalho_numero')->default(0)->comment("Sequencia numérica do plano de trabalho");
        });
        DB::unprepared('
            CREATE PROCEDURE sequence_plano_trabalho_numero() BEGIN
                UPDATE sequences SET plano_trabalho_numero = plano_trabalho_numero + 1;
                SELECT plano_trabalho_numero AS number FROM sequences;
            END
        ');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::unprepared('DROP PROCEDURE IF EXISTS sequence_plano_trabalho_numero');
        Schema::table('sequences', function (Blueprint $table) {
            $table->dropColumn('plano_trabalho_numero');
        });
        Schema::dropIfExists('planos_trabalhos');
    }
};
