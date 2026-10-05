<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    private const TABELAS = [
        'usuarios',
        'planos_trabalhos',
        'planos_entregas',
    ];

    public function up(): void
    {
        foreach (self::TABELAS as $tabela) {
            Schema::table($tabela, function (Blueprint $table) {
                $table->string('cod_unidade_autorizadora', 20)->nullable()->comment('Código da unidade autorizadora utilizado no envio para a API PGD')->change();
            });
        }
    }

    public function down(): void
    {
        foreach (self::TABELAS as $tabela) {
            Schema::table($tabela, function (Blueprint $table) {
                $table->string('cod_unidade_autorizadora', 12)->nullable()->comment('Código da unidade autorizadora utilizado no envio para a API PGD')->change();
            });
        }
    }
};
