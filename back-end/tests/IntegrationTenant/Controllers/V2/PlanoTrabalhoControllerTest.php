<?php

use App\V2\PlanoTrabalho\PlanoTrabalhoController;
use App\V2\PlanoTrabalho\PlanoTrabalhoService;
use App\Models\PlanoTrabalho;
use App\Models\Programa;
use App\Models\TipoModalidade;
use App\Models\Unidade;
use App\Models\Usuario;
use App\Models\Perfil;
use App\Exceptions\ServerException;
use Illuminate\Support\Facades\Route;
use Illuminate\Pagination\LengthAwarePaginator;
use Mockery;

beforeEach(function () {
    if (!Route::has('__tests.v2.plano-trabalho.index')) {
        Route::middleware(['api'])->get('/api/__tests/v2/plano-trabalho', [PlanoTrabalhoController::class, 'index'])
            ->name('__tests.v2.plano-trabalho.index');
    }
    if (!Route::has('__tests.v2.plano-trabalho.store')) {
        Route::middleware(['api'])->post('/api/__tests/v2/plano-trabalho', [PlanoTrabalhoController::class, 'store'])
            ->name('__tests.v2.plano-trabalho.store');
    }
    if (!Route::has('__tests.v2.plano-trabalho.show')) {
        Route::middleware(['api'])->get('/api/__tests/v2/plano-trabalho/{id}', [PlanoTrabalhoController::class, 'show'])
            ->name('__tests.v2.plano-trabalho.show');
    }
    if (!Route::has('__tests.v2.plano-trabalho.destroy')) {
        Route::middleware(['api'])->delete('/api/__tests/v2/plano-trabalho/{id}', [PlanoTrabalhoController::class, 'destroy'])
            ->name('__tests.v2.plano-trabalho.destroy');
    }

    $perfil = Perfil::factory()->create(['nivel' => 5]);
    $tipoModalidade = TipoModalidade::factory()->create();

    $this->unidade = Unidade::factory()->create();
    $this->usuario = Usuario::factory()->create([
        'perfil_id' => $perfil->id,
        'tipo_modalidade_id' => $tipoModalidade->id,
    ]);
    $this->programa = Programa::factory()->create([
        'data_inicio' => '2024-01-01',
        'data_fim' => '2025-12-31',
    ]);
    $this->tipoModalidadeId = $tipoModalidade->id;
});

afterEach(function () {
    Mockery::close();
});

function validStorePayload(): array
{
    return [
        'usuario_id' => fake()->uuid(),
        'unidade_id' => fake()->uuid(),
        'programa_id' => fake()->uuid(),
        'data_inicio' => '2025-01-01',
        'data_fim' => '2025-06-30',
        'tipo_modalidade_id' => fake()->uuid(),
    ];
}

// ── GET index: validação ────────────────────────────────────────────

describe('GET /api/v2/plano-trabalho (validação)', function () {

    test('retorna 200 com service mockado', function () {
        $this->actingAs($this->usuario, 'web');

        $this->mock(PlanoTrabalhoService::class, function ($mock) {
            $mock->shouldReceive('index')
                ->once()
                ->andReturn(new LengthAwarePaginator([], 0, 15));
        });

        $response = $this->getJson('/api/__tests/v2/plano-trabalho?' . http_build_query([
            'size' => 15,
            'page' => 1,
            'filters' => ['vigentes' => true],
        ]));

        $response->assertStatus(200)
            ->assertJsonPath('success', true);
    });

    test('retorna 400 quando size não é inteiro', function () {
        $this->actingAs($this->usuario, 'web');

        $this->getJson('/api/__tests/v2/plano-trabalho?size=abc')
            ->assertStatus(400);
    });

    test('retorna 400 quando page não é inteiro', function () {
        $this->actingAs($this->usuario, 'web');

        $this->getJson('/api/__tests/v2/plano-trabalho?page=abc')
            ->assertStatus(400);
    });

    test('retorna 400 quando filters.usuario_id não é uuid', function () {
        $this->actingAs($this->usuario, 'web');

        $this->getJson('/api/__tests/v2/plano-trabalho?' . http_build_query([
            'filters' => ['usuario_id' => 'nao-uuid'],
        ]))->assertStatus(400);
    });

    test('retorna 400 quando filters.data_inicio é data inválida', function () {
        $this->actingAs($this->usuario, 'web');

        $this->getJson('/api/__tests/v2/plano-trabalho?' . http_build_query([
            'filters' => ['data_inicio' => 'nao-data'],
        ]))->assertStatus(400);
    });

    test('retorna 400 quando service lança ServerException', function () {
        $this->actingAs($this->usuario, 'web');

        $this->mock(PlanoTrabalhoService::class, function ($mock) {
            $mock->shouldReceive('index')
                ->andThrow(new ServerException('ValidateFiltros', 'Informe ao menos um filtro para a busca.'));
        });

        $response = $this->getJson('/api/__tests/v2/plano-trabalho?' . http_build_query([
            'page' => 1,
            'size' => 15,
        ]));

        $response->assertStatus(400)
            ->assertJson(fn ($json) =>
                $json->where('error', fn ($error) => str_contains($error, 'Informe ao menos um filtro'))
            );
    });
});

