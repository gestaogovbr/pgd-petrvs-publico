<?php

use App\Models\PlanoEntrega;
use App\Models\Unidade;
use App\Services\RelatorioPlanoEntregaService;

test('relatorio de PE com subordinadas usa unidade_pai_id e ignora path', function () {
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

    $pePai = PlanoEntrega::factory()->create(['unidade_id' => $pai->id]);
    $peFilha = PlanoEntrega::factory()->create(['unidade_id' => $filha->id]);
    $peNeta = PlanoEntrega::factory()->create(['unidade_id' => $neta->id]);
    $peSoPath = PlanoEntrega::factory()->create(['unidade_id' => $soPath->id]);

    $resultado = app(RelatorioPlanoEntregaService::class)->queryForExport([
        'filters' => [
            'unidade_id' => $pai->id,
            'incluir_unidades_subordinadas' => true,
        ],
        'page' => 1,
        'limit' => 50,
    ]);

    $ids = $resultado['rows']->pluck('id')->all();

    expect($ids)->toContain($pePai->id)
        ->and($ids)->toContain($peFilha->id)
        ->and($ids)->toContain($peNeta->id)
        ->and($ids)->not->toContain($peSoPath->id);
});

test('relatorio de PE sem subordinadas retorna apenas a unidade informada', function () {
    $pai = Unidade::factory()->create();
    $filha = Unidade::factory()->create(['unidade_pai_id' => $pai->id]);

    $pePai = PlanoEntrega::factory()->create(['unidade_id' => $pai->id]);
    $peFilha = PlanoEntrega::factory()->create(['unidade_id' => $filha->id]);

    $resultado = app(RelatorioPlanoEntregaService::class)->queryForExport([
        'filters' => [
            'unidade_id' => $pai->id,
        ],
        'page' => 1,
        'limit' => 50,
    ]);

    $ids = $resultado['rows']->pluck('id')->all();

    expect($ids)->toContain($pePai->id)
        ->and($ids)->not->toContain($peFilha->id);
});
