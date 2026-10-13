<?php

declare(strict_types=1);

use App\Enums\RelatorioGeracaoStatus;
use App\Enums\RelatorioGeracaoTipo;
use App\Models\RelatorioGeracao;
use App\V2\RelatorioGeracao\DTOs\RelatorioGeracaoRowDTO;
use Tests\TestCase;

uses(TestCase::class);

test('row dto exibe Lacunas de Planos de Trabalho para o tipo lacuna_plano_trabalho', function () {
    $geracao = new RelatorioGeracao();
    $geracao->id = 'geracao-lacuna';
    $geracao->tipo = RelatorioGeracaoTipo::LACUNA_PLANO_TRABALHO->value;
    $geracao->nome = 'Relatório de Lacunas de Planos de Trabalho';
    $geracao->status = RelatorioGeracaoStatus::CONCLUIDA;
    $geracao->arquivo_path = 'relatorios/secreto.xlsx';
    $geracao->arquivo_nome = 'relatorio-lacunas-plano-trabalho.xlsx';
    $geracao->iniciado_em = now();
    $geracao->finalizado_em = now();
    $geracao->erro_mensagem = null;

    $dto = RelatorioGeracaoRowDTO::fromModel($geracao);

    expect($dto->tipo)->toBe(RelatorioGeracaoTipo::LACUNA_PLANO_TRABALHO->value)
        ->and($dto->nome)->toBe('Lacunas de Planos de Trabalho');
});
