<?php

namespace Tests\IntegrationTenant\Controllers\V2;

use App\V2\PlanoTrabalho\PlanoTrabalhoController;
use App\V2\PlanoTrabalho\PlanoTrabalhoService;
use App\Models\Usuario;
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
        Route::middleware(['api'])->post('/api/__tests/v2/plano-trabalho/store', [PlanoTrabalhoController::class, 'store'])
            ->name('__tests.v2.plano-trabalho.store');
    }
    if (!Route::has('__tests.v2.plano-trabalho.update')) {
        Route::middleware(['api'])->post('/api/__tests/v2/plano-trabalho/update', [PlanoTrabalhoController::class, 'update'])
            ->name('__tests.v2.plano-trabalho.update');
    }
    if (!Route::has('__tests.v2.plano-trabalho.get-by-id')) {
        Route::middleware(['api'])->post('/api/__tests/v2/plano-trabalho/get-by-id', [PlanoTrabalhoController::class, 'getById'])
            ->name('__tests.v2.plano-trabalho.get-by-id');
    }
    if (!Route::has('__tests.v2.plano-trabalho.query')) {
        Route::middleware(['api'])->post('/api/__tests/v2/plano-trabalho/query', [PlanoTrabalhoController::class, 'query'])
            ->name('__tests.v2.plano-trabalho.query');
    }
    if (!Route::has('__tests.v2.plano-trabalho.destroy')) {
        Route::middleware(['api'])->post('/api/__tests/v2/plano-trabalho/destroy', [PlanoTrabalhoController::class, 'destroy'])
            ->name('__tests.v2.plano-trabalho.destroy');
    }
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
        'modalidade' => 'PRESENCIAL',
        'justificativa' => 'Justificativa de teste',
    ];
}

// ── index: validação ────────────────────────────────────────────────

test('v2 plano-trabalho index retorna 200 com service mockado', function () {
    $usuario = Usuario::factory()->create();
    $this->actingAs($usuario, 'web');

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

    $response->assertStatus(200);
    $response->assertJsonPath('success', true);
})->group('v2-plano-trabalho');

test('v2 plano-trabalho index retorna 400 quando size não é inteiro', function () {
    $usuario = Usuario::factory()->create();
    $this->actingAs($usuario, 'web');

    $response = $this->getJson('/api/__tests/v2/plano-trabalho?size=abc');

    $response->assertStatus(400);
})->group('v2-plano-trabalho');

test('v2 plano-trabalho index retorna 400 quando page não é inteiro', function () {
    $usuario = Usuario::factory()->create();
    $this->actingAs($usuario, 'web');

    $response = $this->getJson('/api/__tests/v2/plano-trabalho?page=abc');

    $response->assertStatus(400);
})->group('v2-plano-trabalho');

test('v2 plano-trabalho index retorna 400 quando filters.usuario_id não é uuid', function () {
    $usuario = Usuario::factory()->create();
    $this->actingAs($usuario, 'web');

    $response = $this->getJson('/api/__tests/v2/plano-trabalho?' . http_build_query([
        'filters' => ['usuario_id' => 'nao-uuid'],
    ]));

    $response->assertStatus(400);
})->group('v2-plano-trabalho');

test('v2 plano-trabalho index retorna 400 quando filters.data_inicio é data inválida', function () {
    $usuario = Usuario::factory()->create();
    $this->actingAs($usuario, 'web');

    $response = $this->getJson('/api/__tests/v2/plano-trabalho?' . http_build_query([
        'filters' => ['data_inicio' => 'nao-data'],
    ]));

    $response->assertStatus(400);
})->group('v2-plano-trabalho');

test('v2 plano-trabalho index retorna 400 quando service lança ServerException', function () {
    $usuario = Usuario::factory()->create();
    $this->actingAs($usuario, 'web');

    $this->mock(PlanoTrabalhoService::class, function ($mock) {
        $mock->shouldReceive('index')
            ->andThrow(new ServerException('ValidateFiltros', 'Informe ao menos um filtro para a busca.'));
    });

    $response = $this->getJson('/api/__tests/v2/plano-trabalho?' . http_build_query([
        'page' => 1,
        'size' => 15,
    ]));

    $response->assertStatus(400);
    $response->assertJson(fn ($json) =>
        $json->where('error', fn ($error) => str_contains($error, 'Informe ao menos um filtro'))
    );
})->group('v2-plano-trabalho');

// ── store: validação ────────────────────────────────────────────────

test('v2 plano-trabalho store retorna 400 quando payload vazio', function () {
    $usuario = Usuario::factory()->create();
    $this->actingAs($usuario, 'web');

    $response = $this->postJson('/api/__tests/v2/plano-trabalho/store', []);

    $response->assertStatus(400);
    $response->assertJsonStructure(['error']);
})->group('v2-plano-trabalho');

test('v2 plano-trabalho store retorna 400 quando usuario_id não é uuid', function () {
    $usuario = Usuario::factory()->create();
    $this->actingAs($usuario, 'web');

    $payload = validStorePayload();
    $payload['usuario_id'] = 'nao-uuid';

    $response = $this->postJson('/api/__tests/v2/plano-trabalho/store', $payload);

    $response->assertStatus(400);
})->group('v2-plano-trabalho');

