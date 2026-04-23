<?php

use App\V2\PlanoEntrega\PlanoEntregaController;
use App\V2\PlanoEntrega\PlanoEntregaService;
use App\Models\PlanoEntrega;
use App\Models\Programa;
use App\Models\Unidade;
use App\Models\Usuario;
use Illuminate\Support\Facades\Route;
use Mockery;

beforeEach(function () {
    if (!Route::has('__tests.v2.plano-entrega.buscarPorUnidade')) {
        Route::middleware(['api'])->get('/api/__tests/v2/plano-entrega', [PlanoEntregaController::class, 'buscarPorUnidade'])
            ->name('__tests.v2.plano-entrega.buscarPorUnidade');
    }

    $this->usuario = Usuario::factory()->create();
    $this->unidade = Unidade::factory()->create();
    $this->programa = Programa::factory()->create();
});

afterEach(function () {
    Mockery::close();
});

// ── validação ───────────────────────────────────────────────────────

describe('GET /api/v2/plano-entrega (validação)', function () {

    test('retorna 400 quando unidade_id ausente', function () {
        $this->actingAs($this->usuario, 'web');

        $response = $this->getJson('/api/__tests/v2/plano-entrega');

        $response->assertStatus(400);
    });

    test('retorna 400 quando unidade_id não é uuid', function () {
        $this->actingAs($this->usuario, 'web');

        $response = $this->getJson('/api/__tests/v2/plano-entrega?unidade_id=nao-uuid');

        $response->assertStatus(400);
    });

    test('retorna 500 quando service lança exceção inesperada', function () {
        $this->actingAs($this->usuario, 'web');

        $this->mock(PlanoEntregaService::class, function ($mock) {
            $mock->shouldReceive('buscarPorUnidade')
                ->andThrow(new \RuntimeException('Erro de conexão'));
        });

        $response = $this->getJson('/api/__tests/v2/plano-entrega?unidade_id=' . fake()->uuid());

        $response->assertStatus(500)
            ->assertJsonPath('error', 'Ocorreu um erro inesperado.');
    });
});

// ── happy path ──────────────────────────────────────────────────────

describe('GET /api/v2/plano-entrega (happy path)', function () {

    test('retorna 200 com planos da unidade', function () {
        $this->actingAs($this->usuario, 'web');

        $plano = PlanoEntrega::factory()->create([
            'unidade_id' => $this->unidade->id,
            'programa_id' => $this->programa->id,
            'criacao_usuario_id' => $this->usuario->id,
        ]);

        $response = $this->getJson('/api/__tests/v2/plano-entrega?unidade_id=' . $this->unidade->id);

        $response->assertStatus(200)
            ->assertJsonPath('success', true);

        $data = $response->json('data');

        expect($data)->not->toBeEmpty()
            ->and(collect($data)->pluck('id'))->toContain($plano->id);
    });

    test('retorna campos esperados em cada registro', function () {
        $this->actingAs($this->usuario, 'web');

        PlanoEntrega::factory()->create([
            'unidade_id' => $this->unidade->id,
            'programa_id' => $this->programa->id,
            'criacao_usuario_id' => $this->usuario->id,
        ]);

        $data = $this->getJson('/api/__tests/v2/plano-entrega?unidade_id=' . $this->unidade->id)
            ->json('data');

        expect($data[0])->toHaveKeys(['id', 'nome', 'numero', 'status', 'data_inicio', 'data_fim']);
    });

    test('não retorna planos de outra unidade', function () {
        $this->actingAs($this->usuario, 'web');

        $outraUnidade = Unidade::factory()->create();

        PlanoEntrega::factory()->create([
            'unidade_id' => $outraUnidade->id,
            'programa_id' => $this->programa->id,
            'criacao_usuario_id' => $this->usuario->id,
        ]);

        $response = $this->getJson('/api/__tests/v2/plano-entrega?unidade_id=' . $this->unidade->id);

        expect($response->json('data'))->toBeEmpty();
    });

    test('retorna múltiplos planos da mesma unidade', function () {
        $this->actingAs($this->usuario, 'web');

        PlanoEntrega::factory()->count(3)->create([
            'unidade_id' => $this->unidade->id,
            'programa_id' => $this->programa->id,
            'criacao_usuario_id' => $this->usuario->id,
        ]);

        $data = $this->getJson('/api/__tests/v2/plano-entrega?unidade_id=' . $this->unidade->id)
            ->json('data');

        expect($data)->toHaveCount(3);
    });

    test('retorna collection vazia quando unidade não tem planos', function () {
        $this->actingAs($this->usuario, 'web');

        $response = $this->getJson('/api/__tests/v2/plano-entrega?unidade_id=' . $this->unidade->id);

        $response->assertStatus(200);

        expect($response->json('data'))->toBeEmpty();
    });
});

// ── interseção de período e ordenação (RN31/RN32) ───────────────────

