<?php

namespace Tests\IntegrationTenant\Controllers\V2;

use App\V2\PlanoTrabalho\Consolidacao\PlanoTrabalhoConsolidacaoController;
use App\V2\PlanoTrabalho\Consolidacao\Atividade\AtividadeController;
use App\V2\PlanoTrabalho\Documento\DocumentoController;
use App\Models\Entrega;
use App\Models\Perfil;
use App\Models\PlanoEntrega;
use App\Models\PlanoEntregaEntrega;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\PlanoTrabalhoEntrega;
use App\Models\Programa;
use App\Models\Template;
use App\Models\Unidade;
use App\Models\Usuario;
use App\V2\StatusService;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Session;

beforeEach(function () {
    if (!Route::has('__tests.v2.consolidacao.index')) {
        Route::middleware(['api'])->get(
            '/api/__tests/v2/plano-trabalho/{planoTrabalhoId}/consolidacao',
            [PlanoTrabalhoConsolidacaoController::class, 'index']
        )->name('__tests.v2.consolidacao.index');
    }

    if (!Route::has('__tests.v2.documento.store')) {
        Route::middleware(['api'])->post(
            '/api/__tests/v2/plano-trabalho/{planoTrabalhoId}/documento',
            [DocumentoController::class, 'store']
        )->name('__tests.v2.documento.store');
    }

    if (!Route::has('__tests.v2.documento.assinar')) {
        Route::middleware(['api'])->post(
            '/api/__tests/v2/plano-trabalho/{planoTrabalhoId}/documento/assinatura-tcr',
            [DocumentoController::class, 'assinar']
        )->name('__tests.v2.documento.assinar');
    }

    if (!Route::has('__tests.v2.consolidacao.concluir')) {
        Route::middleware(['api'])->patch(
            '/api/__tests/v2/plano-trabalho/{planoTrabalhoId}/consolidacao/{consolidacaoId}/concluir',
            [PlanoTrabalhoConsolidacaoController::class, 'concluir']
        )->name('__tests.v2.consolidacao.concluir');
    }

    if (!Route::has('__tests.v2.consolidacao.reabrir')) {
        Route::middleware(['api'])->patch(
            '/api/__tests/v2/plano-trabalho/{planoTrabalhoId}/consolidacao/{consolidacaoId}/reabrir',
            [PlanoTrabalhoConsolidacaoController::class, 'reabrir']
        )->name('__tests.v2.consolidacao.reabrir');
    }

    if (!Route::has('__tests.v2.atividade.store')) {
        Route::middleware(['api'])->post(
            '/api/__tests/v2/plano-trabalho/{planoTrabalhoId}/consolidacao/{consolidacaoId}/atividade',
            [AtividadeController::class, 'store']
        )->name('__tests.v2.atividade.store');
    }

    $perfil = Perfil::factory()->create(['nivel' => 3]);
    $this->unidade = Unidade::factory()->create();
    $this->usuario = Usuario::factory()->create([
        'perfil_id' => $perfil->id,
    ]);

    $template = Template::factory()->create();

    $this->programa = Programa::factory()->create([
        'data_inicio' => '2024-01-01',
        'data_fim' => '2026-12-31',
        'template_tcr_id' => $template->id,
    ]);

    $this->plano = PlanoTrabalho::factory()->create([
        'usuario_id' => $this->usuario->id,
        'unidade_id' => $this->unidade->id,
        'criacao_usuario_id' => $this->usuario->id,
        'programa_id' => $this->programa->id,
        'data_inicio' => '2025-01-01',
        'data_fim' => '2025-06-30',
        'status' => 'INCLUIDO',
    ]);

    $entregaCatalogo = Entrega::factory()->create(['unidade_id' => $this->unidade->id]);
    $planoEntrega = PlanoEntrega::factory()->create([
        'unidade_id' => $this->unidade->id,
        'programa_id' => $this->programa->id,
        'criacao_usuario_id' => $this->usuario->id,
    ]);
    $planoEntregaEntrega = PlanoEntregaEntrega::factory()->create([
        'plano_entrega_id' => $planoEntrega->id,
        'entrega_id' => $entregaCatalogo->id,
        'unidade_id' => $this->unidade->id,
    ]);

    PlanoTrabalhoEntrega::factory()->create([
        'plano_trabalho_id' => $this->plano->id,
        'plano_entrega_entrega_id' => $planoEntregaEntrega->id,
        'forca_trabalho' => 100,
    ]);

    $this->entrega = PlanoTrabalhoEntrega::where('plano_trabalho_id', $this->plano->id)->first();

    Session::put('entidade_id', $this->unidade->entidade_id);
});

