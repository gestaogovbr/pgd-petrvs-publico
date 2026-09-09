<?php

declare(strict_types=1);

use App\V2\RelatorioEntrega\DTOs\RelatorioEntregaRowDTO;
use App\V2\RelatorioEntrega\Support\RelatorioEntregaSituacaoHelper;
use Tests\TestCase;

uses(TestCase::class);

test('monta linha do relatorio a partir do resultado da query', function () {
    $row = (object) [
        'id' => 'entrega-1',
        'unidade_id' => 'unidade-demandante',
        'plano_unidade_id' => 'unidade-plano',
        'unidade_hierarquia' => 'Org / Unidade',
        'demandante_hierarquia' => 'Org / Demandante',
        'destinatario' => 'Cliente X',
        'entrega_nome' => 'Título da entrega',
        'data_inicio' => '2026-01-01',
        'data_fim' => '2026-01-31',
        'tipo_indicador' => 'QUANTIDADE',
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

    $dto = RelatorioEntregaRowDTO::fromQueryRow($row, '2026-01-15');

    expect($dto->entregaNome)->toBe('Título da entrega')
        ->and($dto->unidade_id)->toBe('unidade-plano')
        ->and($dto->demandanteHierarquia)->toBe('Org / Demandante')
        ->and($dto->destinatario)->toBe('Cliente X')
        ->and($dto->meta_tipo)->toBe('Quantidade')
        ->and($dto->situacao)->toBe(RelatorioEntregaSituacaoHelper::EM_ANDAMENTO)
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
        'demandante_hierarquia' => '',
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
        'demandante_hierarquia' => '',
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
        'demandante_hierarquia' => '',
        'entrega_nome' => '',
        'progresso_realizado' => ['quantitativo' => 50],
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

test('alcancado no fallback usa realizado do registro de execucao', function () {
    $row = (object) [
        'id' => 'e1',
        'unidade_id' => 'u1',
        'unidade_hierarquia' => '',
        'demandante_hierarquia' => '',
        'entrega_nome' => '',
        'progresso_realizado' => ['quantitativo' => 50],
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

test('planejado no fallback usa meta absoluta do registro de execucao', function () {
    $row = (object) [
        'id' => 'e1',
        'unidade_id' => 'u1',
        'unidade_hierarquia' => '',
        'demandante_hierarquia' => '',
        'entrega_nome' => '',
        'progresso_meta' => ['quantitativo' => 200],
        'tipo_indicador' => 'QUANTIDADE',
        'qtd_registros_execucao' => 1,
        'plano_id' => 'p1',
        'plano_numero' => '1',
        'plano_nome' => 'Plano',
        'plano_status' => 'ATIVO',
    ];

    $dto = RelatorioEntregaRowDTO::fromQueryRow($row);

    expect($dto->meta_planejado)->toBe(200.0);
});

test('planejado no fallback usa meta do cadastro sem registro de execucao', function () {
    $row = (object) [
        'id' => 'e1',
        'unidade_id' => 'u1',
        'unidade_hierarquia' => '',
        'demandante_hierarquia' => '',
        'entrega_nome' => '',
        'cadastro_meta' => ['porcentagem' => 80],
        'tipo_indicador' => 'PORCENTAGEM',
        'qtd_registros_execucao' => 0,
        'plano_id' => 'p1',
        'plano_numero' => '1',
        'plano_nome' => 'Plano',
        'plano_status' => 'ATIVO',
    ];

    $dto = RelatorioEntregaRowDTO::fromQueryRow($row);

    expect($dto->meta_planejado)->toBe(80.0);
});

test('planejado no fallback interpreta json duplamente codificado no progresso', function () {
    $row = (object) [
        'id' => '0f01345e-f5a6-43e2-ba3b-385671c7ded2',
        'unidade_id' => 'u1',
        'unidade_hierarquia' => '',
        'demandante_hierarquia' => '',
        'entrega_nome' => '',
        'progresso_meta' => json_encode(json_encode(['porcentagem' => 80])),
        'cadastro_meta' => ['porcentagem' => 80],
        'tipo_indicador' => 'PORCENTAGEM',
        'qtd_registros_execucao' => 1,
        'plano_id' => 'p1',
        'plano_numero' => '1',
        'plano_nome' => 'Plano',
        'plano_status' => 'ATIVO',
    ];

    $dto = RelatorioEntregaRowDTO::fromQueryRow($row);

    expect($dto->meta_planejado)->toBe(80.0);
});

test('percentual no fallback aplica planejado sobre realizado vezes 100', function () {
    $row = (object) [
        'id' => 'e1',
        'unidade_id' => 'u1',
        'unidade_hierarquia' => '',
        'demandante_hierarquia' => '',
        'entrega_nome' => '',
        'progresso_meta' => ['quantitativo' => 100],
        'progresso_realizado' => ['quantitativo' => 50],
        'tipo_indicador' => 'QUANTIDADE',
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
