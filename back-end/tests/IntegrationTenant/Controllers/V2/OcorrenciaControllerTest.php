<?php

namespace Tests\IntegrationTenant\Controllers\V2;

use App\V2\PlanoTrabalho\Ocorrencia\OcorrenciaController;
use App\V2\PlanoTrabalho\Documento\DocumentoController;
use App\Models\Afastamento;
use App\Models\Entrega;
use App\Models\Perfil;
use App\Models\PlanoEntrega;
use App\Models\PlanoEntregaEntrega;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacaoAfastamento;
use App\Models\PlanoTrabalhoEntrega;
use App\Models\Programa;
use App\Models\Template;
use App\Models\TipoModalidade;
use App\Models\TipoMotivoAfastamento;
use App\Models\Unidade;
use App\Models\Usuario;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Session;

beforeEach(function () {
    if (!Route::has('__tests.v2.ocorrencia.store')) {
        Route::middleware(['api'])->post(
            '/api/__tests/v2/plano-trabalho/{planoTrabalhoId}/ocorrencia',
            [OcorrenciaController::class, 'store']
        )->name('__tests.v2.ocorrencia.store');
    }

    if (!Route::has('__tests.v2.ocorrencia.update')) {
        Route::middleware(['api'])->patch(
            '/api/__tests/v2/plano-trabalho/{planoTrabalhoId}/ocorrencia/{ocorrenciaId}',
            [OcorrenciaController::class, 'update']
        )->name('__tests.v2.ocorrencia.update');
    }

    if (!Route::has('__tests.v2.ocorrencia.destroy')) {
        Route::middleware(['api'])->delete(
            '/api/__tests/v2/plano-trabalho/{planoTrabalhoId}/ocorrencia/{ocorrenciaId}',
            [OcorrenciaController::class, 'destroy']
        )->name('__tests.v2.ocorrencia.destroy');
    }

    if (!Route::has('__tests.v2.ocorrencia.documento.store')) {
        Route::middleware(['api'])->post(
            '/api/__tests/v2/plano-trabalho/{planoTrabalhoId}/documento',
            [DocumentoController::class, 'store']
        )->name('__tests.v2.ocorrencia.documento.store');
    }

    if (!Route::has('__tests.v2.ocorrencia.documento.assinar')) {
        Route::middleware(['api'])->post(
            '/api/__tests/v2/plano-trabalho/{planoTrabalhoId}/documento/assinatura-tcr',
            [DocumentoController::class, 'assinar']
        )->name('__tests.v2.ocorrencia.documento.assinar');
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
        'forca_trabalho' => 100,
    ]);

    $this->tipoMotivo = TipoMotivoAfastamento::firstOrCreate(
        ['nome' => 'Licença Médica'],
        ['codigo' => 'LM', 'sigla' => 'LM', 'calculo' => 'DECRESCIMO', 'data_inicio' => now(), 'situacao' => 'ATIVO', 'icone' => 'bi bi-heart-pulse', 'cor' => '#FF0000', 'horas' => 0, 'integracao' => 0]
    );

    Session::put('entidade_id', $this->unidade->entidade_id);
});

function ativarPlanoOcorrencia($ctx): void
{
    $ctx->postJson("/api/__tests/v2/plano-trabalho/{$ctx->plano->id}/documento");
    $ctx->postJson("/api/__tests/v2/plano-trabalho/{$ctx->plano->id}/documento/assinatura-tcr");
    $ctx->plano->refresh();
}

function validOcorrenciaPayload($ctx): array
{
    return [
        'observacoes' => 'Consulta médica',
        'data_inicio' => '2025-01-10',
        'data_fim' => '2025-01-15',
        'tipo_motivo_afastamento_id' => $ctx->tipoMotivo->id,
    ];
}

// ── POST store ──────────────────────────────────────────────────────

describe('POST /api/v2/plano-trabalho/:id/ocorrencia (validação)', function () {

    test('retorna 422 quando campos obrigatórios ausentes', function () {
        $this->actingAs($this->usuario, 'web');
        ativarPlanoOcorrencia($this);

        $this->postJson("/api/__tests/v2/plano-trabalho/{$this->plano->id}/ocorrencia", [])
            ->assertStatus(422);
    });

    test('retorna 404 quando plano não encontrado', function () {
        $this->actingAs($this->usuario, 'web');

        $this->postJson('/api/__tests/v2/plano-trabalho/' . fake()->uuid() . '/ocorrencia', validOcorrenciaPayload($this))
            ->assertStatus(404);
    });

    test('retorna 422 quando período fora da vigência do plano', function () {
        $this->actingAs($this->usuario, 'web');
        ativarPlanoOcorrencia($this);

        $payload = validOcorrenciaPayload($this);
        $payload['data_inicio'] = '2026-01-01';
        $payload['data_fim'] = '2026-01-15';

        $this->postJson("/api/__tests/v2/plano-trabalho/{$this->plano->id}/ocorrencia", $payload)
            ->assertStatus(422);
    });
});