function ativarPlano($context): void
{
    $context->postJson("/api/__tests/v2/plano-trabalho/{$context->plano->id}/documento");
    $context->postJson("/api/__tests/v2/plano-trabalho/{$context->plano->id}/documento/assinatura-tcr");
}

function ativarEObterConsolidacao($context): string
{
    ativarPlano($context);

    return $context->getJson("/api/__tests/v2/plano-trabalho/{$context->plano->id}/consolidacao")
        ->json('data.0.id');
}

function concluirConsolidacao($context, string $consolidacaoId): void
{
    $context->postJson(
        "/api/__tests/v2/plano-trabalho/{$context->plano->id}/consolidacao/{$consolidacaoId}/atividade",
        ['plano_trabalho_entrega_id' => $context->entrega->id, 'descricao' => 'Trabalho executado']
    );
    $context->patchJson(
        "/api/__tests/v2/plano-trabalho/{$context->plano->id}/consolidacao/{$consolidacaoId}/concluir"
    );
}

// ── GET consolidacao ────────────────────────────────────────────────

describe('GET /api/v2/plano-trabalho/:id/consolidacao', function () {

    test('retorna 404 quando plano não encontrado', function () {
        $this->actingAs($this->usuario, 'web');

        $this->getJson('/api/__tests/v2/plano-trabalho/' . fake()->uuid() . '/consolidacao')
            ->assertStatus(404);
    });

    test('retorna lista vazia quando plano não está ativo', function () {
        $this->actingAs($this->usuario, 'web');

        $response = $this->getJson("/api/__tests/v2/plano-trabalho/{$this->plano->id}/consolidacao");

        $response->assertStatus(200)
            ->assertJsonPath('success', true);

        expect($response->json('data'))->toBeEmpty();
    });

    test('retorna consolidações após ativação do plano', function () {
        $this->actingAs($this->usuario, 'web');

        ativarPlano($this);

        $response = $this->getJson("/api/__tests/v2/plano-trabalho/{$this->plano->id}/consolidacao");

        $response->assertStatus(200)
            ->assertJsonPath('success', true);

        $data = $response->json('data');

        expect($data)->not->toBeEmpty();
        expect($data[0])->toHaveKeys(['id', 'data_inicio', 'data_fim', 'status', 'plano_trabalho_id']);
    });

    test('consolidações estão ordenadas por data_inicio', function () {
        $this->actingAs($this->usuario, 'web');

        ativarPlano($this);

        $data = $this->getJson("/api/__tests/v2/plano-trabalho/{$this->plano->id}/consolidacao")
            ->json('data');

        for ($i = 1; $i < count($data); $i++) {
            expect($data[$i]['data_inicio'] > $data[$i - 1]['data_inicio'])->toBeTrue();
        }
    });

    test('todas as consolidações têm status INCLUIDO após ativação', function () {
        $this->actingAs($this->usuario, 'web');

        ativarPlano($this);

        $data = $this->getJson("/api/__tests/v2/plano-trabalho/{$this->plano->id}/consolidacao")
            ->json('data');

        foreach ($data as $consolidacao) {
            expect($consolidacao['status'])->toBe('INCLUIDO');
        }
    });

    test('retorna 6 períodos para plano de janeiro a junho com periodicidade mensal', function () {
        $this->actingAs($this->usuario, 'web');

        ativarPlano($this);

        $data = $this->getJson("/api/__tests/v2/plano-trabalho/{$this->plano->id}/consolidacao")
            ->json('data');

        expect($data)->toHaveCount(6);
        expect($data[0]['data_inicio'])->toBe('2025-01-01');
        expect($data[5]['data_fim'])->toBe('2025-06-30');
    });
});

