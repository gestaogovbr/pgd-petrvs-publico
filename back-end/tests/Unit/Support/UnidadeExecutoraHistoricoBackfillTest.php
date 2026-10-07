<?php

declare(strict_types=1);

use App\Support\UnidadeExecutoraHistoricoBackfill;

describe('UnidadeExecutoraHistoricoBackfill', function () {
    it('inicia na data de implantacao da regra quando a unidade e anterior a ela', function () {
        $backfill = new UnidadeExecutoraHistoricoBackfill();

        $periodo = $backfill->montarPeriodo(
            executoraAtual: true,
            unidadeCreatedAt: '2020-03-15 10:00:00',
        );

        expect($periodo['executora'])->toBeTrue()
            ->and($periodo['data_inicio'])->toBe(UnidadeExecutoraHistoricoBackfill::DATA_IMPLANTACAO_REGRA)
            ->and($periodo['data_fim'])->toBeNull();
    });

    it('inicia na criacao da unidade quando ela e posterior a implantacao da regra', function () {
        $backfill = new UnidadeExecutoraHistoricoBackfill();

        $periodo = $backfill->montarPeriodo(
            executoraAtual: false,
            unidadeCreatedAt: '2026-01-10 08:00:00',
        );

        expect($periodo['executora'])->toBeFalse()
            ->and($periodo['data_inicio'])->toBe('2026-01-10')
            ->and($periodo['data_fim'])->toBeNull();
    });

    it('usa a data de implantacao quando created_at e nulo', function () {
        $backfill = new UnidadeExecutoraHistoricoBackfill();

        expect($backfill->resolverPiso(null))->toBe(UnidadeExecutoraHistoricoBackfill::DATA_IMPLANTACAO_REGRA);
    });

    it('projeta o flag atual sem reconstruir periodos a partir de auditoria', function () {
        $backfill = new UnidadeExecutoraHistoricoBackfill();

        $periodo = $backfill->montarPeriodo(
            executoraAtual: false,
            unidadeCreatedAt: '2020-01-01 00:00:00',
        );

        expect($periodo)->toMatchArray([
            'executora' => false,
            'data_inicio' => UnidadeExecutoraHistoricoBackfill::DATA_IMPLANTACAO_REGRA,
            'data_fim' => null,
        ]);
    });
});
