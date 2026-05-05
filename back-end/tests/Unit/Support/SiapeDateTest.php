<?php

use App\Support\SiapeDate;

test('formata data ultima transacao do SIAPE para formato de banco', function () {
    expect(SiapeDate::dataUltimaTransacaoParaBanco('23012024'))->toBe('2024-01-23 00:00:00');
});

test('retorna null para data ultima transacao SIAPE ausente ou invalida', function (mixed $valor) {
    expect(SiapeDate::dataUltimaTransacaoParaBanco($valor))->toBeNull();
})->with([
    null,
    '',
    'd',
    '32012024',
    '2024-01-23',
]);
