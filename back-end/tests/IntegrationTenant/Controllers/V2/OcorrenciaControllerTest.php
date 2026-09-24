<?php

namespace Tests\IntegrationTenant\Controllers\V2;

use App\Models\Afastamento;
use App\V2\Ocorrencia\OcorrenciaController;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\PlanoTrabalhoConsolidacaoAfastamento;
use App\Models\TipoMotivoAfastamento;
use App\Models\UnidadeIntegrante;
use App\Models\UnidadeIntegranteAtribuicao as Atribuicao;
use App\Models\Usuario;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;

beforeEach(function () {
    if (!Route::has('__tests.v2.ocorrencia.store')) {
        Route::middleware(['api'])->post('/api/__tests/v2/ocorrencia', [OcorrenciaController::class, 'store'])
            ->name('__tests.v2.ocorrencia.store');
    }
    if (!Route::has('__tests.v2.ocorrencia.destroy')) {
        Route::middleware(['api'])->delete('/api/__tests/v2/ocorrencia/{ocorrenciaId}', [OcorrenciaController::class, 'destroy'])
            ->name('__tests.v2.ocorrencia.destroy');
    }
    if (!Route::has('__tests.v2.ocorrencia.index')) {
        Route::middleware(['api'])->get('/api/__tests/v2/ocorrencia', [OcorrenciaController::class, 'index'])
            ->name('__tests.v2.ocorrencia.index');
    }

    $this->usuario = Usuario::factory()->create();
    $this->actingAs($this->usuario);

    $this->tipoMotivo = TipoMotivoAfastamento::firstOrCreate(
        ['nome' => 'Licença Médica'],
        ['codigo' => 'LM', 'sigla' => 'LM', 'calculo' => 'DECRESCIMO', 'data_inicio' => now(), 'situacao' => 'ATIVO', 'icone' => 'bi bi-heart-pulse', 'cor' => '#FF0000', 'horas' => 0, 'integracao' => 0]
    );

    $this->plano = PlanoTrabalho::factory()->ativo()->create([
        'usuario_id' => $this->usuario->id,
        'data_inicio' => '2025-01-01',
        'data_fim' => '2025-06-30',
    ]);

    $this->consolidacao = PlanoTrabalhoConsolidacao::factory()->create([
        'plano_trabalho_id' => $this->plano->id,
        'data_inicio' => '2025-01-01',
        'data_fim' => '2025-01-31',
    ]);
});

function validPayload($ctx): array
{
    return [
        'usuario_id' => $ctx->usuario->id,
        'observacoes' => 'Consulta médica',
        'data_inicio' => '2025-01-10',
        'data_fim' => '2025-01-15',
        'tipo_motivo_afastamento_id' => $ctx->tipoMotivo->id,
    ];
}

// ── POST store ──────────────────────────────────────────────────────

describe('POST /api/v2/ocorrencia (validação)', function () {

    test('retorna 422 quando campos obrigatórios ausentes', function () {
        $this->postJson('/api/__tests/v2/ocorrencia', [])
            ->assertStatus(422);
    });

    test('retorna 422 quando data_fim anterior a data_inicio', function () {
        $payload = validPayload($this);
        $payload['data_inicio'] = '2025-01-15';
        $payload['data_fim'] = '2025-01-10';

        $this->postJson('/api/__tests/v2/ocorrencia', $payload)
            ->assertStatus(422);
    });
});

describe('POST /api/v2/ocorrencia (happy path)', function () {

    test('cria ocorrência e retorna 201', function () {
        $response = $this->postJson('/api/__tests/v2/ocorrencia', validPayload($this));

        $response->assertStatus(201)
            ->assertJsonPath('success', true);

        $data = $response->json('data');
        expect($data)->toHaveKeys(['id', 'observacoes', 'data_inicio', 'data_fim', 'tipo_motivo_afastamento']);
        expect($data['observacoes'])->toBe('Consulta médica');
    });

    test('persiste no banco com usuario_id correto', function () {
        $this->postJson('/api/__tests/v2/ocorrencia', validPayload($this));

        $this->assertDatabaseHas('afastamentos', [
            'usuario_id' => $this->usuario->id,
            'observacoes' => 'Consulta médica',
        ]);
    });
});

// ── DELETE destroy ──────────────────────────────────────────────────

