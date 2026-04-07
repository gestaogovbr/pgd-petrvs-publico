<?php

namespace Tests\IntegrationTenant\Controllers\V2;

use App\V2\PlanoTrabalho\Consolidacao\Atividade\AtividadeController;
use App\V2\PlanoTrabalho\Consolidacao\PlanoTrabalhoConsolidacaoController;
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
    if (!Route::has('__tests.v2.atividade.store')) {
        Route::middleware(['api'])->post(
            '/api/__tests/v2/plano-trabalho/{planoTrabalhoId}/consolidacao/{consolidacaoId}/atividade',
            [AtividadeController::class, 'store']
        )->name('__tests.v2.atividade.store');

        Route::middleware(['api'])->put(
            '/api/__tests/v2/plano-trabalho/{planoTrabalhoId}/consolidacao/{consolidacaoId}/atividade/{atividadeId}',
            [AtividadeController::class, 'update']
        )->name('__tests.v2.atividade.update');

        Route::middleware(['api'])->delete(
            '/api/__tests/v2/plano-trabalho/{planoTrabalhoId}/consolidacao/{consolidacaoId}/atividade/{atividadeId}',
            [AtividadeController::class, 'destroy']
        )->name('__tests.v2.atividade.destroy');
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

    if (!Route::has('__tests.v2.consolidacao.index')) {
        Route::middleware(['api'])->get(
            '/api/__tests/v2/plano-trabalho/{planoTrabalhoId}/consolidacao',
            [PlanoTrabalhoConsolidacaoController::class, 'index']
        )->name('__tests.v2.consolidacao.index');
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

    $this->entrega = PlanoTrabalhoEntrega::factory()->create([
        'plano_trabalho_id' => $this->plano->id,
        'plano_entrega_entrega_id' => $planoEntregaEntrega->id,
    ]);

    Session::put('entidade_id', $this->unidade->entidade_id);
});

function ativarPlanoAtividade($context): string
{
    $context->postJson("/api/__tests/v2/plano-trabalho/{$context->plano->id}/documento")
        ->assertSuccessful();
    $context->postJson("/api/__tests/v2/plano-trabalho/{$context->plano->id}/documento/assinatura-tcr")
        ->assertSuccessful();

    $response = $context->getJson("/api/__tests/v2/plano-trabalho/{$context->plano->id}/consolidacao");
    $response->assertStatus(200);

    return $response->json('data.0.id');
}

// ── POST atividade ──────────────────────────────────────────────────

describe('POST /api/v2/plano-trabalho/:id/consolidacao/:cid/atividade', function () {

    test('cria registro de execução com sucesso', function () {
        $this->actingAs($this->usuario, 'web');
        $consolidacaoId = ativarPlanoAtividade($this);

        $response = $this->postJson(
            "/api/__tests/v2/plano-trabalho/{$this->plano->id}/consolidacao/{$consolidacaoId}/atividade",
            [
                'plano_trabalho_entrega_id' => $this->entrega->id,
                'descricao' => 'Trabalho executado na entrega',
            ]
        );

        $response->assertStatus(201)
            ->assertJsonPath('success', true);

        $this->assertDatabaseHas('atividades', [
            'plano_trabalho_consolidacao_id' => $consolidacaoId,
            'plano_trabalho_entrega_id' => $this->entrega->id,
            'descricao' => 'Trabalho executado na entrega',
        ]);
    });

    test('retorna 422 quando descricao ausente', function () {
        $this->actingAs($this->usuario, 'web');
        $consolidacaoId = ativarPlanoAtividade($this);

        $response = $this->postJson(
            "/api/__tests/v2/plano-trabalho/{$this->plano->id}/consolidacao/{$consolidacaoId}/atividade",
            ['plano_trabalho_entrega_id' => $this->entrega->id]
        );

        $response->assertStatus(422);
    });

    test('retorna 422 quando plano não está ativo', function () {
        $this->actingAs($this->usuario, 'web');

        $response = $this->postJson(
            "/api/__tests/v2/plano-trabalho/{$this->plano->id}/consolidacao/" . fake()->uuid() . "/atividade",
            [
                'plano_trabalho_entrega_id' => $this->entrega->id,
                'descricao' => 'Teste',
            ]
        );

        $response->assertStatus(422);
    });

    test('retorna 404 quando plano não existe', function () {
        $this->actingAs($this->usuario, 'web');

        $response = $this->postJson(
            "/api/__tests/v2/plano-trabalho/" . fake()->uuid() . "/consolidacao/" . fake()->uuid() . "/atividade",
            [
                'plano_trabalho_entrega_id' => $this->entrega->id,
                'descricao' => 'Teste',
            ]
        );

        $response->assertStatus(404);
    });

    test('retorna 422 quando entrega não pertence ao plano', function () {
        $this->actingAs($this->usuario, 'web');
        $consolidacaoId = ativarPlanoAtividade($this);

        $response = $this->postJson(
            "/api/__tests/v2/plano-trabalho/{$this->plano->id}/consolidacao/{$consolidacaoId}/atividade",
            [
                'plano_trabalho_entrega_id' => fake()->uuid(),
                'descricao' => 'Teste',
            ]
        );

        $response->assertStatus(422);
    });
});

