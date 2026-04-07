<?php

use App\V2\Unidade\UnidadeController;
use App\V2\Unidade\UnidadeService;
use App\Models\Unidade;
use App\Models\Usuario;
use App\Models\UnidadeIntegrante;
use App\Models\UnidadeIntegranteAtribuicao;
use Illuminate\Support\Facades\Route;
use Mockery;

beforeEach(function () {
    if (!Route::has('__tests.v2.unidade.buscarPorNomeOuCodigo')) {
        Route::middleware(['api'])->get('/api/__tests/v2/unidade', [UnidadeController::class, 'buscarPorNomeOuCodigo'])
            ->name('__tests.v2.unidade.buscarPorNomeOuCodigo');
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
    Mockery::close();
});

// ── validação ───────────────────────────────────────────────────────

describe('GET /api/v2/unidade (validação)', function () {

    test('retorna 400 quando termo tem menos de 3 caracteres', function () {
        $this->actingAs($this->usuario, 'web');

        $response = $this->getJson('/api/__tests/v2/unidade?nome_codigo=ab');

        $response->assertStatus(400)
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

    test('retorna 200 sem termo, listando unidades da hierarquia', function () {
        $this->actingAs($this->usuario, 'web');

        $response = $this->getJson('/api/__tests/v2/unidade');

        $response->assertStatus(200)
            ->assertJsonPath('success', true);

        $data = $response->json('data');
        $ids = collect($data)->pluck('id')->toArray();

        expect($ids)->toContain($this->unidade->id);
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

    test('não retorna unidade fora da hierarquia do usuário', function () {
        $this->actingAs($this->usuario, 'web');

        $outraUnidade = Unidade::factory()->create(['nome' => 'Unidade Isolada']);

        $response = $this->getJson('/api/__tests/v2/unidade?nome_codigo=Isolada');

        $data = $response->json('data');

        expect(collect($data)->pluck('id'))->not->toContain($outraUnidade->id);
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
