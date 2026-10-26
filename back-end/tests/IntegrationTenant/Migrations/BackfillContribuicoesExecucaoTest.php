<?php

namespace Tests\IntegrationTenant\Migrations;

use App\Models\Atividade;
use App\Models\Entrega;
use App\Models\PlanoEntrega;
use App\Models\PlanoEntregaEntrega;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\PlanoTrabalhoConsolidacaoContribuicao;
use App\Models\PlanoTrabalhoEntrega;
use App\Models\Programa;
use App\Models\Unidade;
use App\Models\Usuario;
use Illuminate\Support\Facades\DB;

uses()->group('integration-tenant');

function rodarBackfill(): void
{
    $migration = require base_path('database/migrations/tenant/2026_10_13_093000_backfill_contribuicoes_execucao.php');
    $migration->up();
}

function cenarioBackfill(float $esforco = 40.0): array
{
    $unidade = Unidade::factory()->create();
    $usuario = Usuario::factory()->create();
    $programa = Programa::factory()->create();
    $plano = PlanoTrabalho::factory()->create([
        'usuario_id' => $usuario->id,
        'unidade_id' => $unidade->id,
        'criacao_usuario_id' => $usuario->id,
        'programa_id' => $programa->id,
        'status' => 'ATIVO',
    ]);
    $entregaCat = Entrega::factory()->create(['unidade_id' => $unidade->id]);
    $planoEntrega = PlanoEntrega::factory()->create([
        'unidade_id' => $unidade->id,
        'criacao_usuario_id' => $usuario->id,
    ]);
    $pee = PlanoEntregaEntrega::factory()->create([
        'plano_entrega_id' => $planoEntrega->id,
        'entrega_id' => $entregaCat->id,
        'unidade_id' => $unidade->id,
    ]);
    $entrega = PlanoTrabalhoEntrega::factory()->create([
        'plano_trabalho_id' => $plano->id,
        'plano_entrega_entrega_id' => $pee->id,
        'forca_trabalho' => $esforco,
        'esforco_executado' => $esforco,
    ]);
    $consolidacao = PlanoTrabalhoConsolidacao::create([
        'plano_trabalho_id' => $plano->id,
        'data_inicio' => '2025-01-01',
        'data_fim' => '2025-01-31',
        'status' => 'INCLUIDO',
    ]);

    return compact('plano', 'entrega', 'consolidacao', 'usuario', 'unidade');
}

test('backfill cria linha-espelho por consolidação x entrega copiando esforco_executado', function () {
    ['entrega' => $entrega, 'consolidacao' => $consolidacao] = cenarioBackfill(40.0);

    rodarBackfill();

    $contrib = PlanoTrabalhoConsolidacaoContribuicao::where('plano_trabalho_consolidacao_id', $consolidacao->id)->get();

    expect($contrib)->toHaveCount(1);
    expect((float) $contrib->first()->esforco_executado)->toBe(40.0);
    expect($contrib->first()->plano_trabalho_entrega_id)->toBe($entrega->id);
    expect($contrib->first()->registrado_at)->toBeNull();
    expect($contrib->first()->descricao)->toBeNull();
});

test('backfill casa descricao e registrado_at via atividade do período', function () {
    $c = cenarioBackfill(100.0);
    $atividade = Atividade::create([
        'descricao' => 'Trabalho realizado no período',
        'plano_trabalho_id' => $c['plano']->id,
        'plano_trabalho_entrega_id' => $c['entrega']->id,
        'plano_trabalho_consolidacao_id' => $c['consolidacao']->id,
        'unidade_id' => $c['unidade']->id,
        'demandante_id' => $c['usuario']->id,
        'usuario_id' => $c['usuario']->id,
        'data_distribuicao' => now(),
        'data_estipulada_entrega' => now(),
        'tempo_planejado' => 0,
        'esforco' => 0,
    ]);

    rodarBackfill();

    $contrib = PlanoTrabalhoConsolidacaoContribuicao::where('plano_trabalho_consolidacao_id', $c['consolidacao']->id)->first();

    expect($contrib->descricao)->toBe('Trabalho realizado no período');
    expect($contrib->registrado_at)->not->toBeNull();
});

test('backfill é idempotente: segunda execução não duplica', function () {
    ['consolidacao' => $consolidacao] = cenarioBackfill(50.0);

    rodarBackfill();
    rodarBackfill();

    expect(PlanoTrabalhoConsolidacaoContribuicao::where('plano_trabalho_consolidacao_id', $consolidacao->id)->count())->toBe(1);
});

test('backfill não remove nem altera o planejamento', function () {
    ['entrega' => $entrega] = cenarioBackfill(60.0);

    rodarBackfill();

    $entrega->refresh();
    expect((float) $entrega->forca_trabalho)->toBe(60.0);
    expect(DB::table('planos_trabalhos_entregas')->where('id', $entrega->id)->exists())->toBeTrue();
});
