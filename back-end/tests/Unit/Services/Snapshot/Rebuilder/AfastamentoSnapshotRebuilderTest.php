<?php

use App\Models\Afastamento;
use App\Models\PlanoTrabalhoConsolidacaoAfastamento;
use App\Services\Snapshot\Rebuilder\AfastamentoSnapshotRebuilder;


uses(Tests\TestCase::class);

beforeEach(function () {
    $this->rebuilder = Mockery::mock(AfastamentoSnapshotRebuilder::class)->makePartial()->shouldAllowMockingProtectedMethods();
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

        $mockConsolidacaoAfastamento = (new PlanoTrabalhoConsolidacaoAfastamento)->fill(
            [
                "snapshot" => [
                    'observacoes' => 'Observações do snapshot',
                    'data_inicio' => '2024-01-02',
                    'data_fim' => '2024-01-06',
                    'deleted_at' => null
                ]
            ]
        );

        $this->rebuilder->shouldReceive('consolidacaoAfastamento')
            ->with($this->consolidacaoId, $this->dataConclusao, 'afastamento-123')
            ->andReturn($mockConsolidacaoAfastamento);

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
