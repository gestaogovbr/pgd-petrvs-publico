<?php

use App\Services\Snapshot\Creator\AfastamentoSnapshotCreator;
use App\Models\PlanoTrabalhoConsolidacaoAfastamento;
use Illuminate\Support\Facades\DB;


uses(Tests\TestCase::class);

beforeEach(function () {
});

describe('AfastamentoSnapshotCreator', function () {
    test('cria snapshot do afastamento com sucesso', function () {
        $dataConclusao = now();
        DB::table('afastamentos')->insert([
            'id' => 'afastamento-1',
            'usuario_id' => 'user-1',
            'tipo_motivo_afastamento_id' => 'tipo-1',
            'data_inicio' => '2024-01-01',
            'data_fim' => '2024-01-05',
            'observacoes' => 'Afastamento de teste',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        $creator = new AfastamentoSnapshotCreator();

        $creator->create('afastamento-1', 'consolidacao-1', $dataConclusao);

        $snapshot = PlanoTrabalhoConsolidacaoAfastamento::where('afastamento_id', 'afastamento-1')
            ->where('plano_trabalho_consolidacao_id', 'consolidacao-1')
            ->first();

        expect($snapshot)->not->toBeNull();
        expect($snapshot->afastamento_id)->toBe('afastamento-1');
        expect($snapshot->plano_trabalho_consolidacao_id)->toBe('consolidacao-1');
        expect($snapshot->data_conclusao->format('Ymd'))->toEqual($dataConclusao->format('Ymd'));
        
        $snapshotData = $snapshot->snapshot;
        expect($snapshotData->id)->toBe('afastamento-1');
        expect($snapshotData->observacoes)->toBe('Afastamento de teste');
        expect($snapshotData->data_inicio)->toBe('2024-01-01');
        expect($snapshotData->data_fim)->toBe('2024-01-05');
    });

    test('lança exceção quando afastamento não existe', function () {
        $creator = new AfastamentoSnapshotCreator();
        
        expect(fn() => $creator->create('inexistente-id', 'consolidacao-1', now()))
            ->toThrow(Exception::class, 'Afastamento não encontrado');
    });

    test('salva snapshot com todos os campos do afastamento', function () {
        DB::table('afastamentos')->insert([
            'id' => 'afastamento-complete',
            'usuario_id' => 'user-1',
            'tipo_motivo_afastamento_id' => 'tipo-1',
            'data_inicio' => '2024-01-01',
            'data_fim' => '2024-01-05',
            'observacoes' => 'Observações completas',
            'horas' => 40,
            'created_at' => now(),
            'updated_at' => now()
        ]);

        $creator = new AfastamentoSnapshotCreator();
        $creator->create('afastamento-complete', 'consolidacao-complete', now());

        $snapshot = PlanoTrabalhoConsolidacaoAfastamento::where('afastamento_id', 'afastamento-complete')->first();
        $snapshotData = $snapshot->snapshot;

        expect($snapshotData)->toHaveKeys([
            'id',
            'usuario_id',
            'tipo_motivo_afastamento_id',
            'data_inicio',
            'data_fim',
            'observacoes',
            'horas',
            'created_at',
            'updated_at'
        ]);
        
        expect($snapshotData->horas)->toBe(40);
        expect($snapshotData->observacoes)->toBe('Observações completas');
    });

    test('permite múltiplos snapshots para diferentes consolidações', function () {
        DB::table('afastamentos')->insert([
            'id' => 'afastamento-multi',
            'usuario_id' => 'user-1',
            'tipo_motivo_afastamento_id' => 'tipo-1',
            'data_inicio' => '2024-01-01',
            'data_fim' => '2024-01-05',
            'observacoes' => 'Multi snapshot test',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        $creator = new AfastamentoSnapshotCreator();
        
        $creator->create('afastamento-multi', 'consolidacao-1', now());
        $creator->create('afastamento-multi', 'consolidacao-2', now());

        $snapshots = PlanoTrabalhoConsolidacaoAfastamento::where('afastamento_id', 'afastamento-multi')->get();
        
        expect($snapshots)->toHaveCount(2);
        expect($snapshots->pluck('plano_trabalho_consolidacao_id')->toArray())
            ->toContain('consolidacao-1', 'consolidacao-2');
    });
})->todo();