describe('POST /api/v2/plano-trabalho/:id/ocorrencia (happy path)', function () {

    test('cria ocorrência e retorna 201', function () {
        $this->actingAs($this->usuario, 'web');
        ativarPlanoOcorrencia($this);

        $response = $this->postJson(
            "/api/__tests/v2/plano-trabalho/{$this->plano->id}/ocorrencia",
            validOcorrenciaPayload($this)
        );

        $response->assertStatus(201)
            ->assertJsonPath('success', true);

        $data = $response->json('data');
        expect($data)->toHaveKeys(['id', 'observacoes', 'data_inicio', 'data_fim', 'tipo_motivo_afastamento']);
        expect($data['observacoes'])->toBe('Consulta médica');
    });

    test('vincula ocorrência às consolidações do período', function () {
        $this->actingAs($this->usuario, 'web');
        ativarPlanoOcorrencia($this);

        $response = $this->postJson(
            "/api/__tests/v2/plano-trabalho/{$this->plano->id}/ocorrencia",
            validOcorrenciaPayload($this)
        );

        $afastamentoId = $response->json('data.id');

        $vinculos = PlanoTrabalhoConsolidacaoAfastamento::where('afastamento_id', $afastamentoId)->count();
        expect($vinculos)->toBeGreaterThan(0);
    });

    test('persiste no banco com usuario_id do dono do plano', function () {
        $this->actingAs($this->usuario, 'web');
        ativarPlanoOcorrencia($this);

        $this->postJson(
            "/api/__tests/v2/plano-trabalho/{$this->plano->id}/ocorrencia",
            validOcorrenciaPayload($this)
        );

        $this->assertDatabaseHas('afastamentos', [
            'usuario_id' => $this->usuario->id,
            'observacoes' => 'Consulta médica',
        ]);
    });
});

// ── PATCH update ────────────────────────────────────────────────────

describe('PATCH /api/v2/plano-trabalho/:id/ocorrencia/:oid (happy path)', function () {

    test('atualiza observações da ocorrência', function () {
        $this->actingAs($this->usuario, 'web');
        ativarPlanoOcorrencia($this);

        $afastamentoId = $this->postJson(
            "/api/__tests/v2/plano-trabalho/{$this->plano->id}/ocorrencia",
            validOcorrenciaPayload($this)
        )->json('data.id');

        $response = $this->patchJson(
            "/api/__tests/v2/plano-trabalho/{$this->plano->id}/ocorrencia/{$afastamentoId}",
            ['observacoes' => 'Atualizado']
        );

        $response->assertStatus(200)
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.observacoes', 'Atualizado');
    });

    test('atualiza snapshot nas consolidações vinculadas', function () {
        $this->actingAs($this->usuario, 'web');
        ativarPlanoOcorrencia($this);

        $afastamentoId = $this->postJson(
            "/api/__tests/v2/plano-trabalho/{$this->plano->id}/ocorrencia",
            validOcorrenciaPayload($this)
        )->json('data.id');

        $this->patchJson(
            "/api/__tests/v2/plano-trabalho/{$this->plano->id}/ocorrencia/{$afastamentoId}",
            ['observacoes' => 'Snapshot atualizado']
        )->assertStatus(200);

        $vinculo = PlanoTrabalhoConsolidacaoAfastamento::where('afastamento_id', $afastamentoId)->first();

        expect($vinculo->snapshot->observacoes)->toBe('Snapshot atualizado');
    });
});

// ── DELETE destroy ──────────────────────────────────────────────────

describe('DELETE /api/v2/plano-trabalho/:id/ocorrencia/:oid', function () {

    test('remove ocorrência e vínculos com consolidações', function () {
        $this->actingAs($this->usuario, 'web');
        ativarPlanoOcorrencia($this);

        $afastamentoId = $this->postJson(
            "/api/__tests/v2/plano-trabalho/{$this->plano->id}/ocorrencia",
            validOcorrenciaPayload($this)
        )->json('data.id');

        $this->deleteJson("/api/__tests/v2/plano-trabalho/{$this->plano->id}/ocorrencia/{$afastamentoId}")
            ->assertStatus(204);

        $this->assertDatabaseMissing('afastamentos', ['id' => $afastamentoId, 'deleted_at' => null]);
        expect(PlanoTrabalhoConsolidacaoAfastamento::where('afastamento_id', $afastamentoId)->count())->toBe(0);
    });

    test('retorna 404 quando ocorrência não encontrada', function () {
        $this->actingAs($this->usuario, 'web');
        ativarPlanoOcorrencia($this);

        $this->deleteJson("/api/__tests/v2/plano-trabalho/{$this->plano->id}/ocorrencia/" . fake()->uuid())
            ->assertStatus(404);
    });
});
