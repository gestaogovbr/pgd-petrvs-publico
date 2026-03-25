<?php

use App\V2\PlanoTrabalho\PlanoTrabalhoController;
use App\Models\PlanoTrabalho;
use App\Models\Programa;
use App\Models\TipoModalidade;
use App\Models\Unidade;
use App\Models\Usuario;
use App\Models\Perfil;
use Illuminate\Support\Facades\Route;

beforeEach(function () {
    if (!Route::has('__e2e.v2.plano-trabalho.store')) {
        Route::middleware(['api'])->post('/api/__e2e/v2/plano-trabalho', [PlanoTrabalhoController::class, 'store'])
            ->name('__e2e.v2.plano-trabalho.store');
    }
    if (!Route::has('__e2e.v2.plano-trabalho.index')) {
        Route::middleware(['api'])->get('/api/__e2e/v2/plano-trabalho', [PlanoTrabalhoController::class, 'index'])
            ->name('__e2e.v2.plano-trabalho.index');
    }

    $perfil = Perfil::factory()->create();
    $tipoModalidade = TipoModalidade::factory()->create();

    $this->unidade = Unidade::factory()->create();
    $this->usuario = Usuario::factory()->create([
        'perfil_id' => $perfil->id,
        'tipo_modalidade_id' => $tipoModalidade->id,
    ]);
    $this->programa = Programa::factory()->create([
        'data_inicio' => '2024-01-01',
        'data_fim' => '2025-12-31',
    ]);
    $this->tipoModalidadeId = $tipoModalidade->id;
});

describe('POST /api/v2/plano-trabalho (e2e)', function () {

    test('persiste o plano de trabalho no banco e retorna 201', function () {
        $this->actingAs($this->usuario, 'web');

        $payload = [
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
            'programa_id' => $this->programa->id,
            'data_inicio' => '2024-06-01',
            'data_fim' => '2024-12-31',
            'tipo_modalidade_id' => $this->tipoModalidadeId,
        ];

        $response = $this->postJson('/api/__e2e/v2/plano-trabalho', $payload);

        $response->assertStatus(201)
            ->assertJsonPath('success', true);

        $planoId = $response->json('rows.0.id');

        $this->assertDatabaseHas('planos_trabalhos', [
            'id' => $planoId,
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
            'programa_id' => $this->programa->id,
            'status' => 'INCLUIDO',
        ]);
    });

    test('plano criado possui numero gerado automaticamente', function () {
        $this->actingAs($this->usuario, 'web');

        $response = $this->postJson('/api/__e2e/v2/plano-trabalho', [
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
            'programa_id' => $this->programa->id,
            'data_inicio' => '2024-06-01',
            'data_fim' => '2024-12-31',
            'tipo_modalidade_id' => $this->tipoModalidadeId,
        ]);

        $planoId = $response->json('rows.0.id');
        $plano = PlanoTrabalho::find($planoId);

        expect($plano->numero)->toBeGreaterThan(0);
    });
});

describe('GET /api/v2/plano-trabalho (e2e)', function () {

    test('retorna plano existente filtrado por usuario_id', function () {
        $this->actingAs($this->usuario, 'web');

        $plano = PlanoTrabalho::factory()->create([
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'data_inicio' => '2024-01-01',
            'data_fim' => '2024-12-31',
            'status' => 'INCLUIDO',
        ]);

        $outroUsuario = Usuario::factory()->create();
        PlanoTrabalho::factory()->create([
            'usuario_id' => $outroUsuario->id,
            'unidade_id' => $this->unidade->id,
            'tipo_modalidade_id' => $this->tipoModalidadeId,
        ]);

        $response = $this->getJson('/api/__e2e/v2/plano-trabalho?' . http_build_query([
            'filters' => ['usuario_id' => $this->usuario->id],
        ]));

        $response->assertStatus(200)
            ->assertJsonPath('success', true);

        $items = $response->json('data.data');

        expect($items)->toHaveCount(1)
            ->and($items[0]['id'])->toBe($plano->id);
    });

    test('retorna apenas planos vigentes', function () {
        $this->actingAs($this->usuario, 'web');

        $vigente = PlanoTrabalho::factory()->create([
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'data_inicio' => now()->subMonth(),
            'data_fim' => now()->addMonth(),
        ]);

        PlanoTrabalho::factory()->create([
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'data_inicio' => now()->subYear(),
            'data_fim' => now()->subMonths(6),
        ]);

        $response = $this->getJson('/api/__e2e/v2/plano-trabalho?' . http_build_query([
            'filters' => ['vigentes' => true],
        ]));

        $items = $response->json('data.data');

        expect($items)->toHaveCount(1)
            ->and($items[0]['id'])->toBe($vigente->id);
    });

    test('retorna planos dentro do intervalo de datas', function () {
        $this->actingAs($this->usuario, 'web');

        $dentroIntervalo = PlanoTrabalho::factory()->create([
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'data_inicio' => '2024-03-01',
            'data_fim' => '2024-06-30',
        ]);

        PlanoTrabalho::factory()->create([
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'data_inicio' => '2025-06-01',
            'data_fim' => '2025-12-31',
        ]);

        $response = $this->getJson('/api/__e2e/v2/plano-trabalho?' . http_build_query([
            'filters' => [
                'data_inicio' => '2024-01-01',
                'data_fim' => '2024-12-31',
            ],
        ]));

        $items = $response->json('data.data');

        expect($items)->toHaveCount(1)
            ->and($items[0]['id'])->toBe($dentroIntervalo->id);
    });
});