// ── PATCH concluir ──────────────────────────────────────────────────

describe('PATCH /api/v2/plano-trabalho/:id/consolidacao/:cid/concluir', function () {

    test('conclui consolidação com sucesso', function () {
        $this->actingAs($this->usuario, 'web');
        $consolidacaoId = ativarEObterConsolidacao($this);
        concluirConsolidacao($this, $consolidacaoId);

        $this->assertDatabaseHas('planos_trabalhos_consolidacoes', [
            'id' => $consolidacaoId,
            'status' => 'CONCLUIDO',
        ]);
    });

    test('retorna 422 quando entrega sem trabalho executado', function () {
        $this->actingAs($this->usuario, 'web');
        $consolidacaoId = ativarEObterConsolidacao($this);

        $this->patchJson(
            "/api/__tests/v2/plano-trabalho/{$this->plano->id}/consolidacao/{$consolidacaoId}/concluir"
        )->assertStatus(422);
    });

    test('retorna 404 quando plano não existe', function () {
        $this->actingAs($this->usuario, 'web');

        $this->patchJson(
            '/api/__tests/v2/plano-trabalho/' . fake()->uuid() . '/consolidacao/' . fake()->uuid() . '/concluir'
        )->assertStatus(404);
    });

    test('retorna 422 ao tentar concluir consolidação já concluída', function () {
        $this->actingAs($this->usuario, 'web');
        $consolidacaoId = ativarEObterConsolidacao($this);
        concluirConsolidacao($this, $consolidacaoId);

        $this->patchJson(
            "/api/__tests/v2/plano-trabalho/{$this->plano->id}/consolidacao/{$consolidacaoId}/concluir"
        )->assertStatus(422);
    });
});

// ── PATCH reabrir ───────────────────────────────────────────────────

describe('PATCH /api/v2/plano-trabalho/:id/consolidacao/:cid/reabrir', function () {

    test('reabre consolidação concluída com sucesso', function () {
        $this->actingAs($this->usuario, 'web');
        $consolidacaoId = ativarEObterConsolidacao($this);
        concluirConsolidacao($this, $consolidacaoId);

        $this->patchJson(
            "/api/__tests/v2/plano-trabalho/{$this->plano->id}/consolidacao/{$consolidacaoId}/reabrir",
            ['justificativa' => 'Preciso corrigir os registros']
        )->assertStatus(200);

        $this->assertDatabaseHas('planos_trabalhos_consolidacoes', [
            'id' => $consolidacaoId,
            'status' => 'INCLUIDO',
        ]);
    });

    test('retorna 422 quando justificativa ausente', function () {
        $this->actingAs($this->usuario, 'web');
        $consolidacaoId = ativarEObterConsolidacao($this);
        concluirConsolidacao($this, $consolidacaoId);

        $this->patchJson(
            "/api/__tests/v2/plano-trabalho/{$this->plano->id}/consolidacao/{$consolidacaoId}/reabrir"
        )->assertStatus(422);
    });

    test('retorna 422 quando consolidação não está concluída', function () {
        $this->actingAs($this->usuario, 'web');
        $consolidacaoId = ativarEObterConsolidacao($this);

        $this->patchJson(
            "/api/__tests/v2/plano-trabalho/{$this->plano->id}/consolidacao/{$consolidacaoId}/reabrir",
            ['justificativa' => 'Motivo']
        )->assertStatus(422);
    });

    test('retorna 404 quando plano não existe', function () {
        $this->actingAs($this->usuario, 'web');

        $this->patchJson(
            '/api/__tests/v2/plano-trabalho/' . fake()->uuid() . '/consolidacao/' . fake()->uuid() . '/reabrir',
            ['justificativa' => 'Motivo']
        )->assertStatus(404);
    });

    test('ciclo concluir-reabrir-concluir funciona', function () {
        $this->actingAs($this->usuario, 'web');
        $consolidacaoId = ativarEObterConsolidacao($this);
        concluirConsolidacao($this, $consolidacaoId);

        $this->patchJson(
            "/api/__tests/v2/plano-trabalho/{$this->plano->id}/consolidacao/{$consolidacaoId}/reabrir",
            ['justificativa' => 'Correção']
        )->assertStatus(200);

        $this->patchJson(
            "/api/__tests/v2/plano-trabalho/{$this->plano->id}/consolidacao/{$consolidacaoId}/concluir"
        )->assertStatus(200);

        $this->assertDatabaseHas('planos_trabalhos_consolidacoes', [
            'id' => $consolidacaoId,
            'status' => 'CONCLUIDO',
        ]);
    });
});

