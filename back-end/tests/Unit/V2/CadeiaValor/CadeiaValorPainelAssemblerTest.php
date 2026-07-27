<?php

use App\V2\CadeiaValor\CadeiaValorPainelAssembler;
use App\V2\CadeiaValor\DTOs\CadeiaValorPainelEntregaDetalheLinhaDTO;
use App\V2\CadeiaValor\DTOs\CadeiaValorPainelEntregasDetalhamentoDTO;
use App\V2\CadeiaValor\DTOs\CadeiaValorPainelResumoDTO;
use App\V2\Planejamento\Objetivo\DTOs\ObjetivoPainelEntregasResumoDTO;
use App\V2\Planejamento\Objetivo\DTOs\ObjetivoPainelEsforcoResumoDTO;
use App\V2\Planejamento\Objetivo\DTOs\ObjetivoPainelPessoasResumoDTO;
use Tests\TestCase;

uses(TestCase::class);

describe('CadeiaValorPainelAssembler - montarResumo', function () {

    test('monta DTO de resumo com sub-DTOs corretos', function () {
        $assembler = new CadeiaValorPainelAssembler();

        $geral = (object) [
            'processo_id' => 'proc-1',
            'processo_nome' => 'Processo Teste',
            'nivel' => 3,
        ];

        $agg = (object) [
            'esforco_disponivel_horas' => 1000.0,
            'esforco_planejado_horas' => 800.0,
            'esforco_executado_horas' => 400.0,
            'tem_pt_pactuado' => true,
            'tem_pt_concluido' => true,
            'tem_pe_homologado' => true,
            'participantes_somente_unidade_propria' => 5,
            'participantes_somente_outras_unidades' => 3,
            'participantes_em_ambas' => 2,
            'total_entregas' => 10,
            'entregas_concluidas' => 4,
        ];

        $filtroUnidades = [
            ['id' => 'u1', 'label' => 'UA — Unidade A'],
            ['id' => 'u2', 'label' => 'UB — Unidade B'],
        ];

        $result = $assembler->montarResumo($geral, $agg, $filtroUnidades);

        expect($result)->toBeInstanceOf(CadeiaValorPainelResumoDTO::class);
        expect($result->processo_id)->toBe('proc-1');
        expect($result->processo_nome)->toBe('Processo Teste');
        expect($result->nivel)->toBe(3);

        expect($result->esforco)->toBeInstanceOf(ObjetivoPainelEsforcoResumoDTO::class);
        expect($result->esforco->disponivel_horas)->toBe(1000.0);
        expect($result->esforco->planejado_horas)->toBe(800.0);
        expect($result->esforco->executado_horas)->toBe(400.0);
        expect($result->esforco->planejado_percentual_disponivel)->toBe(80.0);
        expect($result->esforco->executado_percentual_planejado)->toBe(50.0);
        expect($result->esforco->mostrar_disponivel)->toBeTrue();
        expect($result->esforco->mostrar_planejado)->toBeTrue();
        expect($result->esforco->mostrar_executado)->toBeTrue();

        expect($result->pessoas)->toBeInstanceOf(ObjetivoPainelPessoasResumoDTO::class);
        expect($result->pessoas->total_participantes)->toBe(10);
        expect($result->pessoas->participantes_somente_unidade_propria)->toBe(5);
        expect($result->pessoas->percentual_somente_unidade_propria)->toBe(50.0);

        expect($result->entregas)->toBeInstanceOf(ObjetivoPainelEntregasResumoDTO::class);
        expect($result->entregas->total_entregas)->toBe(10);
        expect($result->entregas->entregas_concluidas)->toBe(4);
        expect($result->entregas->percentual_concluidas)->toBe(40.0);

        expect($result->filtro_unidades)->toHaveCount(2);
    });

    test('flags de visibilidade ocultam planejado/executado quando PE não homologado', function () {
        $assembler = new CadeiaValorPainelAssembler();

        $geral = (object) ['processo_id' => 'p', 'processo_nome' => 'P', 'nivel' => 1];
        $agg = (object) [
            'esforco_disponivel_horas' => 100.0,
            'esforco_planejado_horas' => 50.0,
            'esforco_executado_horas' => 0,
            'tem_pt_pactuado' => true,
            'tem_pt_concluido' => false,
            'tem_pe_homologado' => false,
            'participantes_somente_unidade_propria' => 1,
            'participantes_somente_outras_unidades' => 0,
            'participantes_em_ambas' => 0,
            'total_entregas' => 1,
            'entregas_concluidas' => 0,
        ];

        $result = $assembler->montarResumo($geral, $agg, []);

        expect($result->esforco->mostrar_disponivel)->toBeTrue();
        expect($result->esforco->mostrar_planejado)->toBeFalse();
        expect($result->esforco->mostrar_executado)->toBeFalse();
    });

    test('percentuais são zero quando bases são zero', function () {
        $assembler = new CadeiaValorPainelAssembler();

        $geral = (object) ['processo_id' => 'p', 'processo_nome' => 'P', 'nivel' => 1];
        $agg = (object) [
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
        ];

        $result = $assembler->montarResumo($geral, $agg, []);

        expect($result->esforco->planejado_percentual_disponivel)->toBe(0.0);
        expect($result->esforco->executado_percentual_planejado)->toBe(0.0);
        expect($result->pessoas->percentual_somente_unidade_propria)->toBe(0.0);
        expect($result->entregas->percentual_concluidas)->toBe(0.0);
    });
});

