<?php

declare(strict_types=1);

use App\V2\RelatorioEntrega\DTOs\RelatorioEntregaRowDTO;
use Tests\TestCase;

uses(TestCase::class);

test('monta linha do relatorio a partir do resultado da query', function () {
    $row = (object) [
        'id' => 'entrega-1',
        'unidade_id' => 'unidade-1',
        'unidade_hierarquia' => 'Org / Unidade',
        'entrega_nome' => 'Título da entrega',
        'data_inicio' => '2026-01-01',
        'data_fim' => '2026-01-31',
        'meta_planejado' => 10,
        'meta_alcancado' => 5,
        'meta_percentual' => 50,
        'qtd_planejamento_institucional' => 1,
        'qtd_cadeia_valor' => 2,
        'qtd_outras_entregas' => 3,
        'plano_id' => 'plano-1',
        'plano_numero' => '42',
        'plano_nome' => 'Plano 2026',
        'plano_data_inicio' => '2026-01-01',
        'plano_data_fim' => '2026-12-31',
        'plano_status' => 'ATIVO',
        'qtd_participantes' => 3,
        'qtd_planos_trabalho' => 4,
    ];

    $dto = RelatorioEntregaRowDTO::fromQueryRow($row);

    expect($dto->entregaNome)->toBe('Título da entrega')
        ->and($dto->qtd_outras_entregas)->toBe(3)
        ->and($dto->plano_rotulo)->toBe('Plano 2026 - 01/01/2026 - 31/12/2026')
        ->and($dto->jsonSerialize()['unidadeHierarquia'])->toBe('Org / Unidade')
        ->and($dto->jsonSerialize()['qtd_outras_entregas'])->toBe(3);
});

test('rotulo do plano usa hifen quando nome vazio', function () {
    $row = (object) [
        'id' => 'e1',
        'unidade_id' => 'u1',
        'unidade_hierarquia' => '',
        'entrega_nome' => '',
        'plano_id' => 'p1',
        'plano_numero' => '1',
        'plano_nome' => '',
        'plano_status' => 'ATIVO',
    ];

    $dto = RelatorioEntregaRowDTO::fromQueryRow($row);

    expect($dto->plano_rotulo)->toBe('-');
});

test('rotulo do plano omite fim quando igual ao inicio', function () {
    $row = (object) [
        'id' => 'e1',
        'unidade_id' => 'u1',
        'unidade_hierarquia' => '',
        'entrega_nome' => '',
        'plano_id' => 'p1',
        'plano_numero' => '1',
        'plano_nome' => 'Plano único',
        'plano_data_inicio' => '2026-06-01',
        'plano_data_fim' => '2026-06-01',
        'plano_status' => 'ATIVO',
    ];

    $dto = RelatorioEntregaRowDTO::fromQueryRow($row);

    expect($dto->plano_rotulo)->toBe('Plano único - 01/06/2026');
});

test('alcancado no fallback retorna zero sem registro de execucao', function () {
    $row = (object) [
        'id' => 'e1',
        'unidade_id' => 'u1',
        'unidade_hierarquia' => '',
        'entrega_nome' => '',
        'realizado' => ['quantitativo' => 50],
        'tipo_indicador' => 'QUANTIDADE',
        'qtd_registros_execucao' => 0,
        'plano_id' => 'p1',
        'plano_numero' => '1',
        'plano_nome' => 'Plano',
        'plano_status' => 'ATIVO',
    ];

    $dto = RelatorioEntregaRowDTO::fromQueryRow($row);

    expect($dto->meta_alcancado)->toBe(0.0);
});

test('alcancado no fallback usa realizado quando ha registro de execucao', function () {
    $row = (object) [
        'id' => 'e1',
        'unidade_id' => 'u1',
        'unidade_hierarquia' => '',
        'entrega_nome' => '',
        'realizado' => ['quantitativo' => 50],
        'tipo_indicador' => 'QUANTIDADE',
        'qtd_registros_execucao' => 2,
        'plano_id' => 'p1',
        'plano_numero' => '1',
        'plano_nome' => 'Plano',
        'plano_status' => 'ATIVO',
    ];

    $dto = RelatorioEntregaRowDTO::fromQueryRow($row);

    expect($dto->meta_alcancado)->toBe(50.0);
});

test('planejado no fallback aplica meta vezes parcela sobre 100', function () {
    $row = (object) [
        'id' => 'e1',
        'unidade_id' => 'u1',
        'unidade_hierarquia' => '',
        'entrega_nome' => '',
        'meta' => ['quantitativo' => 200],
        'tipo_indicador' => 'QUANTIDADE',
        'progresso_esperado' => 50,
        'plano_id' => 'p1',
        'plano_numero' => '1',
        'plano_nome' => 'Plano',
        'plano_status' => 'ATIVO',
    ];

    $dto = RelatorioEntregaRowDTO::fromQueryRow($row);

    expect($dto->meta_planejado)->toBe(100.0);
});

test('percentual no fallback aplica planejado sobre realizado vezes 100', function () {
    $row = (object) [
        'id' => 'e1',
        'unidade_id' => 'u1',
        'unidade_hierarquia' => '',
        'entrega_nome' => '',
        'meta' => ['quantitativo' => 100],
        'realizado' => ['quantitativo' => 50],
        'tipo_indicador' => 'QUANTIDADE',
        'progresso_esperado' => 100,
        'qtd_registros_execucao' => 1,
        'plano_id' => 'p1',
        'plano_numero' => '1',
        'plano_nome' => 'Plano',
        'plano_status' => 'ATIVO',
    ];

    $dto = RelatorioEntregaRowDTO::fromQueryRow($row);

    expect($dto->meta_planejado)->toBe(100.0)
        ->and($dto->meta_alcancado)->toBe(50.0)
        ->and($dto->meta_percentual)->toBe(200.0);
});
