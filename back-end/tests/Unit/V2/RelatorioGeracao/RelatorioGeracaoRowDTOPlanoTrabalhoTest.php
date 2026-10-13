<?php

declare(strict_types=1);

use App\Enums\RelatorioGeracaoStatus;
use App\Enums\RelatorioGeracaoTipo;
use App\Models\RelatorioGeracao;
use App\V2\RelatorioGeracao\DTOs\RelatorioGeracaoRowDTO;
use Tests\TestCase;

uses(TestCase::class);

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
