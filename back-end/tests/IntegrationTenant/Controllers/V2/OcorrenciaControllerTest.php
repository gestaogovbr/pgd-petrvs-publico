<?php

namespace Tests\IntegrationTenant\Controllers\V2;

use App\V2\Ocorrencia\OcorrenciaController;
use App\Models\Afastamento;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\PlanoTrabalhoConsolidacaoAfastamento;
use App\Models\TipoMotivoAfastamento;
use App\Models\Usuario;
use Illuminate\Support\Facades\Route;

beforeEach(function () {
    if (!Route::has('__tests.v2.ocorrencia.store')) {
        Route::middleware(['api'])->post('/api/__tests/v2/ocorrencia', [OcorrenciaController::class, 'store'])
            ->name('__tests.v2.ocorrencia.store');
    }
    if (!Route::has('__tests.v2.ocorrencia.update')) {
        Route::middleware(['api'])->put('/api/__tests/v2/ocorrencia/{ocorrenciaId}', [OcorrenciaController::class, 'update'])
            ->name('__tests.v2.ocorrencia.update');
    }
    if (!Route::has('__tests.v2.ocorrencia.destroy')) {
        Route::middleware(['api'])->delete('/api/__tests/v2/ocorrencia/{ocorrenciaId}', [OcorrenciaController::class, 'destroy'])
            ->name('__tests.v2.ocorrencia.destroy');
    }
    if (!Route::has('__tests.v2.ocorrencia.index')) {
        Route::middleware(['api'])->get('/api/__tests/v2/ocorrencia', [OcorrenciaController::class, 'index'])
            ->name('__tests.v2.ocorrencia.index');
    }

    $this->usuario = Usuario::factory()->create();
    $this->actingAs($this->usuario);

    $this->tipoMotivo = TipoMotivoAfastamento::firstOrCreate(
        ['nome' => 'Licença Médica'],
        ['codigo' => 'LM', 'sigla' => 'LM', 'calculo' => 'DECRESCIMO', 'data_inicio' => now(), 'situacao' => 'ATIVO', 'icone' => 'bi bi-heart-pulse', 'cor' => '#FF0000', 'horas' => 0, 'integracao' => 0]
    );

    $this->plano = PlanoTrabalho::factory()->ativo()->create([
        'usuario_id' => $this->usuario->id,
        'data_inicio' => '2025-01-01',
        'data_fim' => '2025-06-30',
    ]);

    PlanoTrabalhoConsolidacao::factory()->create([
        'plano_trabalho_id' => $this->plano->id,
        'data_inicio' => '2025-01-01',
        'data_fim' => '2025-01-31',
    ]);
});

function validPayload($ctx): array
{
    return [
        'usuario_id' => $ctx->usuario->id,
        'observacoes' => 'Consulta médica',
        'data_inicio' => '2025-01-10',
        'data_fim' => '2025-01-15',
        'tipo_motivo_afastamento_id' => $ctx->tipoMotivo->id,
    ];
}

// ── POST store ──────────────────────────────────────────────────────

describe('POST /api/v2/ocorrencia (validação)', function () {

    test('retorna 422 quando campos obrigatórios ausentes', function () {
        $this->postJson('/api/__tests/v2/ocorrencia', [])
            ->assertStatus(422);
    });

    test('retorna 422 quando data_fim anterior a data_inicio', function () {
        $payload = validPayload($this);
        $payload['data_inicio'] = '2025-01-15';
        $payload['data_fim'] = '2025-01-10';

        $this->postJson('/api/__tests/v2/ocorrencia', $payload)
            ->assertStatus(422);
    });
});

describe('POST /api/v2/ocorrencia (happy path)', function () {

    test('cria ocorrência e retorna 201', function () {
        $response = $this->postJson('/api/__tests/v2/ocorrencia', validPayload($this));

        $response->assertStatus(201)
            ->assertJsonPath('success', true);

        $data = $response->json('data');
        expect($data)->toHaveKeys(['id', 'observacoes', 'data_inicio', 'data_fim', 'tipo_motivo_afastamento']);
        expect($data['observacoes'])->toBe('Consulta médica');
    });

    test('vincula ocorrência às consolidações interceptadas', function () {
        $response = $this->postJson('/api/__tests/v2/ocorrencia', validPayload($this));

        $afastamentoId = $response->json('data.id');

        $vinculos = PlanoTrabalhoConsolidacaoAfastamento::where('afastamento_id', $afastamentoId)->count();
        expect($vinculos)->toBeGreaterThan(0);
    });

    test('persiste no banco com usuario_id correto', function () {
        $this->postJson('/api/__tests/v2/ocorrencia', validPayload($this));

        $this->assertDatabaseHas('afastamentos', [
            'usuario_id' => $this->usuario->id,
            'observacoes' => 'Consulta médica',
        ]);
    });
});

