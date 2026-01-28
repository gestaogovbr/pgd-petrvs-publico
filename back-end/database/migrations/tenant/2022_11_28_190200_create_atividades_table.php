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
        Schema::create('atividades', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->integer('numero')->unique()->comment("Número da atividade (Gerado pelo sistema)");
            $table->text('descricao')->comment("Assunto da atividade");
            $table->dateTime('data_distribuicao')->comment("Data de cadastro da atividade");
            $table->float('carga_horaria')->nullable()->comment("Carga horária que será utilizada para todos os cálculos (vinda do plano de trabalho)");
            $table->float('tempo_planejado')->comment("Diferença entre data_distribuicao e data_estipulada_entrega em horas (úteis ou corridas, configurada na unidade)");
            $table->dateTime('data_estipulada_entrega')->comment("Data estipulada para entrega da demanda");
            $table->dateTime('data_inicio')->nullable()->comment("Data em que o usuário iniciou a atividade");
            $table->dateTime('data_entrega')->nullable()->comment("Data da entrega");
            $table->float('esforco')->comment("Esforço (tempo) que será empregado na execução da atividade");
            $table->float('tempo_despendido')->nullable()->comment("Calculado no final da atividade, sendo o tempo líquido (considerando pausas)");
            $table->dateTime('data_arquivamento')->nullable()->comment("Data de arquivamento da demanda");
            $table->json('etiquetas')->nullable()->comment("Etiquetas");
            $table->json('checklist')->nullable()->comment("Checklist");
            $table->integer('prioridade')->nullable()->comment("Nível de prioridade");
            $table->decimal('progresso', 5, 2)->default(0)->comment("Progresso da realização da atividade");
            $table->enum('status', ["INCLUIDO", "INICIADO", "PAUSADO", "CONCLUIDO"])->default("INCLUIDO")->comment("Status atual da atividade");
            // Chaves estrangeiras:
            $table->foreignUuid('plano_trabalho_id')->nullable()->constrained("planos_trabalhos")->onDelete('restrict')->onUpdate('cascade')->comment("Plano de trabalho que a atividade está vinculada");
            $table->foreignUuid('plano_trabalho_entrega_id')->nullable()->constrained("planos_trabalhos_entregas")->onDelete('restrict')->onUpdate('cascade')->comment("Entrega que a atividade está vinculada");
            $table->foreignUuid('plano_trabalho_consolidacao_id')->nullable()->constrained("planos_trabalhos_consolidacoes")->onDelete('restrict')->onUpdate('cascade')->comment("Consolidação onde essa atividade foi lançada diretamente por lá");
            $table->foreignUuid('tipo_atividade_id')->nullable()->constrained("tipos_atividades")->onDelete('restrict')->onUpdate('cascade')->comment("Tipo de atividade");
            $table->foreignUuid('demandante_id')->constrained("usuarios")->onDelete('restrict')->onUpdate('cascade')->comment("Usuário demandante");
            $table->foreignUuid('usuario_id')->nullable()->constrained()->onDelete('restrict')->onUpdate('cascade')->comment("Usuário responsável pela atividade");
            $table->foreignUuid('unidade_id')->constrained()->onDelete('restrict')->onUpdate('cascade')->comment("Unidade responsável pela atividade");
            $table->foreignUuid('documento_requisicao_id')->nullable()->constrained('documentos')->onDelete('restrict')->onUpdate('cascade')->comment("Documento de requisição");
            $table->foreignUuid('documento_entrega_id')->nullable()->constrained('documentos')->onDelete('restrict')->onUpdate('cascade')->comment("Documento de entrega");
        });
        // Cria sequencia atividade_numero
        Schema::table('sequences', function (Blueprint $table) {
            $table->integer('atividade_numero')->default(0)->comment("Sequencia numeria do número da atividade");
        });
        DB::unprepared('
            CREATE PROCEDURE sequence_atividade_numero() BEGIN
                UPDATE sequences SET atividade_numero = atividade_numero + 1;
                SELECT atividade_numero AS number FROM sequences;
            END
        ');
        // Cria a chave estrangeira na tabela 'documentos' devido à referência cruzada com 'atividades'
        Schema::table('documentos', function (Blueprint $table) {
            $table->foreignUuid('atividade_id')->nullable()->constrained('atividades')->onDelete('restrict')->onUpdate('cascade')->comment("Atividade");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Apaga a chave estrangeira na tabela 'documentos' devido à referência cruzada com 'atividades'
        Schema::table('documentos', function (Blueprint $table) {
            $table->dropConstrainedForeignId('atividade_id');
        });
        DB::unprepared('DROP PROCEDURE IF EXISTS sequence_atividade_numero');
        Schema::table('sequences', function (Blueprint $table) {
            $table->dropColumn('atividade_numero');
        });
        Schema::dropIfExists('atividades');
    }
};
