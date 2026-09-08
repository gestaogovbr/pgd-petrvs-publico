<?php

declare(strict_types=1);

use App\V2\RelatorioEntrega\Support\RelatorioEntregaSituacaoHelper;
use Tests\TestCase;

uses(TestCase::class);

test('situacao incluida quando consulta anterior ao inicio', function () {
    expect(RelatorioEntregaSituacaoHelper::calcular('2026-02-01', '2026-02-28', '2026-01-15'))
        ->toBe(RelatorioEntregaSituacaoHelper::INCLUIDA);
});

test('situacao em andamento quando consulta entre inicio e fim', function () {
    expect(RelatorioEntregaSituacaoHelper::calcular('2026-02-01', '2026-02-28', '2026-02-15'))
        ->toBe(RelatorioEntregaSituacaoHelper::EM_ANDAMENTO)
        ->and(RelatorioEntregaSituacaoHelper::calcular('2026-02-01', '2026-02-28', '2026-02-01'))
        ->toBe(RelatorioEntregaSituacaoHelper::EM_ANDAMENTO)
        ->and(RelatorioEntregaSituacaoHelper::calcular('2026-02-01', '2026-02-28', '2026-02-28'))
        ->toBe(RelatorioEntregaSituacaoHelper::EM_ANDAMENTO);
});

test('situacao finalizada quando consulta posterior ao fim', function () {
    expect(RelatorioEntregaSituacaoHelper::calcular('2026-02-01', '2026-02-28', '2026-03-01'))
        ->toBe(RelatorioEntregaSituacaoHelper::FINALIZADA);
});

test('situacao usa data fim igual ao inicio quando fim ausente', function () {
    expect(RelatorioEntregaSituacaoHelper::calcular('2026-02-10', null, '2026-02-10'))
        ->toBe(RelatorioEntregaSituacaoHelper::EM_ANDAMENTO)
        ->and(RelatorioEntregaSituacaoHelper::calcular('2026-02-10', null, '2026-02-11'))
        ->toBe(RelatorioEntregaSituacaoHelper::FINALIZADA);
});
