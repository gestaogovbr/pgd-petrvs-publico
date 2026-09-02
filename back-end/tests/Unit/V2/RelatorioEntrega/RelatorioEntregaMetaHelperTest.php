<?php

declare(strict_types=1);

use App\V2\RelatorioEntrega\Support\RelatorioEntregaMetaHelper;
use Tests\TestCase;

uses(TestCase::class);

test('valor absoluto do registro de execucao extrai meta conforme tipo', function () {
    $meta = ['quantitativo' => 200];

    expect(RelatorioEntregaMetaHelper::valorAbsolutoRegistroExecucao($meta, 'QUANTIDADE', true))->toBe(200.0)
        ->and(RelatorioEntregaMetaHelper::valorAbsolutoRegistroExecucao($meta, 'QUANTIDADE', false))->toBe(0.0);
});

test('valor absoluto retorna zero quando json ausente', function () {
    expect(RelatorioEntregaMetaHelper::valorAbsolutoRegistroExecucao(null, 'VALOR', true))->toBe(0.0);
});

test('valor numerico absoluto interpreta json duplamente codificado', function () {
    $doubleEncoded = json_encode(json_encode(['porcentagem' => 80]));

    expect(RelatorioEntregaMetaHelper::valorNumericoAbsoluto($doubleEncoded, 'PORCENTAGEM'))->toBe(80.0)
        ->and(RelatorioEntregaMetaHelper::valorNumericoAbsoluto('{"porcentagem": 80}', 'PORCENTAGEM'))->toBe(80.0);
});

test('valor meta relatorio usa cadastro sem registro de execucao', function () {
    expect(RelatorioEntregaMetaHelper::valorMetaRelatorio(
        null,
        ['porcentagem' => 80],
        'PORCENTAGEM',
        false,
    ))->toBe(80.0);
});

test('valor meta relatorio usa progresso quando ha registro de execucao', function () {
    $doubleEncoded = json_encode(json_encode(['porcentagem' => 80]));

    expect(RelatorioEntregaMetaHelper::valorMetaRelatorio(
        $doubleEncoded,
        ['porcentagem' => 10],
        'PORCENTAGEM',
        true,
    ))->toBe(80.0);
});

test('valor alcancado retorna zero sem registro de execucao', function () {
    expect(RelatorioEntregaMetaHelper::valorAlcancado(['quantitativo' => 80], 'QUANTIDADE', false))->toBe(0.0);
});

test('valor alcancado usa realizado do registro de execucao', function () {
    expect(RelatorioEntregaMetaHelper::valorAlcancado(['quantitativo' => 80], 'QUANTIDADE', true))->toBe(80.0);
});

test('percentual de alcance aplica planejado sobre realizado vezes 100', function () {
    expect(RelatorioEntregaMetaHelper::valorPercentualAlcance(100.0, 50.0))->toBe(200.0)
        ->and(RelatorioEntregaMetaHelper::valorPercentualAlcance(50.0, 100.0))->toBe(50.0)
        ->and(RelatorioEntregaMetaHelper::valorPercentualAlcance(100.0, 0.0))->toBe(0.0);
});
