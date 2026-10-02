<?php

use App\V2\ArvoreInstitucional\ArvoreInstitucionalPainelAssembler;
use App\V2\Planejamento\Objetivo\ObjetivoPainelAssembler;
use Tests\TestCase;

uses(TestCase::class);

describe('ObjetivoPainelAssembler', function () {

    test('monta resumo com seções item e consolidado e visibilidade condicionada ao status do PE', function () {
        $assembler = new ObjetivoPainelAssembler(new ArvoreInstitucionalPainelAssembler());

        $geral = (object) [
            'objetivo_id' => 'obj-1',
            'objetivo_nome' => 'Objetivo A',
            'planejamento_nome' => 'Planejamento 2025',
            'tipo_objetivo_nome' => 'Estratégico',
            'eixo_tematico_nome' => 'Eixo 1',
        ];

        $aggItem = (object) [
            'esforco_disponivel_horas' => 200,
            'esforco_planejado_horas' => 100,
            'esforco_executado_horas' => 50,
            'tem_pt_pactuado' => 1,
            'tem_pt_concluido' => 1,
            'tem_pe_homologado' => 1,
            'participantes_somente_unidade_propria' => 2,
            'participantes_somente_outras_unidades' => 1,
            'participantes_em_ambas' => 1,
            'total_entregas' => 3,
            'total_entregas_avaliadas' => 2,
            'entregas_concluidas' => 1,
        ];

        $aggConsolidado = (object) [
            'esforco_disponivel_horas' => 400,
            'esforco_planejado_horas' => 100,
            'esforco_executado_horas' => 25,
            'tem_pt_pactuado' => 1,
            'tem_pt_concluido' => 1,
            'tem_pe_homologado' => 1,
            'participantes_somente_unidade_propria' => 4,
            'participantes_somente_outras_unidades' => 2,
            'participantes_em_ambas' => 2,
            'total_entregas' => 8,
            'total_entregas_avaliadas' => 4,
            'entregas_concluidas' => 3,
        ];

        $resumo = $assembler->montarResumo($geral, $aggItem, $aggConsolidado);

        expect($resumo->nome)->toBe('Objetivo A')
            ->and($resumo->item->esforco->disponivel_horas)->toBe(200.0)
            ->and($resumo->item->esforco->planejado_percentual_disponivel)->toBe(50.0)
            ->and($resumo->item->esforco->executado_percentual_planejado)->toBe(50.0)
            ->and($resumo->item->esforco->mostrar_planejado)->toBeTrue()
            ->and($resumo->item->esforco->mostrar_executado)->toBeTrue()
            ->and($resumo->item->pessoas->percentual_somente_unidade_propria)->toBe(50.0)
            ->and($resumo->item->pessoas->percentual_em_ambas)->toBe(25.0)
            // RN13: percentual sobre entregas de PEs avaliados (1 de 2)
            ->and($resumo->item->entregas->total_entregas)->toBe(3)
            ->and($resumo->item->entregas->total_entregas_avaliadas)->toBe(2)
            ->and($resumo->item->entregas->percentual_concluidas)->toBe(50.0)
            // Consolidado (RN15+)
            ->and($resumo->consolidado->esforco->disponivel_horas)->toBe(400.0)
            ->and($resumo->consolidado->esforco->planejado_percentual_disponivel)->toBe(25.0)
            ->and($resumo->consolidado->esforco->executado_percentual_planejado)->toBe(25.0)
            ->and($resumo->consolidado->pessoas->total_participantes)->toBe(8)
            ->and($resumo->consolidado->entregas->total_entregas)->toBe(8)
            ->and($resumo->consolidado->entregas->percentual_concluidas)->toBe(75.0);
    });

    test('total de participantes é soma das partições exclusivas', function () {
        $assembler = new ObjetivoPainelAssembler(new ArvoreInstitucionalPainelAssembler());

        $geral = (object) [
            'objetivo_id' => 'obj-1',
            'objetivo_nome' => 'Objetivo',
            'planejamento_nome' => 'Planejamento',
            'tipo_objetivo_nome' => '',
            'eixo_tematico_nome' => '',
        ];

        $agg = (object) [
            'esforco_disponivel_horas' => 0,
            'esforco_planejado_horas' => 0,
            'esforco_executado_horas' => 0,
            'tem_pt_pactuado' => 0,
            'tem_pt_concluido' => 0,
            'tem_pe_homologado' => 0,
            'participantes_somente_unidade_propria' => 6,
            'participantes_somente_outras_unidades' => 14,
            'participantes_em_ambas' => 1,
            'total_entregas' => 1,
            'total_entregas_avaliadas' => 0,
            'entregas_concluidas' => 0,
        ];

        $resumo = $assembler->montarResumo($geral, $agg, $agg);

        expect($resumo->item->pessoas->total_participantes)->toBe(21)
            ->and($resumo->item->pessoas->percentual_somente_unidade_propria)->toBe(28.57)
            ->and($resumo->item->pessoas->percentual_somente_outras_unidades)->toBe(66.67)
            ->and($resumo->item->pessoas->percentual_em_ambas)->toBe(4.76)
            // sem entregas avaliadas, percentual de concluídas é 0
            ->and($resumo->item->entregas->percentual_concluidas)->toBe(0.0);
    });

    test('monta detalhamento com filtros e visibilidade por linha', function () {
        $assembler = new ObjetivoPainelAssembler(new ArvoreInstitucionalPainelAssembler());

        $rows = [
            (object) [
                'plano_entrega_entrega_id' => 'pee-1',
                'no_origem_id' => 'obj-1',
                'no_origem_nome' => 'Objetivo A',
                'unidade_id' => 'un-1',
                'unidade_sigla' => 'UN',
                'unidade_nome' => 'Unidade',
                'plano_entrega_id' => 'pe-1',
                'plano_entrega_nome' => 'PE 2025',
                'plano_entrega_status' => 'HOMOLOGANDO',
                'plano_entrega_data_inicio' => '2025-01-01',
                'plano_entrega_data_fim' => '2025-12-31',
                'entrega_titulo' => 'Entrega A',
                'entrega_descricao' => 'Descrição detalhada da entrega A',
                'descricao_meta' => 'Meta descrita em detalhes',
                'etiquetas' => '[{"key":"e1","value":"Prioritária","icon":"bi bi-flag","color":"#198754"}]',
                'progresso_esperado' => 80,
                'progresso_realizado' => 40,
                'homologado' => 0,
                'registro_execucao' => 'Entrega em andamento conforme cronograma.',
                'participantes_total' => 2,
                'participantes_somente_unidade_propria' => 2,
                'participantes_somente_outras_unidades' => 0,
                'participantes_em_ambas' => 0,
                'esforco_disponivel_horas' => 100,
                'esforco_planejado_horas' => 0,
                'esforco_executado_horas' => 0,
                'tem_pt_pactuado' => 0,
                'tem_pt_concluido' => 0,
            ],
        ];

        $detalhe = $assembler->montarDetalhamento('obj-1', $rows);

        expect($detalhe->objetivo_id)->toBe('obj-1')
            ->and($detalhe->itens)->toHaveCount(1)
            ->and($detalhe->filtro_entregas)->toHaveCount(1)
            ->and($detalhe->filtro_unidades)->toHaveCount(1)
            ->and($detalhe->itens[0]->mostrar_disponivel)->toBeTrue()
            ->and($detalhe->itens[0]->mostrar_planejado)->toBeFalse()
            ->and($detalhe->itens[0]->mostrar_executado)->toBeFalse()
            ->and($detalhe->itens[0]->entrega_titulo)->toBe('Entrega A')
            ->and($detalhe->itens[0]->no_origem_id)->toBe('obj-1')
            ->and($detalhe->itens[0]->no_origem_nome)->toBe('Objetivo A')
            ->and($detalhe->itens[0]->entrega_descricao)->toBe('Descrição detalhada da entrega A')
            ->and($detalhe->itens[0]->descricao_meta)->toBe('Meta descrita em detalhes')
            ->and($detalhe->itens[0]->etiquetas)->toBe([
                ['key' => 'e1', 'value' => 'Prioritária', 'icon' => 'bi bi-flag', 'color' => '#198754'],
            ])
            ->and($detalhe->itens[0]->registro_execucao)->toBe('Entrega em andamento conforme cronograma.');
    });
});
