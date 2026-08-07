<?php

use App\Services\CalendarioService;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->service = new CalendarioService();
});

describe('CalendarioService::qtdDiasUteisComAfastamentos', function () {

    test('conta dias úteis em semana normal sem feriados nem afastamentos', function () {
        // Segunda 2024-01-08 a Sexta 2024-01-12 = 5 dias úteis
        $resultado = $this->service->qtdDiasUteisComAfastamentos(
            '2024-01-08',
            '2024-01-12',
            [],
            [],
            []
        );

        expect($resultado)->toBe(5);
    });

    test('exclui fins de semana da contagem', function () {
        // Segunda 2024-01-08 a Domingo 2024-01-14 = 5 dias úteis (sab e dom excluídos)
        $resultado = $this->service->qtdDiasUteisComAfastamentos(
            '2024-01-08',
            '2024-01-14',
            [],
            [],
            []
        );

        expect($resultado)->toBe(5);
    });

    test('exclui feriados cadastrados da contagem', function () {
        // Segunda 2024-01-08 a Sexta 2024-01-12
        // Feriado na quarta 2024-01-10 = 4 dias úteis
        $feriados = ['2024-01-10' => 'Feriado Teste'];

        $resultado = $this->service->qtdDiasUteisComAfastamentos(
            '2024-01-08',
            '2024-01-12',
            $feriados,
            [],
            []
        );

        expect($resultado)->toBe(4);
    });

    test('exclui feriados recorrentes (formato 0000-MM-DD)', function () {
        // Segunda 2024-01-08 a Sexta 2024-01-12
        // Feriado recorrente no dia 09/01 = 4 dias úteis
        $feriados = ['0000-01-09' => 'Feriado Recorrente'];

        $resultado = $this->service->qtdDiasUteisComAfastamentos(
            '2024-01-08',
            '2024-01-12',
            $feriados,
            [],
            []
        );

        expect($resultado)->toBe(4);
    });

    test('exclui feriados religiosos da contagem', function () {
        // Segunda 2024-01-08 a Sexta 2024-01-12
        // Feriado religioso na quinta 2024-01-11 = 4 dias úteis
        $feriadosReligiosos = ['2024-01-11' => 'Corpus Christi'];

        $resultado = $this->service->qtdDiasUteisComAfastamentos(
            '2024-01-08',
            '2024-01-12',
            [],
            $feriadosReligiosos,
            []
        );

        expect($resultado)->toBe(4);
    });

    test('exclui dias de afastamento da contagem', function () {
        // Segunda 2024-01-08 a Sexta 2024-01-12
        // Afastamento de 2024-01-09 a 2024-01-10 = 3 dias úteis
        $afastamentos = [
            ['data_inicio' => '2024-01-09', 'data_fim' => '2024-01-10'],
        ];

        $resultado = $this->service->qtdDiasUteisComAfastamentos(
            '2024-01-08',
            '2024-01-12',
            [],
            [],
            $afastamentos
        );

        expect($resultado)->toBe(3);
    });

    test('afastamento em fim de semana não altera a contagem', function () {
        // Segunda 2024-01-08 a Sexta 2024-01-12
        // Afastamento no sábado e domingo = 5 dias úteis (inalterado)
        $afastamentos = [
            ['data_inicio' => '2024-01-13', 'data_fim' => '2024-01-14'],
        ];

        $resultado = $this->service->qtdDiasUteisComAfastamentos(
            '2024-01-08',
            '2024-01-12',
            [],
            [],
            $afastamentos
        );

        expect($resultado)->toBe(5);
    });

    test('combina feriados e afastamentos sem duplicar exclusão', function () {
        // Segunda 2024-01-08 a Sexta 2024-01-12
        // Feriado na quarta (10), afastamento terça a quarta (09-10)
        // Dia 09 excluído por afastamento, dia 10 excluído por feriado (antes do afastamento no loop)
        // Resultado: 3 dias úteis (08, 11, 12)
        $feriados = ['2024-01-10' => 'Feriado'];
        $afastamentos = [
            ['data_inicio' => '2024-01-09', 'data_fim' => '2024-01-10'],
        ];

        $resultado = $this->service->qtdDiasUteisComAfastamentos(
            '2024-01-08',
            '2024-01-12',
            $feriados,
            [],
            $afastamentos
        );

        expect($resultado)->toBe(3);
    });

    test('retorna zero quando inicio é posterior ao fim', function () {
        $resultado = $this->service->qtdDiasUteisComAfastamentos(
            '2024-01-12',
            '2024-01-08',
            [],
            [],
            []
        );

        expect($resultado)->toBe(0);
    });

    test('retorna um quando inicio e fim são o mesmo dia útil', function () {
        // 2024-01-08 é segunda-feira
        $resultado = $this->service->qtdDiasUteisComAfastamentos(
            '2024-01-08',
            '2024-01-08',
            [],
            [],
            []
        );

        expect($resultado)->toBe(1);
    });

    test('retorna zero quando inicio e fim são o mesmo dia de fim de semana', function () {
        // 2024-01-13 é sábado
        $resultado = $this->service->qtdDiasUteisComAfastamentos(
            '2024-01-13',
            '2024-01-13',
            [],
            [],
            []
        );

        expect($resultado)->toBe(0);
    });

    test('aceita DateTime como parâmetro de data', function () {
        $inicio = new DateTime('2024-01-08');
        $fim = new DateTime('2024-01-12');

        $resultado = $this->service->qtdDiasUteisComAfastamentos(
            $inicio,
            $fim,
            [],
            [],
            []
        );

        expect($resultado)->toBe(5);
    });

    test('funciona com período longo sem estourar recursão', function () {
        // 3 anos: 2022-01-01 a 2024-12-31 — o cenário que causava o bug
        $resultado = $this->service->qtdDiasUteisComAfastamentos(
            '2022-01-03',
            '2024-12-31',
            [],
            [],
            []
        );

        // Apenas verifica que não estoura e retorna valor positivo razoável
        expect($resultado)->toBeGreaterThan(700);
        expect($resultado)->toBeLessThan(800);
    });

    test('exclui feriados por dia da semana', function () {
        // Segunda 2024-01-08 a Sexta 2024-01-12
        // Feriado toda quarta-feira (DAYOFWEEK 4 no MySQL = date('w') 3 + 1)
        $feriadosDiaSemana = [4 => 'Ponto Facultativo'];

        $resultado = $this->service->qtdDiasUteisComAfastamentos(
            '2024-01-08',
            '2024-01-12',
            [],
            [],
            [],
            $feriadosDiaSemana
        );

        // 5 dias úteis - 1 quarta = 4
        expect($resultado)->toBe(4);
    });
});
