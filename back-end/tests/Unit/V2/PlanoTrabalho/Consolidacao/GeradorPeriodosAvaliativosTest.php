<?php

declare(strict_types=1);

use App\Models\Programa;
use App\V2\PlanoTrabalho\Consolidacao\GeradorPeriodosAvaliativos;
use App\Repository\PlanoTrabalhoConsolidacaoRepository;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->repo = Mockery::mock(PlanoTrabalhoConsolidacaoRepository::class);
    $this->gerador = new GeradorPeriodosAvaliativos($this->repo);
});

afterEach(function () {
    Mockery::close();
});

/**
 * Usa reflection para acessar o método privado calcularProximaData.
 */
function invokeCalcProximaData(GeradorPeriodosAvaliativos $gerador, string $data, Programa $programa): string
{
    $ref = new ReflectionMethod($gerador, 'calcularProximaData');
    return $ref->invoke($gerador, $data, $programa);
}

function makePrograma(string $periodicidade, int $valor): Programa
{
    /** @var Programa $programa */
    $programa = Mockery::mock(Programa::class)->makePartial();
    $programa->periodicidade_consolidacao = $periodicidade;
    $programa->periodicidade_valor = $valor;
    return $programa;
}

describe('GeradorPeriodosAvaliativos → calcularProximaData', function () {

    describe('SEMANAL', function () {
        // periodicidade_valor = dia da semana alvo (0=dom, 1=seg, ..., 5=sex, 6=sab)

        test('segunda-feira com alvo sexta (5) → próxima sexta', function () {
            // 2026-05-04 é segunda (1), alvo sexta (5) → 2026-05-08
            $programa = makePrograma('SEMANAL', 5);
            $result = invokeCalcProximaData($this->gerador, '2026-05-04', $programa);
            expect($result)->toBe('2026-05-08');
        });

        test('sexta-feira com alvo segunda (1) → domingo seguinte', function () {
            // 2026-05-08 é sexta (5), alvo (1): dayWeek(5) >= valor(1) → 6 - 5 + 1 = 2 dias → 2026-05-10 (domingo)
            $programa = makePrograma('SEMANAL', 1);
            $result = invokeCalcProximaData($this->gerador, '2026-05-08', $programa);
            expect($result)->toBe('2026-05-10');
        });

        test('quarta com alvo quarta (3) → próxima terça (6 dias)', function () {
            // 2026-05-06 é quarta (3), alvo (3): dayWeek(3) >= valor(3) → 6 - 3 + 3 = 6 dias → 2026-05-12
            $programa = makePrograma('SEMANAL', 3);
            $result = invokeCalcProximaData($this->gerador, '2026-05-06', $programa);
            expect($result)->toBe('2026-05-12');
        });
    });

    describe('QUINZENAL', function () {
        test('segunda com alvo sexta (5) → sexta da semana seguinte', function () {
            // 2026-05-04 é segunda (1), alvo sexta (5) → 7 + (5-1) = 11 dias → 2026-05-15
            $programa = makePrograma('QUINZENAL', 5);
            $result = invokeCalcProximaData($this->gerador, '2026-05-04', $programa);
            expect($result)->toBe('2026-05-15');
        });
    });

    describe('DIAS', function () {
        test('soma dias diretamente', function () {
            $programa = makePrograma('DIAS', 10);
            $result = invokeCalcProximaData($this->gerador, '2026-05-04', $programa);
            expect($result)->toBe('2026-05-14');
        });
    });

    describe('MENSAL (default)', function () {
        test('dia antes do periodicidade_valor avança para o valor no próximo mês', function () {
            // 2026-05-04, valor=15 → dia < valor, incMonth=0 → 2026-05-01 + 0 months = 2026-05-01, +14 days = 2026-05-15
            $programa = makePrograma('MENSAL', 15);
            $result = invokeCalcProximaData($this->gerador, '2026-05-04', $programa);
            expect($result)->toBe('2026-05-15');
        });

        test('dia igual ao periodicidade_valor avança para o próximo mês', function () {
            // 2026-05-15, valor=15 → dia >= valor, incMonth=1 → 2026-05-01 + 1 month = 2026-06-01, +14 days = 2026-06-15
            $programa = makePrograma('MENSAL', 15);
            $result = invokeCalcProximaData($this->gerador, '2026-05-15', $programa);
            expect($result)->toBe('2026-06-15');
        });
    });
});
