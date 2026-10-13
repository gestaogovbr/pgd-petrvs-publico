<?php

declare(strict_types=1);

use App\Enums\RelatorioGeracaoStatus;
use App\Enums\RelatorioGeracaoTipo;
use App\Models\RelatorioGeracao;
use App\V2\RelatorioGeracao\DTOs\RelatorioGeracaoRowDTO;
use Tests\TestCase;

uses(TestCase::class);

test('row dto exibe Planos de Entrega para o tipo plano_entrega', function () {
    $geracao = new RelatorioGeracao();
    $geracao->id = 'geracao-pe';
    $geracao->tipo = RelatorioGeracaoTipo::PLANO_ENTREGA->value;
    $geracao->nome = 'Relatório de Planos de Entrega';
    $geracao->status = RelatorioGeracaoStatus::CONCLUIDA;
    $geracao->arquivo_path = 'relatorios/secreto.xlsx';
    $geracao->arquivo_nome = 'relatorio-planos-entrega.xlsx';
    $geracao->iniciado_em = now();
    $geracao->finalizado_em = now();
    $geracao->erro_mensagem = null;

    $dto = RelatorioGeracaoRowDTO::fromModel($geracao);

    expect($dto->tipo)->toBe(RelatorioGeracaoTipo::PLANO_ENTREGA->value)
        ->and($dto->nome)->toBe('Planos de Entrega');
});
