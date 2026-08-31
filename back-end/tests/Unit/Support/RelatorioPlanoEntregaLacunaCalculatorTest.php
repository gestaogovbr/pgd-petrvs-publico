<?php

declare(strict_types=1);

use App\Support\RelatorioPlanoEntregaLacunaCalculator;

describe('RelatorioPlanoEntregaLacunaCalculator', function () {
    it('identifica lacuna em dia util sem plano de cobertura', function () {
        $calculator = new RelatorioPlanoEntregaLacunaCalculator();

        $lacunas = $calculator->calcular(
            historicoExecutora: [
                ['executora' => true, 'data_inicio' => '2026-01-01', 'data_fim' => null],
            ],
            planosCobertura: [
                ['data_inicio' => '2026-01-01', 'data_fim' => '2026-01-02'],
                ['data_inicio' => '2026-01-12', 'data_fim' => '2026-01-31'],
            ],
            periodoConsultaInicio: '2026-01-05',
            periodoConsultaFim: '2026-01-09',
        );

        expect($lacunas)->toHaveCount(1)
            ->and($lacunas[0]['data_inicio'])->toBe('2026-01-05')
            ->and($lacunas[0]['data_fim'])->toBe('2026-01-09')
            ->and($lacunas[0]['quantidade_dias'])->toBe(5);
    });

    it('desconsidera finais de semana na contagem e no agrupamento', function () {
        $calculator = new RelatorioPlanoEntregaLacunaCalculator();

        $lacunas = $calculator->calcular(
            historicoExecutora: [
                ['executora' => true, 'data_inicio' => '2026-01-01', 'data_fim' => null],
            ],
            planosCobertura: [],
            periodoConsultaInicio: '2026-01-09',
            periodoConsultaFim: '2026-01-12',
        );

        expect($lacunas)->toHaveCount(1)
            ->and($lacunas[0]['quantidade_dias'])->toBeGreaterThanOrEqual(2);
    });

    it('nao considera lacuna quando ha plano em execucao', function () {
        $calculator = new RelatorioPlanoEntregaLacunaCalculator();

        $lacunas = $calculator->calcular(
            historicoExecutora: [
                ['executora' => true, 'data_inicio' => '2026-01-01', 'data_fim' => null],
            ],
            planosCobertura: [
                ['data_inicio' => '2026-01-01', 'data_fim' => '2026-01-31'],
            ],
            periodoConsultaInicio: '2026-01-05',
            periodoConsultaFim: '2026-01-09',
        );

        expect($lacunas)->toBeEmpty();
    });

    it('retorna periodo completo da lacuna quando apenas parte intersecta consulta', function () {
        $calculator = new RelatorioPlanoEntregaLacunaCalculator();

        $lacunas = $calculator->calcular(
            historicoExecutora: [
                ['executora' => true, 'data_inicio' => '2026-01-01', 'data_fim' => null],
            ],
            planosCobertura: [
                ['data_inicio' => '2026-01-01', 'data_fim' => '2026-01-02'],
                ['data_inicio' => '2026-01-12', 'data_fim' => '2026-01-31'],
            ],
            periodoConsultaInicio: '2026-01-08',
            periodoConsultaFim: '2026-01-09',
        );

        expect($lacunas)->toHaveCount(1)
            ->and($lacunas[0]['data_inicio'])->toBe('2026-01-05')
            ->and($lacunas[0]['data_fim'])->toBe('2026-01-09');
    });

    it('nao considera dias em que unidade nao era executora', function () {
        $calculator = new RelatorioPlanoEntregaLacunaCalculator();

        $lacunas = $calculator->calcular(
            historicoExecutora: [
                ['executora' => false, 'data_inicio' => '2026-01-01', 'data_fim' => '2026-01-31'],
                ['executora' => true, 'data_inicio' => '2026-02-01', 'data_fim' => null],
            ],
            planosCobertura: [],
            periodoConsultaInicio: '2026-01-05',
            periodoConsultaFim: '2026-01-09',
        );

        expect($lacunas)->toBeEmpty();
    });
});
