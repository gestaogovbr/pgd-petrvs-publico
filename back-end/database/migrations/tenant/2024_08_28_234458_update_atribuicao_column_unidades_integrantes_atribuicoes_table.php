<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement("ALTER TABLE `unidades_integrantes_atribuicoes` MODIFY `atribuicao` SET('AVALIADOR_PLANO_ENTREGA', 'AVALIADOR_PLANO_TRABALHO', 'HOMOLOGADOR_PLANO_ENTREGA', 'COLABORADOR', 'GESTOR', 'GESTOR_SUBSTITUTO', 'GESTOR_DELEGADO', 'LOTADO', 'CURADOR') COMMENT 'Vínculo que o servidor tem com a unidade'");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("ALTER TABLE `unidades_integrantes_atribuicoes` MODIFY `atribuicao` SET('AVALIADOR_PLANO_ENTREGA', 'AVALIADOR_PLANO_TRABALHO', 'HOMOLOGADOR_PLANO_ENTREGA', 'COLABORADOR', 'GESTOR', 'GESTOR_SUBSTITUTO', 'GESTOR_DELEGADO', 'LOTADO') COMMENT 'Vínculo que o servidor tem com a unidade'");
    }
};
