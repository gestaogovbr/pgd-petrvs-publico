<?php

use App\Models\CadeiaValor;
use App\Models\CadeiaValorProcesso;
use App\Repository\CadeiaValor\Contracts\CadeiaValorReadRepositoryContract;
use App\V2\ArvoreInstitucional\ArvoreInstitucionalPainelAssembler;
use App\V2\ArvoreInstitucional\DTOs\SecaoResumoDTO;
use App\V2\CadeiaValor\CadeiaValorResumoService;
use App\V2\CadeiaValor\DTOs\CadeiaValorPainelResumoDTO;
use App\V2\CadeiaValor\Validators\CadeiaValorProcessoValidator;
use Tests\TestCase;

uses(TestCase::class);

afterEach(function () {
    Mockery::close();
});

function criarResumoService(
    ?CadeiaValorReadRepositoryContract $repo = null,
): CadeiaValorResumoService {
    $repo = $repo ?? Mockery::mock(CadeiaValorReadRepositoryContract::class);
    return new CadeiaValorResumoService(
        $repo,
        new ArvoreInstitucionalPainelAssembler(),
        new CadeiaValorProcessoValidator($repo),
    );
}

function mockAggData(array $overrides = []): \stdClass
{
    return (object) array_merge([
        'esforco_disponivel_horas' => 1000.0,
        'esforco_planejado_horas' => 800.0,
        'esforco_executado_horas' => 600.0,
        'tem_pt_pactuado' => true,
        'tem_pt_concluido' => true,
        'tem_pe_homologado' => true,
        'participantes_somente_unidade_propria' => 5,
        'participantes_somente_outras_unidades' => 3,
        'participantes_em_ambas' => 2,
        'total_entregas' => 10,
        'total_entregas_avaliadas' => 0,
        'entregas_concluidas' => 4,
    ], $overrides);
}

