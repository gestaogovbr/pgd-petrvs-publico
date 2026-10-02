<?php

use App\Models\CadeiaValor;
use App\Models\CadeiaValorProcesso;
use App\Repository\CadeiaValor\Contracts\CadeiaValorReadRepositoryContract;
use App\Repository\UnidadeRepository;
use App\V2\ArvoreInstitucional\ArvoreInstitucionalAbrangenciaPolicy;
use App\V2\ArvoreInstitucional\ArvoreInstitucionalPainelAssembler;
use App\V2\ArvoreInstitucional\ArvoreInstitucionalPainelDataProvider;
use App\V2\ArvoreInstitucional\DTOs\SecaoResumoDTO;
use App\V2\CadeiaValor\CadeiaValorPainelService;
use App\V2\CadeiaValor\DTOs\CadeiaValorPainelResumoDTO;
use App\V2\CadeiaValor\Validators\CadeiaValorProcessoValidator;
use Tests\TestCase;

uses(TestCase::class);

afterEach(function () {
    Mockery::close();
});

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
        'total_entregas_avaliadas' => 8,
        'entregas_concluidas' => 4,
    ], $overrides);
}

function criarCadeiaValorPainelService(
    ?CadeiaValorReadRepositoryContract $repo = null,
    ?ArvoreInstitucionalPainelDataProvider $painelDataProvider = null,
): CadeiaValorPainelService {
    $repo = $repo ?? Mockery::mock(CadeiaValorReadRepositoryContract::class);
    $painelDataProvider = $painelDataProvider ?? Mockery::mock(ArvoreInstitucionalPainelDataProvider::class);
    $unidadeRepo = Mockery::mock(UnidadeRepository::class);

    return new CadeiaValorPainelService(
        $repo,
        new ArvoreInstitucionalPainelAssembler(),
        $painelDataProvider,
        new CadeiaValorProcessoValidator($repo),
        new ArvoreInstitucionalAbrangenciaPolicy($unidadeRepo),
    );
}

describe('CadeiaValorPainelService::getResumo', function () {

    test('getResumo retorna DTO com item e consolidado', function () {
        $repo = Mockery::mock(CadeiaValorReadRepositoryContract::class);
        $painelRepo = Mockery::mock(ArvoreInstitucionalPainelDataProvider::class);
        $cadeiaValor = Mockery::mock(CadeiaValor::class)->makePartial();
        $processo = Mockery::mock(CadeiaValorProcesso::class)->makePartial();

        $repo->shouldReceive('findCadeiaValor')->with('cv-1')->andReturn($cadeiaValor);
        $repo->shouldReceive('findProcesso')->with('proc-1', 'cv-1')->andReturn($processo);
        $repo->shouldReceive('buscarDadosGeraisPainel')->with('proc-1', 'cv-1')->andReturn((object) [
            'processo_id' => 'proc-1',
            'processo_nome' => 'Processo Teste',
            'tipo_elemento_nome' => 'Macroprocesso',
            'nivel' => 2,
        ]);
        $repo->shouldReceive('coletarIdsFilhosRecursivo')
            ->with('proc-1')
            ->andReturn(['proc-1', 'proc-2']);

        $painelRepo->shouldReceive('agregarEsforcoPessoasEntregas')->withAnyArgs()
            ->andReturn(mockAggData(), mockAggData(['esforco_planejado_horas' => 1200.0]));
        $painelRepo->shouldReceive('listarFiltroUnidades')->withAnyArgs()
            ->andReturn([['id' => 'u1', 'label' => 'UA — Unidade A']]);

        $service = criarCadeiaValorPainelService($repo, $painelRepo);
        $result = $service->getResumo('cv-1', 'proc-1');

        expect($result)->toBeInstanceOf(CadeiaValorPainelResumoDTO::class)
            ->and($result->processo_id)->toBe('proc-1')
            ->and($result->processo_nome)->toBe('Processo Teste')
            ->and($result->tipo_elemento_nome)->toBe('Macroprocesso')
            ->and($result->nivel)->toBe(2)
            ->and($result->item)->toBeInstanceOf(SecaoResumoDTO::class)
            ->and($result->item->esforco->planejado_horas)->toBe(800.0)
            ->and($result->consolidado)->toBeInstanceOf(SecaoResumoDTO::class)
            ->and($result->consolidado->esforco->planejado_horas)->toBe(1200.0)
            ->and($result->filtro_unidades)->toHaveCount(1);
    });

    test('getResumo propaga unidade_id como filtro', function () {
        $repo = Mockery::mock(CadeiaValorReadRepositoryContract::class);
        $painelRepo = Mockery::mock(ArvoreInstitucionalPainelDataProvider::class);
        $cadeiaValor = Mockery::mock(CadeiaValor::class)->makePartial();
        $processo = Mockery::mock(CadeiaValorProcesso::class)->makePartial();

        $repo->shouldReceive('findCadeiaValor')->andReturn($cadeiaValor);
        $repo->shouldReceive('findProcesso')->andReturn($processo);
        $repo->shouldReceive('buscarDadosGeraisPainel')->andReturn((object) [
            'processo_id' => 'proc-1', 'processo_nome' => 'P', 'tipo_elemento_nome' => '', 'nivel' => 1,
        ]);
        $repo->shouldReceive('coletarIdsFilhosRecursivo')->with('proc-1')->andReturn(['proc-1']);

        $painelRepo->shouldReceive('agregarEsforcoPessoasEntregas')->withAnyArgs()
            ->andReturn(mockAggData());
        $painelRepo->shouldReceive('listarFiltroUnidades')->withAnyArgs()
            ->andReturn([]);

        $service = criarCadeiaValorPainelService($repo, $painelRepo);
        $result = $service->getResumo('cv-1', 'proc-1', 'unidade-filtro');

        expect($result)->toBeInstanceOf(CadeiaValorPainelResumoDTO::class);
    });

    test('getResumo lança NotFoundException se cadeia não existe', function () {
        $repo = Mockery::mock(CadeiaValorReadRepositoryContract::class);
        $repo->shouldReceive('findCadeiaValor')->with('cv-inexistente')->andReturnNull();

        $service = criarCadeiaValorPainelService($repo);
        $service->getResumo('cv-inexistente', 'proc-1');
    })->throws(\App\Exceptions\NotFoundException::class);

    test('getResumo lança NotFoundException se processo não existe', function () {
        $repo = Mockery::mock(CadeiaValorReadRepositoryContract::class);
        $cadeiaValor = Mockery::mock(CadeiaValor::class)->makePartial();
        $repo->shouldReceive('findCadeiaValor')->andReturn($cadeiaValor);
        $repo->shouldReceive('findProcesso')->with('proc-inexistente', 'cv-1')->andReturnNull();

        $service = criarCadeiaValorPainelService($repo);
        $service->getResumo('cv-1', 'proc-inexistente');
    })->throws(\App\Exceptions\NotFoundException::class);
});