describe('DELETE /api/v2/ocorrencia/:id', function () {

    test('remove ocorrência e vínculos com consolidações', function () {
        $afastamentoId = $this->postJson('/api/__tests/v2/ocorrencia', validPayload($this))->json('data.id');

        $this->deleteJson("/api/__tests/v2/ocorrencia/{$afastamentoId}", [
            'usuario_id' => $this->usuario->id,
        ])->assertStatus(204);

        $this->assertDatabaseMissing('afastamentos', ['id' => $afastamentoId, 'deleted_at' => null]);
        expect(PlanoTrabalhoConsolidacaoAfastamento::where('afastamento_id', $afastamentoId)->count())->toBe(0);
    });

    test('retorna 404 quando ocorrência não encontrada', function () {
        $this->deleteJson('/api/__tests/v2/ocorrencia/' . fake()->uuid(), [
            'usuario_id' => $this->usuario->id,
        ])->assertStatus(404);
    });

    test('bloqueia exclusão de ocorrência criada há mais de 365 dias', function () {
        $afId = Str::uuid()->toString();
        DB::connection('tenant')->table('afastamentos')->insert([
            'id' => $afId, 'usuario_id' => $this->usuario->id,
            'data_inicio' => '2025-01-01', 'data_fim' => '2025-01-31',
            'tipo_motivo_afastamento_id' => $this->tipoMotivo->id,
            'observacoes' => 'Antiga', 'created_at' => now()->subDays(400), 'updated_at' => now()->subDays(400),
        ]);

        $this->deleteJson("/api/__tests/v2/ocorrencia/{$afId}", [
            'usuario_id' => $this->usuario->id,
        ])->assertStatus(422)
            ->assertJsonPath('error', 'Ocorrência cadastrada há mais de 1 ano não pode ser excluída.');
    });
});

// ── GET index ───────────────────────────────────────────────────────

describe('GET /api/v2/ocorrencia', function () {

    test('retorna listagem paginada', function () {
        $this->postJson('/api/__tests/v2/ocorrencia', validPayload($this));

        $response = $this->getJson('/api/__tests/v2/ocorrencia?page=1&size=15');

        $response->assertStatus(200)
            ->assertJsonPath('success', true)
            ->assertJsonStructure(['data' => ['data', 'current_page', 'last_page', 'total']]);

        expect($response->json('data.data'))->not->toBeEmpty();
    });
});

// ── GET agentes ─────────────────────────────────────────────────────

describe('GET /api/v2/ocorrencia/agentes', function () {

    beforeEach(function () {
        if (!Route::has('__tests.v2.ocorrencia.agentes')) {
            Route::middleware(['api'])->get('/api/__tests/v2/ocorrencia/agentes', [OcorrenciaController::class, 'agentes'])
                ->name('__tests.v2.ocorrencia.agentes');
        }
    });

    test('retorna ao menos o próprio usuário', function () {
        $response = $this->getJson('/api/__tests/v2/ocorrencia/agentes');

        $response->assertStatus(200)
            ->assertJsonPath('success', true)
            ->assertJsonStructure(['success', 'data' => ['data', 'current_page', 'last_page', 'per_page', 'total']]);

        $agentes = $response->json('data.data');
        expect($agentes)->not->toBeEmpty();
        expect(collect($agentes)->pluck('id')->toArray())->toContain($this->usuario->id);
    });

    test('filtra agentes por termo no nome', function () {
        DB::connection('tenant')->table('usuarios')
            ->where('id', $this->usuario->id)
            ->update(['nome' => 'Zezinho Alvo Teste']);

        $response = $this->getJson('/api/__tests/v2/ocorrencia/agentes?filters[termo]=Zezinho%20Alvo');

        $response->assertStatus(200);
        $ids = collect($response->json('data.data'))->pluck('id')->toArray();
        expect($ids)->toContain($this->usuario->id);

        $vazio = $this->getJson('/api/__tests/v2/ocorrencia/agentes?filters[termo]=NomeQueNaoExiste');
        $vazio->assertStatus(200);
        expect($vazio->json('data.data'))->toBeEmpty();
    });

    test('respeita o parâmetro de tamanho de página', function () {
        $response = $this->getJson('/api/__tests/v2/ocorrencia/agentes?size=1&page=1');

        $response->assertStatus(200)
            ->assertJsonPath('data.per_page', 1)
            ->assertJsonPath('data.current_page', 1);
        expect(count($response->json('data.data')))->toBeLessThanOrEqual(1);
    });

    test('retorna 422 quando size é inválido', function () {
        $response = $this->getJson('/api/__tests/v2/ocorrencia/agentes?size=0');

        $response->assertStatus(422);
    });
});

