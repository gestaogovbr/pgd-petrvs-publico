<?php

use App\V2\Unidade\UnidadeController;
use App\V2\Unidade\UnidadeService;
use App\Models\Unidade;
use App\Models\Usuario;
use App\Models\UnidadeIntegrante;
use App\Models\UnidadeIntegranteAtribuicao;
use Illuminate\Support\Facades\Route;

beforeEach(function () {
    if (!Route::has('__tests.v2.unidade.buscarPorNomeOuCodigo')) {
        Route::middleware(['api'])->get('/api/__tests/v2/unidade', [UnidadeController::class, 'buscarPorNomeOuCodigo'])
            ->name('__tests.v2.unidade.buscarPorNomeOuCodigo');
    }

    if (!Route::has('__tests.v2.unidade.minhas')) {
        Route::middleware(['api'])->get('/api/__tests/v2/unidade/minhas', [UnidadeController::class, 'minhasUnidades'])
            ->name('__tests.v2.unidade.minhas');
    }

    $this->usuario = Usuario::factory()->create();
    $this->unidade = Unidade::factory()->create(['nome' => 'Coordenação Financeira', 'codigo' => '00123']);

    $vinculo = UnidadeIntegrante::query()->create([
        'unidade_id' => $this->unidade->id,
        'usuario_id' => $this->usuario->id,
    ]);
    UnidadeIntegranteAtribuicao::query()->create([
        'atribuicao' => 'LOTADO',
        'unidade_integrante_id' => $vinculo->id,
    ]);
});

afterEach(function () {
    \Mockery::close();
});

// ── validação ───────────────────────────────────────────────────────

describe('GET /api/v2/unidade (validação)', function () {

    test('retorna 422 quando termo tem menos de 3 caracteres', function () {
        $this->actingAs($this->usuario, 'web');

        $response = $this->getJson('/api/__tests/v2/unidade?nome_codigo=ab');

        $response->assertStatus(422)
            ->assertJson(fn ($json) =>
                $json->where('error', fn ($error) => str_contains($error, '3 caracteres'))
            );
    });

    test('retorna 500 quando service lança exceção inesperada', function () {
        $this->actingAs($this->usuario, 'web');

        $this->mock(UnidadeService::class, function ($mock) {
            $mock->shouldReceive('buscarPorNomeOuCodigo')
                ->andThrow(new \RuntimeException('Erro inesperado'));
        });

        $response = $this->getJson('/api/__tests/v2/unidade?nome_codigo=Coord');

        $response->assertStatus(500)
            ->assertJsonPath('error', 'Ocorreu um erro inesperado.');
    });
});

// ── happy path ──────────────────────────────────────────────────────

describe('GET /api/v2/unidade (happy path)', function () {

    test('retorna 200 sem termo, listando unidades', function () {
        $this->actingAs($this->usuario, 'web');

        $response = $this->getJson('/api/__tests/v2/unidade');

        $response->assertStatus(200)
            ->assertJsonPath('success', true);

        expect($response->json('data'))->toBeArray();
    });

    test('retorna unidade ao buscar por nome', function () {
        $this->actingAs($this->usuario, 'web');

        $response = $this->getJson('/api/__tests/v2/unidade?nome_codigo=Financeira');

        $response->assertStatus(200)
            ->assertJsonPath('success', true);

        $data = $response->json('data');

        expect($data)->not->toBeEmpty()
            ->and(collect($data)->pluck('id'))->toContain($this->unidade->id);
    });

    test('retorna unidade ao buscar por codigo', function () {
        $this->actingAs($this->usuario, 'web');

        $response = $this->getJson('/api/__tests/v2/unidade?nome_codigo=00123');

        $response->assertStatus(200);

        $data = $response->json('data');

        expect(collect($data)->pluck('id'))->toContain($this->unidade->id);
    });

    test('retorna unidade fora da lotação do usuário quando o termo corresponde', function () {
        $this->actingAs($this->usuario, 'web');

        $outraUnidade = Unidade::factory()->create(['nome' => 'Unidade Isolada', 'codigo' => '99999']);

        $response = $this->getJson('/api/__tests/v2/unidade?nome_codigo=Isolada');

        $data = $response->json('data');

        expect(collect($data)->pluck('id'))->toContain($outraUnidade->id);
    });

    test('retorna campos esperados em cada registro', function () {
        $this->actingAs($this->usuario, 'web');

        $response = $this->getJson('/api/__tests/v2/unidade');

        $data = $response->json('data');

        expect($data[0])->toHaveKeys(['id', 'nome', 'codigo', 'sigla']);
    });

    test('retorna collection vazia quando termo não corresponde', function () {
        $this->actingAs($this->usuario, 'web');

        $response = $this->getJson('/api/__tests/v2/unidade?nome_codigo=XYZNONEXISTENT');

        $response->assertStatus(200);

        expect($response->json('data'))->toBeEmpty();
    });
});

// ── minhas unidades ─────────────────────────────────────────────────

describe('GET /api/v2/unidade/minhas', function () {

    test('retorna a unidade onde o usuário possui atribuição', function () {
        $this->actingAs($this->usuario, 'web');

        $response = $this->getJson('/api/__tests/v2/unidade/minhas');

        $response->assertStatus(200)
            ->assertJsonPath('success', true);

        $data = $response->json('data');

        expect(collect($data)->pluck('id'))->toContain($this->unidade->id)
            ->and($data[0])->toHaveKeys(['id', 'sigla', 'nome']);
    });

    test('inclui subordinadas quando subordinadas=true', function () {
        $this->actingAs($this->usuario, 'web');

        $subordinada = Unidade::factory()->create([
            'nome' => 'Divisão Subordinada',
            'unidade_pai_id' => $this->unidade->id,
            'path' => '/' . $this->unidade->id,
        ]);

        $response = $this->getJson('/api/__tests/v2/unidade/minhas?subordinadas=true');

        $response->assertStatus(200);

        $ids = collect($response->json('data'))->pluck('id');

        expect($ids)->toContain($this->unidade->id)
            ->and($ids)->toContain($subordinada->id);
    });

    test('não inclui subordinadas quando subordinadas=false', function () {
        $this->actingAs($this->usuario, 'web');

        $subordinada = Unidade::factory()->create([
            'nome' => 'Divisão Subordinada 2',
            'unidade_pai_id' => $this->unidade->id,
            'path' => '/' . $this->unidade->id,
        ]);

        $response = $this->getJson('/api/__tests/v2/unidade/minhas?subordinadas=false');

        $response->assertStatus(200);

        $ids = collect($response->json('data'))->pluck('id');

        expect($ids)->toContain($this->unidade->id)
            ->and($ids)->not->toContain($subordinada->id);
    });

    test('retorna 422 quando subordinadas não é booleano', function () {
        $this->actingAs($this->usuario, 'web');

        $response = $this->getJson('/api/__tests/v2/unidade/minhas?subordinadas=abc');

        $response->assertStatus(422);
    });

    test('retorna vazio quando usuário não possui atribuição', function () {
        $usuarioSemAtribuicao = Usuario::factory()->create();
        $this->actingAs($usuarioSemAtribuicao, 'web');

        $response = $this->getJson('/api/__tests/v2/unidade/minhas');

        $response->assertStatus(200);

        expect($response->json('data'))->toBeEmpty();
    });
});
