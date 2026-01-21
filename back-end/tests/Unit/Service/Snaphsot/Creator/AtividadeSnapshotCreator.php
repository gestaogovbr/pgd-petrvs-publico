<?php

use App\Services\Snapshot\Creator\AtividadeSnapshotCreator;
use App\Models\PlanoTrabalhoConsolidacaoAtividade;
use Illuminate\Support\Facades\DB;
use Tests\DatabaseSetup;

uses(Tests\TestCase::class);

beforeEach(function () {
    DatabaseSetup::DBup();
});

describe('AtividadeSnapshotCreator', function () {
    test('cria snapshot da atividade com sucesso', function () {
        $dataConclusao = now();
        DB::table('atividades')->insert([
            'id' => 'atividade-1',
            'numero' => 1,
            'descricao' => 'Atividade de teste',
            'data_distribuicao' => '2024-01-01 08:00:00',
            'tempo_planejado' => 8.0,
            'data_estipulada_entrega' => '2024-01-05 18:00:00',
            'esforco' => 6.0,
            'prioridade' => 1,
            'progresso' => 50.00,
            'status' => 'INICIADO',
            'demandante_id' => 'user-1',
            'unidade_id' => 'unidade-1',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        $creator = new AtividadeSnapshotCreator();

        $creator->create('atividade-1', 'consolidacao-1', $dataConclusao);

        $snapshot = PlanoTrabalhoConsolidacaoAtividade::where('atividade_id', 'atividade-1')
            ->where('plano_trabalho_consolidacao_id', 'consolidacao-1')
            ->first();

        expect($snapshot)->not->toBeNull();
        expect($snapshot->atividade_id)->toBe('atividade-1');
        expect($snapshot->plano_trabalho_consolidacao_id)->toBe('consolidacao-1');
        expect($snapshot->data_conclusao->format('Ymd'))->toEqual($dataConclusao->format('Ymd'));
        
        $snapshotData = $snapshot->snapshot;
        expect($snapshotData->id)->toBe('atividade-1');
        expect($snapshotData->descricao)->toBe('Atividade de teste');
        expect($snapshotData->status)->toBe('INICIADO');
        expect($snapshotData->progresso)->toBe(50);
    });

    test('lança exceção quando atividade não existe', function () {
        $creator = new AtividadeSnapshotCreator();
        
        expect(fn() => $creator->create('inexistente-id', 'consolidacao-1', now()))
            ->toThrow(Exception::class, 'Atividade não encontrada');
    });

    test('salva snapshot com todos os campos da atividade', function () {
        DB::table('atividades')->insert([
            'id' => 'atividade-complete',
            'numero' => 2,
            'descricao' => 'Atividade completa',
            'data_distribuicao' => '2024-01-01 08:00:00',
            'tempo_planejado' => 10.0,
            'data_estipulada_entrega' => '2024-01-10 18:00:00',
            'esforco' => 8.0,
            'prioridade' => 2,
            'progresso' => 75.50,
            'status' => 'CONCLUIDO',
            'demandante_id' => 'user-1',
            'unidade_id' => 'unidade-1',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        $creator = new AtividadeSnapshotCreator();
        $creator->create('atividade-complete', 'consolidacao-complete', now());

        $snapshot = PlanoTrabalhoConsolidacaoAtividade::where('atividade_id', 'atividade-complete')->first();
        $snapshotData = $snapshot->snapshot;

        expect($snapshotData)->toHaveKeys([
            'id',
            'numero',
            'descricao',
            'data_distribuicao',
            'tempo_planejado',
            'data_estipulada_entrega',
            'esforco',
            'prioridade',
            'progresso',
            'status',
            'demandante_id',
            'unidade_id',
            'created_at',
            'updated_at'
        ]);
        
        expect($snapshotData->progresso)->toBe(75.50);
        expect($snapshotData->status)->toBe('CONCLUIDO');
    });

    test('permite múltiplos snapshots para diferentes consolidações', function () {
        DB::table('atividades')->insert([
            'id' => 'atividade-multi',
            'numero' => 3,
            'descricao' => 'Multi snapshot test',
            'data_distribuicao' => '2024-01-01 08:00:00',
            'tempo_planejado' => 5.0,
            'data_estipulada_entrega' => '2024-01-03 18:00:00',
            'esforco' => 4.0,
            'prioridade' => 1,
            'progresso' => 25.00,
            'status' => 'PAUSADO',
            'demandante_id' => 'user-1',
            'unidade_id' => 'unidade-1',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        $creator = new AtividadeSnapshotCreator();
        
        $creator->create('atividade-multi', 'consolidacao-1', now());
        $creator->create('atividade-multi', 'consolidacao-2', now());

        $snapshots = PlanoTrabalhoConsolidacaoAtividade::where('atividade_id', 'atividade-multi')->get();
        
        expect($snapshots)->toHaveCount(2);
        expect($snapshots->pluck('plano_trabalho_consolidacao_id')->toArray())
            ->toContain('consolidacao-1', 'consolidacao-2');
    });
});
