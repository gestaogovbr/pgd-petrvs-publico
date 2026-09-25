<?php

declare(strict_types=1);

use App\V2\RelatorioEntrega\Support\RelatorioEntregaMetaHelper;
use Tests\TestCase;

uses(TestCase::class);

test('valor numerico absoluto extrai valor conforme tipo', function () {
    expect(RelatorioEntregaMetaHelper::valorNumericoAbsoluto(['quantitativo' => 200], 'QUANTIDADE'))->toBe(200.0)
        ->and(RelatorioEntregaMetaHelper::valorNumericoAbsoluto(['porcentagem' => 80], 'PORCENTAGEM'))->toBe(80.0)
        ->and(RelatorioEntregaMetaHelper::valorNumericoAbsoluto(['valor' => 15.5], 'VALOR'))->toBe(15.5);
});

test('valor numerico absoluto retorna zero quando json ausente em tipo numerico', function () {
    expect(RelatorioEntregaMetaHelper::valorNumericoAbsoluto(null, 'VALOR'))->toBe(0.0)
        ->and(RelatorioEntregaMetaHelper::valorNumericoAbsoluto('', 'QUANTIDADE'))->toBe(0.0);
});

test('valor numerico absoluto retorna null para qualitativo', function () {
    expect(RelatorioEntregaMetaHelper::valorNumericoAbsoluto(['qualitativo' => 'otimo'], 'QUALITATIVO'))->toBeNull()
        ->and(RelatorioEntregaMetaHelper::valorNumericoAbsoluto(null, 'QUALITATIVO'))->toBeNull();
});

test('valor numerico absoluto retorna null para tipo desconhecido', function () {
    expect(RelatorioEntregaMetaHelper::valorNumericoAbsoluto(['porcentagem' => 80], null))->toBeNull()
        ->and(RelatorioEntregaMetaHelper::valorNumericoAbsoluto(['porcentagem' => 80], 'OUTRO'))->toBeNull();
});

test('valor numerico absoluto interpreta json duplamente codificado', function () {
    $doubleEncoded = json_encode(json_encode(['porcentagem' => 80]));

    expect(RelatorioEntregaMetaHelper::valorNumericoAbsoluto($doubleEncoded, 'PORCENTAGEM'))->toBe(80.0)
        ->and(RelatorioEntregaMetaHelper::valorNumericoAbsoluto('{"porcentagem": 80}', 'PORCENTAGEM'))->toBe(80.0);
});

test('percentual de alcance aplica planejado sobre realizado vezes 100', function () {
    expect(RelatorioEntregaMetaHelper::valorPercentualAlcance(100.0, 50.0))->toBe(200.0)
        ->and(RelatorioEntregaMetaHelper::valorPercentualAlcance(50.0, 100.0))->toBe(50.0);
});

test('percentual de alcance retorna null quando nao aplicavel', function () {
    expect(RelatorioEntregaMetaHelper::valorPercentualAlcance(100.0, 0.0))->toBeNull()
        ->and(RelatorioEntregaMetaHelper::valorPercentualAlcance(null, 50.0))->toBeNull()
        ->and(RelatorioEntregaMetaHelper::valorPercentualAlcance(100.0, null))->toBeNull();
});
