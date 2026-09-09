<?php

use App\Support\UnidadeExecutoraHistoricoBackfill;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('unidades_executora_historico', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('unidade_id');
            $table->boolean('executora');
            $table->date('data_inicio');
            $table->date('data_fim')->nullable();
            $table->timestamps();

            $table->foreign('unidade_id')->references('id')->on('unidades');
            $table->index(['unidade_id', 'data_inicio']);
        });

        (new UnidadeExecutoraHistoricoBackfill())->popular();
    }

    public function down(): void
    {
        Schema::dropIfExists('unidades_executora_historico');
    }
};
