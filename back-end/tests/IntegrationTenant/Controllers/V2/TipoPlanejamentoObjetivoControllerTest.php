<?php

namespace Tests\IntegrationTenant\Controllers\V2;

use App\Enums\PerfilEnum;
use App\Models\Perfil;
use App\Models\TipoPlanejamentoObjetivo;
use App\Models\Usuario;
use App\V2\Planejamento\TipoObjetivo\TipoPlanejamentoObjetivoController;
use Illuminate\Support\Facades\Route;

beforeEach(function () {
    if (!Route::has('__tests.v2.tipo-objetivo.index')) {
        Route::middleware(['api'])->group(function () {
            Route::get('/api/__tests/v2/planejamento/tipo-objetivo', [TipoPlanejamentoObjetivoController::class, 'index'])
                ->name('__tests.v2.tipo-objetivo.index');
            Route::post('/api/__tests/v2/planejamento/tipo-objetivo', [TipoPlanejamentoObjetivoController::class, 'store'])
                ->name('__tests.v2.tipo-objetivo.store');
            Route::put('/api/__tests/v2/planejamento/tipo-objetivo/{id}', [TipoPlanejamentoObjetivoController::class, 'update'])
                ->name('__tests.v2.tipo-objetivo.update');
            Route::delete('/api/__tests/v2/planejamento/tipo-objetivo/{id}', [TipoPlanejamentoObjetivoController::class, 'destroy'])
                ->name('__tests.v2.tipo-objetivo.destroy');
        });
    }

    $perfilAdmMaster = Perfil::factory()->create(['nivel' => PerfilEnum::ADMINISTRADOR_MASTER->value]);
    $perfilParticipante = Perfil::factory()->create(['nivel' => PerfilEnum::PARTICIPANTE->value]);

    $this->admMaster = Usuario::factory()->create(['perfil_id' => $perfilAdmMaster->id]);
    $this->participante = Usuario::factory()->create(['perfil_id' => $perfilParticipante->id]);
});

// ── GET index ──────────────────────────────────────────────────────

describe('GET /api/v2/planejamento/tipo-objetivo', function () {
    test('retorna 200 com lista vazia quando não há registros', function () {
        $this->actingAs($this->participante, 'web');

        $this->getJson('/api/__tests/v2/planejamento/tipo-objetivo')
            ->assertStatus(200)
            ->assertJsonPath('success', true)
            ->assertJsonPath('data', []);
    });

    test('retorna tipos cadastrados ordenados por nome', function () {
        TipoPlanejamentoObjetivo::create(['nome' => 'Zebra', 'descricao' => null, 'estrutura' => 'planejamento_institucional']);
        TipoPlanejamentoObjetivo::create(['nome' => 'Alpha', 'descricao' => null, 'estrutura' => 'cadeia_de_valor']);

        $this->actingAs($this->participante, 'web');

        $data = $this->getJson('/api/__tests/v2/planejamento/tipo-objetivo')->json('data');

        expect($data[0]['nome'])->toBe('Alpha')
            ->and($data[1]['nome'])->toBe('Zebra');
    });

    test('retorna apenas tipos da estrutura filtrada', function () {
        TipoPlanejamentoObjetivo::create(['nome' => 'PI Item', 'descricao' => null, 'estrutura' => 'planejamento_institucional']);
        TipoPlanejamentoObjetivo::create(['nome' => 'CV Item', 'descricao' => null, 'estrutura' => 'cadeia_de_valor']);

        $this->actingAs($this->participante, 'web');

        $data = $this->getJson('/api/__tests/v2/planejamento/tipo-objetivo?estrutura=cadeia_de_valor')->json('data');

        expect($data)->toHaveCount(1)
            ->and($data[0]['nome'])->toBe('CV Item');
    });

    test('retorna todos os tipos quando estrutura não é informada', function () {
        TipoPlanejamentoObjetivo::create(['nome' => 'PI', 'descricao' => null, 'estrutura' => 'planejamento_institucional']);
        TipoPlanejamentoObjetivo::create(['nome' => 'CV', 'descricao' => null, 'estrutura' => 'cadeia_de_valor']);

        $this->actingAs($this->participante, 'web');

        $data = $this->getJson('/api/__tests/v2/planejamento/tipo-objetivo')->json('data');

        expect($data)->toHaveCount(2);
    });

    test('retorna 422 quando estrutura é inválida', function () {
        $this->actingAs($this->participante, 'web');

        $this->getJson('/api/__tests/v2/planejamento/tipo-objetivo?estrutura=invalida')
            ->assertStatus(422);
    });
});

// ── POST store ──────────────────────────────────────────────────────

