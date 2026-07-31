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
        ->and($dto->plano_rotulo)->toBe('Plano 2026 - 01/01/2026 - 31/12/2026')
        ->and($dto->jsonSerialize()['unidadeHierarquia'])->toBe('Org / Unidade');
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
