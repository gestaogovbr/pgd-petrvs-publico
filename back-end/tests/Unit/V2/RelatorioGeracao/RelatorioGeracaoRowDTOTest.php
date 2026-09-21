<?php

declare(strict_types=1);

use App\Enums\RelatorioGeracaoStatus;
use App\Enums\RelatorioGeracaoTipo;
use App\Models\RelatorioGeracao;
use App\V2\RelatorioGeracao\DTOs\RelatorioGeracaoRowDTO;
use Tests\TestCase;

uses(TestCase::class);

test('row dto serializa geração sem o caminho físico do arquivo', function () {
    $geracao = new RelatorioGeracao();
    $geracao->id = 'geracao-1';
    $geracao->tipo = RelatorioGeracaoTipo::PLANO_TRABALHO->value;
    $geracao->nome = 'Relatório de Planos de Trabalho';
    $geracao->status = RelatorioGeracaoStatus::CONCLUIDA;
    $geracao->arquivo_path = 'relatorios/secreto.xlsx';
    $geracao->arquivo_nome = 'relatorio-planos-trabalho.xlsx';
    $geracao->iniciado_em = now();
    $geracao->finalizado_em = now();
    $geracao->erro_mensagem = null;

    $dto = RelatorioGeracaoRowDTO::fromModel($geracao);
    $payload = $dto->jsonSerialize();

    expect($payload['id'])->toBe('geracao-1')
        ->and($payload['tipo'])->toBe(RelatorioGeracaoTipo::PLANO_TRABALHO->value)
        ->and($payload['nome'])->toBe('Planos de Trabalho')
        ->and($payload['status'])->toBe(RelatorioGeracaoStatus::CONCLUIDA->value)
        ->and($payload['status_label'])->toBe('Concluída')
        ->and($payload['arquivo_nome'])->toBe('relatorio-planos-trabalho.xlsx')
        ->and($payload['progresso_pagina'])->toBe(0)
        ->and($payload['progresso_total'])->toBeNull()
        ->and($payload['progresso_percentual'])->toBe(0)
        ->and($payload)->not->toHaveKey('arquivo_path');
});

test('row dto calcula percentual com base nas linhas processadas', function () {
    $geracao = new RelatorioGeracao();
    $geracao->id = 'geracao-3';
    $geracao->tipo = RelatorioGeracaoTipo::PLANO_TRABALHO->value;
    $geracao->nome = 'Relatório de Planos de Trabalho';
    $geracao->status = RelatorioGeracaoStatus::PROCESSANDO;
    $geracao->iniciado_em = now();
    $geracao->progresso_pagina = 2;
    $geracao->progresso_total = 8;

    $payload = RelatorioGeracaoRowDTO::fromModel($geracao)->jsonSerialize();

    expect($payload['progresso_pagina'])->toBe(2)
        ->and($payload['progresso_total'])->toBe(8)
        ->and($payload['progresso_percentual'])->toBe(25);
});

test('row dto exibe Planos de Trabalho também para o tipo detalhado', function () {
    $geracao = new RelatorioGeracao();
    $geracao->id = 'geracao-2';
    $geracao->tipo = RelatorioGeracaoTipo::PLANO_TRABALHO_DETALHADO->value;
    $geracao->nome = 'Relatório de Planos de Trabalho (Períodos Avaliativos)';
    $geracao->status = RelatorioGeracaoStatus::CONCLUIDA;
    $geracao->arquivo_path = 'relatorios/secreto.xlsx';
    $geracao->arquivo_nome = 'relatorio-planos-trabalho-detalhado.xlsx';
    $geracao->iniciado_em = now();
    $geracao->finalizado_em = now();
    $geracao->erro_mensagem = null;

    $dto = RelatorioGeracaoRowDTO::fromModel($geracao);

    expect($dto->tipo)->toBe(RelatorioGeracaoTipo::PLANO_TRABALHO_DETALHADO->value)
        ->and($dto->nome)->toBe('Planos de Trabalho');
});
