<?php

namespace Tests\IntegrationTenant\Controllers\V2;

use App\V2\PlanoTrabalho\Entrega\EntregaController;
use App\V2\PlanoTrabalho\Entrega\PlanoTrabalhoEntregaService;
use App\Models\PlanoTrabalhoEntrega;
use App\Models\Usuario;
use App\Exceptions\ServerException;
use Illuminate\Support\Facades\Route;
use Mockery;

beforeEach(function () {
    if (!Route::has('__tests.v2.plano-trabalho.entrega.store')) {
        Route::middleware(['api'])->post('/api/__tests/v2/plano-trabalho/{planoTrabalhoId}/entrega/store', [EntregaController::class, 'store'])
            ->name('__tests.v2.plano-trabalho.entrega.store');
    }
    if (!Route::has('__tests.v2.plano-trabalho.entrega.update')) {
        Route::middleware(['api'])->post('/api/__tests/v2/plano-trabalho/{planoTrabalhoId}/entrega/{entregaId}/update', [EntregaController::class, 'update'])
            ->name('__tests.v2.plano-trabalho.entrega.update');
    }
    if (!Route::has('__tests.v2.plano-trabalho.entrega.destroy')) {
        Route::middleware(['api'])->post('/api/__tests/v2/plano-trabalho/{planoTrabalhoId}/entrega/{entregaId}/destroy', [EntregaController::class, 'destroy'])
            ->name('__tests.v2.plano-trabalho.entrega.destroy');
    }
});

afterEach(function () {
    Mockery::close();
});

// ── store: validação ────────────────────────────────────────────────

test('v2 entrega store retorna 400 quando payload vazio', function () {
    $usuario = Usuario::factory()->create();
    $this->actingAs($usuario, 'web');

    $planoTrabalhoId = fake()->uuid();
    $response = $this->postJson("/api/__tests/v2/plano-trabalho/{$planoTrabalhoId}/entrega/store", []);

    $response->assertStatus(400);
})->group('v2-plano-trabalho-entrega');

test('v2 entrega store retorna 400 quando entregas é array vazio', function () {
    $usuario = Usuario::factory()->create();
    $this->actingAs($usuario, 'web');

    $planoTrabalhoId = fake()->uuid();
    $response = $this->postJson("/api/__tests/v2/plano-trabalho/{$planoTrabalhoId}/entrega/store", [
        'entregas' => [],
    ]);

    $response->assertStatus(400);
})->group('v2-plano-trabalho-entrega');

test('v2 entrega store retorna 400 quando forca_trabalho fora do range', function () {
    $usuario = Usuario::factory()->create();
    $this->actingAs($usuario, 'web');

    $planoTrabalhoId = fake()->uuid();
    $response = $this->postJson("/api/__tests/v2/plano-trabalho/{$planoTrabalhoId}/entrega/store", [
        'entregas' => [
            [
                'descricao' => 'Entrega teste',
                'forca_trabalho' => 150,
            ],
        ],
    ]);

    $response->assertStatus(400);
})->group('v2-plano-trabalho-entrega');

test('v2 entrega store retorna 400 quando descricao excede 1000 caracteres', function () {
    $usuario = Usuario::factory()->create();
    $this->actingAs($usuario, 'web');

    $planoTrabalhoId = fake()->uuid();
    $response = $this->postJson("/api/__tests/v2/plano-trabalho/{$planoTrabalhoId}/entrega/store", [
        'entregas' => [
            [
                'descricao' => str_repeat('a', 1001),
                'forca_trabalho' => 50,
            ],
        ],
    ]);

    $response->assertStatus(400);
})->group('v2-plano-trabalho-entrega');

// ── store: sucesso (service mockado) ────────────────────────────────