describe('CadeiaValorResumoService', function () {

    test('getResumo retorna DTO com item e consolidado', function () {
        $repo = Mockery::mock(CadeiaValorReadRepositoryContract::class);
        $cadeiaValor = Mockery::mock(CadeiaValor::class)->makePartial();
        $processo = Mockery::mock(CadeiaValorProcesso::class)->makePartial();

        $repo->shouldReceive('findCadeiaValor')->with('cv-1')->andReturn($cadeiaValor);
        $repo->shouldReceive('findProcesso')->with('proc-1', 'cv-1')->andReturn($processo);
        $repo->shouldReceive('buscarDadosGeraisPainel')->with('proc-1', 'cv-1')->andReturn((object) [
            'processo_id' => 'proc-1',
            'processo_nome' => 'Processo Teste',
            'nivel' => 2,
        ]);
        $repo->shouldReceive('agregarPainelEsforcoPessoasEntregas')
            ->with('proc-1', null)
            ->andReturn(mockAggData());
        $repo->shouldReceive('agregarPainelConsolidado')
            ->with('proc-1', null)
            ->andReturn(mockAggData(['esforco_planejado_horas' => 1200.0]));
        $repo->shouldReceive('listarFiltroUnidadesPainel')->with('proc-1')->andReturn([
            ['id' => 'u1', 'label' => 'UA — Unidade A'],
        ]);

        $service = criarResumoService($repo);
        $result = $service->getResumo('cv-1', 'proc-1');

        expect($result)->toBeInstanceOf(CadeiaValorPainelResumoDTO::class)
            ->and($result->processo_id)->toBe('proc-1')
            ->and($result->processo_nome)->toBe('Processo Teste')
            ->and($result->nivel)->toBe(2)
            ->and($result->item)->toBeInstanceOf(SecaoResumoDTO::class)
            ->and($result->item->esforco->planejado_horas)->toBe(800.0)
            ->and($result->consolidado)->toBeInstanceOf(SecaoResumoDTO::class)
            ->and($result->consolidado->esforco->planejado_horas)->toBe(1200.0)
            ->and($result->filtro_unidades)->toHaveCount(1);
    });

    test('getResumo propaga unidade_id como filtro', function () {
        $repo = Mockery::mock(CadeiaValorReadRepositoryContract::class);
        $cadeiaValor = Mockery::mock(CadeiaValor::class)->makePartial();
        $processo = Mockery::mock(CadeiaValorProcesso::class)->makePartial();

        $repo->shouldReceive('findCadeiaValor')->andReturn($cadeiaValor);
        $repo->shouldReceive('findProcesso')->andReturn($processo);
        $repo->shouldReceive('buscarDadosGeraisPainel')->andReturn((object) [
            'processo_id' => 'proc-1',
            'processo_nome' => 'P',
            'nivel' => 1,
        ]);
        $repo->shouldReceive('agregarPainelEsforcoPessoasEntregas')
            ->with('proc-1', 'unidade-filtro')
            ->once()
            ->andReturn(mockAggData());
        $repo->shouldReceive('agregarPainelConsolidado')
            ->with('proc-1', 'unidade-filtro')
            ->once()
            ->andReturn(mockAggData());
        $repo->shouldReceive('listarFiltroUnidadesPainel')->andReturn([]);

        $service = criarResumoService($repo);
        $service->getResumo('cv-1', 'proc-1', 'unidade-filtro');
    });

    test('getResumo lança NotFoundException se cadeia não existe', function () {
        $repo = Mockery::mock(CadeiaValorReadRepositoryContract::class);
        $repo->shouldReceive('findCadeiaValor')->with('cv-inexistente')->andReturnNull();

        $service = criarResumoService($repo);
        $service->getResumo('cv-inexistente', 'proc-1');
    })->throws(\App\Exceptions\NotFoundException::class);

    test('getResumo lança NotFoundException se processo não existe', function () {
        $repo = Mockery::mock(CadeiaValorReadRepositoryContract::class);
        $cadeiaValor = Mockery::mock(CadeiaValor::class)->makePartial();
        $repo->shouldReceive('findCadeiaValor')->andReturn($cadeiaValor);
        $repo->shouldReceive('findProcesso')->with('proc-inexistente', 'cv-1')->andReturnNull();

        $service = criarResumoService($repo);
        $service->getResumo('cv-1', 'proc-inexistente');
    })->throws(\App\Exceptions\NotFoundException::class);

    test('percentuais são zero quando base é zero', function () {
        $repo = Mockery::mock(CadeiaValorReadRepositoryContract::class);
        $cadeiaValor = Mockery::mock(CadeiaValor::class)->makePartial();
        $processo = Mockery::mock(CadeiaValorProcesso::class)->makePartial();

        $repo->shouldReceive('findCadeiaValor')->andReturn($cadeiaValor);
        $repo->shouldReceive('findProcesso')->andReturn($processo);
        $repo->shouldReceive('buscarDadosGeraisPainel')->andReturn((object) [
            'processo_id' => 'proc-1',
            'processo_nome' => 'Vazio',
            'nivel' => 1,
        ]);
        $aggVazio = mockAggData([
            'esforco_disponivel_horas' => 0,
            'esforco_planejado_horas' => 0,
            'esforco_executado_horas' => 0,
            'tem_pt_pactuado' => false,
            'tem_pt_concluido' => false,
            'tem_pe_homologado' => false,
            'participantes_somente_unidade_propria' => 0,
            'participantes_somente_outras_unidades' => 0,
            'participantes_em_ambas' => 0,
            'total_entregas' => 0,
            'entregas_concluidas' => 0,
        ]);
        $repo->shouldReceive('agregarPainelEsforcoPessoasEntregas')->andReturn($aggVazio);
        $repo->shouldReceive('agregarPainelConsolidado')->andReturn($aggVazio);
        $repo->shouldReceive('listarFiltroUnidadesPainel')->andReturn([]);

        $service = criarResumoService($repo);
        $result = $service->getResumo('cv-1', 'proc-1');

        expect($result->item->esforco->planejado_percentual_disponivel)->toBe(0.0)
            ->and($result->item->esforco->executado_percentual_planejado)->toBe(0.0)
            ->and($result->item->entregas->percentual_concluidas)->toBe(0.0);
    });
});
