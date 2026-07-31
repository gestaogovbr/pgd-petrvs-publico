<?php

declare(strict_types=1);

use App\V2\PlanoTrabalho\CHDBrutaCalculator;
use Carbon\Carbon;
use Tests\TestCase;

uses(TestCase::class);

describe('CHDBrutaCalculator → contarDiasDeSemana', function () {
    test('semana completa seg a sex retorna 5', function () {
        $inicio = Carbon::parse('2026-07-27'); // segunda
        $fim = Carbon::parse('2026-07-31');    // sexta

        expect(CHDBrutaCalculator::contarDiasDeSemana($inicio, $fim))->toBe(5);
    });

    test('semana completa seg a dom retorna 5', function () {
        $inicio = Carbon::parse('2026-07-27'); // segunda
        $fim = Carbon::parse('2026-08-02');    // domingo

        expect(CHDBrutaCalculator::contarDiasDeSemana($inicio, $fim))->toBe(5);
    });

    test('período de 2 semanas completas retorna 10', function () {
        $inicio = Carbon::parse('2026-07-27'); // segunda
        $fim = Carbon::parse('2026-08-07');    // sexta

        expect(CHDBrutaCalculator::contarDiasDeSemana($inicio, $fim))->toBe(10);
    });

    test('período que começa no sábado e termina no domingo retorna 0', function () {
        $inicio = Carbon::parse('2026-08-01'); // sábado
        $fim = Carbon::parse('2026-08-02');    // domingo

        expect(CHDBrutaCalculator::contarDiasDeSemana($inicio, $fim))->toBe(0);
    });

    test('período de um único dia de semana retorna 1', function () {
        $inicio = Carbon::parse('2026-07-29'); // quarta
        $fim = Carbon::parse('2026-07-29');    // quarta

        expect(CHDBrutaCalculator::contarDiasDeSemana($inicio, $fim))->toBe(1);
    });

    test('período de um único sábado retorna 0', function () {
        $inicio = Carbon::parse('2026-08-01'); // sábado
        $fim = Carbon::parse('2026-08-01');    // sábado

        expect(CHDBrutaCalculator::contarDiasDeSemana($inicio, $fim))->toBe(0);
    });

    test('fim antes de início retorna 0', function () {
        $inicio = Carbon::parse('2026-08-05');
        $fim = Carbon::parse('2026-08-01');

        expect(CHDBrutaCalculator::contarDiasDeSemana($inicio, $fim))->toBe(0);
    });

    test('período que começa na sexta e termina na segunda retorna 2', function () {
        $inicio = Carbon::parse('2026-07-31'); // sexta
        $fim = Carbon::parse('2026-08-03');    // segunda

        expect(CHDBrutaCalculator::contarDiasDeSemana($inicio, $fim))->toBe(2);
    });

    test('período de 30 dias a partir de segunda retorna 22', function () {
        $inicio = Carbon::parse('2026-07-06'); // segunda
        $fim = Carbon::parse('2026-08-04');    // terça (30 dias)

        expect(CHDBrutaCalculator::contarDiasDeSemana($inicio, $fim))->toBe(22);
    });

    test('período que começa na quarta e termina na terça seguinte retorna 5', function () {
        $inicio = Carbon::parse('2026-07-29'); // quarta
        $fim = Carbon::parse('2026-08-04');    // terça

        expect(CHDBrutaCalculator::contarDiasDeSemana($inicio, $fim))->toBe(5);
    });
});

describe('CHDBrutaCalculator → jornadaDiaria', function () {
    test('jornada 40h retorna 8h/dia', function () {
        expect(CHDBrutaCalculator::jornadaDiaria(40))->toBe(8.0);
    });

    test('jornada 30h retorna 6h/dia', function () {
        expect(CHDBrutaCalculator::jornadaDiaria(30))->toBe(6.0);
    });

    test('jornada 20h retorna 4h/dia', function () {
        expect(CHDBrutaCalculator::jornadaDiaria(20))->toBe(4.0);
    });

    test('jornada null assume 40h e retorna 8h/dia', function () {
        expect(CHDBrutaCalculator::jornadaDiaria(null))->toBe(8.0);
    });
});

describe('CHDBrutaCalculator → calcular (integração)', function () {
    test('PT de 1 semana com jornada 40h retorna 40h', function () {
        $inicio = Carbon::parse('2026-07-27'); // segunda
        $fim = Carbon::parse('2026-07-31');    // sexta

        expect(CHDBrutaCalculator::calcular($inicio, $fim, 40))->toBe(40.0);
    });

    test('PT de 1 semana com jornada 30h retorna 30h', function () {
        $inicio = Carbon::parse('2026-07-27'); // segunda
        $fim = Carbon::parse('2026-07-31');    // sexta

        expect(CHDBrutaCalculator::calcular($inicio, $fim, 30))->toBe(30.0);
    });

    test('PT de 1 semana com jornada 20h retorna 20h', function () {
        $inicio = Carbon::parse('2026-07-27'); // segunda
        $fim = Carbon::parse('2026-07-31');    // sexta

        expect(CHDBrutaCalculator::calcular($inicio, $fim, 20))->toBe(20.0);
    });

    test('PT de 2 semanas com jornada null retorna 80h (assume 40h)', function () {
        $inicio = Carbon::parse('2026-07-27'); // segunda
        $fim = Carbon::parse('2026-08-07');    // sexta

        expect(CHDBrutaCalculator::calcular($inicio, $fim, null))->toBe(80.0);
    });

    test('PT de 30 dias a partir de segunda com jornada 40h retorna 176h', function () {
        $inicio = Carbon::parse('2026-07-06'); // segunda
        $fim = Carbon::parse('2026-08-04');    // terça (30 dias, 22 seg-sex)

        expect(CHDBrutaCalculator::calcular($inicio, $fim, 40))->toBe(176.0);
    });
});
