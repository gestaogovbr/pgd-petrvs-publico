<?php

use App\Models\Ocorrencia;
use App\Services\Snapshot\Rebuilder\OcorrenciaSnapshotRebuilder;
use Illuminate\Support\Facades\Schema;
use DateTime;
use Illuminate\Support\Facades\DB;
use Tests\DatabaseSetup;

uses(Tests\TestCase::class);

beforeEach(function () {
    DatabaseSetup::DBup();

    $this->rebuilder = new OcorrenciaSnapshotRebuilder();
    $this->consolidacaoId = 'consolidacao-123';
    $this->dataConclusao = new DateTime('2024-01-15 10:00:00');
});

describe('rebuildFromSnapshot', function () {
    test('reconstrói ocorrência sem snapshot quando data conclusão é nula', function () {
        $ocorrencia = Mockery::mock(Ocorrencia::class);
        $ocorrencia->shouldReceive('toArray')->andReturn([
            'id' => 'ocorrencia-123',
            'descricao' => 'Descrição original',
            'data_inicio' => '2024-01-01 08:00:00',
            'data_fim' => '2024-01-01 18:00:00'
        ]);

        $resultado = $this->rebuilder->rebuildFromSnapshot($ocorrencia, $this->consolidacaoId, null);

        expect($resultado['descricao'])->toBe('Descrição original');
        expect($resultado['data_inicio'])->toBe('2024-01-01 08:00:00');
        expect($resultado['data_fim'])->toBe('2024-01-01 18:00:00');
    });

    test('reconstrói ocorrência com snapshot quando existe consolidação', function () {
        $ocorrencia = Mockery::mock(Ocorrencia::class);
        $ocorrencia->shouldReceive('toArray')->andReturn([
            'id' => 'ocorrencia-123',
            'descricao' => 'Descrição original',
            'data_inicio' => '2024-01-01 08:00:00',
            'data_fim' => '2024-01-01 18:00:00'
        ]);

        DB::table('planos_trabalhos_consolidacoes_ocorrencias')->insert([
            'id' => 'snapshot-123',
            'plano_trabalho_consolidacao_id' => $this->consolidacaoId,
            'ocorrencia_id' => 'ocorrencia-123',
            'data_conclusao' => $this->dataConclusao->format('Y-m-d H:i:s'),
            'snapshot' => json_encode([
                'descricao' => 'Descrição do snapshot',
                'data_inicio' => '2024-01-02 09:00:00',
                'data_fim' => '2024-01-02 17:00:00',
                'deleted_at' => null
            ]),
            'created_at' => now(),
            'updated_at' => now()
        ]);

        $resultado = $this->rebuilder->rebuildFromSnapshot($ocorrencia, $this->consolidacaoId, $this->dataConclusao);

        expect($resultado['descricao'])->toBe('Descrição do snapshot');
        expect($resultado['data_inicio'])->toBe('2024-01-02 09:00:00');
        expect($resultado['data_fim'])->toBe('2024-01-02 17:00:00');
        expect($resultado['deleted_at'])->toBeNull();
    });

    test('chamada do método com o tipo errado de modelo retorna TypeError', function () {
        $naoOcorrencia = Mockery::mock('App\Models\NaoOcorrencia');
        expect(fn() => $this->rebuilder->rebuildFromSnapshot($naoOcorrencia, $this->consolidacaoId, $this->dataConclusao))->toThrow(TypeError::class);
    });
});