test('v2 entrega store retorna 201 quando payload válido', function () {
    $usuario = Usuario::factory()->create();
    $this->actingAs($usuario, 'web');

    $planoTrabalhoId = fake()->uuid();
    $entregaId = fake()->uuid();

    $entregaMock = new PlanoTrabalhoEntrega([
        'id' => $entregaId,
        'descricao' => 'Entrega teste',
        'plano_trabalho_id' => $planoTrabalhoId,
    ]);
    $entregaMock->id = $entregaId;

    $this->mock(PlanoTrabalhoEntregaService::class, function ($mock) use ($entregaMock) {
        $mock->shouldReceive('store')
            ->once()
            ->andReturn($entregaMock);
    });

    $response = $this->postJson("/api/__tests/v2/plano-trabalho/{$planoTrabalhoId}/entrega/store", [
        'entregas' => [
            [
                'descricao' => 'Entrega teste',
                'forca_trabalho' => 50,
            ],
        ],
    ]);

    $response->assertStatus(201);
    $response->assertJsonPath('success', true);
})->group('v2-plano-trabalho-entrega');

// ── update: validação ───────────────────────────────────────────────

test('v2 entrega update retorna 400 quando forca_trabalho fora do range', function () {
    $usuario = Usuario::factory()->create();
    $this->actingAs($usuario, 'web');

    $planoTrabalhoId = fake()->uuid();
    $entregaId = fake()->uuid();
    $response = $this->postJson("/api/__tests/v2/plano-trabalho/{$planoTrabalhoId}/entrega/{$entregaId}/update", [
        'forca_trabalho' => 150,
    ]);

    $response->assertStatus(400);
})->group('v2-plano-trabalho-entrega');

test('v2 entrega update retorna 400 quando descricao excede 1000 caracteres', function () {
    $usuario = Usuario::factory()->create();
    $this->actingAs($usuario, 'web');

    $planoTrabalhoId = fake()->uuid();
    $entregaId = fake()->uuid();
    $response = $this->postJson("/api/__tests/v2/plano-trabalho/{$planoTrabalhoId}/entrega/{$entregaId}/update", [
        'descricao' => str_repeat('a', 1001),
    ]);

    $response->assertStatus(400);
})->group('v2-plano-trabalho-entrega');

// ── destroy: sucesso (service mockado) ──────────────────────────────

test('v2 entrega destroy retorna 200 quando service executa com sucesso', function () {
    $usuario = Usuario::factory()->create();
    $this->actingAs($usuario, 'web');

    $planoTrabalhoId = fake()->uuid();
    $entregaId = fake()->uuid();

    $this->mock(PlanoTrabalhoEntregaService::class, function ($mock) use ($entregaId) {
        $mock->shouldReceive('destroy')
            ->with($entregaId)
            ->once()
            ->andReturn(true);
    });

    $response = $this->postJson("/api/__tests/v2/plano-trabalho/{$planoTrabalhoId}/entrega/{$entregaId}/destroy", []);

    $response->assertStatus(200);
    $response->assertJsonPath('success', true);
})->group('v2-plano-trabalho-entrega');

// ── destroy: erro de negócio ────────────────────────────────────────

test('v2 entrega destroy retorna 400 quando service lança ServerException', function () {
    $usuario = Usuario::factory()->create();
    $this->actingAs($usuario, 'web');

    $planoTrabalhoId = fake()->uuid();
    $entregaId = fake()->uuid();

    $this->mock(PlanoTrabalhoEntregaService::class, function ($mock) {
        $mock->shouldReceive('destroy')
            ->andThrow(new ServerException('CapacidadeStore', 'Exclusão não realizada'));
    });

    $response = $this->postJson("/api/__tests/v2/plano-trabalho/{$planoTrabalhoId}/entrega/{$entregaId}/destroy", []);

    $response->assertStatus(400);
    $response->assertJson(fn ($json) =>
        $json->where('error', fn ($error) => str_contains($error, 'Exclusão não realizada'))
    );
})->group('v2-plano-trabalho-entrega');