describe('POST /api/v2/planejamento/tipo-objetivo', function () {
    test('ADM_MASTER cria tipo e retorna 201', function () {
        $this->actingAs($this->admMaster, 'web');

        $response = $this->postJson('/api/__tests/v2/planejamento/tipo-objetivo', [
            'nome' => 'Estratégico',
            'descricao' => 'Objetivo estratégico',
            'estrutura' => 'planejamento_institucional',
        ]);

        $response->assertStatus(201)
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.nome', 'Estratégico')
            ->assertJsonPath('data.estrutura', 'planejamento_institucional');

        $this->assertDatabaseHas('planejamentos_tipos_objetivos', ['nome' => 'Estratégico', 'estrutura' => 'planejamento_institucional']);
    });

    test('retorna 422 quando nome ausente', function () {
        $this->actingAs($this->admMaster, 'web');

        $this->postJson('/api/__tests/v2/planejamento/tipo-objetivo', ['estrutura' => 'planejamento_institucional'])
            ->assertStatus(422);
    });

    test('retorna 422 quando estrutura ausente', function () {
        $this->actingAs($this->admMaster, 'web');

        $this->postJson('/api/__tests/v2/planejamento/tipo-objetivo', ['nome' => 'Teste'])
            ->assertStatus(422);
    });

    test('retorna 422 quando estrutura inválida', function () {
        $this->actingAs($this->admMaster, 'web');

        $this->postJson('/api/__tests/v2/planejamento/tipo-objetivo', ['nome' => 'Teste', 'estrutura' => 'invalida'])
            ->assertStatus(422);
    });

    test('participante recebe 403', function () {
        $this->actingAs($this->participante, 'web');

        $this->postJson('/api/__tests/v2/planejamento/tipo-objetivo', ['nome' => 'X', 'estrutura' => 'planejamento_institucional'])
            ->assertStatus(403);
    });
});

// ── PUT update ──────────────────────────────────────────────────────

describe('PUT /api/v2/planejamento/tipo-objetivo/:id', function () {
    test('ADM_MASTER atualiza tipo', function () {
        $tipo = TipoPlanejamentoObjetivo::create(['nome' => 'Original', 'descricao' => null, 'estrutura' => 'planejamento_institucional']);

        $this->actingAs($this->admMaster, 'web');

        $this->putJson("/api/__tests/v2/planejamento/tipo-objetivo/{$tipo->id}", ['nome' => 'Atualizado'])
            ->assertStatus(200)
            ->assertJsonPath('data.nome', 'Atualizado');

        $this->assertDatabaseHas('planejamentos_tipos_objetivos', ['id' => $tipo->id, 'nome' => 'Atualizado']);
    });

    test('retorna 404 quando tipo não existe', function () {
        $this->actingAs($this->admMaster, 'web');

        $this->putJson('/api/__tests/v2/planejamento/tipo-objetivo/' . fake()->uuid(), ['nome' => 'X'])
            ->assertStatus(404);
    });

    test('participante recebe 403', function () {
        $tipo = TipoPlanejamentoObjetivo::create(['nome' => 'Original', 'descricao' => null, 'estrutura' => 'planejamento_institucional']);

        $this->actingAs($this->participante, 'web');

        $this->putJson("/api/__tests/v2/planejamento/tipo-objetivo/{$tipo->id}", ['nome' => 'X'])
            ->assertStatus(403);
    });
});

// ── DELETE destroy ──────────────────────────────────────────────────

describe('DELETE /api/v2/planejamento/tipo-objetivo/:id', function () {
    test('ADM_MASTER deleta tipo', function () {
        $tipo = TipoPlanejamentoObjetivo::create(['nome' => 'Para deletar', 'descricao' => null, 'estrutura' => 'cadeia_de_valor']);

        $this->actingAs($this->admMaster, 'web');

        $this->deleteJson("/api/__tests/v2/planejamento/tipo-objetivo/{$tipo->id}")
            ->assertStatus(204);

        $this->assertSoftDeleted('planejamentos_tipos_objetivos', ['id' => $tipo->id]);
    });

    test('retorna 404 quando tipo não existe', function () {
        $this->actingAs($this->admMaster, 'web');

        $this->deleteJson('/api/__tests/v2/planejamento/tipo-objetivo/' . fake()->uuid())
            ->assertStatus(404);
    });

    test('participante recebe 403', function () {
        $tipo = TipoPlanejamentoObjetivo::create(['nome' => 'Protegido', 'descricao' => null, 'estrutura' => 'planejamento_institucional']);

        $this->actingAs($this->participante, 'web');

        $this->deleteJson("/api/__tests/v2/planejamento/tipo-objetivo/{$tipo->id}")
            ->assertStatus(403);
    });
});
