<?php

use App\Models\Unidade;
use App\Services\RelatorioUnidadeService;

test('relatorio de unidades com subordinadas usa unidade_pai_id e ignora path', function () {
    $pai = Unidade::factory()->create(['path' => null]);
    $filha = Unidade::factory()->create([
        'unidade_pai_id' => $pai->id,
        'path' => null,
    ]);
    $neta = Unidade::factory()->create([
        'unidade_pai_id' => $filha->id,
        'path' => null,
    ]);
    $soPath = Unidade::factory()->create([
        'unidade_pai_id' => null,
        'path' => "/{$pai->id}/",
    ]);

    $resultado = app(RelatorioUnidadeService::class)->queryForExport([
        'filters' => [
            'unidade_id' => $pai->id,
            'incluir_unidades_subordinadas' => true,
        ],
        'page' => 1,
        'limit' => 50,
    ]);

    $ids = $resultado['rows']->pluck('unidade_id')->all();

    expect($ids)->toContain($pai->id)
        ->and($ids)->toContain($filha->id)
        ->and($ids)->toContain($neta->id)
        ->and($ids)->not->toContain($soPath->id);
});

test('relatorio de unidades sem subordinadas retorna apenas a unidade informada', function () {
    $pai = Unidade::factory()->create();
    $filha = Unidade::factory()->create(['unidade_pai_id' => $pai->id]);

    $resultado = app(RelatorioUnidadeService::class)->queryForExport([
        'filters' => [
            'unidade_id' => $pai->id,
        ],
        'page' => 1,
        'limit' => 50,
    ]);

    $ids = $resultado['rows']->pluck('unidade_id')->all();

    expect($ids)->toContain($pai->id)
        ->and($ids)->not->toContain($filha->id);
});
