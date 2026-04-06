<?php

namespace Tests\IntegrationTenant\Controllers\V2;

use App\V2\PlanoTrabalho\Consolidacao\ConsolidacaoController;
use App\V2\PlanoTrabalho\Documento\DocumentoController;
use App\Models\Entrega;
use App\Models\Perfil;
use App\Models\PlanoEntrega;
use App\Models\PlanoEntregaEntrega;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoEntrega;
use App\Models\Programa;
use App\Models\Template;
use App\Models\TipoModalidade;
use App\Models\Unidade;
use App\Models\Usuario;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Session;

beforeEach(function () {
    if (!Route::has('__tests.v2.consolidacao.index')) {
        Route::middleware(['api'])->get(
            '/api/__tests/v2/plano-trabalho/{planoTrabalhoId}/consolidacao',
            [ConsolidacaoController::class, 'index']
        )->name('__tests.v2.consolidacao.index');
    }

    if (!Route::has('__tests.v2.documento.store')) {
        Route::middleware(['api'])->post(
            '/api/__tests/v2/plano-trabalho/{planoTrabalhoId}/documento',
            [DocumentoController::class, 'store']
        )->name('__tests.v2.documento.store');
    }

    if (!Route::has('__tests.v2.documento.assinar')) {
        Route::middleware(['api'])->post(
            '/api/__tests/v2/plano-trabalho/{planoTrabalhoId}/documento/assinatura-tcr',
            [DocumentoController::class, 'assinar']
        )->name('__tests.v2.documento.assinar');
    }

    $perfil = Perfil::factory()->create(['nivel' => 3]);
    $tipoModalidade = TipoModalidade::factory()->create();
    $this->unidade = Unidade::factory()->create();
    $this->usuario = Usuario::factory()->create([
        'perfil_id' => $perfil->id,
        'tipo_modalidade_id' => $tipoModalidade->id,
    ]);

    $template = Template::factory()->create();

    $this->programa = Programa::factory()->create([
        'data_inicio' => '2024-01-01',
        'data_fim' => '2026-12-31',
        'template_tcr_id' => $template->id,
    ]);

    $this->plano = PlanoTrabalho::factory()->create([
        'usuario_id' => $this->usuario->id,
        'unidade_id' => $this->unidade->id,
        'tipo_modalidade_id' => $tipoModalidade->id,
        'criacao_usuario_id' => $this->usuario->id,
        'programa_id' => $this->programa->id,
        'data_inicio' => '2025-01-01',
        'data_fim' => '2025-06-30',
        'status' => 'INCLUIDO',
    ]);

    $entregaCatalogo = Entrega::factory()->create(['unidade_id' => $this->unidade->id]);
    $planoEntrega = PlanoEntrega::factory()->create([
        'unidade_id' => $this->unidade->id,
        'programa_id' => $this->programa->id,
        'criacao_usuario_id' => $this->usuario->id,
    ]);
    $planoEntregaEntrega = PlanoEntregaEntrega::factory()->create([
        'plano_entrega_id' => $planoEntrega->id,
        'entrega_id' => $entregaCatalogo->id,
        'unidade_id' => $this->unidade->id,
    ]);

    PlanoTrabalhoEntrega::factory()->create([
        'plano_trabalho_id' => $this->plano->id,
        'plano_entrega_entrega_id' => $planoEntregaEntrega->id,
    ]);

    Session::put('entidade_id', $this->unidade->entidade_id);
});

function ativarPlano($context): void
{
    $context->postJson("/api/__tests/v2/plano-trabalho/{$context->plano->id}/documento");
    $context->postJson("/api/__tests/v2/plano-trabalho/{$context->plano->id}/documento/assinatura-tcr");
}

// ── GET consolidacao ────────────────────────────────────────────────

describe('GET /api/v2/plano-trabalho/:id/consolidacao', function () {

    test('retorna 404 quando plano não encontrado', function () {
        $this->actingAs($this->usuario, 'web');

        $this->getJson('/api/__tests/v2/plano-trabalho/' . fake()->uuid() . '/consolidacao')
            ->assertStatus(404);
    });

    test('retorna lista vazia quando plano não está ativo', function () {
        $this->actingAs($this->usuario, 'web');

        $response = $this->getJson("/api/__tests/v2/plano-trabalho/{$this->plano->id}/consolidacao");

        $response->assertStatus(200)
            ->assertJsonPath('success', true);

        expect($response->json('data'))->toBeEmpty();
    });

    test('retorna consolidações após ativação do plano', function () {
        $this->actingAs($this->usuario, 'web');

        ativarPlano($this);

        $response = $this->getJson("/api/__tests/v2/plano-trabalho/{$this->plano->id}/consolidacao");

        $response->assertStatus(200)
            ->assertJsonPath('success', true);

        $data = $response->json('data');

        expect($data)->not->toBeEmpty();
        expect($data[0])->toHaveKeys(['id', 'data_inicio', 'data_fim', 'status', 'plano_trabalho_id']);
    });

    test('consolidações estão ordenadas por data_inicio', function () {
        $this->actingAs($this->usuario, 'web');

        ativarPlano($this);

        $data = $this->getJson("/api/__tests/v2/plano-trabalho/{$this->plano->id}/consolidacao")
            ->json('data');

        for ($i = 1; $i < count($data); $i++) {
            expect($data[$i]['data_inicio'] > $data[$i - 1]['data_inicio'])->toBeTrue();
        }
    });

    test('todas as consolidações têm status INCLUIDO após ativação', function () {
        $this->actingAs($this->usuario, 'web');

        ativarPlano($this);

        $data = $this->getJson("/api/__tests/v2/plano-trabalho/{$this->plano->id}/consolidacao")
            ->json('data');

        foreach ($data as $consolidacao) {
            expect($consolidacao['status'])->toBe('INCLUIDO');
        }
    });

    test('retorna 6 períodos para plano de janeiro a junho com periodicidade mensal', function () {
        $this->actingAs($this->usuario, 'web');

        ativarPlano($this);

        $data = $this->getJson("/api/__tests/v2/plano-trabalho/{$this->plano->id}/consolidacao")
            ->json('data');

        expect($data)->toHaveCount(6);
        expect($data[0]['data_inicio'])->toBe('2025-01-01');
        expect($data[5]['data_fim'])->toBe('2025-06-30');
    });
});