// ── Conclusão automática do PT ───────────────────────────────────────

describe('Conclusão automática do PT após avaliação de todas as consolidações', function () {

    test('PT recebe status CONCLUIDO e avaliado_at quando todas consolidações são avaliadas', function () {
        $this->actingAs($this->usuario, 'web');
        ativarPlano($this);

        $consolidacoes = PlanoTrabalhoConsolidacao::where('plano_trabalho_id', $this->plano->id)->get();
        $statusService = app(StatusService::class);

        foreach ($consolidacoes as $consolidacao) {
            $statusService->atualizaStatus($consolidacao, 'AVALIADO', 'Avaliação do período.');
        }

        $this->plano->refresh();

        expect($this->plano->status)->toBe('CONCLUIDO');
        expect($this->plano->avaliado_at)->not->toBeNull();

        $this->assertDatabaseHas('status_justificativas', [
            'plano_trabalho_id' => $this->plano->id,
            'codigo' => 'CONCLUIDO',
        ]);
    });

    test('PT não é concluído quando apenas algumas consolidações são avaliadas', function () {
        $this->actingAs($this->usuario, 'web');
        ativarPlano($this);

        $consolidacoes = PlanoTrabalhoConsolidacao::where('plano_trabalho_id', $this->plano->id)->get();
        $statusService = app(StatusService::class);

        $statusService->atualizaStatus($consolidacoes->first(), 'AVALIADO', 'Avaliação do período.');

        $this->plano->refresh();

        expect($this->plano->status)->toBe('ATIVO');
        expect($this->plano->avaliado_at)->toBeNull();
    });

    test('PT volta a ATIVO quando uma consolidação avaliada é reaberta', function () {
        $this->actingAs($this->usuario, 'web');
        ativarPlano($this);

        $consolidacoes = PlanoTrabalhoConsolidacao::where('plano_trabalho_id', $this->plano->id)->get();
        $statusService = app(StatusService::class);

        foreach ($consolidacoes as $consolidacao) {
            $statusService->atualizaStatus($consolidacao, 'AVALIADO', 'Avaliação do período.');
        }

        $this->plano->refresh();
        expect($this->plano->status)->toBe('CONCLUIDO');

        $statusService->atualizaStatus($consolidacoes->first(), 'CONCLUIDO', 'Período avaliativo deixou de estar avaliado.');

        $this->plano->refresh();

        expect($this->plano->status)->toBe('ATIVO');
        expect($this->plano->avaliado_at)->toBeNull();

        $this->assertDatabaseHas('status_justificativas', [
            'plano_trabalho_id' => $this->plano->id,
            'codigo' => 'ATIVO',
        ]);
    });
});

// ── Visibilidade de afastamentos ────────────────────────────────────

