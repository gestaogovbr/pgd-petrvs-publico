<?php

use App\Enums\StatusEnum;
use App\Models\CadeiaValor;
use App\Models\CadeiaValorProcesso;
use App\Repository\CadeiaValor\Contracts\CadeiaValorReadRepositoryContract;
use App\V2\CadeiaValor\CadeiaValorEntregasService;
use App\V2\CadeiaValor\CadeiaValorPainelAssembler;
use App\V2\CadeiaValor\DTOs\CadeiaValorPainelEntregaDetalheLinhaDTO;
use App\V2\CadeiaValor\DTOs\CadeiaValorPainelEntregasDetalhamentoDTO;
use Tests\TestCase;

uses(TestCase::class);

afterEach(function () {
    Mockery::close();
});

function criarEntregasService(
    ?CadeiaValorReadRepositoryContract $repo = null,
    ?CadeiaValorPainelAssembler $assembler = null,
): CadeiaValorEntregasService {
    return new CadeiaValorEntregasService(
        $repo ?? Mockery::mock(CadeiaValorReadRepositoryContract::class),
        $assembler ?? new CadeiaValorPainelAssembler(),
    );
}

describe('CadeiaValorEntregasService', function () {

    test('getEntregas retorna DTO de detalhamento com itens inline', function () {
        $repo = Mockery::mock(CadeiaValorReadRepositoryContract::class);
        $cadeiaValor = Mockery::mock(CadeiaValor::class)->makePartial();
        $processo = Mockery::mock(CadeiaValorProcesso::class)->makePartial();

        $repo->shouldReceive('findCadeiaValor')->with('cv-1')->andReturn($cadeiaValor);
        $repo->shouldReceive('findProcesso')->with('proc-1', 'cv-1')->andReturn($processo);
        $repo->shouldReceive('listarDetalhamentoEntregasPainel')
            ->with('proc-1', [])
            ->andReturn([
                (object) [
                    'plano_entrega_entrega_id' => 'pee-1',
                    'unidade_id' => 'u-1',
                    'unidade_sigla' => 'UA',
                    'unidade_nome' => 'Unidade A',
                    'plano_entrega_id' => 'pe-1',
                    'plano_entrega_nome' => 'Plano Entrega 1',
                    'plano_entrega_status' => StatusEnum::ATIVO->value,
                    'plano_entrega_data_inicio' => '2025-01-01',
                    'plano_entrega_data_fim' => '2025-12-31',
                    'entrega_titulo' => 'Entrega Teste',
                    'progresso_esperado' => 50.0,
                    'progresso_realizado' => 30.0,
                    'registro_execucao' => 'Última atividade realizada',
                    'participantes_total' => 3,
                    'participantes_somente_unidade_propria' => 2,
                    'participantes_somente_outras_unidades' => 1,
                    'participantes_em_ambas' => 0,
                    'esforco_disponivel_horas' => 500.0,
                    'esforco_planejado_horas' => 400.0,
                    'esforco_executado_horas' => 200.0,
                    'tem_pt_pactuado' => true,
                    'tem_pt_concluido' => true,
                ],
            ]);

        $service = criarEntregasService($repo);
        $result = $service->getEntregas('cv-1', 'proc-1');

        expect($result)->toBeInstanceOf(CadeiaValorPainelEntregasDetalhamentoDTO::class);
        expect($result->processo_id)->toBe('proc-1');
        expect($result->itens)->toHaveCount(1);
        expect($result->itens[0])->toBeInstanceOf(CadeiaValorPainelEntregaDetalheLinhaDTO::class);
        expect($result->itens[0]->plano_entrega_entrega_id)->toBe('pee-1');
        expect($result->itens[0]->registro_execucao)->toBe('Última atividade realizada');
        expect($result->itens[0]->participantes_total)->toBe(3);
        expect($result->itens[0]->esforco_planejado_horas)->toBe(400.0);
        expect($result->itens[0]->mostrar_planejado)->toBeTrue();
        expect($result->itens[0]->mostrar_executado)->toBeTrue();
        expect($result->filtro_entregas)->toHaveCount(1);
        expect($result->filtro_unidades)->toHaveCount(1);
    });

    test('getEntregas propaga filtros ao repository', function () {
        $repo = Mockery::mock(CadeiaValorReadRepositoryContract::class);
        $cadeiaValor = Mockery::mock(CadeiaValor::class)->makePartial();
        $processo = Mockery::mock(CadeiaValorProcesso::class)->makePartial();

        $filtros = [
            'unidade_id' => 'u-1',
            'plano_entrega_entrega_id' => 'pee-1',
            'data_inicio' => '2025-01-01',
            'data_fim' => '2025-06-30',
        ];

        $repo->shouldReceive('findCadeiaValor')->andReturn($cadeiaValor);
        $repo->shouldReceive('findProcesso')->andReturn($processo);
        $repo->shouldReceive('listarDetalhamentoEntregasPainel')
            ->with('proc-1', $filtros)
            ->once()
            ->andReturn([]);

        $service = criarEntregasService($repo);
        $result = $service->getEntregas('cv-1', 'proc-1', $filtros);

        expect($result->itens)->toBe([]);
        expect($result->filtro_entregas)->toBe([]);
        expect($result->filtro_unidades)->toBe([]);
    });

    test('getEntregas lança NotFoundException se cadeia de valor não existe', function () {
        $repo = Mockery::mock(CadeiaValorReadRepositoryContract::class);
        $repo->shouldReceive('findCadeiaValor')->with('cv-inexistente')->andReturnNull();

        $service = criarEntregasService($repo);
        $service->getEntregas('cv-inexistente', 'proc-1');
    })->throws(\App\Exceptions\NotFoundException::class);

    test('getEntregas lança NotFoundException se processo não existe', function () {
        $repo = Mockery::mock(CadeiaValorReadRepositoryContract::class);
        $cadeiaValor = Mockery::mock(CadeiaValor::class)->makePartial();
        $repo->shouldReceive('findCadeiaValor')->andReturn($cadeiaValor);
        $repo->shouldReceive('findProcesso')->with('proc-inexistente', 'cv-1')->andReturnNull();

        $service = criarEntregasService($repo);
        $service->getEntregas('cv-1', 'proc-inexistente');
    })->throws(\App\Exceptions\NotFoundException::class);

    test('getEntregas monta filtro_entregas e filtro_unidades sem duplicatas', function () {
        $repo = Mockery::mock(CadeiaValorReadRepositoryContract::class);
        $cadeiaValor = Mockery::mock(CadeiaValor::class)->makePartial();
        $processo = Mockery::mock(CadeiaValorProcesso::class)->makePartial();

        $baseRow = [
            'plano_entrega_id' => 'pe-1',
            'plano_entrega_nome' => 'PE 1',
            'plano_entrega_status' => StatusEnum::ATIVO->value,
            'plano_entrega_data_inicio' => '2025-01-01',
            'plano_entrega_data_fim' => '2025-12-31',
            'progresso_esperado' => 50.0,
            'progresso_realizado' => 30.0,
            'registro_execucao' => null,
            'participantes_total' => 0,
            'participantes_somente_unidade_propria' => 0,
            'participantes_somente_outras_unidades' => 0,
            'participantes_em_ambas' => 0,
            'esforco_disponivel_horas' => 0,
            'esforco_planejado_horas' => 0,
            'esforco_executado_horas' => 0,
            'tem_pt_pactuado' => false,
            'tem_pt_concluido' => false,
        ];

        $repo->shouldReceive('findCadeiaValor')->andReturn($cadeiaValor);
        $repo->shouldReceive('findProcesso')->andReturn($processo);
        $repo->shouldReceive('listarDetalhamentoEntregasPainel')->andReturn([
            (object) array_merge($baseRow, [
                'plano_entrega_entrega_id' => 'pee-1',
                'unidade_id' => 'u-1',
                'unidade_sigla' => 'UA',
                'unidade_nome' => 'Unidade A',
                'entrega_titulo' => 'Entrega 1',
            ]),
            (object) array_merge($baseRow, [
                'plano_entrega_entrega_id' => 'pee-1',
                'unidade_id' => 'u-2',
                'unidade_sigla' => 'UB',
                'unidade_nome' => 'Unidade B',
                'entrega_titulo' => 'Entrega 1',
            ]),
            (object) array_merge($baseRow, [
                'plano_entrega_entrega_id' => 'pee-2',
                'unidade_id' => 'u-1',
                'unidade_sigla' => 'UA',
                'unidade_nome' => 'Unidade A',
                'entrega_titulo' => 'Entrega 2',
            ]),
        ]);

        $service = criarEntregasService($repo);
        $result = $service->getEntregas('cv-1', 'proc-1');

        expect($result->itens)->toHaveCount(3);
        expect($result->filtro_entregas)->toHaveCount(2);
        expect($result->filtro_unidades)->toHaveCount(2);
        expect($result->filtro_entregas[0]['id'])->toBe('pee-1');
        expect($result->filtro_entregas[1]['id'])->toBe('pee-2');
        expect($result->filtro_unidades[0]['id'])->toBe('u-1');
        expect($result->filtro_unidades[1]['id'])->toBe('u-2');
    });
});

