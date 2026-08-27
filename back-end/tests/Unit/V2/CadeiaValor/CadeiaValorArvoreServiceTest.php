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

function criarServiceComMock(): CadeiaValorArvoreService
{
    $repo = Mockery::mock(CadeiaValorReadRepositoryContract::class);
    $esforcoGraphDataProvider = Mockery::mock(ArvoreInstitucionalEsforcoGraphDataProvider::class);
    return new CadeiaValorArvoreService($repo, $esforcoGraphDataProvider);
}

describe('CadeiaValorArvoreService::getArvore', function () {

    test('retorna ArvoreResponseDTO com nós genéricos', function () {
        $cadeiaValor = Mockery::mock(\App\Models\CadeiaValor::class)->makePartial();
        $cadeiaValor->id = 'cv-1';
        $cadeiaValor->nome = 'Cadeia Teste';

        $processoFocal = Mockery::mock(\App\Models\CadeiaValorProcesso::class)->makePartial();
        $processoFocal->id = 'p1';

        $processo1 = Mockery::mock(\App\Models\CadeiaValorProcesso::class)->makePartial();
        $processo1->id = 'p1';
        $processo1->nome = 'Processo 1';
        $processo1->sequencia = 1;
        $processo1->processo_pai_id = null;
        $tipoElemento1 = (object) ['nome' => 'Tipo A'];
        $processo1->shouldReceive('getAttribute')->with('tipoElemento')->andReturn($tipoElemento1);

        $processo2 = Mockery::mock(\App\Models\CadeiaValorProcesso::class)->makePartial();
        $processo2->id = 'p2';
        $processo2->nome = 'Processo 2';
        $processo2->sequencia = 2;
        $processo2->processo_pai_id = 'p1';
        $processo2->shouldReceive('getAttribute')->with('tipoElemento')->andReturn(null);

        $collection = new \Illuminate\Database\Eloquent\Collection([$processo1, $processo2]);

        $repo = Mockery::mock(CadeiaValorReadRepositoryContract::class);
        $repo->shouldReceive('findCadeiaValor')->with('cv-1')->andReturn($cadeiaValor);
        $repo->shouldReceive('findProcesso')->with('p1', 'cv-1')->andReturn($processoFocal);

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
        expect($result->metadata)->toBe(['cadeia_valor_id' => 'cv-1', 'cadeia_valor_nome' => 'Cadeia Teste']);
        expect($result->nos)->toHaveCount(2);
        expect($result->nos['p1'])->toBeInstanceOf(ArvoreNodeResponseDTO::class);
        expect($result->nos['p1']->filhos_ids)->toBe(['p2']);
        expect($result->nos['p1']->total_vinculos)->toBe(1); // 1 filho (p2), sem pais
        expect($result->nos['p2']->parent_id)->toBe('p1');
        expect($result->nos['p2']->total_vinculos)->toBe(1); // sem filhos, 1 pai (p1)
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
            metadata: ['cadeia_valor_id' => 'cv-1', 'cadeia_valor_nome' => 'Cadeia Teste'],
        );

        $json = $dto->jsonSerialize();

        expect($json['focal_id'])->toBe('pf-1');
        expect($json['metadata']['cadeia_valor_id'])->toBe('cv-1');
        expect($json['metadata']['cadeia_valor_nome'])->toBe('Cadeia Teste');
        expect($json['nos'])->toBe([]);
    });
});
