<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('serie_unidades_executoras')) {
            Schema::create('serie_unidades_executoras', function (Blueprint $table) {
                $table->uuid('id')->primary();
                $table->uuid('unidade_id');
                $table->string('unidade_sigla', 100);
                $table->uuid('unidade_pai_id')->nullable();
                $table->string('periodo', 7)->comment('Formato YYYY-MM');
                $table->unsignedInteger('executoras_qtd')->default(0);
                $table->unsignedInteger('nao_executoras_qtd')->default(0);
                $table->timestamps();

                $table->unique(['unidade_id', 'periodo']);
                $table->index('periodo');
            });
        }

        if (!Schema::hasTable('serie_participantes_pgd')) {
            Schema::create('serie_participantes_pgd', function (Blueprint $table) {
                $table->uuid('id')->primary();
                $table->uuid('unidade_id');
                $table->string('unidade_sigla', 100);
                $table->uuid('unidade_pai_id')->nullable();
                $table->string('periodo', 7)->comment('Formato YYYY-MM');
                $table->unsignedInteger('participantes_qtd')->default(0);
                $table->unsignedInteger('nao_participantes_qtd')->default(0);
                $table->timestamps();

                $table->unique(['unidade_id', 'periodo']);
                $table->index('periodo');
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('serie_participantes_pgd');
        Schema::dropIfExists('serie_unidades_executoras');
    }
};
