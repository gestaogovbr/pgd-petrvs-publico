<?php

use App\Models\Afastamento;
use App\Services\Snapshot\Rebuilder\AfastamentoSnapshotRebuilder;
use Illuminate\Support\Facades\Schema;
use DateTime;
use Illuminate\Support\Facades\DB;
use Tests\DatabaseSetup;

uses(Tests\TestCase::class);

beforeEach(function () {
    DatabaseSetup::DBup();

    $this->rebuilder = new AfastamentoSnapshotRebuilder();
    $this->consolidacaoId = 'consolidacao-123';
    $this->dataConclusao = new DateTime('2024-01-15 10:00:00');
});

describe('rebuildFromSnapshot', function () {
    test('reconstrói afastamento sem snapshot quando data conclusão é nula', function () {
        $afastamento = Mockery::mock(Afastamento::class);
        $afastamento->shouldReceive('toArray')->andReturn([
            'id' => 'afastamento-123',
            'observacoes' => 'Observações originais',
            'data_inicio' => '2024-01-01',
            'data_fim' => '2024-01-05'
        ]);

        $resultado = $this->rebuilder->rebuildFromSnapshot($afastamento, $this->consolidacaoId, null);

        expect($resultado['observacoes'])->toBe('Observações originais');
        expect($resultado['data_inicio'])->toBe('2024-01-01');
        expect($resultado['data_fim'])->toBe('2024-01-05');
    });

    test('reconstrói afastamento com snapshot quando existe consolidação', function () {
        $afastamento = Mockery::mock(Afastamento::class);
        $afastamento->shouldReceive('toArray')->andReturn([
            'id' => 'afastamento-123',
            'observacoes' => 'Observações originais',
            'data_inicio' => '2024-01-01',
            'data_fim' => '2024-01-05'
        ]);

        DB::table('planos_trabalhos_consolidacoes_afastamentos')->insert([
            'id' => 'snapshot-123',
            'plano_trabalho_consolidacao_id' => $this->consolidacaoId,
            'afastamento_id' => 'afastamento-123',
            'data_conclusao' => $this->dataConclusao->format('Y-m-d H:i:s'),
            'snapshot' => json_encode([
                'observacoes' => 'Observações do snapshot',
                'data_inicio' => '2024-01-02',
                'data_fim' => '2024-01-06',
                'deleted_at' => null
            ]),
            'created_at' => now(),
            'updated_at' => now()
        ]);

        $resultado = $this->rebuilder->rebuildFromSnapshot($afastamento, $this->consolidacaoId, $this->dataConclusao);

        expect($resultado['observacoes'])->toBe('Observações do snapshot');
        expect($resultado['data_inicio'])->toBe('2024-01-02');
        expect($resultado['data_fim'])->toBe('2024-01-06');
        expect($resultado['deleted_at'])->toBeNull();
    });

    test('chamada do método com o tipo errado de modelo retorna TypeError', function () {
        $naoAfastamento = Mockery::mock('App\Models\NaoAfastamento');
        expect(fn() => $this->rebuilder->rebuildFromSnapshot($naoAfastamento, $this->consolidacaoId, $this->dataConclusao))->toThrow(TypeError::class);
    });
});
