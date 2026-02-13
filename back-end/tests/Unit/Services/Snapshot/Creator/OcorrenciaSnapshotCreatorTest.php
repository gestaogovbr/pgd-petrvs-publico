<?php

use App\Services\Snapshot\Creator\OcorrenciaSnapshotCreator;
use App\Models\PlanoTrabalhoConsolidacaoOcorrencia;
use Illuminate\Support\Facades\DB;


uses(Tests\TestCase::class);

beforeEach(function () {
});

describe('OcorrenciaSnapshotCreator', function () {
    test('cria snapshot da ocorrência com sucesso', function () {
        $dataConclusao = now();
        DB::table('ocorrencias')->insert([
            'id' => 'ocorrencia-1',
            'usuario_id' => 'user-1',
            'plano_trabalho_id' => 'plano-1',
            'data_inicio' => '2024-01-01 08:00:00',
            'data_fim' => '2024-01-01 18:00:00',
            'descricao' => 'Ocorrência de teste',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        $creator = new OcorrenciaSnapshotCreator();

        $creator->create('ocorrencia-1', 'consolidacao-1', $dataConclusao);

        $snapshot = PlanoTrabalhoConsolidacaoOcorrencia::where('ocorrencia_id', 'ocorrencia-1')
            ->where('plano_trabalho_consolidacao_id', 'consolidacao-1')
            ->first();

        expect($snapshot)->not->toBeNull();
        expect($snapshot->ocorrencia_id)->toBe('ocorrencia-1');
        expect($snapshot->plano_trabalho_consolidacao_id)->toBe('consolidacao-1');
        expect($snapshot->data_conclusao->format('Ymd'))->toEqual($dataConclusao->format('Ymd'));
        
        $snapshotData = $snapshot->snapshot;
        expect($snapshotData->id)->toBe('ocorrencia-1');
        expect($snapshotData->descricao)->toBe('Ocorrência de teste');
        expect($snapshotData->data_inicio)->toBe('2024-01-01 08:00:00');
        expect($snapshotData->data_fim)->toBe('2024-01-01 18:00:00');
    });

    test('lança exceção quando ocorrência não existe', function () {
        $creator = new OcorrenciaSnapshotCreator();
        
        expect(fn() => $creator->create('inexistente-id', 'consolidacao-1', now()))
            ->toThrow(Exception::class, 'Ocorrência não encontrada');
    });

    test('salva snapshot com todos os campos da ocorrência', function () {
        DB::table('ocorrencias')->insert([
            'id' => 'ocorrencia-complete',
            'usuario_id' => 'user-1',
            'plano_trabalho_id' => 'plano-1',
            'data_inicio' => '2024-01-01 08:00:00',
            'data_fim' => '2024-01-01 18:00:00',
            'descricao' => 'Descrição completa da ocorrência',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        $creator = new OcorrenciaSnapshotCreator();
        $creator->create('ocorrencia-complete', 'consolidacao-complete', now());

        $snapshot = PlanoTrabalhoConsolidacaoOcorrencia::where('ocorrencia_id', 'ocorrencia-complete')->first();
        $snapshotData = $snapshot->snapshot;

        expect($snapshotData)->toHaveKeys([
            'id',
            'usuario_id',
            'plano_trabalho_id',
            'data_inicio',
            'data_fim',
            'descricao',
            'created_at',
            'updated_at'
        ]);
        
        expect($snapshotData->descricao)->toBe('Descrição completa da ocorrência');
        expect($snapshotData->plano_trabalho_id)->toBe('plano-1');
    });

    test('permite múltiplos snapshots para diferentes consolidações', function () {
        DB::table('ocorrencias')->insert([
            'id' => 'ocorrencia-multi',
            'usuario_id' => 'user-1',
            'plano_trabalho_id' => 'plano-1',
            'data_inicio' => '2024-01-01 08:00:00',
            'data_fim' => '2024-01-01 18:00:00',
            'descricao' => 'Multi snapshot test',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        $creator = new OcorrenciaSnapshotCreator();
        
        $creator->create('ocorrencia-multi', 'consolidacao-1', now());
        $creator->create('ocorrencia-multi', 'consolidacao-2', now());

        $snapshots = PlanoTrabalhoConsolidacaoOcorrencia::where('ocorrencia_id', 'ocorrencia-multi')->get();
        
        expect($snapshots)->toHaveCount(2);
        expect($snapshots->pluck('plano_trabalho_consolidacao_id')->toArray())
            ->toContain('consolidacao-1', 'consolidacao-2');
    });
})->todo();