// ── GET index: happy path (sem mock) ────────────────────────────────

describe('GET /api/v2/plano-trabalho (happy path)', function () {

    test('retorna plano filtrado por usuario_id', function () {
        $this->actingAs($this->usuario, 'web');

        $plano = PlanoTrabalho::factory()->create([
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'data_inicio' => '2024-01-01',
            'data_fim' => '2024-12-31',
        ]);

        $outroUsuario = Usuario::factory()->create();
        PlanoTrabalho::factory()->create([
            'usuario_id' => $outroUsuario->id,
            'unidade_id' => $this->unidade->id,
            'tipo_modalidade_id' => $this->tipoModalidadeId,
        ]);

        $response = $this->getJson('/api/__tests/v2/plano-trabalho?' . http_build_query([
            'filters' => ['usuario_id' => $this->usuario->id],
        ]));

        $response->assertStatus(200)
            ->assertJsonPath('success', true);

        $items = $response->json('data.data');

        expect($items)->toHaveCount(1)
            ->and($items[0]['id'])->toBe($plano->id);
    });

    test('retorna apenas planos vigentes', function () {
        $this->actingAs($this->usuario, 'web');

        $vigente = PlanoTrabalho::factory()->create([
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'data_inicio' => now()->subMonth(),
            'data_fim' => now()->addMonth(),
        ]);

        PlanoTrabalho::factory()->create([
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'data_inicio' => now()->subYear(),
            'data_fim' => now()->subMonths(6),
        ]);

        $response = $this->getJson('/api/__tests/v2/plano-trabalho?' . http_build_query([
            'filters' => ['vigentes' => true],
        ]));

        $items = $response->json('data.data');

        expect($items)->toHaveCount(1)
            ->and($items[0]['id'])->toBe($vigente->id);
    });

    test('retorna planos dentro do intervalo de datas', function () {
        $this->actingAs($this->usuario, 'web');

        $dentroIntervalo = PlanoTrabalho::factory()->create([
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'data_inicio' => '2024-03-01',
            'data_fim' => '2024-06-30',
        ]);

        PlanoTrabalho::factory()->create([
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'data_inicio' => '2025-06-01',
            'data_fim' => '2025-12-31',
        ]);

        $response = $this->getJson('/api/__tests/v2/plano-trabalho?' . http_build_query([
            'filters' => [
                'data_inicio' => '2024-01-01',
                'data_fim' => '2024-12-31',
            ],
        ]));

        $items = $response->json('data.data');

        expect($items)->toHaveCount(1)
            ->and($items[0]['id'])->toBe($dentroIntervalo->id);
    });
});

// ── POST store: validação ───────────────────────────────────────────

describe('POST /api/v2/plano-trabalho (validação)', function () {

    test('retorna 400 quando payload vazio', function () {
        $this->actingAs($this->usuario, 'web');

        $this->postJson('/api/__tests/v2/plano-trabalho', [])
            ->assertStatus(400)
            ->assertJsonStructure(['error']);
    });

    test('retorna 400 quando usuario_id não é uuid', function () {
        $this->actingAs($this->usuario, 'web');

        $payload = validStorePayload();
        $payload['usuario_id'] = 'nao-uuid';

        $this->postJson('/api/__tests/v2/plano-trabalho', $payload)
            ->assertStatus(400);
    });

    test('retorna 400 quando data_fim anterior a data_inicio', function () {
        $this->actingAs($this->usuario, 'web');

        $payload = validStorePayload();
        $payload['data_inicio'] = '2025-06-30';
        $payload['data_fim'] = '2025-01-01';

        $this->postJson('/api/__tests/v2/plano-trabalho', $payload)
            ->assertStatus(400);
    });

    test('retorna 400 quando tipo_modalidade_id ausente', function () {
        $this->actingAs($this->usuario, 'web');

        $payload = validStorePayload();
        unset($payload['tipo_modalidade_id']);

        $this->postJson('/api/__tests/v2/plano-trabalho', $payload)
            ->assertStatus(400);
    });

    test('retorna 400 quando programa_id ausente', function () {
        $this->actingAs($this->usuario, 'web');

        $payload = validStorePayload();
        unset($payload['programa_id']);

        $this->postJson('/api/__tests/v2/plano-trabalho', $payload)
            ->assertStatus(400);
    });

    test('retorna 400 quando service lança ServerException', function () {
        $this->actingAs($this->usuario, 'web');

        $this->mock(PlanoTrabalhoService::class, function ($mock) {
            $mock->shouldReceive('store')
                ->andThrow(new ServerException('ValidatePlanoTrabalho', 'A unidade está inativa.'));
        });

        $this->postJson('/api/__tests/v2/plano-trabalho', validStorePayload())
            ->assertStatus(400)
            ->assertJson(fn ($json) =>
                $json->where('error', fn ($error) => str_contains($error, 'A unidade está inativa.'))
            );
    });
});

