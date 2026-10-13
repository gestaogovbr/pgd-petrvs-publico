<?php

declare(strict_types=1);

use App\Enums\RelatorioGeracaoStatus;
use App\Enums\RelatorioGeracaoTipo;
use App\Models\RelatorioGeracao;
use App\V2\RelatorioGeracao\DTOs\RelatorioGeracaoRowDTO;
use Tests\TestCase;

uses(TestCase::class);

test('row dto exibe Entregas para o tipo entrega', function () {
    $geracao = new RelatorioGeracao();
    $geracao->id = 'geracao-ent';
    $geracao->tipo = RelatorioGeracaoTipo::ENTREGA->value;
    $geracao->nome = 'Relatório de Entregas';
    $geracao->status = RelatorioGeracaoStatus::CONCLUIDA;
    $geracao->arquivo_path = 'relatorios/secreto.xlsx';
    $geracao->arquivo_nome = 'relatorio_entregas.xlsx';
    $geracao->iniciado_em = now();
    $geracao->finalizado_em = now();
    $geracao->erro_mensagem = null;

    $dto = RelatorioGeracaoRowDTO::fromModel($geracao);

    expect($dto->tipo)->toBe(RelatorioGeracaoTipo::ENTREGA->value)
        ->and($dto->nome)->toBe('Entregas');
});