test('v2 plano-trabalho store retorna 400 quando data_fim anterior a data_inicio', function () {
    $usuario = Usuario::factory()->create();
    $this->actingAs($usuario, 'web');

    $payload = validStorePayload();
    $payload['data_inicio'] = '2025-06-30';
    $payload['data_fim'] = '2025-01-01';

    $response = $this->postJson('/api/__tests/v2/plano-trabalho/store', $payload);

    $response->assertStatus(400);
})->group('v2-plano-trabalho');

test('v2 plano-trabalho store retorna 400 quando modalidade ausente', function () {
    $usuario = Usuario::factory()->create();
    $this->actingAs($usuario, 'web');

    $payload = validStorePayload();
    unset($payload['modalidade']);

    $response = $this->postJson('/api/__tests/v2/plano-trabalho/store', $payload);

    $response->assertStatus(400);
})->group('v2-plano-trabalho');

test('v2 plano-trabalho store retorna 400 quando programa_id ausente', function () {
    $usuario = Usuario::factory()->create();
    $this->actingAs($usuario, 'web');

    $payload = validStorePayload();
    unset($payload['programa_id']);

    $response = $this->postJson('/api/__tests/v2/plano-trabalho/store', $payload);

    $response->assertStatus(400);
})->group('v2-plano-trabalho');

// ── store: regra de negócio (service mockado) ───────────────────────

test('v2 plano-trabalho store retorna 400 quando service lança ServerException', function () {
    $usuario = Usuario::factory()->create();
    $this->actingAs($usuario, 'web');

    $this->mock(PlanoTrabalhoService::class, function ($mock) {
        $mock->shouldReceive('store')
            ->andThrow(new ServerException('ValidatePlanoTrabalho', 'A unidade está inativa.'));
    });

    $response = $this->postJson('/api/__tests/v2/plano-trabalho/store', validStorePayload());

    $response->assertStatus(400);
    $response->assertJson(fn ($json) =>
        $json->where('error', fn ($error) => str_contains($error, 'A unidade está inativa.'))
    );
})->group('v2-plano-trabalho');

// ── update: validação ───────────────────────────────────────────────

test('v2 plano-trabalho update retorna 400 quando entity.id ausente', function () {
    $usuario = Usuario::factory()->create();
    $this->actingAs($usuario, 'web');

    $response = $this->postJson('/api/__tests/v2/plano-trabalho/update', [
        'entity' => [
            'tipo_modalidade_id' => fake()->uuid(),
            'carga_horaria' => 8,
            'data_inicio' => '2025-01-01',
            'data_fim' => '2025-06-30',
            'entregas' => [['descricao' => 'Entrega 1']],
            'documento_id' => fake()->uuid(),
        ],
    ]);

    $response->assertStatus(400);
})->group('v2-plano-trabalho');

// ── getById: validação ──────────────────────────────────────────────

test('v2 plano-trabalho getById retorna 400 quando id ausente', function () {
    $usuario = Usuario::factory()->create();
    $this->actingAs($usuario, 'web');

    $response = $this->postJson('/api/__tests/v2/plano-trabalho/get-by-id', []);

    $response->assertStatus(400);
})->group('v2-plano-trabalho');

test('v2 plano-trabalho getById retorna 400 quando id não é uuid', function () {
    $usuario = Usuario::factory()->create();
    $this->actingAs($usuario, 'web');

    $response = $this->postJson('/api/__tests/v2/plano-trabalho/get-by-id', [
        'id' => 'nao-uuid',
    ]);

    $response->assertStatus(400);
})->group('v2-plano-trabalho');

// ── query: validação ────────────────────────────────────────────────

test('v2 plano-trabalho query retorna 400 quando page e limit ausentes', function () {
    $usuario = Usuario::factory()->create();
    $this->actingAs($usuario, 'web');

    $response = $this->postJson('/api/__tests/v2/plano-trabalho/query', []);

    $response->assertStatus(400);
})->group('v2-plano-trabalho');

test('v2 plano-trabalho query retorna 400 quando page não é inteiro', function () {
    $usuario = Usuario::factory()->create();
    $this->actingAs($usuario, 'web');

    $response = $this->postJson('/api/__tests/v2/plano-trabalho/query', [
        'page' => 'abc',
        'limit' => 10,
    ]);

    $response->assertStatus(400);
})->group('v2-plano-trabalho');

// ── destroy: validação e regra de negócio ───────────────────────────

test('v2 plano-trabalho destroy retorna 400 quando id ausente', function () {
    $usuario = Usuario::factory()->create();
    $this->actingAs($usuario, 'web');

    $response = $this->postJson('/api/__tests/v2/plano-trabalho/destroy', []);

    $response->assertStatus(400);
})->group('v2-plano-trabalho');

test('v2 plano-trabalho destroy retorna 400 pois exclusão é proibida', function () {
    $usuario = Usuario::factory()->create();
    $this->actingAs($usuario, 'web');

    $response = $this->postJson('/api/__tests/v2/plano-trabalho/destroy', [
        'id' => fake()->uuid(),
    ]);

    $response->assertStatus(400);
    $response->assertJson(fn ($json) =>
        $json->where('error', fn ($error) => str_contains($error, 'não pode ser excluído'))
    );
})->group('v2-plano-trabalho');