// ── PUT update ──────────────────────────────────────────────────────

describe('PUT /api/v2/ocorrencia/:id (happy path)', function () {

    test('atualiza observações da ocorrência', function () {
        $afastamentoId = $this->postJson('/api/__tests/v2/ocorrencia', validPayload($this))->json('data.id');

        $response = $this->putJson("/api/__tests/v2/ocorrencia/{$afastamentoId}", [
            'usuario_id' => $this->usuario->id,
            'observacoes' => 'Atualizado',
        ]);

        $response->assertStatus(200)
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.observacoes', 'Atualizado');
    });

    test('recria vínculos com consolidações ao alterar período', function () {
        $afastamentoId = $this->postJson('/api/__tests/v2/ocorrencia', validPayload($this))->json('data.id');

        $this->putJson("/api/__tests/v2/ocorrencia/{$afastamentoId}", [
            'usuario_id' => $this->usuario->id,
            'data_inicio' => '2025-02-01',
            'data_fim' => '2025-02-15',
        ])->assertStatus(200);

        // Vínculos antigos (janeiro) removidos, novos para fevereiro criados ou nenhum se não há consolidação
        $vinculos = PlanoTrabalhoConsolidacaoAfastamento::where('afastamento_id', $afastamentoId)->get();
        // Consolidação é jan, novo período é fev → sem vínculo
        expect($vinculos->count())->toBe(0);
    });
});

// ── DELETE destroy ──────────────────────────────────────────────────

describe('DELETE /api/v2/ocorrencia/:id', function () {

    test('remove ocorrência e vínculos com consolidações', function () {
        $afastamentoId = $this->postJson('/api/__tests/v2/ocorrencia', validPayload($this))->json('data.id');

        $this->deleteJson("/api/__tests/v2/ocorrencia/{$afastamentoId}", [
            'usuario_id' => $this->usuario->id,
        ])->assertStatus(204);

        $this->assertDatabaseMissing('afastamentos', ['id' => $afastamentoId, 'deleted_at' => null]);
        expect(PlanoTrabalhoConsolidacaoAfastamento::where('afastamento_id', $afastamentoId)->count())->toBe(0);
    });

    test('retorna 404 quando ocorrência não encontrada', function () {
        $this->deleteJson('/api/__tests/v2/ocorrencia/' . fake()->uuid(), [
            'usuario_id' => $this->usuario->id,
        ])->assertStatus(404);
    });
});

// ── GET index ───────────────────────────────────────────────────────

describe('GET /api/v2/ocorrencia', function () {

    test('retorna listagem paginada', function () {
        $this->postJson('/api/__tests/v2/ocorrencia', validPayload($this));

        $response = $this->getJson('/api/__tests/v2/ocorrencia?page=1&size=15');

        $response->assertStatus(200)
            ->assertJsonPath('success', true)
            ->assertJsonStructure(['data' => ['data', 'current_page', 'last_page', 'total']]);

        expect($response->json('data.data'))->not->toBeEmpty();
    });
});

// ── GET agentes ─────────────────────────────────────────────────────

describe('GET /api/v2/ocorrencia/agentes', function () {

    beforeEach(function () {
        if (!Route::has('__tests.v2.ocorrencia.agentes')) {
            Route::middleware(['api'])->get('/api/__tests/v2/ocorrencia/agentes', [OcorrenciaController::class, 'agentes'])
                ->name('__tests.v2.ocorrencia.agentes');
        }
    });

    test('retorna ao menos o próprio usuário', function () {
        $response = $this->getJson('/api/__tests/v2/ocorrencia/agentes');

        $response->assertStatus(200)
            ->assertJsonPath('success', true);

        $agentes = $response->json('data');
        expect($agentes)->not->toBeEmpty();
        expect(collect($agentes)->pluck('id')->toArray())->toContain($this->usuario->id);
    });
});
