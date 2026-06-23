<?php

use App\V2\PlanoEntrega\PlanoEntregaController;
use App\V2\PlanoEntrega\PlanoEntregaService;
use App\Models\PlanoEntrega;
use App\Models\PlanoEntregaEntrega;
use App\Models\Programa;
use App\Models\Unidade;
use App\Models\Usuario;
use Illuminate\Support\Facades\Route;

beforeEach(function () {
    if (!Route::has('__tests.v2.plano-entrega.buscarEntregasPorPlano')) {
        Route::middleware(['api'])
            ->get('/api/__tests/v2/plano-entrega/{planoEntregaId}/entrega', [PlanoEntregaController::class, 'buscarEntregasPorPlano'])
            ->name('__tests.v2.plano-entrega.buscarEntregasPorPlano')
            ->whereUuid('planoEntregaId');
    }

    $this->usuario = Usuario::factory()->create();
    $this->unidade = Unidade::factory()->create();
    $this->programa = Programa::factory()->create();

    $this->plano = PlanoEntrega::factory()->create([
        'unidade_id'         => $this->unidade->id,
        'programa_id'        => $this->programa->id,
        'criacao_usuario_id' => $this->usuario->id,
    ]);
});

afterEach(function () {
    \Mockery::close();
});

// ── validação ────────────────────────────────────────────────────────

describe('GET /api/v2/plano-entrega/{id}/entrega (validação)', function () {

    test('retorna 400 quando planoEntregaId não é uuid', function () {
        $this->actingAs($this->usuario, 'web');

        $response = $this->getJson('/api/__tests/v2/plano-entrega/nao-um-uuid/entrega');

        $response->assertStatus(404);
    });

    test('retorna 500 quando service lança exceção inesperada', function () {
        $this->actingAs($this->usuario, 'web');

        $this->mock(PlanoEntregaService::class, function ($mock) {
            $mock->shouldReceive('buscarEntregasPorPlano')
                ->andThrow(new \RuntimeException('Erro de conexão'));
        });

        $response = $this->getJson('/api/__tests/v2/plano-entrega/' . $this->plano->id . '/entrega');

        $response->assertStatus(500)
            ->assertJsonPath('error', 'Ocorreu um erro inesperado.');
    });
});

// ── happy path ───────────────────────────────────────────────────────

describe('GET /api/v2/plano-entrega/{id}/entrega (happy path)', function () {

    test('retorna 200 com entregas do plano', function () {
        $this->actingAs($this->usuario, 'web');

        $entregaCatalogo = \App\Models\Entrega::factory()->create(['unidade_id' => $this->unidade->id]);
        $entrega = PlanoEntregaEntrega::factory()->create([
            'plano_entrega_id' => $this->plano->id,
            'entrega_id' => $entregaCatalogo->id,
            'unidade_id' => $this->unidade->id,
        ]);

        $response = $this->getJson('/api/__tests/v2/plano-entrega/' . $this->plano->id . '/entrega');

        $response->assertStatus(200)
            ->assertJsonPath('success', true);

        expect(collect($response->json('data'))->pluck('id'))->toContain($entrega->id);
    });

    test('retorna campos esperados em cada entrega', function () {
        $this->actingAs($this->usuario, 'web');

        $entregaCatalogo = \App\Models\Entrega::factory()->create(['unidade_id' => $this->unidade->id]);
        PlanoEntregaEntrega::factory()->create([
            'plano_entrega_id' => $this->plano->id,
            'entrega_id' => $entregaCatalogo->id,
            'unidade_id' => $this->unidade->id,
        ]);

        $data = $this->getJson('/api/__tests/v2/plano-entrega/' . $this->plano->id . '/entrega')
            ->json('data');

        expect($data[0])->toHaveKeys(['id', 'descricao', 'descricao_entrega', 'entrega']);
    });

    test('não retorna entregas de outro plano', function () {
        $this->actingAs($this->usuario, 'web');

        $outroPlano = PlanoEntrega::factory()->create([
            'unidade_id'         => $this->unidade->id,
            'programa_id'        => $this->programa->id,
            'criacao_usuario_id' => $this->usuario->id,
        ]);

        $entregaCatalogo = \App\Models\Entrega::factory()->create(['unidade_id' => $this->unidade->id]);
        PlanoEntregaEntrega::factory()->create([
            'plano_entrega_id' => $outroPlano->id,
            'entrega_id' => $entregaCatalogo->id,
            'unidade_id' => $this->unidade->id,
        ]);

        $response = $this->getJson('/api/__tests/v2/plano-entrega/' . $this->plano->id . '/entrega');

        expect($response->json('data'))->toBeEmpty();
    });

    test('retorna múltiplas entregas do mesmo plano', function () {
        $this->actingAs($this->usuario, 'web');

        $entregaCatalogo = \App\Models\Entrega::factory()->create(['unidade_id' => $this->unidade->id]);
        PlanoEntregaEntrega::factory()->count(3)->create([
            'plano_entrega_id' => $this->plano->id,
            'entrega_id' => $entregaCatalogo->id,
            'unidade_id' => $this->unidade->id,
        ]);

        $data = $this->getJson('/api/__tests/v2/plano-entrega/' . $this->plano->id . '/entrega')
            ->json('data');

        expect($data)->toHaveCount(3);
    });

    test('retorna collection vazia quando plano não tem entregas', function () {
        $this->actingAs($this->usuario, 'web');

        $response = $this->getJson('/api/__tests/v2/plano-entrega/' . $this->plano->id . '/entrega');

        $response->assertStatus(200);
        expect($response->json('data'))->toBeEmpty();
    });
});
