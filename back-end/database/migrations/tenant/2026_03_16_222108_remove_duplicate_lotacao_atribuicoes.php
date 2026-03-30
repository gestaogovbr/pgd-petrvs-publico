<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    private const ATRIBUICAO_LOTADO = 'LOTADO';

    public function up(): void
    {
        DB::beginTransaction();

        try {
            $duplicatas = $this->buscarMatriculasComLotacaoDuplicada();

            foreach ($duplicatas as $duplicata) {
                $this->removerLotacoesDuplicadas($duplicata->matricula);
            }

            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
            throw $e;
        }
    }

    /**
     * @return array<int, object>
     */
    private function buscarMatriculasComLotacaoDuplicada(): array
    {
        return DB::select("
            SELECT u.matricula, COUNT(*) AS total_lotacoes
            FROM usuarios u
            INNER JOIN unidades_integrantes AS ui ON u.id = ui.usuario_id
            INNER JOIN unidades_integrantes_atribuicoes AS uia ON uia.unidade_integrante_id = ui.id
            INNER JOIN unidades un ON ui.unidade_id = un.id
            WHERE uia.atribuicao = ?
              AND uia.deleted_at IS NULL
              AND u.matricula IS NOT NULL
            GROUP BY u.matricula
            HAVING COUNT(*) > 1
        ", [self::ATRIBUICAO_LOTADO]);
    }

    private function removerLotacoesDuplicadas(string $matricula): void
    {
        $atribuicoes = DB::select("
            SELECT uia.*
            FROM usuarios u
            INNER JOIN unidades_integrantes AS ui ON u.id = ui.usuario_id
            INNER JOIN unidades_integrantes_atribuicoes AS uia ON uia.unidade_integrante_id = ui.id
            INNER JOIN unidades un ON ui.unidade_id = un.id
            WHERE u.matricula = ?
              AND uia.atribuicao = ?
              AND uia.deleted_at IS NULL
            ORDER BY uia.created_at ASC
        ", [$matricula, self::ATRIBUICAO_LOTADO]);

        $atribuicoesParaRemover = array_slice($atribuicoes, 0, count($atribuicoes) - 1);

        foreach ($atribuicoesParaRemover as $atribuicao) {
            DB::table('unidades_integrantes_atribuicoes')
                ->where('id', $atribuicao->id)
                ->update(['deleted_at' => now()]);
        }
    }

    public function down(): void
    {
    }
};
