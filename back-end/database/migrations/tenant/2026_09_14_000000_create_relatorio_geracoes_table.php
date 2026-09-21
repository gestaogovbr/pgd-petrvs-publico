<?php

use App\Enums\RelatorioGeracaoStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('relatorio_geracoes')) {
            return;
        }

        Schema::create('relatorio_geracoes', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('tipo', 50);
            $table->string('nome', 180);
            $table->enum('status', RelatorioGeracaoStatus::values());
            $table->uuid('usuario_id');
            $table->json('parametros')->nullable();
            $table->string('arquivo_path', 500)->nullable();
            $table->string('arquivo_nome', 255)->nullable();
            $table->dateTime('iniciado_em');
            $table->dateTime('finalizado_em')->nullable();
            $table->text('erro_mensagem')->nullable();
            $table->unsignedInteger('progresso_pagina')->default(0);
            $table->unsignedInteger('progresso_total')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index('usuario_id');
            $table->index('status');
            $table->index('iniciado_em');
            $table->index(['usuario_id', 'iniciado_em']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('relatorio_geracoes');
    }
};
