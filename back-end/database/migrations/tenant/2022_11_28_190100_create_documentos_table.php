<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
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
        Schema::create('documentos', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos
            $table->integer('numero')->unique()->default(0)->comment("Número do documento (Gerado pelo sistema)");
            $table->string('titulo', 256)->comment("Titulo do documento");
            $table->enum('tipo', ["HTML", "PDF", "LINK"])->comment("Tipo do documento");
            $table->enum('especie', ["SEI", "TCR", "OUTRO", "NOTIFICACAO"])->comment("Especificação da espécie do documento (interno do sistema)");
            $table->longText('conteudo')->nullable()->comment("Conteúdo do arquivo");
            $table->json('metadados')->nullable()->comment("Metadados");
            $table->json('link')->nullable()->comment("Informações sobre o link, caso o tipo seja LINK");
            $table->enum('status', ["GERADO", "AGUARDANDO_SEI"])->default("GERADO")->comment("Status do documento: GERADO (documento gerado); AGUARDANDO_SEI (Aguardando abrir o documento no sei para colar o conteúdo dentro)");
            $table->text('template')->nullable()->comment("Campo de Template");
            $table->json("dataset")->nullable()->comment("Definição das variáveis disponíveis para o template");
            $table->json("datasource")->nullable()->comment("Conjunto de dados do template");
            // Chaves estrangeiras:
            $table->foreignUuid('template_id')->nullable()->constrained("templates")->onDelete('restrict')->onUpdate('cascade')->comment("Template");
            $table->foreignUuid('entidade_id')->nullable()->constrained('entidades')->onDelete('restrict')->onUpdate('cascade')->comment("Entidade");
            $table->foreignUuid('plano_trabalho_id')->nullable()->constrained('planos_trabalhos')->onDelete('restrict')->onUpdate('cascade')->comment("Plano de trabalho");
            $table->foreignUuid('tipo_documento_id')->nullable()->constrained('tipos_documentos')->onDelete('restrict')->onUpdate('cascade')->comment("Tipo de documento");
            $table->foreignUuid('tipo_processo_id')->nullable()->constrained('tipos_processos')->onDelete('restrict')->onUpdate('cascade')->comment("Tipo de processo");
            // Criada na tabela 'atividades' devido à referência cruzada
            //$table->foreignUuid('atividade_id')->nullable()->constrained('atividades')->onDelete('restrict')->onUpdate('cascade')->comment("Atividade");
            // Criada na tabela 'atividades_tarefas' devido à referência cruzada
            //$table->foreignUuid('atividade_tarefa_id')->nullable()->constrained('atividades_tarefas')->onDelete('restrict')->onUpdate('cascade')->comment("Tarefa da Atividade");
        });
        // Cria sequencia documento_numero
        Schema::table('sequences', function (Blueprint $table) {
            $table->integer('documento_numero')->default(0)->comment("Sequencia numeria do número do documento");
        });
        DB::unprepared('
            CREATE PROCEDURE sequence_documento_numero() BEGIN
                UPDATE sequences SET documento_numero = documento_numero + 1;
                SELECT documento_numero AS number FROM sequences;
            END
        ');
        // Cria o campo documento_id devido a referência cruzada
        Schema::table('programas', function (Blueprint $table) {
            $table->foreignUuid('documento_id')->nullable()->constrained()->onDelete('restrict')->onUpdate('cascade')->comment("Documento relacionado ao programa");
        });
        // Cria o campo documento_id devido a referência cruzada
        Schema::table('planos_trabalhos', function (Blueprint $table) {
            $table->foreignUuid('documento_id')->nullable()->constrained()->onDelete('restrict')->onUpdate('cascade')->comment("Termo do plano de trabalho");
        });
    }
    
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Apaga o campo documento_id devido a referência cruzada
        Schema::table('programas', function (Blueprint $table) {
            $table->dropConstrainedForeignId('documento_id');
        });
        // Apaga o campo documento_id devido a referência cruzada
        Schema::table('planos_trabalhos', function (Blueprint $table) {
            $table->dropConstrainedForeignId('documento_id');
        });
        DB::unprepared('DROP PROCEDURE IF EXISTS sequence_documento_numero');
        Schema::table('sequences', function (Blueprint $table) {
            $table->dropColumn('documento_numero');
        });
        Schema::dropIfExists('documentos');
    }
};