describe('CadeiaValorPainelEntregaDetalheLinhaDTO', function () {

    test('serializa corretamente em JSON', function () {
        $dto = new CadeiaValorPainelEntregaDetalheLinhaDTO(
            plano_entrega_entrega_id: 'pee-1',
            unidade_id: 'u-1',
            unidade_sigla: 'UA',
            unidade_nome: 'Unidade A',
            plano_entrega_id: 'pe-1',
            plano_entrega_nome: 'PE Teste',
            plano_entrega_status: StatusEnum::ATIVO->value,
            plano_entrega_vigencia_inicio: '2025-01-01',
            plano_entrega_vigencia_fim: '2025-12-31',
            entrega_titulo: 'Entrega Teste',
            progresso_esperado: 75.0,
            progresso_realizado: 50.0,
            registro_execucao: 'Atividade recente',
            participantes_total: 5,
            participantes_somente_unidade_propria: 3,
            participantes_somente_outras_unidades: 1,
            participantes_em_ambas: 1,
            esforco_disponivel_horas: 200.0,
            esforco_planejado_horas: 150.0,
            esforco_executado_horas: 100.0,
            mostrar_disponivel: true,
            mostrar_planejado: true,
            mostrar_executado: true,
        );

        $json = $dto->jsonSerialize();

        expect($json['plano_entrega_entrega_id'])->toBe('pee-1');
        expect($json['registro_execucao'])->toBe('Atividade recente');
        expect($json['participantes_total'])->toBe(5);
        expect($json['esforco_planejado_horas'])->toBe(150.0);
        expect($json['mostrar_planejado'])->toBeTrue();
        expect($json['mostrar_executado'])->toBeTrue();
    });

    test('registro_execucao pode ser null', function () {
        $dto = new CadeiaValorPainelEntregaDetalheLinhaDTO(
            plano_entrega_entrega_id: 'pee-1',
            unidade_id: 'u-1',
            unidade_sigla: 'UA',
            unidade_nome: 'Unidade A',
            plano_entrega_id: 'pe-1',
            plano_entrega_nome: 'PE',
            plano_entrega_status: StatusEnum::INCLUIDO->value,
            plano_entrega_vigencia_inicio: '2025-01-01',
            plano_entrega_vigencia_fim: null,
            entrega_titulo: 'Entrega',
            progresso_esperado: 0.0,
            progresso_realizado: 0.0,
            registro_execucao: null,
            participantes_total: 0,
            participantes_somente_unidade_propria: 0,
            participantes_somente_outras_unidades: 0,
            participantes_em_ambas: 0,
            esforco_disponivel_horas: 0.0,
            esforco_planejado_horas: 0.0,
            esforco_executado_horas: 0.0,
            mostrar_disponivel: true,
            mostrar_planejado: false,
            mostrar_executado: false,
        );

        expect($dto->registro_execucao)->toBeNull();
        expect($dto->plano_entrega_vigencia_fim)->toBeNull();
        expect($dto->mostrar_planejado)->toBeFalse();
    });
});

describe('CadeiaValorPainelEntregasDetalhamentoDTO', function () {

    test('serializa com itens, filtro_entregas e filtro_unidades', function () {
        $dto = new CadeiaValorPainelEntregasDetalhamentoDTO(
            processo_id: 'proc-1',
            itens: [],
            filtro_entregas: [['id' => 'e1', 'label' => 'Entrega 1']],
            filtro_unidades: [['id' => 'u1', 'label' => 'UA — Unidade A']],
        );

        $json = $dto->jsonSerialize();

        expect($json['processo_id'])->toBe('proc-1');
        expect($json['itens'])->toBe([]);
        expect($json['filtro_entregas'])->toHaveCount(1);
        expect($json['filtro_unidades'])->toHaveCount(1);
    });
});
