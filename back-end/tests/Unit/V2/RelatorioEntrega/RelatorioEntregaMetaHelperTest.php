<?php

declare(strict_types=1);

use App\V2\RelatorioEntrega\Support\RelatorioEntregaMetaHelper;
use Tests\TestCase;

uses(TestCase::class);

test('valor planejado aplica meta vezes parcela sobre 100', function () {
    $meta = ['quantitativo' => 200];

    expect(RelatorioEntregaMetaHelper::valorPlanejado($meta, 'QUANTIDADE', 50))->toBe(100.0)
        ->and(RelatorioEntregaMetaHelper::valorPlanejado($meta, 'QUANTIDADE', 100))->toBe(200.0)
        ->and(RelatorioEntregaMetaHelper::valorPlanejado($meta, 'QUANTIDADE', 0))->toBe(0.0);
});

test('valor planejado retorna zero quando parcela ausente', function () {
    expect(RelatorioEntregaMetaHelper::valorPlanejado(['valor' => 80], 'VALOR', null))->toBe(0.0);
});

test('valor alcancado retorna zero sem registro de execucao', function () {
    expect(RelatorioEntregaMetaHelper::valorAlcancado(['quantitativo' => 80], 'QUANTIDADE', false))->toBe(0.0);
});

test('valor alcancado usa realizado quando ha registro de execucao', function () {
    expect(RelatorioEntregaMetaHelper::valorAlcancado(['quantitativo' => 80], 'QUANTIDADE', true))->toBe(80.0);
});

test('percentual de alcance aplica planejado sobre realizado vezes 100', function () {
    expect(RelatorioEntregaMetaHelper::valorPercentualAlcance(100.0, 50.0))->toBe(200.0)
        ->and(RelatorioEntregaMetaHelper::valorPercentualAlcance(50.0, 100.0))->toBe(50.0)
        ->and(RelatorioEntregaMetaHelper::valorPercentualAlcance(100.0, 0.0))->toBe(0.0);
});
