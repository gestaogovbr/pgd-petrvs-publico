<?php

namespace Tests\IntegrationTenant\Controllers\V2;

use App\V2\Usuario\UsuarioController;
use App\V2\Usuario\UsuarioService;
use App\Models\Usuario;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Route;
use Mockery;

beforeEach(function () {
    if (!Route::has('__tests.v2.usuario.searchByNomeMatricula')) {
        Route::middleware(['api'])->get('/api/__tests/v2/usuario', [UsuarioController::class, 'searchByNomeMatricula'])
            ->name('__tests.v2.usuario.searchByNomeMatricula');
    }

    if (!Route::has('__tests.v2.usuario.show')) {
        Route::middleware(['api'])->get('/api/__tests/v2/usuario/{usuarioId}', [UsuarioController::class, 'show'])
            ->name('__tests.v2.usuario.show')->whereUuid('usuarioId');
    }

    if (!Route::has('__tests.v2.usuario.unidadesVinculadasPorCpf')) {
        Route::middleware(['api'])->get('/api/__tests/v2/usuario/cpf/{cpf}/unidades', [UsuarioController::class, 'unidadesVinculadasPorCpf'])
            ->name('__tests.v2.usuario.unidadesVinculadasPorCpf');
    }
});

afterEach(function () {
    Mockery::close();
});

// ── searchByNomeMatricula: validação ───────────────────────────────

test('v2 usuario searchByNomeMatricula retorna 422 quando nome_matricula ausente', function () {
    $usuario = Usuario::factory()->create();
    $this->actingAs($usuario, 'web');

    $response = $this->getJson('/api/__tests/v2/usuario');

    $response->assertStatus(422);
})->group('v2-usuario');

test('v2 usuario searchByNomeMatricula retorna 422 quando nome_matricula tem menos de 3 caracteres', function () {
    $usuario = Usuario::factory()->create();
    $this->actingAs($usuario, 'web');

    $response = $this->getJson('/api/__tests/v2/usuario?nome_matricula=ab');

    $response->assertStatus(422);
    $response->assertJson(fn ($json) =>
        $json->where('error', fn ($error) => str_contains($error, '3 caracteres'))
    );
})->group('v2-usuario');

// ── searchByNomeMatricula: sucesso (service mockado) ───────────────

test('v2 usuario searchByNomeMatricula retorna 200 com service mockado', function () {
    $usuario = Usuario::factory()->create();
    $this->actingAs($usuario, 'web');

    $this->mock(UsuarioService::class, function ($mock) use ($usuario) {
        $mock->shouldReceive('searchByNomeMatricula')
            ->once()
            ->with('João', $usuario->id)
            ->andReturn(new Collection([['id' => fake()->uuid(), 'nome' => 'João Silva']]));
    });

    $response = $this->getJson('/api/__tests/v2/usuario?nome_matricula=João');

    $response->assertStatus(200);
    $response->assertJsonPath('success', true);
    $response->assertJsonStructure(['success', 'data']);
})->group('v2-usuario');

// ── searchByNomeMatricula: erro inesperado ─────────────────────────

test('v2 usuario searchByNomeMatricula retorna 500 quando service lança exceção inesperada', function () {
    $usuario = Usuario::factory()->create();
    $this->actingAs($usuario, 'web');

    $this->mock(UsuarioService::class, function ($mock) {
        $mock->shouldReceive('searchByNomeMatricula')
            ->andThrow(new \RuntimeException('Erro de conexão com o banco.'));
    });

    $response = $this->getJson('/api/__tests/v2/usuario?nome_matricula=João');

    $response->assertStatus(500);
    $response->assertJsonPath('error', 'Ocorreu um erro inesperado.');
})->group('v2-usuario');

// ── show: validação / not found / sucesso ───────────────────────────

test('v2 usuario show retorna 404 quando id não é uuid', function () {
    $usuario = Usuario::factory()->create();
    $this->actingAs($usuario, 'web');

    $response = $this->getJson('/api/__tests/v2/usuario/abc');

    $response->assertStatus(404);
})->group('v2-usuario');

test('v2 usuario show retorna 404 quando usuário não existe', function () {
    $usuario = Usuario::factory()->create();
    $this->actingAs($usuario, 'web');

    $id = fake()->uuid();
    $response = $this->getJson("/api/__tests/v2/usuario/{$id}");

    $response->assertStatus(404);
    $response->assertJsonPath('error', 'Usuário não encontrado.');
})->group('v2-usuario');

test('v2 usuario show retorna 200 com usuário', function () {
    $usuario = Usuario::factory()->create();
    $this->actingAs($usuario, 'web');

    $response = $this->getJson("/api/__tests/v2/usuario/{$usuario->id}");

    $response->assertStatus(200);
    $response->assertJsonPath('success', true);
    $response->assertJsonPath('data.id', $usuario->id);
})->group('v2-usuario');

// ── unidadesVinculadasPorCpf: validação / sucesso ───────────────────

test('v2 usuario unidadesVinculadasPorCpf retorna 422 quando cpf inválido', function () {
    $usuario = Usuario::factory()->create();
    $this->actingAs($usuario, 'web');

    $response = $this->getJson('/api/__tests/v2/usuario/cpf/123/unidades');

    $response->assertStatus(422);
})->group('v2-usuario');

test('v2 usuario unidadesVinculadasPorCpf retorna 200 com service mockado', function () {
    $usuario = Usuario::factory()->create();
    $this->actingAs($usuario, 'web');

    $this->mock(UsuarioService::class, function ($mock) {
        $mock->shouldReceive('unidadesVinculadasPorCpf')
            ->once()
            ->with('12345678901')
            ->andReturn(new Collection([['id' => fake()->uuid(), 'nome' => 'Unidade Teste']]));
    });

    $response = $this->getJson('/api/__tests/v2/usuario/cpf/123.456.789-01/unidades');

    $response->assertStatus(200);
    $response->assertJsonPath('success', true);
    $response->assertJsonStructure(['success', 'data']);
})->group('v2-usuario');
