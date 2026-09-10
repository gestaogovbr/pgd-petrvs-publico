<?php

use App\Repository\CadeiaValor\Contracts\CadeiaValorReadRepositoryContract;
use App\V2\ArvoreInstitucional\ArvoreInstitucionalEsforcoGraphDataProvider;
use App\V2\ArvoreInstitucional\DTOs\ArvoreNodeResponseDTO;
use App\V2\ArvoreInstitucional\DTOs\ArvoreResponseDTO;
use App\V2\CadeiaValor\CadeiaValorArvoreService;
use Tests\TestCase;

uses(TestCase::class);

afterEach(function () {
    Mockery::close();
});

describe('CadeiaValorArvoreService::getArvore', function () {

    test('retorna ArvoreResponseDTO com nós genéricos e sem cross-cadeia', function () {
        $cadeiaValor = Mockery::mock(\App\Models\CadeiaValor::class)->makePartial();
        $cadeiaValor->id = 'cv-1';
        $cadeiaValor->nome = 'Cadeia Teste';

        $processoFocal = Mockery::mock(\App\Models\CadeiaValorProcesso::class)->makePartial();
        $processoFocal->id = 'p1';

        $repo = Mockery::mock(CadeiaValorReadRepositoryContract::class);
        $repo->shouldReceive('findCadeiaValor')->with('cv-1')->andReturn($cadeiaValor);
        $repo->shouldReceive('findProcesso')->with('p1', 'cv-1')->andReturn($processoFocal);
        $repo->shouldReceive('buscarVinculosCrossCadeia')->andReturn([]);

        $esforcoGraphDataProvider = Mockery::mock(ArvoreInstitucionalEsforcoGraphDataProvider::class);
        $esforcoGraphDataProvider->shouldReceive('carregarEsforcoAcumulado')->once()->andReturn([
            'p1' => [
                'no_nome' => 'Processo 1',
                'no_pai_id' => null,
                'no_pai_secundario_id' => null,
                'container_nome' => 'Cadeia Teste',
                'tipo_nome' => 'Tipo A',
                'total_entregas' => 3,
                'esforco_disponivel_horas' => 100.0,
                'esforco_proprio' => 50.0,
                'esforco_total_horas' => 80.0,
                'planejado_percentual_disponivel' => 80.0,
                'filhos_pai' => ['p2'],
                'filhos_secundario' => [],
                'filhos' => ['p2'],
            ],
            'p2' => [
                'no_nome' => 'Processo 2',
                'no_pai_id' => 'p1',
                'no_pai_secundario_id' => null,
                'container_nome' => 'Cadeia Teste',
                'tipo_nome' => '',
                'total_entregas' => 0,
                'esforco_disponivel_horas' => 40.0,
                'esforco_proprio' => 20.0,
                'esforco_total_horas' => 30.0,
                'planejado_percentual_disponivel' => 75.0,
                'filhos_pai' => [],
                'filhos_secundario' => [],
                'filhos' => [],
            ],
        ]);

        $service = new CadeiaValorArvoreService($repo, $esforcoGraphDataProvider);
        $result = $service->getArvore('cv-1', 'p1');

        expect($result)->toBeInstanceOf(ArvoreResponseDTO::class);
        expect($result->focal_id)->toBe('p1');
        expect($result->subtitulo)->toBe('Cadeia Teste');
        expect($result->metadata)->toBe(['cross_cadeia_map' => []]);
        expect($result->metadata['cross_cadeia_map'])->toBe([]);
        expect($result->nos)->toHaveCount(2);
        expect($result->nos['p1'])->toBeInstanceOf(ArvoreNodeResponseDTO::class);
        expect($result->nos['p1']->filhos_ids)->toBe(['p2']);
        expect($result->nos['p1']->total_vinculos)->toBe(1);
        expect($result->nos['p2']->parent_id)->toBe('p1');
        expect($result->nos['p2']->total_vinculos)->toBe(1);
    });

    test('injeta nós cross-cadeia como filhos secundários', function () {
        $cadeiaValor = Mockery::mock(\App\Models\CadeiaValor::class)->makePartial();
        $cadeiaValor->id = 'cv-1';
        $cadeiaValor->nome = 'Cadeia A';

        $processoFocal = Mockery::mock(\App\Models\CadeiaValorProcesso::class)->makePartial();
        $processoFocal->id = 'p1';

        $repo = Mockery::mock(CadeiaValorReadRepositoryContract::class);
        $repo->shouldReceive('findCadeiaValor')->with('cv-1')->andReturn($cadeiaValor);
        $repo->shouldReceive('findProcesso')->with('p1', 'cv-1')->andReturn($processoFocal);
        $repo->shouldReceive('buscarVinculosCrossCadeia')->andReturn([
            (object) [
                'processo_origem_id' => 'p1',
                'processo_id' => 'cross-1',
                'processo_nome' => 'Processo Cross',
                'cadeia_valor_id' => 'cv-2',
                'cadeia_valor_nome' => 'Cadeia B',
            ],
        ]);

        $esforcoGraphDataProvider = Mockery::mock(ArvoreInstitucionalEsforcoGraphDataProvider::class);
        $esforcoGraphDataProvider->shouldReceive('carregarEsforcoAcumulado')->once()->andReturn([
            'p1' => [
                'no_nome' => 'Processo 1',
                'no_pai_id' => null,
                'no_pai_secundario_id' => null,
                'container_nome' => 'Cadeia A',
                'tipo_nome' => null,
                'total_entregas' => 0,
                'esforco_disponivel_horas' => 100.0,
                'esforco_proprio' => 50.0,
                'esforco_total_horas' => 50.0,
                'planejado_percentual_disponivel' => 50.0,
                'filhos_pai' => [],
                'filhos_secundario' => [],
                'filhos' => [],
            ],
        ]);

        $service = new CadeiaValorArvoreService($repo, $esforcoGraphDataProvider);
        $result = $service->getArvore('cv-1', 'p1');

        // Nó cross-cadeia injetado
        expect($result->nos)->toHaveCount(2);
        expect($result->nos['cross-1'])->toBeInstanceOf(ArvoreNodeResponseDTO::class);
        expect($result->nos['cross-1']->nome)->toBe('Processo Cross');
        expect($result->nos['cross-1']->container_nome)->toBe('Cadeia B');
        expect($result->nos['cross-1']->secondary_parent_id)->toBe('p1');
        expect($result->nos['cross-1']->parent_id)->toBeNull();

        // Processo de origem recebe o cross como filho secundário
        expect($result->nos['p1']->filhos_secondary_ids)->toBe(['cross-1']);
        // total_vinculos: 1 filho secundário (cross-1), sem pais
        expect($result->nos['p1']->total_vinculos)->toBe(1);

        // Nó cross-cadeia: 1 pai secundário (p1), sem filhos
        expect($result->nos['cross-1']->total_vinculos)->toBe(1);

        // Metadata contém o mapa de navegação
        expect($result->metadata['cross_cadeia_map'])->toBe(['cross-1' => 'cv-2']);
    });

    test('lança NotFoundException quando cadeia não existe', function () {
        $repo = Mockery::mock(CadeiaValorReadRepositoryContract::class);
        $repo->shouldReceive('findCadeiaValor')->with('inexistente')->andReturn(null);

        $esforcoGraphDataProvider = Mockery::mock(ArvoreInstitucionalEsforcoGraphDataProvider::class);
        $service = new CadeiaValorArvoreService($repo, $esforcoGraphDataProvider);

        $service->getArvore('inexistente', 'p1');
    })->throws(\App\Exceptions\NotFoundException::class);

    test('lança NotFoundException quando processo não existe na cadeia', function () {
        $cadeiaValor = Mockery::mock(\App\Models\CadeiaValor::class)->makePartial();
        $cadeiaValor->id = 'cv-1';
        $cadeiaValor->nome = 'Cadeia';

        $repo = Mockery::mock(CadeiaValorReadRepositoryContract::class);
        $repo->shouldReceive('findCadeiaValor')->with('cv-1')->andReturn($cadeiaValor);
        $repo->shouldReceive('findProcesso')->with('inexistente', 'cv-1')->andReturn(null);

        $esforcoGraphDataProvider = Mockery::mock(ArvoreInstitucionalEsforcoGraphDataProvider::class);
        $service = new CadeiaValorArvoreService($repo, $esforcoGraphDataProvider);

        $service->getArvore('cv-1', 'inexistente');
    })->throws(\App\Exceptions\NotFoundException::class);

    test('ArvoreResponseDTO serializa corretamente via jsonSerialize', function () {
        $dto = new ArvoreResponseDTO(
            focal_id: 'pf-1',
            nos: [],
            subtitulo: 'Cadeia Teste',
            metadata: ['cross_cadeia_map' => []],
        );

        $json = $dto->jsonSerialize();

        expect($json['focal_id'])->toBe('pf-1');
        expect($json['subtitulo'])->toBe('Cadeia Teste');
        expect($json['metadata']['cross_cadeia_map'])->toBe([]);
        expect($json['nos'])->toBe([]);
    });
});
