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

    if (!Route::has('__tests.v2.usuario.buscarPorId')) {
        Route::middleware(['api'])->get('/api/__tests/v2/usuario/{usuarioId}', [UsuarioController::class, 'buscarPorId'])
            ->name('__tests.v2.usuario.buscarPorId');
    }

    if (!Route::has('__tests.v2.usuario.buscarUnidadesVinculadasPorCpf')) {
        Route::middleware(['api'])->get('/api/__tests/v2/usuario/cpf/{cpf}/unidades', [UsuarioController::class, 'buscarUnidadesVinculadasPorCpf'])
            ->name('__tests.v2.usuario.buscarUnidadesVinculadasPorCpf');
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

// ── buscarPorId: validação / not found / sucesso ────────────────────

test('v2 usuario buscarPorId retorna 400 quando id não é uuid', function () {
    $usuario = Usuario::factory()->create();
    $this->actingAs($usuario, 'web');

    $response = $this->getJson('/api/__tests/v2/usuario/abc');

    $response->assertStatus(400);
})->group('v2-usuario');

test('v2 usuario buscarPorId retorna 404 quando usuário não existe', function () {
    $usuario = Usuario::factory()->create();
    $this->actingAs($usuario, 'web');

    $id = fake()->uuid();
    $response = $this->getJson("/api/__tests/v2/usuario/{$id}");

    $response->assertStatus(404);
    $response->assertJsonPath('error', 'Usuário não encontrado.');
})->group('v2-usuario');

test('v2 usuario buscarPorId retorna 200 com usuário', function () {
    $usuarioLogado = Usuario::factory()->create();
    $this->actingAs($usuarioLogado, 'web');

    $usuario = Usuario::factory()->create();

    $response = $this->getJson("/api/__tests/v2/usuario/{$usuario->id}");

    $response->assertStatus(200);
    $response->assertJsonPath('success', true);
    $response->assertJsonPath('data.id', $usuario->id);
})->group('v2-usuario');

// ── buscarUnidadesVinculadasPorCpf: validação / sucesso ─────────────

test('v2 usuario buscarUnidadesVinculadasPorCpf retorna 400 quando cpf inválido', function () {
    $usuario = Usuario::factory()->create();
    $this->actingAs($usuario, 'web');

    $response = $this->getJson('/api/__tests/v2/usuario/cpf/123/unidades');

    $response->assertStatus(400);
})->group('v2-usuario');

test('v2 usuario buscarUnidadesVinculadasPorCpf retorna 200 com service mockado', function () {
    $usuario = Usuario::factory()->create();
    $this->actingAs($usuario, 'web');

    $this->mock(UsuarioService::class, function ($mock) {
        $mock->shouldReceive('buscarUnidadesVinculadas')
            ->once()
            ->with('12345678901')
            ->andReturn([['id' => fake()->uuid(), 'nome' => 'Unidade Teste']]);
    });

    $response = $this->getJson('/api/__tests/v2/usuario/cpf/123.456.789-01/unidades');

    $response->assertStatus(200);
    $response->assertJsonPath('success', true);
    $response->assertJsonStructure(['success', 'data']);
})->group('v2-usuario');