// ── POST store: happy path (sem mock) ───────────────────────────────

describe('POST /api/v2/plano-trabalho (happy path)', function () {

    test('persiste o plano no banco e retorna 201', function () {
        $this->actingAs($this->usuario, 'web');

        $response = $this->postJson('/api/__tests/v2/plano-trabalho', [
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
            'programa_id' => $this->programa->id,
            'data_inicio' => '2024-06-01',
            'data_fim' => '2024-12-31',
            'tipo_modalidade_id' => $this->tipoModalidadeId,
        ]);

        $response->assertStatus(201)
            ->assertJsonPath('success', true);

        $this->assertDatabaseHas('planos_trabalhos', [
            'id' => $response->json('rows.0.id'),
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
            'programa_id' => $this->programa->id,
            'status' => 'INCLUIDO',
        ]);
    });

    test('plano criado possui numero gerado automaticamente', function () {
        $this->actingAs($this->usuario, 'web');

        $response = $this->postJson('/api/__tests/v2/plano-trabalho', [
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
            'programa_id' => $this->programa->id,
            'data_inicio' => '2024-06-01',
            'data_fim' => '2024-12-31',
            'tipo_modalidade_id' => $this->tipoModalidadeId,
        ]);

        $plano = PlanoTrabalho::find($response->json('rows.0.id'));

        expect($plano->numero)->toBeGreaterThan(0);
    });
});

// -- DELETE destroy -----------------------------------------------------------

describe('DELETE /api/v2/plano-trabalho/:id (happy path)', function () {

    test('exclui PT com status INCLUIDO e retorna 200', function () {
        $this->actingAs($this->usuario, 'web');

        $plano = PlanoTrabalho::factory()->create([
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'criacao_usuario_id' => $this->usuario->id,
            'status' => 'INCLUIDO',
        ]);

        $response = $this->deleteJson("/api/__tests/v2/plano-trabalho/{$plano->id}");

        $response->assertStatus(200)
            ->assertJsonPath('success', true);

        $this->assertSoftDeleted('planos_trabalhos', ['id' => $plano->id]);
    });
});

describe('DELETE /api/v2/plano-trabalho/:id (validacao)', function () {

    test('retorna 400 quando PT ja possui assinatura', function () {
        $this->actingAs($this->usuario, 'web');

        $plano = PlanoTrabalho::factory()->create([
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'criacao_usuario_id' => $this->usuario->id,
            'status' => 'AGUARDANDO_ASSINATURA',
        ]);

        $this->deleteJson("/api/__tests/v2/plano-trabalho/{$plano->id}")
            ->assertStatus(400);
    });

    test('retorna 400 quando PT nao encontrado', function () {
        $this->actingAs($this->usuario, 'web');

        $this->deleteJson('/api/__tests/v2/plano-trabalho/' . fake()->uuid())
            ->assertStatus(400);
    });
});

// ── GET show ────────────────────────────────────────────────────────

describe('GET /api/v2/plano-trabalho/:id (happy path)', function () {

    test('retorna plano existente com relations', function () {
        $this->actingAs($this->usuario, 'web');

        $plano = PlanoTrabalho::factory()->create([
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
            'tipo_modalidade_id' => $this->tipoModalidadeId,
        ]);

        $response = $this->getJson("/api/__tests/v2/plano-trabalho/{$plano->id}");

        $response->assertStatus(200)
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.id', $plano->id);
    });

    test('retorna relations carregadas', function () {
        $this->actingAs($this->usuario, 'web');

        $plano = PlanoTrabalho::factory()->create([
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
            'tipo_modalidade_id' => $this->tipoModalidadeId,
        ]);

        $data = $this->getJson("/api/__tests/v2/plano-trabalho/{$plano->id}")
            ->json('data');

        expect($data)->toHaveKeys(['usuario', 'unidade', 'programa', 'tipo_modalidade', 'entregas', 'consolidacoes']);
    });
});

describe('GET /api/v2/plano-trabalho/:id (validação)', function () {

    test('retorna 404 quando plano não existe', function () {
        $this->actingAs($this->usuario, 'web');

        $this->getJson('/api/__tests/v2/plano-trabalho/' . fake()->uuid())
            ->assertStatus(404);
    });
});
