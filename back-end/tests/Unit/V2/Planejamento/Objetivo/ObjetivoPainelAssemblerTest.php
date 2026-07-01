<?php

use App\V2\Planejamento\Objetivo\ObjetivoPainelAssembler;
use Tests\TestCase;

uses(TestCase::class);

describe('ObjetivoPainelAssembler', function () {

    test('monta resumo com visibilidade condicionada ao status do PE', function () {
        $assembler = new ObjetivoPainelAssembler();

        $geral = (object) [
            'objetivo_id' => 'obj-1',
            'objetivo_nome' => 'Objetivo A',
            'planejamento_nome' => 'Planejamento 2025',
            'tipo_objetivo_nome' => 'Estratégico',
            'eixo_tematico_nome' => 'Eixo 1',
        ];

        $agg = (object) [
            'esforco_disponivel_horas' => 200,
            'esforco_planejado_horas' => 100,
            'esforco_executado_horas' => 50,
            'tem_pt_pactuado' => 1,
            'tem_pt_concluido' => 1,
            'tem_pe_homologado' => 1,
            'total_participantes' => 4,
            'participantes_unidade_propria' => 3,
            'participantes_outras_unidades' => 1,
            'total_entregas' => 2,
            'entregas_concluidas' => 1,
        ];

        $resumo = $assembler->montarResumo($geral, $agg);

        expect($resumo->nome)->toBe('Objetivo A')
            ->and($resumo->esforco->disponivel_horas)->toBe(200.0)
            ->and($resumo->esforco->planejado_percentual_disponivel)->toBe(50.0)
            ->and($resumo->esforco->executado_percentual_planejado)->toBe(50.0)
            ->and($resumo->esforco->mostrar_planejado)->toBeTrue()
            ->and($resumo->esforco->mostrar_executado)->toBeTrue()
            ->and($resumo->pessoas->percentual_unidade_propria)->toBe(75.0)
            ->and($resumo->entregas->percentual_concluidas)->toBe(50.0);
    });

    test('monta detalhamento com filtros e visibilidade por linha', function () {
        $assembler = new ObjetivoPainelAssembler();

        $rows = [
            (object) [
                'plano_entrega_entrega_id' => 'pee-1',
                'unidade_id' => 'un-1',
                'unidade_sigla' => 'UN',
                'unidade_nome' => 'Unidade',
                'plano_entrega_id' => 'pe-1',
                'plano_entrega_nome' => 'PE 2025',
                'plano_entrega_status' => 'HOMOLOGANDO',
                'plano_entrega_data_inicio' => '2025-01-01',
                'plano_entrega_data_fim' => '2025-12-31',
                'entrega_titulo' => 'Entrega A',
                'progresso_esperado' => 80,
                'progresso_realizado' => 40,
                'homologado' => 0,
                'registro_execucao' => 'Entrega em andamento conforme cronograma.',
                'participantes_total' => 2,
                'participantes_unidade_propria' => 2,
                'participantes_outras_unidades' => 0,
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
            ->and($detalhe->itens[0]->registro_execucao)->toBe('Entrega em andamento conforme cronograma.');
    });
});