describe('GET /api/v2/plano-trabalho/:id/consolidacao (afastamentos)', function () {

    test('retorna afastamentos quando usuário é dono do plano', function () {
        $this->actingAs($this->usuario, 'web');

        ativarPlano($this);

        $consolidacaoId = $this->getJson("/api/__tests/v2/plano-trabalho/{$this->plano->id}/consolidacao")
            ->json('data.0.id');

        $consolidacao = PlanoTrabalhoConsolidacao::find($consolidacaoId);

        $tipoMotivo = \App\Models\TipoMotivoAfastamento::firstOrCreate(
            ['nome' => 'Licença Médica'],
            ['codigo' => 'LM', 'sigla' => 'LM', 'calculo' => 'DECRESCIMO', 'data_inicio' => now(), 'situacao' => 'ATIVO', 'icone' => 'bi bi-heart-pulse', 'cor' => '#FF0000', 'horas' => 0, 'integracao' => 0]
        );

        $afastamento = \App\Models\Afastamento::create([
            'observacoes' => 'Afastamento teste',
            'data_inicio' => $consolidacao->data_inicio,
            'data_fim' => $consolidacao->data_fim,
            'horas' => 0,
            'usuario_id' => $this->usuario->id,
            'tipo_motivo_afastamento_id' => $tipoMotivo->id,
        ]);

        \App\Models\PlanoTrabalhoConsolidacaoAfastamento::create([
                    'plano_trabalho_consolidacao_id' => $consolidacaoId,
                    'afastamento_id' => $afastamento->id,
                    'snapshot' => json_encode($afastamento->toArray()),
                    'data_conclusao' => now(),
                ]);

        $data = $this->getJson("/api/__tests/v2/plano-trabalho/{$this->plano->id}/consolidacao")
            ->assertStatus(200)
            ->json('data.0');

        expect($data)->toHaveKey('afastamentos');
        expect($data['afastamentos'])->not->toBeEmpty();
    });

    test('não retorna afastamentos quando usuário não é dono nem chefia', function () {
        $this->actingAs($this->usuario, 'web');

        ativarPlano($this);

        $consolidacaoId = $this->getJson("/api/__tests/v2/plano-trabalho/{$this->plano->id}/consolidacao")
            ->json('data.0.id');

        $consolidacao = PlanoTrabalhoConsolidacao::find($consolidacaoId);

        $tipoMotivo = \App\Models\TipoMotivoAfastamento::firstOrCreate(
            ['nome' => 'Licença Médica'],
            ['codigo' => 'LM', 'sigla' => 'LM', 'calculo' => 'DECRESCIMO', 'data_inicio' => now(), 'situacao' => 'ATIVO', 'icone' => 'bi bi-heart-pulse', 'cor' => '#FF0000', 'horas' => 0, 'integracao' => 0]
        );

        $afastamento = \App\Models\Afastamento::create([
            'observacoes' => 'Afastamento teste',
            'data_inicio' => $consolidacao->data_inicio,
            'data_fim' => $consolidacao->data_fim,
            'horas' => 0,
            'usuario_id' => $this->usuario->id,
            'tipo_motivo_afastamento_id' => $tipoMotivo->id,
        ]);

        \App\Models\PlanoTrabalhoConsolidacaoAfastamento::create([
                    'plano_trabalho_consolidacao_id' => $consolidacaoId,
                    'afastamento_id' => $afastamento->id,
                    'snapshot' => json_encode($afastamento->toArray()),
                    'data_conclusao' => now(),
                ]);

        $outroUsuario = Usuario::factory()->create([
            'perfil_id' => Perfil::factory()->create(['nivel' => 3])->id,
        ]);

        $this->actingAs($outroUsuario, 'web');

        $data = $this->getJson("/api/__tests/v2/plano-trabalho/{$this->plano->id}/consolidacao")
            ->assertStatus(200)
            ->json('data.0');

        expect($data)->not->toHaveKey('afastamentos');
    });
});
