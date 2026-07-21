<?php

use App\V2\PlanoTrabalho\Consolidacao\DispensaAvaliacaoPolicy;
use Carbon\Carbon;
use Carbon\CarbonPeriod;

describe('DispensaAvaliacaoPolicy::mergeIntervalos', function () {

    test('merge intervalos sobrepostos', function () {
        $intervalos = [
            CarbonPeriod::create('2026-05-01', '2026-05-15'),
            CarbonPeriod::create('2026-05-14', '2026-05-25'),
        ];

        $resultado = DispensaAvaliacaoPolicy::mergeIntervalos($intervalos);

        expect($resultado)->toHaveCount(1);
        expect($resultado[0]->start->toDateString())->toBe('2026-05-01');
        expect($resultado[0]->end->toDateString())->toBe('2026-05-25');
    });

    test('merge intervalos consecutivos (dia seguinte)', function () {
        $intervalos = [
            CarbonPeriod::create('2026-05-01', '2026-05-15'),
            CarbonPeriod::create('2026-05-16', '2026-05-25'),
        ];

        $resultado = DispensaAvaliacaoPolicy::mergeIntervalos($intervalos);

        expect($resultado)->toHaveCount(1);
        expect($resultado[0]->start->toDateString())->toBe('2026-05-01');
        expect($resultado[0]->end->toDateString())->toBe('2026-05-25');
    });

    test('não merge intervalos com gap', function () {
        $intervalos = [
            CarbonPeriod::create('2026-05-01', '2026-05-15'),
            CarbonPeriod::create('2026-06-01', '2026-06-15'),
            CarbonPeriod::create('2026-07-01', '2026-07-05'),
        ];

        $resultado = DispensaAvaliacaoPolicy::mergeIntervalos($intervalos);

        expect($resultado)->toHaveCount(3);
        expect($resultado[0]->start->toDateString())->toBe('2026-05-01');
        expect($resultado[1]->start->toDateString())->toBe('2026-06-01');
        expect($resultado[2]->start->toDateString())->toBe('2026-07-01');
    });

    test('merge conforme exemplo do doc (4 intervalos)', function () {
        $intervalos = [
            CarbonPeriod::create('2026-05-01', '2026-05-15'),
            CarbonPeriod::create('2026-05-14', '2026-05-25'),
            CarbonPeriod::create('2026-06-01', '2026-06-15'),
            CarbonPeriod::create('2026-07-01', '2026-07-05'),
        ];

        $resultado = DispensaAvaliacaoPolicy::mergeIntervalos($intervalos);

        expect($resultado)->toHaveCount(3);
        expect($resultado[0]->start->toDateString())->toBe('2026-05-01');
        expect($resultado[0]->end->toDateString())->toBe('2026-05-25');
        expect($resultado[1]->start->toDateString())->toBe('2026-06-01');
        expect($resultado[2]->start->toDateString())->toBe('2026-07-01');
    });

    test('retorna vazio para array vazio', function () {
        expect(DispensaAvaliacaoPolicy::mergeIntervalos([]))->toBe([]);
    });
});

describe('DispensaAvaliacaoPolicy::isCoberta', function () {

    test('EXEMPLO 1: ocorrência 15/04 a 15/06 cobre período 01/05 a 31/05', function () {
        $intervalos = [CarbonPeriod::create('2026-04-15', '2026-06-15')];
        $periodo = CarbonPeriod::create('2026-05-01', '2026-05-31');

        expect(DispensaAvaliacaoPolicy::isCoberta($periodo, $intervalos))->toBeTrue();
    });

    test('EXEMPLO 2: duas ocorrências cobrindo todo o período', function () {
        $intervalos = DispensaAvaliacaoPolicy::mergeIntervalos([
            CarbonPeriod::create('2026-04-15', '2026-04-20'),
            CarbonPeriod::create('2026-04-21', '2026-05-31'),
        ]);
        $periodo = CarbonPeriod::create('2026-05-01', '2026-05-31');

        expect(DispensaAvaliacaoPolicy::isCoberta($periodo, $intervalos))->toBeTrue();
    });

    test('período não coberto integralmente retorna false', function () {
        $intervalos = [CarbonPeriod::create('2026-05-01', '2026-05-20')];
        $periodo = CarbonPeriod::create('2026-05-01', '2026-05-31');

        expect(DispensaAvaliacaoPolicy::isCoberta($periodo, $intervalos))->toBeFalse();
    });

    test('período fora de qualquer intervalo retorna false', function () {
        $intervalos = [CarbonPeriod::create('2026-03-01', '2026-03-31')];
        $periodo = CarbonPeriod::create('2026-05-01', '2026-05-31');

        expect(DispensaAvaliacaoPolicy::isCoberta($periodo, $intervalos))->toBeFalse();
    });
});
