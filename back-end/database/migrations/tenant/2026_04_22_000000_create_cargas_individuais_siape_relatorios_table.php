<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('cargas_individuais_siape_relatorios')) {
            return;
        }

        Schema::create('cargas_individuais_siape_relatorios', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('processamento_id');
            $table->string('tipo', 20);
            $table->string('chave', 50);
            $table->string('status', 20);
            $table->boolean('entrada_valida')->default(false);
            $table->text('mensagem_usuario')->nullable();
            $table->json('orientacoes')->nullable();
            $table->json('secoes')->nullable();
            $table->uuid('solicitante_id')->nullable();
            $table->dateTime('processado_em');
            $table->dateTime('expira_em')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->unique('processamento_id', 'ci_siape_rel_processamento_unique');
            $table->index(['tipo', 'chave'], 'ci_siape_rel_tipo_chave_idx');
            $table->index('processado_em', 'ci_siape_rel_processado_idx');
            $table->index('expira_em', 'ci_siape_rel_expira_idx');
            $table->index('solicitante_id', 'ci_siape_rel_solicitante_idx');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cargas_individuais_siape_relatorios');
    }
};
