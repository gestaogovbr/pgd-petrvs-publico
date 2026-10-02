<?php

declare(strict_types=1);

use App\V2\Relatorio\LacunaPlanoTrabalho\LacunaPlanoTrabalhoCalculator;
use Carbon\Carbon;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->calculator = new LacunaPlanoTrabalhoCalculator();
});

describe('LacunaPlanoTrabalhoCalculator', function () {
    test('não considera sábados e domingos como lacuna (RN02)', function () {
        $lacunas = $this->calculator->calcular(
            '2026-08-01', // sábado
            '2026-08-02', // domingo
            [],
            [],
        );

        expect($lacunas)->toBe([]);
    });

    test('considera dias úteis sem cobertura como lacuna (RN05)', function () {
        $lacunas = $this->calculator->calcular(
            '2026-08-03', // segunda
            '2026-08-07', // sexta
            [],
            [],
        );

        expect($lacunas)->toHaveCount(1)
            ->and($lacunas[0]['quantidade_dias'])->toBe(5)
            ->and($lacunas[0]['data_inicio'])->toBe('2026-08-03')
            ->and($lacunas[0]['data_fim'])->toBe('2026-08-07');
    });

    test('PT Em execução ou Concluído cobre o período (RN03)', function () {
        $lacunas = $this->calculator->calcular(
            '2026-08-03',
            '2026-08-07',
            [[
                'data_inicio' => '2026-08-03',
                'data_fim' => '2026-08-07',
                'status' => 'ATIVO',
            ]],
            [],
        );

        expect($lacunas)->toBe([]);
    });

    test('PT em Rascunho/Aguardando/Cancelado não cobre (RN05)', function () {
        foreach (['INCLUIDO', 'AGUARDANDO_ASSINATURA', 'CANCELADO'] as $status) {
            $lacunas = $this->calculator->calcular(
                '2026-08-03',
                '2026-08-03',
                [[
                    'data_inicio' => '2026-08-03',
                    'data_fim' => '2026-08-03',
                    'status' => $status,
                ]],
                [],
            );

            expect($lacunas)->toHaveCount(1);
        }
    });

    test('dispensa vigente cobre o dia (RN03/RN04)', function () {
        $lacunas = $this->calculator->calcular(
            '2026-08-03',
            '2026-08-07',
            [],
            [[
                'data_inicio' => '2026-08-03',
                'data_fim' => '2026-08-07',
            ]],
        );

        expect($lacunas)->toBe([]);
    });

    test('encerrado_at encerra cobertura do PT (RN06)', function () {
        $lacunas = $this->calculator->calcular(
            '2026-08-03',
            '2026-08-07',
            [[
                'data_inicio' => '2026-08-03',
                'data_fim' => '2026-08-07',
                'status' => 'ATIVO',
                'encerrado_at' => '2026-08-04',
            ]],
            [],
        );

        expect($lacunas)->toHaveCount(1)
            ->and($lacunas[0]['data_inicio'])->toBe('2026-08-05')
            ->and($lacunas[0]['data_fim'])->toBe('2026-08-07')
            ->and($lacunas[0]['quantidade_dias'])->toBe(3);
    });

    test('dias úteis consecutivos incluindo fim de semana viram uma linha (RN07)', function () {
        $lacunas = $this->calculator->calcular(
            '2026-08-03', // seg
            '2026-08-10', // seg seguinte
            [],
            [],
        );

        expect($lacunas)->toHaveCount(1)
            ->and($lacunas[0]['quantidade_dias'])->toBe(6);
    });

    test('quebra de cobertura gera lacunas distintas (RN07)', function () {
        $lacunas = $this->calculator->calcular(
            '2026-08-03',
            '2026-08-07',
            [[
                'data_inicio' => '2026-08-05',
                'data_fim' => '2026-08-05',
                'status' => 'CONCLUIDO',
            ]],
            [],
        );

        expect($lacunas)->toHaveCount(2)
            ->and($lacunas[0]['data_inicio'])->toBe('2026-08-03')
            ->and($lacunas[0]['data_fim'])->toBe('2026-08-04')
            ->and($lacunas[1]['data_inicio'])->toBe('2026-08-06')
            ->and($lacunas[1]['data_fim'])->toBe('2026-08-07');
    });

    test('apresenta período completo da lacuna mesmo com consulta parcial (RN19)', function () {
        $lacunas = $this->calculator->calcular(
            '2026-08-05', // quarta
            '2026-08-05',
            [[
                'data_inicio' => '2026-08-01',
                'data_fim' => '2026-08-03', // cobre até segunda
                'status' => 'ATIVO',
            ], [
                'data_inicio' => '2026-08-07',
                'data_fim' => '2026-08-10',
                'status' => 'ATIVO',
            ]],
            [],
        );

        expect($lacunas)->toHaveCount(1)
            ->and($lacunas[0]['data_inicio'])->toBe('2026-08-04')
            ->and($lacunas[0]['data_fim'])->toBe('2026-08-06')
            ->and($lacunas[0]['quantidade_dias'])->toBe(3);
    });

    test('ocorrências com interseção parcial são retornadas (RN13)', function () {
        $ocorrencias = $this->calculator->ocorrenciasComIntersecao(
            '2026-08-03',
            '2026-08-07',
            [
                ['tipo' => 'Férias', 'data_inicio' => '2026-08-01', 'data_fim' => '2026-08-04'],
                ['tipo' => 'Licença', 'data_inicio' => '2026-08-10', 'data_fim' => '2026-08-12'],
            ],
        );

        expect($ocorrencias)->toHaveCount(1)
            ->and($ocorrencias[0]['tipo'])->toBe('Férias');
    });

    test('isDiaUtil ignora fim de semana', function () {
        expect($this->calculator->isDiaUtil(Carbon::parse('2026-08-07')))->toBeTrue()
            ->and($this->calculator->isDiaUtil(Carbon::parse('2026-08-08')))->toBeFalse()
            ->and($this->calculator->isDiaUtil(Carbon::parse('2026-08-09')))->toBeFalse();
    });
});
