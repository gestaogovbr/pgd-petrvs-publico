<?php

namespace Tests\IntegrationTenant\Controllers\V2;

use App\V2\Ocorrencia\OcorrenciaController;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\PlanoTrabalhoConsolidacaoAfastamento;
use App\Models\TipoAvaliacao;
use App\Models\TipoMotivoAfastamento;
use App\Models\Usuario;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;

beforeEach(function () {
    if (!Route::has('__tests.v2.ocorrencia.store')) {
        Route::middleware(['api'])->post('/api/__tests/v2/ocorrencia', [OcorrenciaController::class, 'store'])
            ->name('__tests.v2.ocorrencia.store');
    }
    if (!Route::has('__tests.v2.ocorrencia.update')) {
        Route::middleware(['api'])->put('/api/__tests/v2/ocorrencia/{ocorrenciaId}', [OcorrenciaController::class, 'update'])
            ->name('__tests.v2.ocorrencia.update');
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

    test('vincula ocorrência às consolidações interceptadas', function () {
        $response = $this->postJson('/api/__tests/v2/ocorrencia', validPayload($this));

        $afastamentoId = $response->json('data.id');

        $vinculos = PlanoTrabalhoConsolidacaoAfastamento::where('afastamento_id', $afastamentoId)->count();
        expect($vinculos)->toBeGreaterThan(0);
    });

    test('persiste no banco com usuario_id correto', function () {
        $this->postJson('/api/__tests/v2/ocorrencia', validPayload($this));

        $this->assertDatabaseHas('afastamentos', [
            'usuario_id' => $this->usuario->id,
            'observacoes' => 'Consulta médica',
        ]);
    });
});

// ── POST bloqueio por impacto ───────────────────────────────────────

describe('POST /api/v2/ocorrencia (bloqueio por impacto)', function () {

    test('bloqueia criação quando geraria dispensa em PT concluído com recurso', function () {
        $tipoAvaliacao = \App\Models\TipoAvaliacao::factory()->create();
        $notaId = Str::uuid()->toString();
        DB::connection('tenant')->table('tipos_avaliacoes_notas')->insert([
            'id' => $notaId, 'tipo_avaliacao_id' => $tipoAvaliacao->id, 'sequencia' => 1,
            'nota' => json_encode(['valor' => 'IV']), 'descricao' => 'Nota IV', 'pergunta' => 'P',
            'aprova' => 0, 'justifica' => 0, 'icone' => 'bi bi-star', 'cor' => '#FF0000',
            'created_at' => now(), 'updated_at' => now(),
        ]);

        $this->plano->update(['status' => 'CONCLUIDO']);

        DB::connection('tenant')->table('avaliacoes')->insert([
            'id' => Str::uuid()->toString(),
            'plano_trabalho_consolidacao_id' => $this->consolidacao->id,
            'avaliador_id' => $this->usuario->id,
            'data_avaliacao' => '2025-02-01',
            'nota' => json_encode(['nota' => 'IV']),
            'justificativas' => json_encode([]),
            'tipo_avaliacao_id' => $tipoAvaliacao->id,
            'tipo_avaliacao_nota_id' => $notaId,
            'recurso' => 'Discordo',
            'data_recurso' => '2025-02-05',
            'created_at' => now(), 'updated_at' => now(),
        ]);

        // Ocorrência que cobriria toda a consolidação → geraria dispensa → bloqueio
        $response = $this->postJson('/api/__tests/v2/ocorrencia', [
            'usuario_id' => $this->usuario->id,
            'observacoes' => 'Teste bloqueio',
            'data_inicio' => '2025-01-01',
            'data_fim' => '2025-01-31',
            'tipo_motivo_afastamento_id' => $this->tipoMotivo->id,
        ]);

        $response->assertStatus(422)
            ->assertJsonPath('error', 'Não é possível criar a ocorrência pois um dos períodos avaliativos abrangidos por ela tem avaliações que já não podem mais ser alteradas.');
    });
});

// ── PUT update ──────────────────────────────────────────────────────

describe('PUT /api/v2/ocorrencia/:id (happy path)', function () {

    test('atualiza observações da ocorrência', function () {
        $afastamentoId = $this->postJson('/api/__tests/v2/ocorrencia', validPayload($this))->json('data.id');

        $response = $this->putJson("/api/__tests/v2/ocorrencia/{$afastamentoId}", [
            'usuario_id' => $this->usuario->id,
            'observacoes' => 'Atualizado',
        ]);

        $response->assertStatus(200)
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.observacoes', 'Atualizado');
    });

    test('recria vínculos com consolidações ao alterar período', function () {
        $afastamentoId = $this->postJson('/api/__tests/v2/ocorrencia', validPayload($this))->json('data.id');

        $this->putJson("/api/__tests/v2/ocorrencia/{$afastamentoId}", [
            'usuario_id' => $this->usuario->id,
            'data_inicio' => '2025-02-01',
            'data_fim' => '2025-02-15',
        ])->assertStatus(200);

        // Vínculos antigos (janeiro) removidos, novos para fevereiro criados ou nenhum se não há consolidação
        $vinculos = PlanoTrabalhoConsolidacaoAfastamento::where('afastamento_id', $afastamentoId)->get();
        // Consolidação é jan, novo período é fev → sem vínculo
        expect($vinculos->count())->toBe(0);
    });
});

// ── PUT bloqueio por impacto ────────────────────────────────────────

describe('PUT /api/v2/ocorrencia/:id (bloqueio por mudança de tipo)', function () {

    beforeEach(function () {
        $this->tipoCompensacao = TipoMotivoAfastamento::firstOrCreate(
            ['codigo' => '15'],
            ['nome' => 'Greve (compensação)', 'sigla' => 'GC', 'calculo' => 'DECRESCIMO', 'data_inicio' => now(), 'situacao' => 'ATIVO', 'icone' => 'bi bi-flag', 'cor' => '#FFFF00', 'horas' => 0, 'integracao' => 0]
        );

        $tipoAvaliacao = TipoAvaliacao::factory()->create();
        $notaId = Str::uuid()->toString();
        DB::connection('tenant')->table('tipos_avaliacoes_notas')->insert([
            'id' => $notaId,
            'tipo_avaliacao_id' => $tipoAvaliacao->id,
            'sequencia' => 1,
            'nota' => json_encode(['valor' => 'IV']),
            'descricao' => 'Nota IV',
            'pergunta' => 'Pergunta',
            'aprova' => 0,
            'justifica' => 0,
            'icone' => 'bi bi-star',
            'cor' => '#FF0000',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // PT concluído com consolidação contendo avaliação com recurso
        $this->plano->update(['status' => 'CONCLUIDO']);

        DB::connection('tenant')->table('avaliacoes')->insert([
            'id' => Str::uuid()->toString(),
            'plano_trabalho_consolidacao_id' => $this->consolidacao->id,
            'avaliador_id' => $this->usuario->id,
            'data_avaliacao' => '2026-06-01',
            'nota' => json_encode(['nota' => 'IV']),
            'justificativas' => json_encode([]),
            'tipo_avaliacao_id' => $tipoAvaliacao->id,
            'tipo_avaliacao_nota_id' => $notaId,
            'recurso' => 'Discordo da nota',
            'data_recurso' => '2026-06-05',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    });

    test('bloqueia update quando mudar de não-compensação para compensação remove dispensa em PT concluído com recurso', function () {
        // Duas ocorrências não-compensação cobrindo toda a consolidação
        $af1Id = Str::uuid()->toString();
        $af2Id = Str::uuid()->toString();

        DB::connection('tenant')->table('afastamentos')->insert([
            ['id' => $af1Id, 'usuario_id' => $this->usuario->id, 'data_inicio' => '2025-01-01', 'data_fim' => '2025-01-15', 'tipo_motivo_afastamento_id' => $this->tipoMotivo->id, 'observacoes' => 'af1', 'created_at' => now(), 'updated_at' => now()],
            ['id' => $af2Id, 'usuario_id' => $this->usuario->id, 'data_inicio' => '2025-01-16', 'data_fim' => '2025-01-31', 'tipo_motivo_afastamento_id' => $this->tipoMotivo->id, 'observacoes' => 'af2', 'created_at' => now(), 'updated_at' => now()],
        ]);

        // Editar af2 para tipo compensação → remove dispensa → bloqueio
        $response = $this->putJson("/api/__tests/v2/ocorrencia/{$af2Id}", [
            'usuario_id' => $this->usuario->id,
            'tipo_motivo_afastamento_id' => $this->tipoCompensacao->id,
        ]);

        $response->assertStatus(422)
            ->assertJsonPath('error', 'Não é possível editar a ocorrência pois um dos períodos avaliativos abrangidos por ela tem avaliações que já não podem mais ser alteradas.');
    });

    test('bloqueia update quando mudar de compensação para não-compensação gera dispensa em PT concluído com recurso', function () {
        // Uma não-compensação + uma compensação cobrindo toda a consolidação
        $af1Id = Str::uuid()->toString();
        $af2Id = Str::uuid()->toString();

        DB::connection('tenant')->table('afastamentos')->insert([
            ['id' => $af1Id, 'usuario_id' => $this->usuario->id, 'data_inicio' => '2025-01-01', 'data_fim' => '2025-01-15', 'tipo_motivo_afastamento_id' => $this->tipoMotivo->id, 'observacoes' => 'af1', 'created_at' => now(), 'updated_at' => now()],
            ['id' => $af2Id, 'usuario_id' => $this->usuario->id, 'data_inicio' => '2025-01-16', 'data_fim' => '2025-01-31', 'tipo_motivo_afastamento_id' => $this->tipoCompensacao->id, 'observacoes' => 'af2 comp', 'created_at' => now(), 'updated_at' => now()],
        ]);

        // Editar af2 de compensação para não-compensação → gera dispensa → bloqueio
        $response = $this->putJson("/api/__tests/v2/ocorrencia/{$af2Id}", [
            'usuario_id' => $this->usuario->id,
            'tipo_motivo_afastamento_id' => $this->tipoMotivo->id,
        ]);

        $response->assertStatus(422)
            ->assertJsonPath('error', 'Não é possível editar a ocorrência pois um dos períodos avaliativos abrangidos por ela tem avaliações que já não podem mais ser alteradas.');
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

    test('bloqueia exclusão quando removeria dispensa em PT concluído com recurso', function () {
        $tipoAvaliacao = \App\Models\TipoAvaliacao::factory()->create();
        $notaId = Str::uuid()->toString();
        DB::connection('tenant')->table('tipos_avaliacoes_notas')->insert([
            'id' => $notaId, 'tipo_avaliacao_id' => $tipoAvaliacao->id, 'sequencia' => 1,
            'nota' => json_encode(['valor' => 'IV']), 'descricao' => 'Nota IV', 'pergunta' => 'P',
            'aprova' => 0, 'justifica' => 0, 'icone' => 'bi bi-star', 'cor' => '#FF0000',
            'created_at' => now(), 'updated_at' => now(),
        ]);

        $this->plano->update(['status' => 'CONCLUIDO']);

        DB::connection('tenant')->table('avaliacoes')->insert([
            'id' => Str::uuid()->toString(),
            'plano_trabalho_consolidacao_id' => $this->consolidacao->id,
            'avaliador_id' => $this->usuario->id,
            'data_avaliacao' => '2025-02-01',
            'nota' => json_encode(['nota' => 'IV']),
            'justificativas' => json_encode([]),
            'tipo_avaliacao_id' => $tipoAvaliacao->id,
            'tipo_avaliacao_nota_id' => $notaId,
            'recurso' => 'Discordo',
            'data_recurso' => '2025-02-05',
            'created_at' => now(), 'updated_at' => now(),
        ]);

        // Ocorrência que cobre toda a consolidação (dispensada)
        $afId = Str::uuid()->toString();
        DB::connection('tenant')->table('afastamentos')->insert([
            'id' => $afId, 'usuario_id' => $this->usuario->id,
            'data_inicio' => '2025-01-01', 'data_fim' => '2025-01-31',
            'tipo_motivo_afastamento_id' => $this->tipoMotivo->id,
            'observacoes' => 'Dispensa', 'created_at' => now(), 'updated_at' => now(),
        ]);

        // Excluir → removeria dispensa → bloqueio
        $this->deleteJson("/api/__tests/v2/ocorrencia/{$afId}", [
            'usuario_id' => $this->usuario->id,
        ])->assertStatus(422)
            ->assertJsonPath('error', 'Não é possível excluir a ocorrência pois um dos períodos avaliativos abrangidos por ela tem avaliações que já não podem mais ser alteradas.');
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
            ->assertJsonPath('success', true);

        $agentes = $response->json('data');
        expect($agentes)->not->toBeEmpty();
        expect(collect($agentes)->pluck('id')->toArray())->toContain($this->usuario->id);
    });
});
