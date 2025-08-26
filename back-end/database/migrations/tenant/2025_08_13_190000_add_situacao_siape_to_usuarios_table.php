<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('usuarios', function (Blueprint $table) {
            $table->enum('situacao_siape', ['ATIVO', 'INATIVO', 'ATIVO_TEMPORARIO'])->default('ATIVO')->nullable()->after('situacao_funcional')->comment('Situação no SIAPE (Ativo, Inativo ou Ativo Temporário)');
            $table->date('data_ativacao_temporaria')->nullable()->after('situacao_siape')->comment('Data de ativação temporária no Petrvs');
            $table->text('justicativa_ativacao_temporaria')->nullable()->after('data_ativacao_temporaria')->comment('Justificativa da ativação temporária no Petrvs');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('usuarios', function (Blueprint $table) {
            $table->dropColumn('situacao_siape');
        });
    }
};