<?php

declare(strict_types=1);

use App\V2\RelatorioEntrega\Support\RelatorioEntregaVinculosLinhas;
use Tests\TestCase;

uses(TestCase::class);

test('tres itens de planejamento e dois da cadeia repetem idem na cadeia', function () {
    $linhas = RelatorioEntregaVinculosLinhas::montar(
        ['Objetivo 1', 'Objetivo 2', 'Objetivo 3'],
        ['Processo X', 'Processo Y'],
    );

    expect($linhas)->toBe([
        ['planejamento_institucional' => 'Objetivo 1', 'cadeia_valor' => 'Processo X'],
        ['planejamento_institucional' => 'Objetivo 2', 'cadeia_valor' => 'Processo Y'],
        ['planejamento_institucional' => 'Objetivo 3', 'cadeia_valor' => RelatorioEntregaVinculosLinhas::IDEM],
    ]);
});

test('dois itens de planejamento e tres da cadeia repetem idem no planejamento', function () {
    $linhas = RelatorioEntregaVinculosLinhas::montar(
        ['Objetivo 1', 'Objetivo 2'],
        ['Processo X', 'Processo Y', 'Processo Z'],
    );

    expect($linhas)->toBe([
        ['planejamento_institucional' => 'Objetivo 1', 'cadeia_valor' => 'Processo X'],
        ['planejamento_institucional' => 'Objetivo 2', 'cadeia_valor' => 'Processo Y'],
        ['planejamento_institucional' => RelatorioEntregaVinculosLinhas::IDEM, 'cadeia_valor' => 'Processo Z'],
    ]);
});

test('quantidades iguais geram uma linha por par sem idem', function () {
    expect(RelatorioEntregaVinculosLinhas::montar(['Objetivo 1'], ['Processo X']))->toBe([
        ['planejamento_institucional' => 'Objetivo 1', 'cadeia_valor' => 'Processo X'],
    ])->and(RelatorioEntregaVinculosLinhas::montar(
        ['Objetivo 1', 'Objetivo 2'],
        ['Processo X', 'Processo Y'],
    ))->toBe([
        ['planejamento_institucional' => 'Objetivo 1', 'cadeia_valor' => 'Processo X'],
        ['planejamento_institucional' => 'Objetivo 2', 'cadeia_valor' => 'Processo Y'],
    ]);
});

test('entrega sem vinculos permanece em uma linha com ausencia nas duas colunas', function () {
    expect(RelatorioEntregaVinculosLinhas::montar([], []))->toBe([
        [
            'planejamento_institucional' => RelatorioEntregaVinculosLinhas::SEM_VINCULO,
            'cadeia_valor' => RelatorioEntregaVinculosLinhas::SEM_VINCULO,
        ],
    ]);
});

test('coluna sem nenhum vinculo nao usa idem', function () {
    expect(RelatorioEntregaVinculosLinhas::montar(['Objetivo 1', 'Objetivo 2'], []))->toBe([
        ['planejamento_institucional' => 'Objetivo 1', 'cadeia_valor' => RelatorioEntregaVinculosLinhas::SEM_VINCULO],
        ['planejamento_institucional' => 'Objetivo 2', 'cadeia_valor' => RelatorioEntregaVinculosLinhas::SEM_VINCULO],
    ])->and(RelatorioEntregaVinculosLinhas::montar([], ['Processo X']))->toBe([
        ['planejamento_institucional' => RelatorioEntregaVinculosLinhas::SEM_VINCULO, 'cadeia_valor' => 'Processo X'],
    ]);
});

test('nomes em branco nao contam como vinculo', function () {
    expect(RelatorioEntregaVinculosLinhas::montar(['  Objetivo 1  ', '   '], ['', 'Processo X']))->toBe([
        ['planejamento_institucional' => 'Objetivo 1', 'cadeia_valor' => 'Processo X'],
    ]);
});
