<?php

use App\Enums\StatusEnum;
use App\Models\PlanoEntregaEntrega;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoEntrega;
use App\Models\Unidade;
use App\Services\RelatorioPlanoTrabalhoService;

test('relatorio de PT com subordinadas usa unidade_pai_id e ignora path', function () {
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

    $ptPai = PlanoTrabalho::factory()->create(['unidade_id' => $pai->id]);
    $ptFilha = PlanoTrabalho::factory()->create(['unidade_id' => $filha->id]);
    $ptNeta = PlanoTrabalho::factory()->create(['unidade_id' => $neta->id]);
    $ptSoPath = PlanoTrabalho::factory()->create(['unidade_id' => $soPath->id]);

    $resultado = (new RelatorioPlanoTrabalhoService())->queryForExport([
        'where' => [
            ['unidade_id', '==', $pai->id],
            ['incluir_unidades_subordinadas', '==', 1],
        ],
        'page' => 1,
        'limit' => 50,
    ]);

    $ids = $resultado['rows']->pluck('id')->all();

    expect($ids)->toContain($ptPai->id)
        ->and($ids)->toContain($ptFilha->id)
        ->and($ids)->toContain($ptNeta->id)
        ->and($ids)->not->toContain($ptSoPath->id);
});

test('relatorio de PT sem subordinadas retorna apenas a unidade informada', function () {
    $pai = Unidade::factory()->create();
    $filha = Unidade::factory()->create(['unidade_pai_id' => $pai->id]);

    $ptPai = PlanoTrabalho::factory()->create(['unidade_id' => $pai->id]);
    $ptFilha = PlanoTrabalho::factory()->create(['unidade_id' => $filha->id]);

    $resultado = (new RelatorioPlanoTrabalhoService())->queryForExport([
        'where' => [
            ['unidade_id', '==', $pai->id],
        ],
        'page' => 1,
        'limit' => 50,
    ]);

    $ids = $resultado['rows']->pluck('id')->all();

    expect($ids)->toContain($ptPai->id)
        ->and($ids)->not->toContain($ptFilha->id);
});

test('relatorio de PT filtrado por entrega exclui PT cancelado', function () {
    $unidade = Unidade::factory()->create();
    $entrega = PlanoEntregaEntrega::factory()->create(['unidade_id' => $unidade->id]);

    $ativo = PlanoTrabalho::factory()->ativo()->create(['unidade_id' => $unidade->id]);
    $cancelado = PlanoTrabalho::factory()->create([
        'unidade_id' => $unidade->id,
        'status' => StatusEnum::CANCELADO->value,
    ]);

    PlanoTrabalhoEntrega::factory()->create([
        'plano_trabalho_id' => $ativo->id,
        'plano_entrega_entrega_id' => $entrega->id,
    ]);
    PlanoTrabalhoEntrega::factory()->create([
        'plano_trabalho_id' => $cancelado->id,
        'plano_entrega_entrega_id' => $entrega->id,
    ]);

    $resultado = (new RelatorioPlanoTrabalhoService())->queryForExport([
        'where' => [
            ['unidade_id', '==', $unidade->id],
            ['plano_entrega_entrega_id', '==', $entrega->id],
        ],
        'page' => 1,
        'limit' => 50,
    ]);

    $ids = $resultado['rows']->pluck('id')->all();

    expect($ids)->toContain($ativo->id)
        ->and($ids)->not->toContain($cancelado->id);
});