// ── Hierarquia: gestor vê/cria para subordinados ────────────────────

describe('Hierarquia: gestor opera sobre usuários de unidades subordinadas', function () {

    beforeEach(function () {
        if (!Route::has('__tests.v2.ocorrencia.agentes')) {
            Route::middleware(['api'])->get('/api/__tests/v2/ocorrencia/agentes', [OcorrenciaController::class, 'agentes'])
                ->name('__tests.v2.ocorrencia.agentes');
        }

        // Unidade pai (gestor logado) → unidade filha (subordinado)
        $this->unidadePai = \App\Models\Unidade::factory()->create();
        $this->unidadeFilha = \App\Models\Unidade::factory()->create(['unidade_pai_id' => $this->unidadePai->id]);

        // Gestor: atribuição GESTOR na unidade pai
        Atribuicao::factory()
            ->paraUsuarioUnidade($this->usuario->id, $this->unidadePai->id)
            ->gestor()
            ->create();

        // Subordinado: lotado na unidade filha
        $this->subordinado = Usuario::factory()->create();
        Atribuicao::factory()
            ->paraUsuarioUnidade($this->subordinado->id, $this->unidadeFilha->id)
            ->lotado()
            ->create();

        $this->unlistedSubordinado = Usuario::factory()->create(); // Sem atribuição: não é subordinado do gestor
        UnidadeIntegrante::create(['usuario_id' => $this->unlistedSubordinado->id, 'unidade_id' => $this->unidadeFilha->id]);
    });

    test('agentes retorna subordinado de unidade filha', function () {
        $response = $this->getJson('/api/__tests/v2/ocorrencia/agentes');

        $response->assertStatus(200);

        $ids = collect($response->json('data.data'))->pluck('id')->toArray();
        expect($ids)->toContain($this->subordinado->id);
        expect($ids)->toContain($this->usuario->id);
        expect($ids)->not->toContain($this->unlistedSubordinado->id);
    });

    test('gestor cria ocorrência para subordinado em unidade filha', function () {
        $response = $this->postJson('/api/__tests/v2/ocorrencia', [
            'usuario_id' => $this->subordinado->id,
            'observacoes' => 'Ocorrência do subordinado',
            'data_inicio' => '2025-01-10',
            'data_fim' => '2025-01-15',
            'tipo_motivo_afastamento_id' => $this->tipoMotivo->id,
        ]);

        $response->assertStatus(201);
        expect($response->json('data.observacoes'))->toBe('Ocorrência do subordinado');

        $this->assertDatabaseHas('afastamentos', [
            'usuario_id' => $this->subordinado->id,
            'observacoes' => 'Ocorrência do subordinado',
        ]);
    });

    test('index retorna ocorrências do subordinado para o gestor', function () {
        // Cria ocorrência para o subordinado via DB
        DB::connection('tenant')->table('afastamentos')->insert([
            'id' => Str::uuid()->toString(),
            'usuario_id' => $this->subordinado->id,
            'data_inicio' => '2025-03-01',
            'data_fim' => '2025-03-10',
            'tipo_motivo_afastamento_id' => $this->tipoMotivo->id,
            'observacoes' => 'Visível ao gestor',
            'created_at' => now(), 'updated_at' => now(),
        ]);
        
        $unlistedAfatamento = Afastamento::factory()->create(['usuario_id' => $this->unlistedSubordinado->id]);

        $response = $this->getJson('/api/__tests/v2/ocorrencia?page=1&size=50');

        $response->assertStatus(200);

        $observacoes = collect($response->json('data.data'))->pluck('observacoes')->toArray();
        expect($observacoes)->toContain('Visível ao gestor');
        expect($observacoes)->not->toContain($unlistedAfatamento->observacoes);
    });

    test('gestor sem vínculo com o subordinado não pode criar ocorrência', function () {
        $outroUsuario = Usuario::factory()->create(); // sem lotação nas unidades gerenciadas

        $response = $this->postJson('/api/__tests/v2/ocorrencia', [
            'usuario_id' => $outroUsuario->id,
            'observacoes' => 'Deve ser negado',
            'data_inicio' => '2025-01-10',
            'data_fim' => '2025-01-15',
            'tipo_motivo_afastamento_id' => $this->tipoMotivo->id,
        ]);

        $response->assertStatus(403);
    });
});