describe('CadeiaValorPainelAssembler - montarDetalhamento', function () {

    test('monta DTO de detalhamento com itens e filtros', function () {
        $assembler = new CadeiaValorPainelAssembler();

        $rows = [
            (object) [
                'plano_entrega_entrega_id' => 'pee-1',
                'unidade_id' => 'u-1',
                'unidade_sigla' => 'UA',
                'unidade_nome' => 'Unidade A',
                'plano_entrega_id' => 'pe-1',
                'plano_entrega_nome' => 'PE 1',
                'plano_entrega_status' => 'ATIVO',
                'plano_entrega_data_inicio' => '2025-01-01',
                'plano_entrega_data_fim' => '2025-12-31',
                'entrega_titulo' => 'Entrega Teste',
                'progresso_esperado' => 50.0,
                'progresso_realizado' => 25.0,
                'registro_execucao' => 'Último registro',
                'participantes_total' => 3,
                'participantes_somente_unidade_propria' => 2,
                'participantes_somente_outras_unidades' => 1,
                'participantes_em_ambas' => 0,
                'esforco_disponivel_horas' => 200.0,
                'esforco_planejado_horas' => 150.0,
                'esforco_executado_horas' => 75.0,
                'tem_pt_pactuado' => true,
                'tem_pt_concluido' => true,
            ],
        ];

        $result = $assembler->montarDetalhamento('proc-1', $rows);

        expect($result)->toBeInstanceOf(CadeiaValorPainelEntregasDetalhamentoDTO::class);
        expect($result->processo_id)->toBe('proc-1');
        expect($result->itens)->toHaveCount(1);
        expect($result->itens[0])->toBeInstanceOf(CadeiaValorPainelEntregaDetalheLinhaDTO::class);
        expect($result->itens[0]->entrega_titulo)->toBe('Entrega Teste');
        expect($result->itens[0]->registro_execucao)->toBe('Último registro');
        expect($result->itens[0]->mostrar_planejado)->toBeTrue();
        expect($result->itens[0]->mostrar_executado)->toBeTrue();
        expect($result->filtro_entregas)->toHaveCount(1);
        expect($result->filtro_entregas[0]['id'])->toBe('pee-1');
        expect($result->filtro_unidades)->toHaveCount(1);
        expect($result->filtro_unidades[0]['id'])->toBe('u-1');
    });

    test('deduplicação de filtros com múltiplas linhas da mesma entrega/unidade', function () {
        $assembler = new CadeiaValorPainelAssembler();

        $baseRow = [
            'plano_entrega_id' => 'pe-1',
            'plano_entrega_nome' => 'PE 1',
            'plano_entrega_status' => 'ATIVO',
            'plano_entrega_data_inicio' => '2025-01-01',
            'plano_entrega_data_fim' => '2025-12-31',
            'progresso_esperado' => 0,
            'progresso_realizado' => 0,
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

        $rows = [
            (object) array_merge($baseRow, [
                'plano_entrega_entrega_id' => 'pee-1',
                'unidade_id' => 'u-1',
                'unidade_sigla' => 'UA',
                'unidade_nome' => 'Unidade A',
                'entrega_titulo' => 'Entrega 1',
            ]),
            (object) array_merge($baseRow, [
                'plano_entrega_entrega_id' => 'pee-1',
                'unidade_id' => 'u-1',
                'unidade_sigla' => 'UA',
                'unidade_nome' => 'Unidade A',
                'entrega_titulo' => 'Entrega 1',
            ]),
        ];

        $result = $assembler->montarDetalhamento('proc-1', $rows);

        expect($result->itens)->toHaveCount(2);
        expect($result->filtro_entregas)->toHaveCount(1);
        expect($result->filtro_unidades)->toHaveCount(1);
    });

    test('retorna listas vazias quando não há rows', function () {
        $assembler = new CadeiaValorPainelAssembler();

        $result = $assembler->montarDetalhamento('proc-1', []);

        expect($result->itens)->toBe([]);
        expect($result->filtro_entregas)->toBe([]);
        expect($result->filtro_unidades)->toBe([]);
    });

    test('registro_execucao vazio é tratado como null', function () {
        $assembler = new CadeiaValorPainelAssembler();

        $rows = [
            (object) [
                'plano_entrega_entrega_id' => 'pee-1',
                'unidade_id' => 'u-1',
                'unidade_sigla' => 'UA',
                'unidade_nome' => 'Unidade A',
                'plano_entrega_id' => 'pe-1',
                'plano_entrega_nome' => 'PE 1',
                'plano_entrega_status' => 'ATIVO',
                'plano_entrega_data_inicio' => '2025-01-01',
                'plano_entrega_data_fim' => null,
                'entrega_titulo' => 'Entrega',
                'progresso_esperado' => 0,
                'progresso_realizado' => 0,
                'registro_execucao' => '',
                'participantes_total' => 0,
                'participantes_somente_unidade_propria' => 0,
                'participantes_somente_outras_unidades' => 0,
                'participantes_em_ambas' => 0,
                'esforco_disponivel_horas' => 0,
                'esforco_planejado_horas' => 0,
                'esforco_executado_horas' => 0,
                'tem_pt_pactuado' => false,
                'tem_pt_concluido' => false,
            ],
        ];

        $result = $assembler->montarDetalhamento('proc-1', $rows);

        expect($result->itens[0]->registro_execucao)->toBeNull();
        expect($result->itens[0]->plano_entrega_vigencia_fim)->toBeNull();
    });
});
