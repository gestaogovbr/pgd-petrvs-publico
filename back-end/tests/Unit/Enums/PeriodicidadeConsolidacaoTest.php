<?php

use App\Enums\PeriodicidadeConsolidacao;

describe('PeriodicidadeConsolidacao', function () {
    test('mantém os valores esperados', function () {
        expect(PeriodicidadeConsolidacao::DIAS->value)->toBe('DIAS');
        expect(PeriodicidadeConsolidacao::SEMANAL->value)->toBe('SEMANAL');
        expect(PeriodicidadeConsolidacao::QUINZENAL->value)->toBe('QUINZENAL');
        expect(PeriodicidadeConsolidacao::MENSAL->value)->toBe('MENSAL');
        expect(PeriodicidadeConsolidacao::BIMESTRAL->value)->toBe('BIMESTRAL');
        expect(PeriodicidadeConsolidacao::TRIMESTRAL->value)->toBe('TRIMESTRAL');
        expect(PeriodicidadeConsolidacao::SEMESTRAL->value)->toBe('SEMESTRAL');
    });

    test('descontinuadas retorna exatamente Bimestral, Trimestral e Semestral', function () {
        expect(PeriodicidadeConsolidacao::descontinuadas())->toBe([
            PeriodicidadeConsolidacao::BIMESTRAL,
            PeriodicidadeConsolidacao::TRIMESTRAL,
            PeriodicidadeConsolidacao::SEMESTRAL,
        ]);
    });

    test('isDescontinuada é verdadeiro para as periodicidades descontinuadas', function () {
        expect(PeriodicidadeConsolidacao::BIMESTRAL->isDescontinuada())->toBeTrue();
        expect(PeriodicidadeConsolidacao::TRIMESTRAL->isDescontinuada())->toBeTrue();
        expect(PeriodicidadeConsolidacao::SEMESTRAL->isDescontinuada())->toBeTrue();
    });

    test('isDescontinuada é falso para as periodicidades ativas', function () {
        expect(PeriodicidadeConsolidacao::DIAS->isDescontinuada())->toBeFalse();
        expect(PeriodicidadeConsolidacao::SEMANAL->isDescontinuada())->toBeFalse();
        expect(PeriodicidadeConsolidacao::QUINZENAL->isDescontinuada())->toBeFalse();
        expect(PeriodicidadeConsolidacao::MENSAL->isDescontinuada())->toBeFalse();
    });
});
