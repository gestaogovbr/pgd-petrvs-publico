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
        Schema::create('planos_entregas', function (Blueprint $table) {
            // Configurações:   
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->integer('numero')->unique()->default(0)->comment("Número do plano de entrega (Gerado pelo sistema)");
            $table->dateTime('data_inicio')->comment("Data inicial do plano de entregas");
            $table->dateTime('data_fim')->nullable()->comment("Data final do plano de entregas");
            $table->dateTime('data_arquivamento')->nullable()->comment("Data de arquivamento do plano de entregas");
            $table->string('nome', 256)->comment("Nome do plano de entregas");
            $table->enum('status', ["INCLUIDO","HOMOLOGANDO","ATIVO","CONCLUIDO","AVALIADO","SUSPENSO","CANCELADO"])->default("INCLUIDO")->comment("Status atual do plano de entregas");
            // Chaves estrangeiras:
            $table->foreignUuid('planejamento_id')->nullable()->constrained()->onDelete('restrict')->onUpdate('cascade')->comment("Planejamento institucional ao qual está ligado o plano de entregas");
            $table->foreignUuid('cadeia_valor_id')->nullable()->constrained("cadeias_valores")->onDelete('restrict')->onUpdate('cascade')->comment("Cadeia de valores à qual está ligado o plano de entregas");
            $table->foreignUuid('unidade_id')->constrained()->onDelete('restrict')->onUpdate('cascade')->comment("Unidade à qual está ligado o plano de entregas");
            $table->foreignUuid('plano_entrega_id')->nullable()->constrained("planos_entregas")->onDelete('restrict')->onUpdate('cascade')->comment("Plano de Entrega superior ao qual este aderiu");
            $table->foreignUuid('programa_id')->constrained()->onDelete('restrict')->onUpdate('cascade')->comment('Programa de gestão ao qual está vinculado o plano de entregas');
            $table->foreignUuid('criacao_usuario_id')->constrained("usuarios")->onDelete('restrict')->onUpdate('cascade')->comment("Usuário responsável pela criação do plano de entregas");
        });
        // Cria na tabela 'sequences' o campo plano_entrega_numero
        Schema::table('sequences', function (Blueprint $table) {
            $table->integer('plano_entrega_numero')->default(0)->comment("Sequencia numérica do plano de entregas");
        });
        DB::unprepared('
            CREATE PROCEDURE sequence_plano_entrega_numero() BEGIN
                UPDATE sequences SET plano_entrega_numero = plano_entrega_numero + 1;
                SELECT plano_entrega_numero AS number FROM sequences;
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
        DB::unprepared('DROP PROCEDURE IF EXISTS sequence_plano_entrega_numero');
        Schema::table('sequences', function (Blueprint $table) {
            $table->dropColumn('plano_entrega_numero');
        });
        Schema::dropIfExists('planos_entregas');
    }
};
