<?php

use App\Models\CadeiaValor;
use App\Models\CadeiaValorProcesso;
use App\Repository\CadeiaValor\Contracts\CadeiaValorReadRepositoryContract;
use App\V2\CadeiaValor\CadeiaValorPainelAssembler;
use App\V2\CadeiaValor\CadeiaValorResumoService;
use App\V2\CadeiaValor\DTOs\CadeiaValorPainelResumoDTO;
use Tests\TestCase;

uses(TestCase::class);

afterEach(function () {
    Mockery::close();
});

function criarResumoService(
    ?CadeiaValorReadRepositoryContract $repo = null,
    ?CadeiaValorPainelAssembler $assembler = null,
): CadeiaValorResumoService {
    return new CadeiaValorResumoService(
        $repo ?? Mockery::mock(CadeiaValorReadRepositoryContract::class),
        $assembler ?? new CadeiaValorPainelAssembler(),
    );
}

describe('CadeiaValorResumoService', function () {

    test('getResumo retorna DTO montado pelo assembler', function () {
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
        $repo->shouldReceive('agregarPainelEsforcoPessoasEntregas')->with('proc-1', null)->andReturn((object) [
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
            'entregas_concluidas' => 4,
        ]);
        $repo->shouldReceive('listarFiltroUnidadesPainel')->with('proc-1')->andReturn([
            ['id' => 'u1', 'label' => 'UA — Unidade A'],
        ]);

        $service = criarResumoService($repo);
        $result = $service->getResumo('cv-1', 'proc-1');

        expect($result)->toBeInstanceOf(CadeiaValorPainelResumoDTO::class);
        expect($result->processo_id)->toBe('proc-1');
        expect($result->processo_nome)->toBe('Processo Teste');
        expect($result->nivel)->toBe(2);
        expect($result->esforco->disponivel_horas)->toBe(1000.0);
        expect($result->esforco->planejado_horas)->toBe(800.0);
        expect($result->esforco->executado_horas)->toBe(600.0);
        expect($result->esforco->mostrar_planejado)->toBeTrue();
        expect($result->esforco->mostrar_executado)->toBeTrue();
        expect($result->pessoas->total_participantes)->toBe(10);
        expect($result->pessoas->participantes_somente_unidade_propria)->toBe(5);
        expect($result->entregas->total_entregas)->toBe(10);
        expect($result->entregas->entregas_concluidas)->toBe(4);
        expect($result->filtro_unidades)->toHaveCount(1);
    });

    test('getResumo propaga unidade_id como filtro ao repository', function () {
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
            ->andReturn((object) [
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
        $repo->shouldReceive('listarFiltroUnidadesPainel')->andReturn([]);

        $service = criarResumoService($repo);
        $service->getResumo('cv-1', 'proc-1', 'unidade-filtro');
    });

    test('getResumo lança NotFoundException se cadeia de valor não existe', function () {
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
});

describe('CadeiaValorPainelResumoDTO', function () {

    test('serializa corretamente em JSON', function () {
        $assembler = new CadeiaValorPainelAssembler();
        $dto = $assembler->montarResumo(
            (object) ['processo_id' => 'proc-1', 'processo_nome' => 'Processo Teste', 'nivel' => 2],
            (object) [
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
                'entregas_concluidas' => 4,
            ],
            [['id' => 'u1', 'label' => 'UA — Unidade A']],
        );

        $json = $dto->jsonSerialize();

        expect($json['processo_id'])->toBe('proc-1');
        expect($json['processo_nome'])->toBe('Processo Teste');
        expect($json['nivel'])->toBe(2);
        expect($json['esforco'])->toBeInstanceOf(\App\V2\Planejamento\Objetivo\DTOs\ObjetivoPainelEsforcoResumoDTO::class);
        expect($json['pessoas'])->toBeInstanceOf(\App\V2\Planejamento\Objetivo\DTOs\ObjetivoPainelPessoasResumoDTO::class);
        expect($json['entregas'])->toBeInstanceOf(\App\V2\Planejamento\Objetivo\DTOs\ObjetivoPainelEntregasResumoDTO::class);
        expect($json['filtro_unidades'])->toHaveCount(1);
    });

    test('percentuais são zero quando base é zero', function () {
        $assembler = new CadeiaValorPainelAssembler();
        $dto = $assembler->montarResumo(
            (object) ['processo_id' => 'proc-1', 'processo_nome' => 'Vazio', 'nivel' => 1],
            (object) [
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
            ],
            [],
        );

        expect($dto->esforco->planejado_percentual_disponivel)->toBe(0.0);
        expect($dto->esforco->executado_percentual_planejado)->toBe(0.0);
        expect($dto->entregas->percentual_concluidas)->toBe(0.0);
    });
});
