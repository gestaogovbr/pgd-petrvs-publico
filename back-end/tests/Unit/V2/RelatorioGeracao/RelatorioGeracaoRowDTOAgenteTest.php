<?php

declare(strict_types=1);

use App\Enums\RelatorioGeracaoStatus;
use App\Enums\RelatorioGeracaoTipo;
use App\Models\RelatorioGeracao;
use App\V2\RelatorioGeracao\DTOs\RelatorioGeracaoRowDTO;
use Tests\TestCase;

uses(TestCase::class);

test('row dto exibe Agentes Públicos para o tipo agente', function () {
    $geracao = new RelatorioGeracao();
    $geracao->id = 'geracao-ag';
    $geracao->tipo = RelatorioGeracaoTipo::AGENTE->value;
    $geracao->nome = 'Relatório de Agentes Públicos';
    $geracao->status = RelatorioGeracaoStatus::CONCLUIDA;
    $geracao->arquivo_path = 'relatorios/secreto.xlsx';
    $geracao->arquivo_nome = 'relatorio-agentes.xlsx';
    $geracao->iniciado_em = now();
    $geracao->finalizado_em = now();
    $geracao->erro_mensagem = null;

    $dto = RelatorioGeracaoRowDTO::fromModel($geracao);

    expect($dto->tipo)->toBe(RelatorioGeracaoTipo::AGENTE->value)
        ->and($dto->nome)->toBe('Agentes Públicos');
});
