<?php

namespace Tests\IntegrationTenant\Controllers\V2;

use App\V2\PlanoTrabalho\Consolidacao\PlanoTrabalhoConsolidacaoController;
use App\V2\PlanoTrabalho\Consolidacao\Atividade\AtividadeController;
use App\V2\PlanoTrabalho\Consolidacao\Avaliacao\AvaliacaoController;
use App\V2\PlanoTrabalho\Documento\DocumentoController;
use App\Models\Entrega;
use App\Models\Perfil;
use App\Models\PlanoEntrega;
use App\Models\PlanoEntregaEntrega;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoEntrega;
use App\Models\Programa;
use App\Models\Template;
use App\Models\TipoAvaliacaoNota;
use App\Models\TipoModalidade;
use App\Models\Unidade;
use App\Models\Usuario;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Session;

beforeEach(function () {
    if (!Route::has('__tests.v2.avaliacao.documento.store')) {
        Route::middleware(['api'])->post(
            '/api/__tests/v2/plano-trabalho/{planoTrabalhoId}/documento',
            [DocumentoController::class, 'store']
        )->name('__tests.v2.avaliacao.documento.store');

        Route::middleware(['api'])->post(
            '/api/__tests/v2/plano-trabalho/{planoTrabalhoId}/documento/assinatura-tcr',
            [DocumentoController::class, 'assinar']
        )->name('__tests.v2.avaliacao.documento.assinar');

        Route::middleware(['api'])->get(
            '/api/__tests/v2/plano-trabalho/{planoTrabalhoId}/consolidacao',
            [PlanoTrabalhoConsolidacaoController::class, 'index']
        )->name('__tests.v2.avaliacao.consolidacao.index');

        Route::middleware(['api'])->post(
            '/api/__tests/v2/plano-trabalho/{planoTrabalhoId}/consolidacao/{consolidacaoId}/atividade',
            [AtividadeController::class, 'store']
        )->name('__tests.v2.avaliacao.atividade.store');

        Route::middleware(['api'])->patch(
            '/api/__tests/v2/plano-trabalho/{planoTrabalhoId}/consolidacao/{consolidacaoId}/concluir',
            [PlanoTrabalhoConsolidacaoController::class, 'concluir']
        )->name('__tests.v2.avaliacao.consolidacao.concluir');

        Route::middleware(['api'])->post(
            '/api/__tests/v2/plano-trabalho/{planoTrabalhoId}/consolidacao/{consolidacaoId}/avaliacao',
            [AvaliacaoController::class, 'store']
        )->name('__tests.v2.avaliacao.store');

        Route::middleware(['api'])->get(
            '/api/__tests/v2/plano-trabalho/{planoTrabalhoId}/consolidacao/notas-avaliacao',
            [PlanoTrabalhoConsolidacaoController::class, 'notasAvaliacao']
        )->name('__tests.v2.avaliacao.notas');
    }

    $perfil = Perfil::factory()->create(['nivel' => 3]);
    $tipoModalidade = TipoModalidade::factory()->create();
    $this->unidade = Unidade::factory()->create();

    $this->participante = Usuario::factory()->create([
        'perfil_id' => $perfil->id,
        'tipo_modalidade_id' => $tipoModalidade->id,
    ]);

    $this->chefia = Usuario::factory()->create([
        'perfil_id' => $perfil->id,
        'tipo_modalidade_id' => $tipoModalidade->id,
    ]);

    $integrante = \App\Models\UnidadeIntegrante::create([
        'id' => fake()->uuid(),
        'unidade_id' => $this->unidade->id,
        'usuario_id' => $this->chefia->id,
    ]);

    \App\Models\UnidadeIntegranteAtribuicao::create([
        'id' => fake()->uuid(),
        'unidade_integrante_id' => $integrante->id,
        'atribuicao' => 'GESTOR',
    ]);

    $template = Template::factory()->create();

    $this->programa = Programa::factory()->create([
        'data_inicio' => '2024-01-01',
        'data_fim' => '2026-12-31',
        'template_tcr_id' => $template->id,
    ]);

    $this->plano = PlanoTrabalho::factory()->create([
        'usuario_id' => $this->participante->id,
        'unidade_id' => $this->unidade->id,
        'tipo_modalidade_id' => $tipoModalidade->id,
        'criacao_usuario_id' => $this->participante->id,
        'programa_id' => $this->programa->id,
        'data_inicio' => '2025-01-01',
        'data_fim' => '2025-06-30',
        'status' => 'INCLUIDO',
    ]);

    $entregaCatalogo = Entrega::factory()->create(['unidade_id' => $this->unidade->id]);
    $planoEntrega = PlanoEntrega::factory()->create([
        'unidade_id' => $this->unidade->id,
        'programa_id' => $this->programa->id,
        'criacao_usuario_id' => $this->participante->id,
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

    $this->notaSemJustificativa = TipoAvaliacaoNota::create([
        'id' => fake()->uuid(),
        'sequencia' => 3,
        'nota' => json_encode('Adequado'),
        'descricao' => 'Adequado',
        'pergunta' => 'Dentro do esperado?',
        'aprova' => 1,
        'justifica' => 0,
        'icone' => 'bi bi-check',
        'cor' => '#28a745',
        'tipo_avaliacao_id' => $this->programa->tipo_avaliacao_plano_trabalho_id,
    ]);

    $this->notaComJustificativa = TipoAvaliacaoNota::create([
        'id' => fake()->uuid(),
        'sequencia' => 1,
        'nota' => json_encode('Excepcional'),
        'descricao' => 'Excepcional',
        'pergunta' => 'Muito acima do esperado?',
        'aprova' => 1,
        'justifica' => 1,
        'icone' => 'bi bi-star',
        'cor' => '#ffc107',
        'tipo_avaliacao_id' => $this->programa->tipo_avaliacao_plano_trabalho_id,
    ]);

    Session::put('entidade_id', $this->unidade->entidade_id);
});

function prepararConsolidacaoConcluida($context): string
{
    $context->actingAs($context->participante, 'web');

    $context->postJson("/api/__tests/v2/plano-trabalho/{$context->plano->id}/documento");
    $context->postJson("/api/__tests/v2/plano-trabalho/{$context->plano->id}/documento/assinatura-tcr");

    $consolidacaoId = $context->getJson("/api/__tests/v2/plano-trabalho/{$context->plano->id}/consolidacao")
        ->json('data.0.id');

    $context->postJson(
        "/api/__tests/v2/plano-trabalho/{$context->plano->id}/consolidacao/{$consolidacaoId}/atividade",
        ['plano_trabalho_entrega_id' => $context->entrega->id, 'descricao' => 'Trabalho executado']
    );

    $context->patchJson(
        "/api/__tests/v2/plano-trabalho/{$context->plano->id}/consolidacao/{$consolidacaoId}/concluir"
    );

    $context->actingAs($context->chefia, 'web');

    return $consolidacaoId;
}

// ── GET notas-avaliacao ─────────────────────────────────────────────

describe('GET /api/v2/plano-trabalho/:id/consolidacao/notas-avaliacao', function () {

    test('retorna notas de avaliação do regramento do PT', function () {
        $this->actingAs($this->participante, 'web');

        $response = $this->getJson(
            "/api/__tests/v2/plano-trabalho/{$this->plano->id}/consolidacao/notas-avaliacao"
        );

        $response->assertStatus(200)
            ->assertJsonPath('success', true);

        $data = $response->json('data');

        expect($data)->toHaveCount(2);
        expect($data[0])->toHaveKeys(['id', 'sequencia', 'nota', 'descricao', 'justifica']);
    });

    test('retorna 404 quando plano não existe', function () {
        $this->actingAs($this->participante, 'web');

        $this->getJson('/api/__tests/v2/plano-trabalho/' . fake()->uuid() . '/consolidacao/notas-avaliacao')
            ->assertStatus(404);
    });
});

// ── POST avaliacao ──────────────────────────────────────────────────

describe('POST /api/v2/plano-trabalho/:id/consolidacao/:cid/avaliacao', function () {

    test('cria avaliação com sucesso', function () {
        $consolidacaoId = prepararConsolidacaoConcluida($this);

        $response = $this->postJson(
            "/api/__tests/v2/plano-trabalho/{$this->plano->id}/consolidacao/{$consolidacaoId}/avaliacao",
            ['tipo_avaliacao_nota_id' => $this->notaSemJustificativa->id]
        );

        $response->assertStatus(201)
            ->assertJsonPath('success', true);

        $this->assertDatabaseHas('avaliacoes', [
            'plano_trabalho_consolidacao_id' => $consolidacaoId,
            'tipo_avaliacao_nota_id' => $this->notaSemJustificativa->id,
            'avaliador_id' => $this->chefia->id,
        ]);

        $this->assertDatabaseHas('planos_trabalhos_consolidacoes', [
            'id' => $consolidacaoId,
            'status' => 'AVALIADO',
        ]);
    });

    test('retorna 403 quando participante tenta avaliar', function () {
        $consolidacaoId = prepararConsolidacaoConcluida($this);
        $this->actingAs($this->participante, 'web');

        $this->postJson(
            "/api/__tests/v2/plano-trabalho/{$this->plano->id}/consolidacao/{$consolidacaoId}/avaliacao",
            ['tipo_avaliacao_nota_id' => $this->notaSemJustificativa->id]
        )->assertStatus(403);
    });

    test('retorna 422 quando período não está concluído', function () {
        $this->actingAs($this->participante, 'web');

        $this->postJson("/api/__tests/v2/plano-trabalho/{$this->plano->id}/documento");
        $this->postJson("/api/__tests/v2/plano-trabalho/{$this->plano->id}/documento/assinatura-tcr");

        $consolidacaoId = $this->getJson("/api/__tests/v2/plano-trabalho/{$this->plano->id}/consolidacao")
            ->json('data.0.id');

        $this->actingAs($this->chefia, 'web');

        $this->postJson(
            "/api/__tests/v2/plano-trabalho/{$this->plano->id}/consolidacao/{$consolidacaoId}/avaliacao",
            ['tipo_avaliacao_nota_id' => $this->notaSemJustificativa->id]
        )->assertStatus(422);
    });

    test('retorna 422 quando nota não pertence à escala do regramento', function () {
        $consolidacaoId = prepararConsolidacaoConcluida($this);

        $outraEscalaId = fake()->uuid();
        DB::table('tipos_avaliacoes')->insert([
            'id' => $outraEscalaId,
            'nome' => 'Outra escala',
            'tipo' => 'QUALITATIVO',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $notaOutraEscala = TipoAvaliacaoNota::create([
            'id' => fake()->uuid(),
            'sequencia' => 1,
            'nota' => json_encode('Outra'),
            'descricao' => 'Outra escala',
            'pergunta' => '?',
            'aprova' => 1,
            'justifica' => 0,
            'icone' => 'bi bi-x',
            'cor' => '#000',
            'tipo_avaliacao_id' => $outraEscalaId,
        ]);

        $this->postJson(
            "/api/__tests/v2/plano-trabalho/{$this->plano->id}/consolidacao/{$consolidacaoId}/avaliacao",
            ['tipo_avaliacao_nota_id' => $notaOutraEscala->id]
        )->assertStatus(422);
    });

    test('retorna 422 quando justificativa obrigatória e ausente', function () {
        $consolidacaoId = prepararConsolidacaoConcluida($this);

        $this->postJson(
            "/api/__tests/v2/plano-trabalho/{$this->plano->id}/consolidacao/{$consolidacaoId}/avaliacao",
            ['tipo_avaliacao_nota_id' => $this->notaComJustificativa->id]
        )->assertStatus(422);
    });

    test('permite avaliação com justificativa quando nota exige', function () {
        $consolidacaoId = prepararConsolidacaoConcluida($this);

        $this->postJson(
            "/api/__tests/v2/plano-trabalho/{$this->plano->id}/consolidacao/{$consolidacaoId}/avaliacao",
            [
                'tipo_avaliacao_nota_id' => $this->notaComJustificativa->id,
                'justificativa' => 'Desempenho excepcional no período.',
            ]
        )->assertStatus(201);
    });

    test('retorna 422 quando já possui avaliação sem recurso', function () {
        $consolidacaoId = prepararConsolidacaoConcluida($this);

        $this->postJson(
            "/api/__tests/v2/plano-trabalho/{$this->plano->id}/consolidacao/{$consolidacaoId}/avaliacao",
            ['tipo_avaliacao_nota_id' => $this->notaSemJustificativa->id]
        )->assertStatus(201);

        // Simula recurso voltando consolidação para CONCLUIDO sem preencher recurso na avaliação
        DB::table('planos_trabalhos_consolidacoes')
            ->where('id', $consolidacaoId)
            ->update(['status' => 'CONCLUIDO']);

        $this->postJson(
            "/api/__tests/v2/plano-trabalho/{$this->plano->id}/consolidacao/{$consolidacaoId}/avaliacao",
            ['tipo_avaliacao_nota_id' => $this->notaSemJustificativa->id]
        )->assertStatus(422);
    });

    test('retorna 400 quando tipo_avaliacao_nota_id ausente', function () {
        $consolidacaoId = prepararConsolidacaoConcluida($this);

        $this->postJson(
            "/api/__tests/v2/plano-trabalho/{$this->plano->id}/consolidacao/{$consolidacaoId}/avaliacao",
            []
        )->assertStatus(400);
    });
});

// ── POST reavaliação ────────────────────────────────────────────────

describe('POST /api/v2/.../avaliacao (reavaliação)', function () {

    function prepararConsolidacaoComRecurso($context): string
    {
        $consolidacaoId = prepararConsolidacaoConcluida($context);

        $context->postJson(
            "/api/__tests/v2/plano-trabalho/{$context->plano->id}/consolidacao/{$consolidacaoId}/avaliacao",
            ['tipo_avaliacao_nota_id' => $context->notaSemJustificativa->id]
        );

        // Simula recurso: preenche campo recurso na avaliação e volta consolidação para CONCLUIDO
        DB::table('avaliacoes')
            ->where('plano_trabalho_consolidacao_id', $consolidacaoId)
            ->update(['recurso' => 'Discordo da nota atribuída.', 'data_recurso' => now()]);

        DB::table('planos_trabalhos_consolidacoes')
            ->where('id', $consolidacaoId)
            ->update(['status' => 'CONCLUIDO']);

        // Reativa o PT (hook de auto-conclusão pode ter mudado para CONCLUIDO)
        DB::table('planos_trabalhos')
            ->where('id', $context->plano->id)
            ->update(['status' => 'ATIVO']);

        return $consolidacaoId;
    }

    test('cria reavaliação com sucesso quando existe recurso', function () {
        $consolidacaoId = prepararConsolidacaoComRecurso($this);

        $response = $this->postJson(
            "/api/__tests/v2/plano-trabalho/{$this->plano->id}/consolidacao/{$consolidacaoId}/avaliacao",
            ['tipo_avaliacao_nota_id' => $this->notaSemJustificativa->id]
        );

        $response->assertStatus(201)
            ->assertJsonPath('success', true);

        $this->assertDatabaseHas('planos_trabalhos_consolidacoes', [
            'id' => $consolidacaoId,
            'status' => 'AVALIADO',
        ]);

        expect(DB::table('avaliacoes')
            ->where('plano_trabalho_consolidacao_id', $consolidacaoId)
            ->count()
        )->toBe(2);
    });

    test('retorna 422 quando já foi reavaliado', function () {
        $consolidacaoId = prepararConsolidacaoComRecurso($this);

        $this->postJson(
            "/api/__tests/v2/plano-trabalho/{$this->plano->id}/consolidacao/{$consolidacaoId}/avaliacao",
            ['tipo_avaliacao_nota_id' => $this->notaSemJustificativa->id]
        )->assertStatus(201);

        // Volta para CONCLUIDO para tentar terceira avaliação
        DB::table('planos_trabalhos_consolidacoes')
            ->where('id', $consolidacaoId)
            ->update(['status' => 'CONCLUIDO']);

        DB::table('planos_trabalhos')
            ->where('id', $this->plano->id)
            ->update(['status' => 'ATIVO']);

        $this->postJson(
            "/api/__tests/v2/plano-trabalho/{$this->plano->id}/consolidacao/{$consolidacaoId}/avaliacao",
            ['tipo_avaliacao_nota_id' => $this->notaSemJustificativa->id]
        )->assertStatus(422);
    });

    test('reavaliação valida nota e justificativa', function () {
        $consolidacaoId = prepararConsolidacaoComRecurso($this);

        $this->postJson(
            "/api/__tests/v2/plano-trabalho/{$this->plano->id}/consolidacao/{$consolidacaoId}/avaliacao",
            ['tipo_avaliacao_nota_id' => $this->notaComJustificativa->id]
        )->assertStatus(422);

        $this->postJson(
            "/api/__tests/v2/plano-trabalho/{$this->plano->id}/consolidacao/{$consolidacaoId}/avaliacao",
            [
                'tipo_avaliacao_nota_id' => $this->notaComJustificativa->id,
                'justificativa' => 'Reavaliação após recurso.',
            ]
        )->assertStatus(201);
    });
});
