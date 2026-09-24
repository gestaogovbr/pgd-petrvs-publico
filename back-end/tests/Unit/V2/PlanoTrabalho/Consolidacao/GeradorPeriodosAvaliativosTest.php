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

        // RN05: divisão consistente para meses de 28, 29, 30 e 31 dias.
        // Com periodicidade_valor=31, o dia efetivo é min(diasNoMes, 31), ou seja, o último dia do mês.
        test('fevereiro de ano não bissexto (28 dias) → último dia é 28', function () {
            $programa = makePrograma('MENSAL', 31);
            $result = invokeCalcProximaData($this->gerador, '2026-02-01', $programa);
            expect($result)->toBe('2026-02-28');
        });

        test('fevereiro de ano bissexto (29 dias) → último dia é 29', function () {
            $programa = makePrograma('MENSAL', 31);
            $result = invokeCalcProximaData($this->gerador, '2028-02-01', $programa);
            expect($result)->toBe('2028-02-29');
        });

        test('mês de 30 dias (abril) → último dia é 30', function () {
            $programa = makePrograma('MENSAL', 31);
            $result = invokeCalcProximaData($this->gerador, '2026-04-01', $programa);
            expect($result)->toBe('2026-04-30');
        });

        test('mês de 31 dias (janeiro) → último dia é 31', function () {
            $programa = makePrograma('MENSAL', 31);
            $result = invokeCalcProximaData($this->gerador, '2026-01-01', $programa);
            expect($result)->toBe('2026-01-31');
        });
    });

    // RN03/RN04: as periodicidades descontinuadas continuam calculando corretamente
    // para regramentos legados que ainda as utilizam. O cálculo não é alterado.
    describe('periodicidades descontinuadas (legados) continuam calculando', function () {
        test('BIMESTRAL avança 1 mês além do mês corrente', function () {
            // base incMonth=1 → jan/2026 + 1 mês = fev/2026, valor=31 → último dia = 2026-02-28
            $programa = makePrograma('BIMESTRAL', 31);
            $result = invokeCalcProximaData($this->gerador, '2026-01-01', $programa);
            expect($result)->toBe('2026-02-28');
        });

        test('TRIMESTRAL avança 2 meses além do mês corrente', function () {
            // base incMonth=2 → jan/2026 + 2 meses = mar/2026, valor=31 → 2026-03-31
            $programa = makePrograma('TRIMESTRAL', 31);
            $result = invokeCalcProximaData($this->gerador, '2026-01-01', $programa);
            expect($result)->toBe('2026-03-31');
        });

        test('SEMESTRAL avança 5 meses além do mês corrente', function () {
            // base incMonth=5 → jan/2026 + 5 meses = jun/2026, valor=31 → 2026-06-30
            $programa = makePrograma('SEMESTRAL', 31);
            $result = invokeCalcProximaData($this->gerador, '2026-01-01', $programa);
            expect($result)->toBe('2026-06-30');
        });
    });
});