describe('GET /api/v2/plano-entrega (interseção de período - RN31/RN32)', function () {

    test('retorna apenas PEs com interseção de período', function () {
        $this->actingAs($this->usuario, 'web');

        $peIntersecta = PlanoEntrega::factory()->create([
            'unidade_id' => $this->unidade->id,
            'programa_id' => $this->programa->id,
            'criacao_usuario_id' => $this->usuario->id,
            'data_inicio' => '2024-01-01',
            'data_fim' => '2024-06-30',
        ]);

        PlanoEntrega::factory()->create([
            'unidade_id' => $this->unidade->id,
            'programa_id' => $this->programa->id,
            'criacao_usuario_id' => $this->usuario->id,
            'data_inicio' => '2024-07-01',
            'data_fim' => '2024-12-31',
        ]);

        $response = $this->getJson('/api/__tests/v2/plano-entrega?' . http_build_query([
            'unidade_id' => $this->unidade->id,
            'data_inicio' => '2024-03-01',
            'data_fim' => '2024-05-31',
        ]));

        $data = $response->json('data');

        expect($data)->toHaveCount(1);
        expect($data[0]['id'])->toBe($peIntersecta->id);
    });

    test('exclui PE que termina antes do início do PT', function () {
        $this->actingAs($this->usuario, 'web');

        PlanoEntrega::factory()->create([
            'unidade_id' => $this->unidade->id,
            'programa_id' => $this->programa->id,
            'criacao_usuario_id' => $this->usuario->id,
            'data_inicio' => '2024-01-01',
            'data_fim' => '2024-02-28',
        ]);

        $response = $this->getJson('/api/__tests/v2/plano-entrega?' . http_build_query([
            'unidade_id' => $this->unidade->id,
            'data_inicio' => '2024-03-01',
            'data_fim' => '2024-06-30',
        ]));

        expect($response->json('data'))->toBeEmpty();
    });

    test('exclui PE que começa depois do fim do PT', function () {
        $this->actingAs($this->usuario, 'web');

        PlanoEntrega::factory()->create([
            'unidade_id' => $this->unidade->id,
            'programa_id' => $this->programa->id,
            'criacao_usuario_id' => $this->usuario->id,
            'data_inicio' => '2024-07-01',
            'data_fim' => '2024-12-31',
        ]);

        $response = $this->getJson('/api/__tests/v2/plano-entrega?' . http_build_query([
            'unidade_id' => $this->unidade->id,
            'data_inicio' => '2024-03-01',
            'data_fim' => '2024-06-30',
        ]));

        expect($response->json('data'))->toBeEmpty();
    });

    test('inclui PE que intersecta por um dia no início', function () {
        $this->actingAs($this->usuario, 'web');

        $pe = PlanoEntrega::factory()->create([
            'unidade_id' => $this->unidade->id,
            'programa_id' => $this->programa->id,
            'criacao_usuario_id' => $this->usuario->id,
            'data_inicio' => '2024-01-01',
            'data_fim' => '2024-03-01',
        ]);

        $response = $this->getJson('/api/__tests/v2/plano-entrega?' . http_build_query([
            'unidade_id' => $this->unidade->id,
            'data_inicio' => '2024-03-01',
            'data_fim' => '2024-06-30',
        ]));

        $data = $response->json('data');
        expect($data)->toHaveCount(1);
        expect($data[0]['id'])->toBe($pe->id);
    });

    test('inclui PE totalmente contido no período do PT', function () {
        $this->actingAs($this->usuario, 'web');

        $pe = PlanoEntrega::factory()->create([
            'unidade_id' => $this->unidade->id,
            'programa_id' => $this->programa->id,
            'criacao_usuario_id' => $this->usuario->id,
            'data_inicio' => '2024-04-01',
            'data_fim' => '2024-05-31',
        ]);

        $response = $this->getJson('/api/__tests/v2/plano-entrega?' . http_build_query([
            'unidade_id' => $this->unidade->id,
            'data_inicio' => '2024-03-01',
            'data_fim' => '2024-06-30',
        ]));

        $data = $response->json('data');
        expect($data)->toHaveCount(1);
        expect($data[0]['id'])->toBe($pe->id);
    });

    test('inclui PE que intersecta por um dia no fim', function () {
        $this->actingAs($this->usuario, 'web');

        $pe = PlanoEntrega::factory()->create([
            'unidade_id' => $this->unidade->id,
            'programa_id' => $this->programa->id,
            'criacao_usuario_id' => $this->usuario->id,
            'data_inicio' => '2024-06-30',
            'data_fim' => '2024-12-31',
        ]);

        $response = $this->getJson('/api/__tests/v2/plano-entrega?' . http_build_query([
            'unidade_id' => $this->unidade->id,
            'data_inicio' => '2024-03-01',
            'data_fim' => '2024-06-30',
        ]));

        $data = $response->json('data');
        expect($data)->toHaveCount(1);
        expect($data[0]['id'])->toBe($pe->id);
    });

    test('retorna PEs ordenados do mais recente para o mais antigo', function () {
        $this->actingAs($this->usuario, 'web');

        $peAntigo = PlanoEntrega::factory()->create([
            'unidade_id' => $this->unidade->id,
            'programa_id' => $this->programa->id,
            'criacao_usuario_id' => $this->usuario->id,
            'data_inicio' => '2024-01-01',
            'data_fim' => '2024-06-30',
        ]);

        $peRecente = PlanoEntrega::factory()->create([
            'unidade_id' => $this->unidade->id,
            'programa_id' => $this->programa->id,
            'criacao_usuario_id' => $this->usuario->id,
            'data_inicio' => '2024-04-01',
            'data_fim' => '2024-12-31',
        ]);

        $response = $this->getJson('/api/__tests/v2/plano-entrega?' . http_build_query([
            'unidade_id' => $this->unidade->id,
            'data_inicio' => '2024-01-01',
            'data_fim' => '2024-12-31',
        ]));

        $data = $response->json('data');

        expect($data)->toHaveCount(2);
        expect($data[0]['id'])->toBe($peRecente->id);
        expect($data[1]['id'])->toBe($peAntigo->id);
    });

    test('retorna todos os PEs quando datas não informadas', function () {
        $this->actingAs($this->usuario, 'web');

        PlanoEntrega::factory()->count(2)->create([
            'unidade_id' => $this->unidade->id,
            'programa_id' => $this->programa->id,
            'criacao_usuario_id' => $this->usuario->id,
        ]);

        $response = $this->getJson('/api/__tests/v2/plano-entrega?unidade_id=' . $this->unidade->id);

        expect($response->json('data'))->toHaveCount(2);
    });
});
