<?php

declare(strict_types=1);

use App\Enums\RelatorioGeracaoStatus;
use App\Enums\RelatorioGeracaoTipo;
use App\Models\RelatorioGeracao;
use App\V2\RelatorioGeracao\DTOs\RelatorioGeracaoRowDTO;
use Tests\TestCase;

uses(TestCase::class);

test('row dto exibe Unidades para o tipo unidade', function () {
    $geracao = new RelatorioGeracao();
    $geracao->id = 'geracao-un';
    $geracao->tipo = RelatorioGeracaoTipo::UNIDADE->value;
    $geracao->nome = 'Relatório de Unidades';
    $geracao->status = RelatorioGeracaoStatus::CONCLUIDA;
    $geracao->arquivo_path = 'relatorios/secreto.xlsx';
    $geracao->arquivo_nome = 'relatorio-unidades.xlsx';
    $geracao->iniciado_em = now();
    $geracao->finalizado_em = now();
    $geracao->erro_mensagem = null;

    $dto = RelatorioGeracaoRowDTO::fromModel($geracao);

    expect($dto->tipo)->toBe(RelatorioGeracaoTipo::UNIDADE->value)
        ->and($dto->nome)->toBe('Unidades');
});