// ── PUT atividade ───────────────────────────────────────────────────

describe('PUT /api/v2/plano-trabalho/:id/consolidacao/:cid/atividade/:aid', function () {

    test('atualiza descrição da atividade', function () {
        $this->actingAs($this->usuario, 'web');
        $consolidacaoId = ativarPlanoAtividade($this);

        $createResponse = $this->postJson(
            "/api/__tests/v2/plano-trabalho/{$this->plano->id}/consolidacao/{$consolidacaoId}/atividade",
            [
                'plano_trabalho_entrega_id' => $this->entrega->id,
                'descricao' => 'Original',
            ]
        );

        $atividadeId = $createResponse->json('data.id');

        $response = $this->putJson(
            "/api/__tests/v2/plano-trabalho/{$this->plano->id}/consolidacao/{$consolidacaoId}/atividade/{$atividadeId}",
            ['descricao' => 'Atualizado']
        );

        $response->assertStatus(200)
            ->assertJsonPath('success', true);

        $this->assertDatabaseHas('atividades', [
            'id' => $atividadeId,
            'descricao' => 'Atualizado',
        ]);
    });

    test('retorna 404 quando atividade não existe', function () {
        $this->actingAs($this->usuario, 'web');
        $consolidacaoId = ativarPlanoAtividade($this);

        $response = $this->putJson(
            "/api/__tests/v2/plano-trabalho/{$this->plano->id}/consolidacao/{$consolidacaoId}/atividade/" . fake()->uuid(),
            ['descricao' => 'Teste']
        );

        $response->assertStatus(404);
    });
});

// ── DELETE atividade ────────────────────────────────────────────────

describe('DELETE /api/v2/plano-trabalho/:id/consolidacao/:cid/atividade/:aid', function () {

    test('remove atividade com sucesso', function () {
        $this->actingAs($this->usuario, 'web');
        $consolidacaoId = ativarPlanoAtividade($this);

        $createResponse = $this->postJson(
            "/api/__tests/v2/plano-trabalho/{$this->plano->id}/consolidacao/{$consolidacaoId}/atividade",
            [
                'plano_trabalho_entrega_id' => $this->entrega->id,
                'descricao' => 'Para remover',
            ]
        );

        $atividadeId = $createResponse->json('data.id');

        $response = $this->deleteJson(
            "/api/__tests/v2/plano-trabalho/{$this->plano->id}/consolidacao/{$consolidacaoId}/atividade/{$atividadeId}"
        );

        $response->assertStatus(200)
            ->assertJsonPath('success', true);

        $this->assertSoftDeleted('atividades', [
            'id' => $atividadeId,
        ]);
    });

    test('retorna 404 quando atividade não existe no destroy', function () {
        $this->actingAs($this->usuario, 'web');
        $consolidacaoId = ativarPlanoAtividade($this);

        $response = $this->deleteJson(
            "/api/__tests/v2/plano-trabalho/{$this->plano->id}/consolidacao/{$consolidacaoId}/atividade/" . fake()->uuid()
        );

        $response->assertStatus(404);
    });
});
