<?php

namespace Tests\IntegrationTenant\Controllers\V2;

use App\V2\Usuario\UsuarioController;
use App\V2\Usuario\UsuarioService;
use App\Models\Usuario;
use Illuminate\Support\Facades\Route;
use Mockery;

beforeEach(function () {
    if (!Route::has('__tests.v2.usuario.buscarPorNomeMatricula')) {
        Route::middleware(['api'])->get('/api/__tests/v2/usuario', [UsuarioController::class, 'buscarPorNomeMatricula'])
            ->name('__tests.v2.usuario.buscarPorNomeMatricula');
    }
});

afterEach(function () {
    Mockery::close();
});

// ── buscarPorNomeMatricula: validação ───────────────────────────────

test('v2 usuario buscarPorNomeMatricula retorna 400 quando nome_matricula ausente', function () {
    $usuario = Usuario::factory()->create();
    $this->actingAs($usuario, 'web');

    $response = $this->getJson('/api/__tests/v2/usuario');

    $response->assertStatus(400);
})->group('v2-usuario');

test('v2 usuario buscarPorNomeMatricula retorna 400 quando nome_matricula tem menos de 3 caracteres', function () {
    $usuario = Usuario::factory()->create();
    $this->actingAs($usuario, 'web');

    $response = $this->getJson('/api/__tests/v2/usuario?nome_matricula=ab');

    $response->assertStatus(400);
    $response->assertJson(fn ($json) =>
        $json->where('error', fn ($error) => str_contains($error, '3 caracteres'))
    );
})->group('v2-usuario');

// ── buscarPorNomeMatricula: sucesso (service mockado) ───────────────

test('v2 usuario buscarPorNomeMatricula retorna 200 com service mockado', function () {
    $usuario = Usuario::factory()->create();
    $this->actingAs($usuario, 'web');

    $this->mock(UsuarioService::class, function ($mock) {
        $mock->shouldReceive('buscarPorNomeOuMatricula')
            ->once()
            ->with('João')
            ->andReturn([['id' => fake()->uuid(), 'nome' => 'João Silva']]);
    });

    $response = $this->getJson('/api/__tests/v2/usuario?nome_matricula=João');

    $response->assertStatus(200);
    $response->assertJsonPath('success', true);
    $response->assertJsonStructure(['success', 'data']);
})->group('v2-usuario');

// ── buscarPorNomeMatricula: erro inesperado ─────────────────────────

test('v2 usuario buscarPorNomeMatricula retorna 500 quando service lança exceção inesperada', function () {
    $usuario = Usuario::factory()->create();
    $this->actingAs($usuario, 'web');

    $this->mock(UsuarioService::class, function ($mock) {
        $mock->shouldReceive('buscarPorNomeOuMatricula')
            ->andThrow(new \RuntimeException('Erro de conexão com o banco.'));
    });

    $response = $this->getJson('/api/__tests/v2/usuario?nome_matricula=João');

    $response->assertStatus(500);
    $response->assertJsonPath('error', 'Ocorreu um erro inesperado.');
})->group('v2-usuario');
