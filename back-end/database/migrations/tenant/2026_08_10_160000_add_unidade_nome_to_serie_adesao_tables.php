<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('serie_unidades_executoras', function (Blueprint $table) {
            $table->string('unidade_nome', 255)->after('unidade_sigla')->default('');
        });

        Schema::table('serie_participantes_pgd', function (Blueprint $table) {
            $table->string('unidade_nome', 255)->after('unidade_sigla')->default('');
        });
    }

    public function down(): void
    {
        Schema::table('serie_unidades_executoras', function (Blueprint $table) {
            $table->dropColumn('unidade_nome');
        });

        Schema::table('serie_participantes_pgd', function (Blueprint $table) {
            $table->dropColumn('unidade_nome');
        });
    }
};
