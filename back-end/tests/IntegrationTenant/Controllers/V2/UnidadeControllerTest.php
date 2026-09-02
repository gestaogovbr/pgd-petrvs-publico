<?php

use App\V2\Unidade\UnidadeController;
use App\V2\Unidade\UnidadeService;
use App\Models\Unidade;
use App\Models\Usuario;
use App\Models\UnidadeIntegrante;
use App\Models\UnidadeIntegranteAtribuicao;
use Illuminate\Support\Facades\Route;

beforeEach(function () {
    if (!Route::has('__tests.v2.unidade.index')) {
        Route::middleware(['api'])->get('/api/__tests/v2/unidade', [UnidadeController::class, 'index'])
            ->name('__tests.v2.unidade.index');
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

    test('retorna 422 quando size excede o máximo permitido', function () {
        $this->actingAs($this->usuario, 'web');

        $response = $this->getJson('/api/__tests/v2/unidade?size=999');

        $response->assertStatus(422);
    });

    test('retorna 422 quando page é menor que 1', function () {
        $this->actingAs($this->usuario, 'web');

        $response = $this->getJson('/api/__tests/v2/unidade?page=0');

        $response->assertStatus(422);
    });

    test('retorna 500 quando service lança exceção inesperada', function () {
        $this->actingAs($this->usuario, 'web');

        $this->mock(UnidadeService::class, function ($mock) {
            $mock->shouldReceive('index')
                ->andThrow(new \RuntimeException('Erro inesperado'));
        });

        $response = $this->getJson('/api/__tests/v2/unidade?filters[termo]=Coord');

        $response->assertStatus(500)
            ->assertJsonPath('error', 'Ocorreu um erro inesperado.');
    });
});

// ── happy path ──────────────────────────────────────────────────────

describe('GET /api/v2/unidade (happy path)', function () {

    test('retorna 200 sem termo, listando unidades paginadas', function () {
        $this->actingAs($this->usuario, 'web');

        $response = $this->getJson('/api/__tests/v2/unidade');

        $response->assertStatus(200)
            ->assertJsonPath('success', true);

        expect($response->json('data.data'))->toBeArray()
            ->and($response->json('data.total'))->toBeGreaterThanOrEqual(1);
    });

    test('retorna unidade ao buscar por nome', function () {
        $this->actingAs($this->usuario, 'web');

        $response = $this->getJson('/api/__tests/v2/unidade?filters[termo]=Financeira');

        $response->assertStatus(200)
            ->assertJsonPath('success', true);

        $data = $response->json('data.data');

        expect($data)->not->toBeEmpty()
            ->and(collect($data)->pluck('id'))->toContain($this->unidade->id);
    });

    test('retorna unidade ao buscar por codigo', function () {
        $this->actingAs($this->usuario, 'web');

        $response = $this->getJson('/api/__tests/v2/unidade?filters[termo]=00123');

        $response->assertStatus(200);

        $data = $response->json('data.data');

        expect(collect($data)->pluck('id'))->toContain($this->unidade->id);
    });

    test('retorna unidade fora da lotação do usuário quando o termo corresponde', function () {
        $this->actingAs($this->usuario, 'web');

        $outraUnidade = Unidade::factory()->create(['nome' => 'Unidade Isolada', 'codigo' => '99999']);

        $response = $this->getJson('/api/__tests/v2/unidade?filters[termo]=Isolada');

        $data = $response->json('data.data');

        expect(collect($data)->pluck('id'))->toContain($outraUnidade->id);
    });

    test('retorna campos esperados em cada registro', function () {
        $this->actingAs($this->usuario, 'web');

        $response = $this->getJson('/api/__tests/v2/unidade');

        $data = $response->json('data.data');

        expect($data[0])->toHaveKeys(['id', 'nome', 'codigo', 'sigla']);
    });

    test('retorna lista vazia quando termo não corresponde', function () {
        $this->actingAs($this->usuario, 'web');

        $response = $this->getJson('/api/__tests/v2/unidade?filters[termo]=XYZNONEXISTENT');

        $response->assertStatus(200);

        expect($response->json('data.data'))->toBeEmpty()
            ->and($response->json('data.total'))->toBe(0);
    });

    test('respeita o parâmetro size na paginação', function () {
        $this->actingAs($this->usuario, 'web');

        Unidade::factory()->count(3)->create();

        $response = $this->getJson('/api/__tests/v2/unidade?size=1');

        $response->assertStatus(200)
            ->assertJsonPath('data.per_page', 1);

        expect($response->json('data.data'))->toHaveCount(1);
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
