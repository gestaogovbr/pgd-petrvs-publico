<?php

use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

test('issue 2469 - unifica descricoes utf8mb4 quando o banco tenant possui charset legado', function () {
    $connection = DB::connection('tenant');
    $databaseDefaults = $connection->selectOne(<<<SQL
        SELECT
            DEFAULT_CHARACTER_SET_NAME AS charset,
            DEFAULT_COLLATION_NAME AS collation
        FROM information_schema.SCHEMATA
        WHERE SCHEMA_NAME = DATABASE()
        SQL);

    expect($databaseDefaults)->not->toBeNull();

    $keeperId = '24690000-0000-4000-8000-000000000001';
    $duplicateId = '24690000-0000-4000-8000-000000000002';
    $consolidacaoId = '24690000-0000-4000-8000-000000000003';
    $demandanteId = '24690000-0000-4000-8000-000000000004';
    $unidadeId = '24690000-0000-4000-8000-000000000005';
    $descricaoComCaractereDeControle = "\u{0096} UNIFEI - descricao sintetica";

    if ($connection->transactionLevel() > 0) {
        $connection->commit();
    }

    Schema::connection('tenant')->dropIfExists('atividades_unificacao_merge_backup');
    $connection->statement('ALTER DATABASE CHARACTER SET latin1 COLLATE latin1_swedish_ci');
    $connection->statement('SET FOREIGN_KEY_CHECKS=0');

    try {
        $connection->table('atividades')->insert([
            [
                'id' => $keeperId,
                'created_at' => '2026-07-22 16:00:00',
                'updated_at' => '2026-07-22 16:00:00',
                'numero' => 246901,
                'descricao' => 'Descricao inicial',
                'data_distribuicao' => '2026-07-22 16:00:00',
                'tempo_planejado' => 8,
                'data_estipulada_entrega' => '2026-07-23 16:00:00',
                'esforco' => 8,
                'status' => 'INCLUIDO',
                'plano_trabalho_consolidacao_id' => $consolidacaoId,
                'demandante_id' => $demandanteId,
                'unidade_id' => $unidadeId,
            ],
            [
                'id' => $duplicateId,
                'created_at' => '2026-07-22 16:01:00',
                'updated_at' => '2026-07-22 16:01:00',
                'numero' => 246902,
                'descricao' => $descricaoComCaractereDeControle,
                'data_distribuicao' => '2026-07-22 16:01:00',
                'tempo_planejado' => 8,
                'data_estipulada_entrega' => '2026-07-23 16:01:00',
                'esforco' => 8,
                'status' => 'INCLUIDO',
                'plano_trabalho_consolidacao_id' => $consolidacaoId,
                'demandante_id' => $demandanteId,
                'unidade_id' => $unidadeId,
            ],
        ]);

        $connection->statement('SET FOREIGN_KEY_CHECKS=1');

        $migration = require database_path('migrations/tenant/2026_05_27_120000_unificar_atividades_consolidacao.php');
        $migration->up();

        expect($connection->table('atividades')->where('id', $keeperId)->value('descricao'))
            ->toBe("Descricao inicial\n\n{$descricaoComCaractereDeControle}")
            ->and($connection->table('atividades')->where('id', $duplicateId)->value('deleted_at'))
            ->not->toBeNull();

        expect(fn () => $connection->selectOne('SELECT 1 FROM `tmp_atividades_merge_descricoes` LIMIT 1'))
            ->toThrow(QueryException::class);
    } finally {
        $connection->statement('SET FOREIGN_KEY_CHECKS=0');
        $connection->table('atividades')->whereIn('id', [$keeperId, $duplicateId])->delete();
        Schema::connection('tenant')->dropIfExists('atividades_unificacao_merge_backup');
        $connection->statement('SET FOREIGN_KEY_CHECKS=1');
        $connection->statement(sprintf(
            'ALTER DATABASE CHARACTER SET %s COLLATE %s',
            $databaseDefaults->charset,
            $databaseDefaults->collation,
        ));
    }
});
