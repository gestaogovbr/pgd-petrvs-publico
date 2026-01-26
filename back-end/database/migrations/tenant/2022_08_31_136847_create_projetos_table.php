<?php

use App\Services\ServiceBase;
use Google\Service\Sheets\ManualRule;
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
        Schema::create('projetos', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->integer('numero')->unique()->default(0)->comment("Número do projeto (Gerado pelo sistema)");
            $table->string('nome', 256)->comment("Nome do projeto");
            $table->string('descricao', 256)->comment("Descrição do projeto");
            $table->string('finalidade', 256)->comment("Descrição do projeto");
            $table->enum('status', ['PLANEJADO', 'INICIADO', 'CONCLUIDO', 'SUSPENSO', 'CANCELADO'])->comment("Status do projeto");
            $table->dateTime('data_inicio')->comment("Inicio do projeto");
            $table->dateTime('data_fim')->comment("Fim do projeto");
            $table->dateTime('data_inicio_baseline')->nullable()->comment("Inicio do projeto (Baseline)");
            $table->dateTime('data_fim_baseline')->nullable()->comment("Fim do projeto (Baseline)");
            $table->decimal('custo', 15, 2)->comment("Custo: Será a soma dos recursos, ou a soma dos filhos caso tem_filhos e soma_custos_filhos");
            $table->tinyInteger('calcula_custos')->default(1)->comment("Se o projeto calcula custos");
            $table->tinyInteger('tempo_corrido')->default(0)->comment("Se o tempo é corrido ou usa a configuração de fins de semana, feriados e horário do expediente (quando usar horas)");
            $table->tinyInteger('usa_baseline')->default(1)->comment("Se o projeto utiliza baseline");
            $table->tinyInteger('usa_horas')->default(1)->comment("Se usa horas nas datas");
            $table->tinyInteger('calcula_intervalo')->default(1)->comment("Se calcula o início e término automaticamente pelos filhos");
            $table->tinyInteger('agrupador')->default(0)->comment("Se é apenas um registro para agrupar tarefas filhas (somente se tem_filhos e não possui progresso)");
            $table->tinyInteger('soma_progresso_filhos')->default(1)->comment("Se o progresso é calculado pela média do progresso dos filhos ou lançado manual (somente se tem_filhos)");
            $table->tinyInteger('aloca_proprios_recursos')->default(1)->comment("Se possui recursos próprios");
            $table->tinyInteger('soma_recusos_alocados_filhos')->default(1)->comment("Mostra o somatório dos recursos filhos");
            $table->tinyInteger('custos_proprios')->default(1)->comment("Se possui custos próprios");
            $table->tinyInteger('soma_custos_filhos')->default(1)->comment("Mostra o somatório dos custos filhos");
            $table->float('duracao')->comment("Duração do projeto");
            $table->decimal('progresso', 5, 2)->default(0)->comment("Percentual de progresso do projeto");
            $table->json('kanban_dockers')->nullable()->comment("Configuração das Labels das swimlanes do quadro Kanban");
            $table->json('expediente')->nullable()->comment("Configuração de expediente");
            // Chaves estrangeiras:
            $table->foreignUuid('usuario_id')->nullable()->constrained()->onDelete('restrict')->onUpdate('cascade')->comment("Usuário que incluiu o projeto");
            $table->foreignUuid('tipo_projeto_id')->nullable()->constrained("tipos_projetos")->onDelete('restrict')->onUpdate('cascade');
            $table->foreignUuid('fase_id')->nullable()->constrained("projetos_fases")->onDelete('restrict')->onUpdate('cascade');
        });
        // Cria a chave estrangeira na tabela 'projetos_fases' devido à referência cruzada com 'projetos'
        Schema::table('projetos_fases', function (Blueprint $table) {
            $table->foreignUuid('projeto_id')->constrained()->onDelete('restrict')->onUpdate('cascade')->comment("Projeto");
        });
        // Cria sequencia projeto_numero
        Schema::table('sequences', function (Blueprint $table) {
            $table->integer('projeto_numero')->default(0)->comment("Sequência numerica do Projeto");
        });
        DB::unprepared('
            CREATE PROCEDURE sequence_projeto_numero() BEGIN
                UPDATE sequences SET projeto_numero = GREATEST(IFNULL((SELECT MAX(numero) FROM projetos), 1), projeto_numero + 1);
                SELECT projeto_numero AS number FROM sequences;
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
        // Apaga a chave estrangeira na tabela 'projetos_fases' devido à referência cruzada com 'projetos'
        Schema::table('projetos_fases', function (Blueprint $table) {
            $table->dropConstrainedForeignId('projeto_id');
        });
        DB::unprepared('DROP PROCEDURE IF EXISTS sequence_projeto_numero');
        Schema::table('sequences', function (Blueprint $table) {
            $table->dropColumn('projeto_numero');
        });
        Schema::dropIfExists('projetos');
    }
};
