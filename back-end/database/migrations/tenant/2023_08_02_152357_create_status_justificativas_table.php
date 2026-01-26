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
        Schema::create('status_justificativas', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->enum('codigo', ['ATIVO', 'AVALIADO', 'CANCELADO', 'CONCLUIDO', 'HOMOLOGANDO', 'AGUARDANDO_ASSINATURA', 'INCLUIDO', 'INICIADO', 'EM_RECURSO', 'SUSPENSO'])->comment("Status do artefato (plano de entregas, plano de trabalho, consolidação ou atividade)");
            $table->text('justificativa')->comment("Justificativa da mudança para este status");
            //Chaves estrangeiras
            $table->foreignUuid('plano_entrega_id')->nullable()->constrained("planos_entregas")->onDelete('restrict')->onUpdate('cascade')->comment("Plano de Entregas ao qual se refere o status");
            $table->foreignUuid('plano_trabalho_id')->nullable()->constrained("planos_trabalhos")->onDelete('restrict')->onUpdate('cascade')->comment("Plano de Trabalho ao qual se refere o status");
            $table->foreignUuid('plano_trabalho_consolidacao_id')->nullable()->constrained("planos_trabalhos_consolidacoes")->onDelete('restrict')->onUpdate('cascade')->comment("Consolidação do Plano de Trabalho à qual se refere o status");
            $table->foreignUuid('atividade_id')->nullable()->constrained()->onDelete('restrict')->onUpdate('cascade')->comment("Atividade à qual se refere o status");
            $table->foreignUuid('usuario_id')->constrained()->onDelete('restrict')->onUpdate('cascade')->comment("Usuário que realizou a mudança de status");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('status_justificativas');
    }
};
