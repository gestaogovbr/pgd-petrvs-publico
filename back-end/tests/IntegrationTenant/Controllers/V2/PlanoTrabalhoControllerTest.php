<?php

use App\Enums\PerfilEnum;
use App\Enums\StatusEnum;
use App\V2\PlanoTrabalho\PlanoTrabalhoController;
use App\V2\PlanoTrabalho\PlanoTrabalhoService;
use App\Models\PlanoTrabalho;
use App\Models\Programa;
use App\Models\TipoModalidade;
use App\Models\Unidade;
use App\Models\Usuario;
use App\Models\Perfil;
use App\Exceptions\ValidateException;
use Illuminate\Support\Facades\Route;
use Illuminate\Pagination\LengthAwarePaginator;
use Mockery;

beforeEach(function () {
    if (!Route::has('__tests.v2.plano-trabalho.index')) {
        Route::middleware(['api'])->get('/api/__tests/v2/plano-trabalho', [PlanoTrabalhoController::class, 'index'])
            ->name('__tests.v2.plano-trabalho.index');
    }
    if (!Route::has('__tests.v2.plano-trabalho.statuses')) {
        Route::middleware(['api'])->get('/api/__tests/v2/plano-trabalho/statuses', [PlanoTrabalhoController::class, 'statuses'])
            ->name('__tests.v2.plano-trabalho.statuses');
    }
    if (!Route::has('__tests.v2.plano-trabalho.store')) {
        Route::middleware(['api'])->post('/api/__tests/v2/plano-trabalho', [PlanoTrabalhoController::class, 'store'])
            ->name('__tests.v2.plano-trabalho.store');
    }
    if (!Route::has('__tests.v2.plano-trabalho.show')) {
        Route::middleware(['api'])->get('/api/__tests/v2/plano-trabalho/{id}', [PlanoTrabalhoController::class, 'show'])
            ->name('__tests.v2.plano-trabalho.show');
    }
    if (!Route::has('__tests.v2.plano-trabalho.destroy')) {
        Route::middleware(['api'])->delete('/api/__tests/v2/plano-trabalho/{id}', [PlanoTrabalhoController::class, 'destroy'])
            ->name('__tests.v2.plano-trabalho.destroy');
    }
    if (!Route::has('__tests.v2.plano-trabalho.cancelar')) {
        Route::middleware(['api'])->patch('/api/__tests/v2/plano-trabalho/{id}/cancelar', [PlanoTrabalhoController::class, 'cancelar'])
            ->name('__tests.v2.plano-trabalho.cancelar');
    }
    if (!Route::has('__tests.v2.plano-trabalho.encerrar')) {
        Route::middleware(['api'])->patch('/api/__tests/v2/plano-trabalho/{id}/encerrar', [PlanoTrabalhoController::class, 'encerrar'])
            ->name('__tests.v2.plano-trabalho.encerrar');
    }
    if (!Route::has('__tests.v2.plano-trabalho.arquivar')) {
        Route::middleware(['api'])->patch('/api/__tests/v2/plano-trabalho/{id}/arquivar', [PlanoTrabalhoController::class, 'arquivar'])
            ->name('__tests.v2.plano-trabalho.arquivar');
    }

    $perfil = Perfil::factory()->create(['nivel' => PerfilEnum::PARTICIPANTE]);
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

afterEach(function () {
    Mockery::close();
});

function validStorePayload(): array
{
    return [
        'usuario_id' => fake()->uuid(),
        'unidade_id' => fake()->uuid(),
        'programa_id' => fake()->uuid(),
        'data_inicio' => '2025-01-01',
        'data_fim' => '2025-06-30',
        'tipo_modalidade_id' => fake()->uuid(),
    ];
}

// ── GET index: validação ────────────────────────────────────────────

describe('GET /api/v2/plano-trabalho (validação)', function () {

    test('retorna 200 com service mockado', function () {
        $this->actingAs($this->usuario, 'web');

        $this->mock(PlanoTrabalhoService::class, function ($mock) {
            $mock->shouldReceive('index')
                ->once()
                ->andReturn(new LengthAwarePaginator([], 0, 15));
        });

        $response = $this->getJson('/api/__tests/v2/plano-trabalho?' . http_build_query([
            'size' => 15,
            'page' => 1,
            'filters' => ['vigentes' => true],
        ]));

        $response->assertStatus(200)
            ->assertJsonPath('success', true);
    });

    test('retorna 400 quando size não é inteiro', function () {
        $this->actingAs($this->usuario, 'web');

        $this->getJson('/api/__tests/v2/plano-trabalho?size=abc')
            ->assertStatus(400);
    });

    test('retorna 400 quando page não é inteiro', function () {
        $this->actingAs($this->usuario, 'web');

        $this->getJson('/api/__tests/v2/plano-trabalho?page=abc')
            ->assertStatus(400);
    });

    test('retorna 400 quando filters.usuario_id não é uuid', function () {
        $this->actingAs($this->usuario, 'web');

        $this->getJson('/api/__tests/v2/plano-trabalho?' . http_build_query([
            'filters' => ['usuario_id' => 'nao-uuid'],
        ]))->assertStatus(400);
    });

    test('retorna 400 quando filters.data_inicio é data inválida', function () {
        $this->actingAs($this->usuario, 'web');

        $this->getJson('/api/__tests/v2/plano-trabalho?' . http_build_query([
            'filters' => ['data_inicio' => 'nao-data'],
        ]))->assertStatus(400);
    });

    test('retorna 422 quando service lança ValidateException', function () {
        $this->actingAs($this->usuario, 'web');

        $this->mock(PlanoTrabalhoService::class, function ($mock) {
            $mock->shouldReceive('index')
                ->andThrow(new ValidateException('Informe ao menos um filtro para a busca.'));
        });

        $response = $this->getJson('/api/__tests/v2/plano-trabalho?' . http_build_query([
            'page' => 1,
            'size' => 15,
        ]));

        $response->assertStatus(422)
            ->assertJson(fn ($json) =>
                $json->where('error', fn ($error) => str_contains($error, 'Informe ao menos um filtro'))
            );
    });
});

// ── GET index: happy path (sem mock) ────────────────────────────────

describe('GET /api/v2/plano-trabalho (happy path)', function () {

    test('retorna plano filtrado por usuario_id', function () {
        $this->actingAs($this->usuario, 'web');

        $plano = PlanoTrabalho::factory()->create([
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'data_inicio' => '2024-01-01',
            'data_fim' => '2024-12-31',
        ]);

        $outroUsuario = Usuario::factory()->create();
        PlanoTrabalho::factory()->create([
            'usuario_id' => $outroUsuario->id,
            'unidade_id' => $this->unidade->id,
            'tipo_modalidade_id' => $this->tipoModalidadeId,
        ]);

        $response = $this->getJson('/api/__tests/v2/plano-trabalho?' . http_build_query([
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
            'status' => StatusEnum::ATIVO,
        ]);

        PlanoTrabalho::factory()->create([
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'data_inicio' => now()->subYear(),
            'data_fim' => now()->subMonths(6),
            'status' => StatusEnum::ATIVO,
        ]);

        $response = $this->getJson('/api/__tests/v2/plano-trabalho?' . http_build_query([
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

        $response = $this->getJson('/api/__tests/v2/plano-trabalho?' . http_build_query([
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

// ── POST store: validação ───────────────────────────────────────────

describe('POST /api/v2/plano-trabalho (validação)', function () {

    test('retorna 400 quando payload vazio', function () {
        $this->actingAs($this->usuario, 'web');

        $this->postJson('/api/__tests/v2/plano-trabalho', [])
            ->assertStatus(400)
            ->assertJsonStructure(['error']);
    });

    test('retorna 400 quando usuario_id não é uuid', function () {
        $this->actingAs($this->usuario, 'web');

        $payload = validStorePayload();
        $payload['usuario_id'] = 'nao-uuid';

        $this->postJson('/api/__tests/v2/plano-trabalho', $payload)
            ->assertStatus(400);
    });

    test('retorna 400 quando data_fim anterior a data_inicio', function () {
        $this->actingAs($this->usuario, 'web');

        $payload = validStorePayload();
        $payload['data_inicio'] = '2025-06-30';
        $payload['data_fim'] = '2025-01-01';

        $this->postJson('/api/__tests/v2/plano-trabalho', $payload)
            ->assertStatus(400);
    });

    test('retorna 400 quando tipo_modalidade_id ausente', function () {
        $this->actingAs($this->usuario, 'web');

        $payload = validStorePayload();
        unset($payload['tipo_modalidade_id']);

        $this->postJson('/api/__tests/v2/plano-trabalho', $payload)
            ->assertStatus(400);
    });

    test('retorna 400 quando programa_id ausente', function () {
        $this->actingAs($this->usuario, 'web');

        $payload = validStorePayload();
        unset($payload['programa_id']);

        $this->postJson('/api/__tests/v2/plano-trabalho', $payload)
            ->assertStatus(400);
    });

    test('retorna 422 quando service lança ValidateException', function () {
        $this->actingAs($this->usuario, 'web');

        $this->mock(PlanoTrabalhoService::class, function ($mock) {
            $mock->shouldReceive('store')
                ->andThrow(new ValidateException('A unidade está inativa.'));
        });

        $this->postJson('/api/__tests/v2/plano-trabalho', validStorePayload())
            ->assertStatus(422)
            ->assertJson(fn ($json) =>
                $json->where('error', fn ($error) => str_contains($error, 'A unidade está inativa.'))
            );
    });
});

// ── POST store: modalidade divergente (RN24) ─────────────────────────

describe('POST /api/v2/plano-trabalho (modalidade divergente)', function () {

    test('retorna 422 quando modalidade diverge do SIAPE sem justificativa', function () {
        $this->actingAs($this->usuario, 'web');

        $outraModalidade = \App\Models\TipoModalidade::factory()->create();

        $this->postJson('/api/__tests/v2/plano-trabalho', [
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
            'programa_id' => $this->programa->id,
            'data_inicio' => '2024-06-01',
            'data_fim' => '2024-12-31',
            'tipo_modalidade_id' => $outraModalidade->id,
        ])->assertStatus(422);
    });

    test('retorna 201 quando modalidade diverge do SIAPE com justificativa', function () {
        $this->actingAs($this->usuario, 'web');

        $outraModalidade = \App\Models\TipoModalidade::factory()->create();

        $this->postJson('/api/__tests/v2/plano-trabalho', [
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
            'programa_id' => $this->programa->id,
            'data_inicio' => '2024-06-01',
            'data_fim' => '2024-12-31',
            'tipo_modalidade_id' => $outraModalidade->id,
            'justificativa' => 'Modalidade ajustada por necessidade do serviço.',
        ])->assertStatus(201);
    });

    test('persiste justificativa_modalidade quando modalidade diverge', function () {
        $this->actingAs($this->usuario, 'web');

        $outraModalidade = \App\Models\TipoModalidade::factory()->create();

        $response = $this->postJson('/api/__tests/v2/plano-trabalho', [
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
            'programa_id' => $this->programa->id,
            'data_inicio' => '2024-06-01',
            'data_fim' => '2024-12-31',
            'tipo_modalidade_id' => $outraModalidade->id,
            'justificativa' => 'Necessidade do serviço.',
        ]);

        $this->assertDatabaseHas('planos_trabalhos', [
            'id' => $response->json('data.id'),
            'justificativa_modalidade' => 'Necessidade do serviço.',
        ]);
    });
});

// ── POST store: happy path (sem mock) ───────────────────────────────

describe('POST /api/v2/plano-trabalho (happy path)', function () {

    test('persiste o plano no banco e retorna 201', function () {
        $this->actingAs($this->usuario, 'web');

        $response = $this->postJson('/api/__tests/v2/plano-trabalho', [
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
            'programa_id' => $this->programa->id,
            'data_inicio' => '2024-06-01',
            'data_fim' => '2024-12-31',
            'tipo_modalidade_id' => $this->tipoModalidadeId,
        ]);

        $response->assertStatus(201)
            ->assertJsonPath('success', true);

        $this->assertDatabaseHas('planos_trabalhos', [
            'id' => $response->json('data.id'),
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
            'programa_id' => $this->programa->id,
            'status' => 'INCLUIDO',
        ]);
    });

    test('plano criado possui numero gerado automaticamente', function () {
        $this->actingAs($this->usuario, 'web');

        $response = $this->postJson('/api/__tests/v2/plano-trabalho', [
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
            'programa_id' => $this->programa->id,
            'data_inicio' => '2024-06-01',
            'data_fim' => '2024-12-31',
            'tipo_modalidade_id' => $this->tipoModalidadeId,
        ]);

        $plano = PlanoTrabalho::find($response->json('data.id'));

        expect($plano->numero)->toBeGreaterThan(0);
    });
});

// -- DELETE destroy -----------------------------------------------------------

describe('DELETE /api/v2/plano-trabalho/:id (happy path)', function () {

    test('exclui PT com status INCLUIDO e retorna 200', function () {
        $this->actingAs($this->usuario, 'web');

        $plano = PlanoTrabalho::factory()->create([
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'criacao_usuario_id' => $this->usuario->id,
            'status' => 'INCLUIDO',
        ]);

        $response = $this->deleteJson("/api/__tests/v2/plano-trabalho/{$plano->id}");

        $response->assertStatus(200)
            ->assertJsonPath('success', true);

        $this->assertSoftDeleted('planos_trabalhos', ['id' => $plano->id]);
    });
});

describe('DELETE /api/v2/plano-trabalho/:id (validacao)', function () {

    test('retorna 400 quando PT ja possui assinatura', function () {
        $this->actingAs($this->usuario, 'web');

        $plano = PlanoTrabalho::factory()->create([
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'criacao_usuario_id' => $this->usuario->id,
            'status' => 'AGUARDANDO_ASSINATURA',
        ]);

        $this->deleteJson("/api/__tests/v2/plano-trabalho/{$plano->id}")
            ->assertStatus(422);
    });

    test('retorna 404 quando PT nao encontrado', function () {
        $this->actingAs($this->usuario, 'web');

        $this->deleteJson('/api/__tests/v2/plano-trabalho/' . fake()->uuid())
            ->assertStatus(404);
    });
});

// ── GET show ────────────────────────────────────────────────────────

describe('GET /api/v2/plano-trabalho/:id (happy path)', function () {

    test('retorna plano existente com relations', function () {
        $this->actingAs($this->usuario, 'web');

        $plano = PlanoTrabalho::factory()->create([
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
            'tipo_modalidade_id' => $this->tipoModalidadeId,
        ]);

        $response = $this->getJson("/api/__tests/v2/plano-trabalho/{$plano->id}");

        $response->assertStatus(200)
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.id', $plano->id);
    });

    test('retorna relations carregadas', function () {
        $this->actingAs($this->usuario, 'web');

        $plano = PlanoTrabalho::factory()->create([
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
            'tipo_modalidade_id' => $this->tipoModalidadeId,
        ]);

        $data = $this->getJson("/api/__tests/v2/plano-trabalho/{$plano->id}")
            ->json('data');

        expect($data)->toHaveKeys(['usuario', 'unidade', 'programa', 'tipo_modalidade', 'entregas', 'consolidacoes']);
    });
});

describe('GET /api/v2/plano-trabalho/:id (validação)', function () {

    test('retorna 404 quando plano não existe', function () {
        $this->actingAs($this->usuario, 'web');

        $this->getJson('/api/__tests/v2/plano-trabalho/' . fake()->uuid())
            ->assertStatus(404);
    });
});

// ── GET statuses ──────────────────────────────────────────────────────────

describe('GET /api/v2/plano-trabalho/statuses', function () {

    test('retorna 200 com todos os statuses', function () {
        $this->actingAs($this->usuario, 'web');

        $response = $this->getJson('/api/__tests/v2/plano-trabalho/statuses');

        $response->assertStatus(200)
            ->assertJsonPath('success', true);

        $data = $response->json('data');
        expect($data)->toBe(PlanoTrabalho::STATUSES);
    });
});

// ── PATCH cancelar ──────────────────────────────────────────────────

describe('PATCH /api/v2/plano-trabalho/:id/cancelar', function () {

    function criarPlanoAtivo($context): PlanoTrabalho
    {
        $plano = PlanoTrabalho::factory()->create([
            'usuario_id' => $context->usuario->id,
            'unidade_id' => $context->unidade->id,
            'tipo_modalidade_id' => $context->tipoModalidadeId,
            'criacao_usuario_id' => $context->usuario->id,
            'programa_id' => $context->programa->id,
            'data_inicio' => '2025-01-01',
            'data_fim' => '2025-06-30',
            'status' => 'ATIVO',
        ]);

        return $plano;
    }

    test('cancela plano com sucesso', function () {
        $this->actingAs($this->usuario, 'web');
        $plano = criarPlanoAtivo($this);

        $response = $this->patchJson("/api/__tests/v2/plano-trabalho/{$plano->id}/cancelar", [
            'justificativa' => 'Plano não será mais necessário.',
        ]);

        $response->assertStatus(200)
            ->assertJsonPath('success', true);

        $this->assertDatabaseHas('planos_trabalhos', [
            'id' => $plano->id,
            'status' => 'CANCELADO',
        ]);
    });

    test('cancela plano que possui consolidacoes', function () {
        $this->actingAs($this->usuario, 'web');
        $plano = criarPlanoAtivo($this);

        \App\Models\PlanoTrabalhoConsolidacao::factory()->create([
            'plano_trabalho_id' => $plano->id,
            'status' => 'INCLUIDO',
        ]);

        $this->patchJson("/api/__tests/v2/plano-trabalho/{$plano->id}/cancelar", [
            'justificativa' => 'Cancelamento.',
        ])->assertStatus(200);

        $this->assertDatabaseHas('planos_trabalhos', [
            'id' => $plano->id,
            'status' => 'CANCELADO',
        ]);
    });

    test('retorna 422 quando plano nao esta ativo', function () {
        $this->actingAs($this->usuario, 'web');

        $plano = PlanoTrabalho::factory()->create([
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'criacao_usuario_id' => $this->usuario->id,
            'programa_id' => $this->programa->id,
            'status' => 'INCLUIDO',
        ]);

        $this->patchJson("/api/__tests/v2/plano-trabalho/{$plano->id}/cancelar", [
            'justificativa' => 'Tentativa.',
        ])->assertStatus(422);
    });

    test('retorna 422 quando possui consolidacao finalizada', function () {
        $this->actingAs($this->usuario, 'web');
        $plano = criarPlanoAtivo($this);

        \App\Models\PlanoTrabalhoConsolidacao::factory()->create([
            'plano_trabalho_id' => $plano->id,
            'status' => 'CONCLUIDO',
        ]);

        $this->patchJson("/api/__tests/v2/plano-trabalho/{$plano->id}/cancelar", [
            'justificativa' => 'Tentativa.',
        ])->assertStatus(422);
    });

    test('retorna 400 quando justificativa ausente', function () {
        $this->actingAs($this->usuario, 'web');
        $plano = criarPlanoAtivo($this);

        $this->patchJson("/api/__tests/v2/plano-trabalho/{$plano->id}/cancelar", [])
            ->assertStatus(400);
    });

    test('retorna 404 quando plano nao existe', function () {
        $this->actingAs($this->usuario, 'web');

        $this->patchJson('/api/__tests/v2/plano-trabalho/' . fake()->uuid() . '/cancelar', [
            'justificativa' => 'Tentativa.',
        ])->assertStatus(404);
    });
});

// ── PATCH encerrar ──────────────────────────────────────────────────

describe('PATCH /api/v2/plano-trabalho/:id/encerrar', function () {

    function criarPlanoAtivoComConsolidacoes($context): PlanoTrabalho
    {
        $hoje = now();
        $plano = PlanoTrabalho::factory()->create([
            'usuario_id' => $context->usuario->id,
            'unidade_id' => $context->unidade->id,
            'tipo_modalidade_id' => $context->tipoModalidadeId,
            'criacao_usuario_id' => $context->usuario->id,
            'programa_id' => $context->programa->id,
            'data_inicio' => $hoje->copy()->subMonths(6)->format('Y-m-d'),
            'data_fim' => $hoje->copy()->addMonths(6)->format('Y-m-d'),
            'status' => 'ATIVO',
        ]);

        // Passada
        \App\Models\PlanoTrabalhoConsolidacao::factory()->create([
            'plano_trabalho_id' => $plano->id,
            'data_inicio' => $hoje->copy()->subMonths(6)->format('Y-m-d'),
            'data_fim' => $hoje->copy()->subMonths(3)->format('Y-m-d'),
            'status' => 'AVALIADO',
        ]);

        // Vigente (inclui hoje)
        \App\Models\PlanoTrabalhoConsolidacao::factory()->create([
            'plano_trabalho_id' => $plano->id,
            'data_inicio' => $hoje->copy()->subMonths(1)->format('Y-m-d'),
            'data_fim' => $hoje->copy()->addMonths(1)->format('Y-m-d'),
            'status' => 'INCLUIDO',
        ]);

        // Futura 1
        \App\Models\PlanoTrabalhoConsolidacao::factory()->create([
            'plano_trabalho_id' => $plano->id,
            'data_inicio' => $hoje->copy()->addMonths(2)->format('Y-m-d'),
            'data_fim' => $hoje->copy()->addMonths(4)->format('Y-m-d'),
            'status' => 'INCLUIDO',
        ]);

        // Futura 2
        \App\Models\PlanoTrabalhoConsolidacao::factory()->create([
            'plano_trabalho_id' => $plano->id,
            'data_inicio' => $hoje->copy()->addMonths(4)->addDay()->format('Y-m-d'),
            'data_fim' => $hoje->copy()->addMonths(6)->format('Y-m-d'),
            'status' => 'INCLUIDO',
        ]);

        return $plano;
    }

    test('encerra plano com sucesso', function () {
        $this->actingAs($this->usuario, 'web');
        $plano = criarPlanoAtivoComConsolidacoes($this);
        $dataFimOriginal = (string) $plano->data_fim;

        $response = $this->patchJson("/api/__tests/v2/plano-trabalho/{$plano->id}/encerrar", [
            'justificativa' => 'Encerramento antecipado por necessidade.',
        ]);

        $response->assertStatus(200)
            ->assertJsonPath('success', true);

        $plano->refresh();
        expect($plano->status)->toBe('CONCLUIDO');
        expect(substr((string) $plano->data_fim, 0, 10))->toBe(substr($dataFimOriginal, 0, 10));
        expect($plano->encerrado_at)->toBe(now()->format('Y-m-d'));
    });

    test('preserva todas as consolidacoes', function () {
        $this->actingAs($this->usuario, 'web');
        $plano = criarPlanoAtivoComConsolidacoes($this);

        $this->patchJson("/api/__tests/v2/plano-trabalho/{$plano->id}/encerrar", [
            'justificativa' => 'Encerramento.',
        ])->assertStatus(200);

        $total = \App\Models\PlanoTrabalhoConsolidacao::where('plano_trabalho_id', $plano->id)->count();
        expect($total)->toBe(4);
    });

    test('registra justificativa no historico de status', function () {
        $this->actingAs($this->usuario, 'web');
        $plano = criarPlanoAtivoComConsolidacoes($this);

        $this->patchJson("/api/__tests/v2/plano-trabalho/{$plano->id}/encerrar", [
            'justificativa' => 'Motivo do encerramento.',
        ])->assertStatus(200);

        $this->assertDatabaseHas('status_justificativas', [
            'plano_trabalho_id' => $plano->id,
            'codigo' => 'CONCLUIDO',
        ]);
    });

    test('retorna 422 quando plano nao esta ativo', function () {
        $this->actingAs($this->usuario, 'web');

        $plano = PlanoTrabalho::factory()->create([
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'criacao_usuario_id' => $this->usuario->id,
            'programa_id' => $this->programa->id,
            'status' => 'INCLUIDO',
        ]);

        $this->patchJson("/api/__tests/v2/plano-trabalho/{$plano->id}/encerrar", [
            'justificativa' => 'Tentativa.',
        ])->assertStatus(422);
    });

    test('retorna 400 quando justificativa ausente', function () {
        $this->actingAs($this->usuario, 'web');
        $plano = criarPlanoAtivoComConsolidacoes($this);

        $this->patchJson("/api/__tests/v2/plano-trabalho/{$plano->id}/encerrar", [])
            ->assertStatus(400);
    });

    test('retorna 404 quando plano nao existe', function () {
        $this->actingAs($this->usuario, 'web');

        $this->patchJson('/api/__tests/v2/plano-trabalho/' . fake()->uuid() . '/encerrar', [
            'justificativa' => 'Tentativa.',
        ])->assertStatus(404);
    });
});

// ── PATCH arquivar ──────────────────────────────────────────────────

describe('PATCH /api/v2/plano-trabalho/:id/arquivar', function () {

    test('arquiva plano cancelado', function () {
        $this->actingAs($this->usuario, 'web');

        $plano = PlanoTrabalho::factory()->create([
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'criacao_usuario_id' => $this->usuario->id,
            'programa_id' => $this->programa->id,
            'status' => 'CANCELADO',
        ]);

        $this->patchJson("/api/__tests/v2/plano-trabalho/{$plano->id}/arquivar")
            ->assertStatus(200)
            ->assertJsonPath('success', true);

        $plano->refresh();
        expect($plano->data_arquivamento)->not->toBeNull();
    });

    test('arquiva plano encerrado sem pendencias', function () {
        $this->actingAs($this->usuario, 'web');

        $plano = PlanoTrabalho::factory()->create([
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'criacao_usuario_id' => $this->usuario->id,
            'programa_id' => $this->programa->id,
            'status' => 'CONCLUIDO',
            'encerrado_at' => now()->subDays(5)->format('Y-m-d'),
        ]);

        \App\Models\PlanoTrabalhoConsolidacao::factory()->create([
            'plano_trabalho_id' => $plano->id,
            'status' => 'AVALIADO',
        ]);

        $this->patchJson("/api/__tests/v2/plano-trabalho/{$plano->id}/arquivar")
            ->assertStatus(200);
    });

    test('arquiva plano concluido com todos periodos avaliados fora do prazo de recurso', function () {
        $this->actingAs($this->usuario, 'web');

        $plano = PlanoTrabalho::factory()->create([
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'criacao_usuario_id' => $this->usuario->id,
            'programa_id' => $this->programa->id,
            'status' => 'CONCLUIDO',
        ]);

        $nota = \App\Models\TipoAvaliacaoNota::create([
            'id' => fake()->uuid(),
            'sequencia' => 3,
            'nota' => json_encode('Adequado'),
            'descricao' => 'Adequado',
            'pergunta' => '?',
            'aprova' => 1,
            'justifica' => 0,
            'icone' => 'bi bi-check',
            'cor' => '#28a745',
            'tipo_avaliacao_id' => $this->programa->tipo_avaliacao_plano_trabalho_id,
        ]);

        $consolidacao = \App\Models\PlanoTrabalhoConsolidacao::factory()->create([
            'plano_trabalho_id' => $plano->id,
            'status' => 'AVALIADO',
        ]);

        \App\Models\Avaliacao::create([
            'data_avaliacao' => now()->subDays(31)->format('Y-m-d H:i:s'),
            'nota' => $nota->nota,
            'justificativa' => null,
            'justificativas' => [],
            'avaliador_id' => $this->usuario->id,
            'plano_trabalho_consolidacao_id' => $consolidacao->id,
            'tipo_avaliacao_id' => $nota->tipo_avaliacao_id,
            'tipo_avaliacao_nota_id' => $nota->id,
        ]);

        $this->patchJson("/api/__tests/v2/plano-trabalho/{$plano->id}/arquivar")
            ->assertStatus(200);
    });

    test('retorna 422 quando plano ativo', function () {
        $this->actingAs($this->usuario, 'web');

        $plano = PlanoTrabalho::factory()->create([
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'criacao_usuario_id' => $this->usuario->id,
            'programa_id' => $this->programa->id,
            'status' => 'ATIVO',
        ]);

        $this->patchJson("/api/__tests/v2/plano-trabalho/{$plano->id}/arquivar")
            ->assertStatus(422);
    });

    test('retorna 422 quando avaliacao dentro do prazo de recurso', function () {
        $this->actingAs($this->usuario, 'web');

        $plano = PlanoTrabalho::factory()->create([
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'criacao_usuario_id' => $this->usuario->id,
            'programa_id' => $this->programa->id,
            'status' => 'CONCLUIDO',
        ]);

        $nota = \App\Models\TipoAvaliacaoNota::create([
            'id' => fake()->uuid(),
            'sequencia' => 3,
            'nota' => json_encode('Adequado'),
            'descricao' => 'Adequado',
            'pergunta' => '?',
            'aprova' => 1,
            'justifica' => 0,
            'icone' => 'bi bi-check',
            'cor' => '#28a745',
            'tipo_avaliacao_id' => $this->programa->tipo_avaliacao_plano_trabalho_id,
        ]);

        $consolidacao = \App\Models\PlanoTrabalhoConsolidacao::factory()->create([
            'plano_trabalho_id' => $plano->id,
            'status' => 'AVALIADO',
        ]);

        \App\Models\Avaliacao::create([
            'data_avaliacao' => now()->subDays(5)->format('Y-m-d H:i:s'),
            'nota' => $nota->nota,
            'justificativa' => null,
            'justificativas' => [],
            'avaliador_id' => $this->usuario->id,
            'plano_trabalho_consolidacao_id' => $consolidacao->id,
            'tipo_avaliacao_id' => $nota->tipo_avaliacao_id,
            'tipo_avaliacao_nota_id' => $nota->id,
        ]);

        $this->patchJson("/api/__tests/v2/plano-trabalho/{$plano->id}/arquivar")
            ->assertStatus(422);
    });

    test('retorna 422 quando ja esta arquivado', function () {
        $this->actingAs($this->usuario, 'web');

        $plano = PlanoTrabalho::factory()->create([
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'criacao_usuario_id' => $this->usuario->id,
            'programa_id' => $this->programa->id,
            'status' => 'CANCELADO',
            'data_arquivamento' => now(),
        ]);

        $this->patchJson("/api/__tests/v2/plano-trabalho/{$plano->id}/arquivar")
            ->assertStatus(422);
    });

    test('retorna 404 quando plano nao existe', function () {
        $this->actingAs($this->usuario, 'web');

        $this->patchJson('/api/__tests/v2/plano-trabalho/' . fake()->uuid() . '/arquivar')
            ->assertStatus(404);
    });
});
