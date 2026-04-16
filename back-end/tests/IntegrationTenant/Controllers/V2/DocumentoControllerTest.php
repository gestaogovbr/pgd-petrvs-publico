<?php

namespace Tests\IntegrationTenant\Controllers\V2;

use App\V2\PlanoTrabalho\Documento\DocumentoController;
use App\Models\Entrega;
use App\Models\Perfil;
use App\Models\PlanoEntrega;
use App\Models\PlanoEntregaEntrega;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoEntrega;
use App\Models\Programa;
use App\Models\Template;
use App\Models\TipoModalidade;
use App\Models\Unidade;
use App\Models\Usuario;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Session;

beforeEach(function () {
    if (!Route::has('__tests.v2.plano-trabalho.documento.store')) {
        Route::middleware(['api'])->post(
            '/api/__tests/v2/plano-trabalho/{planoTrabalhoId}/documento',
            [DocumentoController::class, 'store']
        )->name('__tests.v2.plano-trabalho.documento.store');
    }

    if (!Route::has('__tests.v2.plano-trabalho.documento.show')) {
        Route::middleware(['api'])->get(
            '/api/__tests/v2/plano-trabalho/{planoTrabalhoId}/documento',
            [DocumentoController::class, 'show']
        )->name('__tests.v2.plano-trabalho.documento.show');
    }

    if (!Route::has('__tests.v2.plano-trabalho.documento.assinar')) {
        Route::middleware(['api'])->post(
            '/api/__tests/v2/plano-trabalho/{planoTrabalhoId}/documento/assinatura-tcr',
            [DocumentoController::class, 'assinar']
        )->name('__tests.v2.plano-trabalho.documento.assinar');
    }

    if (!Route::has('__tests.v2.plano-trabalho.documento.cancelar-assinatura')) {
        Route::middleware(['api'])->delete(
            '/api/__tests/v2/plano-trabalho/{planoTrabalhoId}/documento/assinatura-tcr',
            [DocumentoController::class, 'cancelarAssinatura']
        )->name('__tests.v2.plano-trabalho.documento.cancelar-assinatura');
    }

    $perfil = Perfil::factory()->create(['nivel' => 3]);
    $tipoModalidade = TipoModalidade::factory()->create();
    $this->unidade = Unidade::factory()->create();
    $this->usuario = Usuario::factory()->create([
        'perfil_id' => $perfil->id,
        'tipo_modalidade_id' => $tipoModalidade->id,
    ]);

    $this->template = Template::factory()->create([
        'conteudo' => '<p>Plano de {{usuario.nome}} na {{unidade.sigla}}</p>',
    ]);

    $this->programa = Programa::factory()->create([
        'data_inicio' => '2024-01-01',
        'data_fim' => '2025-12-31',
        'template_tcr_id' => $this->template->id,
    ]);

    $this->plano = PlanoTrabalho::factory()->create([
        'usuario_id' => $this->usuario->id,
        'unidade_id' => $this->unidade->id,
        'tipo_modalidade_id' => $tipoModalidade->id,
        'criacao_usuario_id' => $this->usuario->id,
        'programa_id' => $this->programa->id,
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

    Session::put('entidade_id', $this->unidade->entidade_id);
});

function postDocumento($context, ?string $planoId = null)
{
    $id = $planoId ?? $context->plano->id;
    return $context->postJson("/api/__tests/v2/plano-trabalho/{$id}/documento");
}

// ── guard ───────────────────────────────────────────────────────────

describe('POST /api/v2/plano-trabalho/:id/documento (guard)', function () {

    test('retorna 404 quando plano não encontrado', function () {
        $this->actingAs($this->usuario, 'web');

        postDocumento($this, fake()->uuid())
            ->assertStatus(404);
    });

    test('retorna 422 quando plano não possui entregas', function () {
        $this->actingAs($this->usuario, 'web');

        $planoSemEntrega = PlanoTrabalho::factory()->create([
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
            'programa_id' => $this->programa->id,
            'status' => 'INCLUIDO',
        ]);

        postDocumento($this, $planoSemEntrega->id)
            ->assertStatus(422);
    });
});

// ── validação CHD (força de trabalho) ───────────────────────────────

describe('POST /api/v2/plano-trabalho/:id/documento (CHD)', function () {

    test('retorna 422 quando CHD abaixo de 100% sem justificativa', function () {
        $this->actingAs($this->usuario, 'web');

        \App\Models\PlanoTrabalhoEntrega::where('plano_trabalho_id', $this->plano->id)
            ->update(['forca_trabalho' => 99]);

        $this->postJson("/api/__tests/v2/plano-trabalho/{$this->plano->id}/documento")
            ->assertStatus(422);
    });

    test('retorna 201 quando CHD abaixo de 100% com justificativa', function () {
        $this->actingAs($this->usuario, 'web');

        \App\Models\PlanoTrabalhoEntrega::where('plano_trabalho_id', $this->plano->id)
            ->update(['forca_trabalho' => 99]);

        $this->postJson("/api/__tests/v2/plano-trabalho/{$this->plano->id}/documento", [
            'justificativa' => 'Participante em regime parcial.',
        ])->assertStatus(201);
    });

    test('retorna 422 quando CHD acima de 100% sem justificativa', function () {
        $this->actingAs($this->usuario, 'web');

        \App\Models\PlanoTrabalhoEntrega::where('plano_trabalho_id', $this->plano->id)
            ->update(['forca_trabalho' => 101]);

        $this->postJson("/api/__tests/v2/plano-trabalho/{$this->plano->id}/documento")
            ->assertStatus(422);
    });

    test('retorna 201 quando CHD acima de 100% com justificativa', function () {
        $this->actingAs($this->usuario, 'web');

        \App\Models\PlanoTrabalhoEntrega::where('plano_trabalho_id', $this->plano->id)
            ->update(['forca_trabalho' => 101]);

        $this->postJson("/api/__tests/v2/plano-trabalho/{$this->plano->id}/documento", [
            'justificativa' => 'Acúmulo temporário de entregas.',
        ])->assertStatus(201);
    });

    test('limpa justificativa quando CHD corrigido para 100%', function () {
        $this->actingAs($this->usuario, 'web');

        $this->plano->update(['justificativa' => 'Justificativa anterior.']);

        $this->postJson("/api/__tests/v2/plano-trabalho/{$this->plano->id}/documento")
            ->assertStatus(201);

        $this->plano->refresh();
        expect($this->plano->justificativa)->toBeNull();
    });
});

// ── happy path ──────────────────────────────────────────────────────

describe('POST /api/v2/plano-trabalho/:id/documento (happy path)', function () {

    test('cria documento TCR e retorna 201', function () {
        $this->actingAs($this->usuario, 'web');

        $response = postDocumento($this);

        $response->assertStatus(201)
            ->assertJsonPath('success', true);

        $this->assertDatabaseHas('documentos', [
            'plano_trabalho_id' => $this->plano->id,
            'especie' => 'TCR',
            'tipo' => 'HTML',
            'status' => 'GERADO',
        ]);
    });

    test('documento criado possui template preenchido', function () {
        $this->actingAs($this->usuario, 'web');

        $response = postDocumento($this);
        $data = $response->json('data');

        expect($data['template'])->toBe('<p>Plano de {{usuario.nome}} na {{unidade.sigla}}</p>');
    });

    test('documento criado possui conteúdo renderizado com dados do plano', function () {
        $this->actingAs($this->usuario, 'web');

        $response = postDocumento($this);
        $data = $response->json('data');

        expect($data['conteudo'])->toContain($this->usuario->nome);
        expect($data['conteudo'])->toContain($this->unidade->sigla);
        expect($data['conteudo'])->not->toContain('{{');
    });

    test('documento criado possui datasource com dados do plano', function () {
        $this->actingAs($this->usuario, 'web');

        $response = postDocumento($this);
        $data = $response->json('data');

        expect($data['datasource'])->not->toBeNull();
        expect($data['datasource'])->toBeArray();
    });

    test('documento criado possui dataset', function () {
        $this->actingAs($this->usuario, 'web');

        $response = postDocumento($this);
        $data = $response->json('data');

        expect($data['dataset'])->not->toBeNull();
        expect($data['dataset'])->toBeArray();
    });

    test('documento criado possui template_id do programa', function () {
        $this->actingAs($this->usuario, 'web');

        $response = postDocumento($this);
        $data = $response->json('data');

        expect($data['template_id'])->toBe($this->template->id);
    });

    test('atualiza documento_id no plano de trabalho', function () {
        $this->actingAs($this->usuario, 'web');

        $response = postDocumento($this);
        $documentoId = $response->json('data.id');

        $this->assertDatabaseHas('planos_trabalhos', [
            'id' => $this->plano->id,
            'documento_id' => $documentoId,
        ]);
    });

    test('retorna documento existente quando chamado duas vezes (idempotente)', function () {
        $this->actingAs($this->usuario, 'web');

        $first = postDocumento($this);
        $second = postDocumento($this);

        expect($second->json('data.id'))->toBe($first->json('data.id'));
    });
});

// ── GET show ────────────────────────────────────────────────────────

describe('GET /api/v2/plano-trabalho/:id/documento', function () {

    test('retorna 404 quando plano não possui documento TCR', function () {
        $this->actingAs($this->usuario, 'web');

        $this->getJson("/api/__tests/v2/plano-trabalho/{$this->plano->id}/documento")
            ->assertStatus(404);
    });

    test('retorna numero, titulo e conteudo do TCR', function () {
        $this->actingAs($this->usuario, 'web');

        postDocumento($this);

        $response = $this->getJson("/api/__tests/v2/plano-trabalho/{$this->plano->id}/documento");

        $response->assertStatus(200)
            ->assertJsonPath('success', true);

        $data = $response->json('data');

        expect($data)->toHaveKeys(['numero', 'titulo', 'conteudo']);
        expect($data['titulo'])->toBe('Termo de Ciência e Responsabilidade');
        expect($data['conteudo'])->toContain($this->usuario->nome);
        expect($data['numero'])->toBeInt();
    });

    test('retorna apenas os campos necessários para o front', function () {
        $this->actingAs($this->usuario, 'web');

        postDocumento($this);

        $data = $this->getJson("/api/__tests/v2/plano-trabalho/{$this->plano->id}/documento")
            ->json('data');

        expect(array_keys($data))->toBe(['numero', 'titulo', 'conteudo', 'assinaturas']);
    });
});

function postAssinar($context, ?string $planoId = null)
{
    $id = $planoId ?? $context->plano->id;
    return $context->postJson("/api/__tests/v2/plano-trabalho/{$id}/documento/assinatura-tcr");
}

// ── POST assinatura-tcr: guard ──────────────────────────────────────

describe('POST /api/v2/plano-trabalho/:id/documento/assinatura-tcr (guard)', function () {

    test('retorna 404 quando plano não encontrado', function () {
        $this->actingAs($this->usuario, 'web');

        postAssinar($this, fake()->uuid())
            ->assertStatus(404);
    });

    test('retorna 422 quando plano está ATIVO', function () {
        $this->actingAs($this->usuario, 'web');

        $this->plano->status = 'ATIVO';
        $this->plano->save();

        postDocumento($this);

        postAssinar($this)
            ->assertStatus(422);
    });

    test('retorna 404 quando TCR não foi gerado', function () {
        $this->actingAs($this->usuario, 'web');

        postAssinar($this)
            ->assertStatus(404);
    });

    test('retorna 422 quando usuário já assinou', function () {
        $this->actingAs($this->usuario, 'web');

        postDocumento($this);
        postAssinar($this)->assertStatus(201);

        postAssinar($this)
            ->assertStatus(422);
    });
});

// ── POST assinatura-tcr: happy path ─────────────────────────────────

describe('POST /api/v2/plano-trabalho/:id/documento/assinatura-tcr (happy path)', function () {

    test('registra assinatura e retorna 201', function () {
        $this->actingAs($this->usuario, 'web');

        postDocumento($this);

        $response = postAssinar($this);

        $response->assertStatus(201)
            ->assertJsonPath('success', true);

        $this->assertDatabaseHas('documentos_assinaturas', [
            'usuario_id' => $this->usuario->id,
        ]);
    });

    test('atualiza status do plano para ATIVO quando participante é o único signatário exigido', function () {
        $this->actingAs($this->usuario, 'web');

        postDocumento($this);
        postAssinar($this);

        $this->plano->refresh();

        expect($this->plano->status)->toBe('ATIVO');
    });

    test('assinatura contém hash não vazio', function () {
        $this->actingAs($this->usuario, 'web');

        postDocumento($this);

        $data = postAssinar($this)->json('data');

        expect($data['assinatura'])->toBeString()->not->toBeEmpty();
        expect($data['usuario_id'])->toBe($this->usuario->id);
    });
});

function deleteAssinatura($context, ?string $planoId = null)
{
    $id = $planoId ?? $context->plano->id;
    return $context->deleteJson("/api/__tests/v2/plano-trabalho/{$id}/documento/assinatura-tcr");
}

// ── DELETE assinatura-tcr: guard ────────────────────────────────────

describe('DELETE /api/v2/plano-trabalho/:id/documento/assinatura-tcr (guard)', function () {

    test('retorna 422 quando plano não está AGUARDANDO_ASSINATURA', function () {
        $this->actingAs($this->usuario, 'web');

        postDocumento($this);

        deleteAssinatura($this)
            ->assertStatus(422);
    });

    test('retorna 422 quando usuário não assinou', function () {
        $this->actingAs($this->usuario, 'web');

        postDocumento($this);

        $this->plano->status = 'AGUARDANDO_ASSINATURA';
        $this->plano->save();

        deleteAssinatura($this)
            ->assertStatus(422);
    });
});

// ── DELETE assinatura-tcr: happy path ───────────────────────────────

describe('DELETE /api/v2/plano-trabalho/:id/documento/assinatura-tcr (happy path)', function () {

    test('remove assinatura (soft delete) e reverte status para INCLUIDO', function () {
        $this->actingAs($this->usuario, 'web');

        postDocumento($this);
        postAssinar($this);

        $this->plano->refresh();
        expect($this->plano->status)->toBe('ATIVO');

        $this->plano->status = 'AGUARDANDO_ASSINATURA';
        $this->plano->save();

        deleteAssinatura($this)->assertStatus(200);

        $this->plano->refresh();
        expect($this->plano->status)->toBe('INCLUIDO');

        $this->assertDatabaseHas('documentos_assinaturas', [
            'usuario_id' => $this->usuario->id,
        ]);

        $assinatura = \App\Models\DocumentoAssinatura::withTrashed()
            ->where('usuario_id', $this->usuario->id)
            ->first();

        expect($assinatura->deleted_at)->not->toBeNull();
    });

    test('ciclo completo: assinar → cancelar → assinar → cancelar', function () {
        $this->actingAs($this->usuario, 'web');

        postDocumento($this);

        // 1ª assinatura
        postAssinar($this)->assertStatus(201);
        $this->plano->refresh();
        expect($this->plano->status)->toBe('ATIVO');

        // 1º cancelamento
        $this->plano->status = 'AGUARDANDO_ASSINATURA';
        $this->plano->save();
        deleteAssinatura($this)->assertStatus(200);
        $this->plano->refresh();
        expect($this->plano->status)->toBe('INCLUIDO');

        // 2ª assinatura
        postAssinar($this)->assertStatus(201);
        $this->plano->refresh();
        expect($this->plano->status)->toBe('ATIVO');

        // 2º cancelamento
        $this->plano->status = 'AGUARDANDO_ASSINATURA';
        $this->plano->save();
        deleteAssinatura($this)->assertStatus(200);
        $this->plano->refresh();
        expect($this->plano->status)->toBe('INCLUIDO');
    });
});

// ── POST assinatura-tcr: dupla assinatura ───────────────────────────

describe('POST /api/v2/plano-trabalho/:id/documento/assinatura-tcr (dupla assinatura)', function () {

    beforeEach(function () {
        $this->programa->plano_trabalho_assinatura_participante = 1;
        $this->programa->plano_trabalho_assinatura_gestor_unidade = 1;
        $this->programa->save();

        $perfil = Perfil::factory()->create(['nivel' => 3]);
        $this->chefia = Usuario::factory()->create([
            'perfil_id' => $perfil->id,
        ]);

        $integrante = \App\Models\UnidadeIntegrante::create([
            'unidade_id' => $this->unidade->id,
            'usuario_id' => $this->chefia->id,
        ]);

        \App\Models\UnidadeIntegranteAtribuicao::create([
            'unidade_integrante_id' => $integrante->id,
            'atribuicao' => 'GESTOR',
        ]);
    });

    test('participante assina primeiro, chefia completa → ATIVO', function () {
        $this->actingAs($this->usuario, 'web');
        postDocumento($this);

        postAssinar($this)->assertStatus(201);
        $this->plano->refresh();
        expect($this->plano->status)->toBe('AGUARDANDO_ASSINATURA');

        $this->actingAs($this->chefia, 'web');
        postAssinar($this)->assertStatus(201);
        $this->plano->refresh();
        expect($this->plano->status)->toBe('ATIVO');
    });

    test('chefia assina primeiro, participante completa → ATIVO', function () {
        $this->actingAs($this->usuario, 'web');
        postDocumento($this);

        $this->actingAs($this->chefia, 'web');
        postAssinar($this)->assertStatus(201);
        $this->plano->refresh();
        expect($this->plano->status)->toBe('AGUARDANDO_ASSINATURA');

        $this->actingAs($this->usuario, 'web');
        postAssinar($this)->assertStatus(201);
        $this->plano->refresh();
        expect($this->plano->status)->toBe('ATIVO');
    });

    test('apenas participante assina quando ambas são exigidas → AGUARDANDO_ASSINATURA', function () {
        $this->actingAs($this->usuario, 'web');
        postDocumento($this);

        postAssinar($this)->assertStatus(201);
        $this->plano->refresh();
        expect($this->plano->status)->toBe('AGUARDANDO_ASSINATURA');
    });
});

// ── POST assinatura-tcr: participante é chefia ──────────────────────

describe('POST /api/v2/plano-trabalho/:id/documento/assinatura-tcr (participante é chefia)', function () {

    beforeEach(function () {
        $this->programa->plano_trabalho_assinatura_participante = 1;
        $this->programa->plano_trabalho_assinatura_gestor_unidade = 1;
        $this->programa->save();

        // participante é também gestor da unidade do PT
        $integrante = \App\Models\UnidadeIntegrante::create([
            'unidade_id' => $this->unidade->id,
            'usuario_id' => $this->usuario->id,
        ]);

        \App\Models\UnidadeIntegranteAtribuicao::create([
            'unidade_integrante_id' => $integrante->id,
            'atribuicao' => 'GESTOR',
        ]);
    });

    test('participante que é chefia sem unidade pai assina uma vez → ATIVO', function () {
        $this->actingAs($this->usuario, 'web');
        postDocumento($this);

        postAssinar($this)->assertStatus(201);
        $this->plano->refresh();

        expect($this->plano->status)->toBe('ATIVO');
    });

    test('participante que é chefia com unidade pai assina → AGUARDANDO_ASSINATURA', function () {
        $this->unidadePai = Unidade::factory()->create();
        $this->unidade->unidade_pai_id = $this->unidadePai->id;
        $this->unidade->save();

        $this->actingAs($this->usuario, 'web');
        postDocumento($this);

        postAssinar($this)->assertStatus(201);
        $this->plano->refresh();

        expect($this->plano->status)->toBe('AGUARDANDO_ASSINATURA');
    });

    test('chefia da unidade pai completa a assinatura → ATIVO', function () {
        $this->unidadePai = Unidade::factory()->create();
        $this->unidade->unidade_pai_id = $this->unidadePai->id;
        $this->unidade->save();

        $perfil = Perfil::factory()->create(['nivel' => 3]);
        $chefiaPai = Usuario::factory()->create(['perfil_id' => $perfil->id]);

        $integrantePai = \App\Models\UnidadeIntegrante::create([
            'unidade_id' => $this->unidadePai->id,
            'usuario_id' => $chefiaPai->id,
        ]);

        \App\Models\UnidadeIntegranteAtribuicao::create([
            'unidade_integrante_id' => $integrantePai->id,
            'atribuicao' => 'GESTOR',
        ]);

        $this->actingAs($this->usuario, 'web');
        postDocumento($this);
        postAssinar($this)->assertStatus(201);

        $this->actingAs($chefiaPai, 'web');
        postAssinar($this)->assertStatus(201);

        $this->plano->refresh();
        expect($this->plano->status)->toBe('ATIVO');
    });
});

// ── POST assinatura-tcr: chefia imediata é dona do PT ───────────────

describe('POST /api/v2/plano-trabalho/:id/documento/assinatura-tcr (chefia imediata é dona do PT)', function () {

    beforeEach(function () {
        $this->programa->plano_trabalho_assinatura_participante = 1;
        $this->programa->plano_trabalho_assinatura_gestor_unidade = 1;
        $this->programa->save();

        $perfil = Perfil::factory()->create(['nivel' => 3]);

        // participante (dono do PT) é gestor titular da unidade
        $integrante = \App\Models\UnidadeIntegrante::create([
            'unidade_id' => $this->unidade->id,
            'usuario_id' => $this->usuario->id,
        ]);
        \App\Models\UnidadeIntegranteAtribuicao::create([
            'unidade_integrante_id' => $integrante->id,
            'atribuicao' => 'GESTOR',
        ]);

        // unidade pai existe
        $this->unidadePai = Unidade::factory()->create();
        $this->unidade->unidade_pai_id = $this->unidadePai->id;
        $this->unidade->save();

        // gestor substituto da unidade pai
        $this->substituto = Usuario::factory()->create(['perfil_id' => $perfil->id]);
        $integranteSub = \App\Models\UnidadeIntegrante::create([
            'unidade_id' => $this->unidadePai->id,
            'usuario_id' => $this->substituto->id,
        ]);
        \App\Models\UnidadeIntegranteAtribuicao::create([
            'unidade_integrante_id' => $integranteSub->id,
            'atribuicao' => 'GESTOR_SUBSTITUTO',
        ]);
    });

    test('chefia imediata assina seu próprio PT → AGUARDANDO_ASSINATURA', function () {
        $this->actingAs($this->usuario, 'web');
        postDocumento($this);
        postAssinar($this)->assertStatus(201);

        $this->plano->refresh();
        expect($this->plano->status)->toBe('AGUARDANDO_ASSINATURA');
    });

    test('substituto da unidade pai completa assinatura do PT da chefia → ATIVO', function () {
        $this->actingAs($this->usuario, 'web');
        postDocumento($this);
        postAssinar($this)->assertStatus(201);

        $this->actingAs($this->substituto, 'web');
        postAssinar($this)->assertStatus(201);

        $this->plano->refresh();
        expect($this->plano->status)->toBe('ATIVO');
    });

    test('substituto assina primeiro, chefia imediata completa seu próprio PT → ATIVO', function () {
        $this->actingAs($this->usuario, 'web');
        postDocumento($this);

        $this->actingAs($this->substituto, 'web');
        postAssinar($this)->assertStatus(201);

        $this->plano->refresh();
        expect($this->plano->status)->toBe('AGUARDANDO_ASSINATURA');

        $this->actingAs($this->usuario, 'web');
        postAssinar($this)->assertStatus(201);

        $this->plano->refresh();
        expect($this->plano->status)->toBe('ATIVO');
    });
});

// ── POST assinatura-tcr: impede assinaturas excedentes ──────────────

describe('POST /api/v2/plano-trabalho/:id/documento/assinatura-tcr (assinaturas excedentes)', function () {

    test('rejeita assinatura quando todas as exigidas já foram realizadas', function () {
        $this->programa->plano_trabalho_assinatura_participante = 1;
        $this->programa->plano_trabalho_assinatura_gestor_unidade = 1;
        $this->programa->save();

        $perfil = Perfil::factory()->create(['nivel' => 3]);

        // chefia da unidade
        $chefia = Usuario::factory()->create(['perfil_id' => $perfil->id]);
        $integrante = \App\Models\UnidadeIntegrante::create([
            'unidade_id' => $this->unidade->id,
            'usuario_id' => $chefia->id,
        ]);
        \App\Models\UnidadeIntegranteAtribuicao::create([
            'unidade_integrante_id' => $integrante->id,
            'atribuicao' => 'GESTOR',
        ]);

        // gestor substituto da mesma unidade
        $substituto = Usuario::factory()->create(['perfil_id' => $perfil->id]);
        $integranteSub = \App\Models\UnidadeIntegrante::create([
            'unidade_id' => $this->unidade->id,
            'usuario_id' => $substituto->id,
        ]);
        \App\Models\UnidadeIntegranteAtribuicao::create([
            'unidade_integrante_id' => $integranteSub->id,
            'atribuicao' => 'GESTOR_SUBSTITUTO',
        ]);

        // participante + chefia assinam → ATIVO
        $this->actingAs($this->usuario, 'web');
        postDocumento($this);
        postAssinar($this)->assertStatus(201);

        $this->actingAs($chefia, 'web');
        postAssinar($this)->assertStatus(201);

        $this->plano->refresh();
        expect($this->plano->status)->toBe('ATIVO');

        // substituto tenta assinar → rejeitado
        $this->plano->status = 'AGUARDANDO_ASSINATURA';
        $this->plano->save();

        $this->actingAs($substituto, 'web');
        postAssinar($this)->assertStatus(422);
    });
});

// ── POST assinatura-tcr: geração de períodos avaliativos ────────────

describe('POST /api/v2/plano-trabalho/:id/documento/assinatura-tcr (períodos avaliativos)', function () {

    test('gera consolidações ao ativar o plano', function () {
        $this->actingAs($this->usuario, 'web');

        postDocumento($this);
        postAssinar($this);

        $this->plano->refresh();
        expect($this->plano->status)->toBe('ATIVO');

        $consolidacoes = \App\Models\PlanoTrabalhoConsolidacao::where('plano_trabalho_id', $this->plano->id)->get();

        expect($consolidacoes)->not->toBeEmpty();
        expect($consolidacoes->first()->status)->toBe('INCLUIDO');
        expect($consolidacoes->first()->plano_trabalho_id)->toBe($this->plano->id);
    });

    test('não duplica consolidações quando plano já está ativo', function () {
        $this->actingAs($this->usuario, 'web');

        postDocumento($this);
        postAssinar($this);

        $this->plano->refresh();
        expect($this->plano->status)->toBe('ATIVO');

        $countOriginal = \App\Models\PlanoTrabalhoConsolidacao::where('plano_trabalho_id', $this->plano->id)->count();
        expect($countOriginal)->toBeGreaterThan(0);

        // Simula uma segunda chamada ao gerador (idempotência)
        app(\App\V2\PlanoTrabalho\Consolidacao\GeradorPeriodosAvaliativos::class)->gerar($this->plano);

        $countDepois = \App\Models\PlanoTrabalhoConsolidacao::where('plano_trabalho_id', $this->plano->id)->count();
        expect($countDepois)->toBe($countOriginal);
    });
});

// ── POST assinatura-tcr: datas dos períodos avaliativos ─────────────

describe('POST /api/v2/plano-trabalho/:id/documento/assinatura-tcr (datas dos períodos)', function () {

    test('gera períodos mensais com datas corretas para janeiro a junho', function () {
        $this->plano->data_inicio = '2025-01-01';
        $this->plano->data_fim = '2025-06-30';
        $this->plano->save();

        $this->actingAs($this->usuario, 'web');
        postDocumento($this);
        postAssinar($this);

        $consolidacoes = \App\Models\PlanoTrabalhoConsolidacao::where('plano_trabalho_id', $this->plano->id)
            ->orderBy('data_inicio')
            ->get();

        expect($consolidacoes)->toHaveCount(6);
        expect($consolidacoes[0]->data_inicio)->toBe('2025-01-01');
        expect($consolidacoes[0]->data_fim)->toBe('2025-01-31');
        expect($consolidacoes[1]->data_inicio)->toBe('2025-02-01');
        expect($consolidacoes[1]->data_fim)->toBe('2025-02-28');
        expect($consolidacoes[2]->data_inicio)->toBe('2025-03-01');
        expect($consolidacoes[2]->data_fim)->toBe('2025-03-31');
        expect($consolidacoes[5]->data_inicio)->toBe('2025-06-01');
        expect($consolidacoes[5]->data_fim)->toBe('2025-06-30');
    });

    test('trata fevereiro em ano bissexto', function () {
        $this->plano->data_inicio = '2024-02-01';
        $this->plano->data_fim = '2024-02-29';
        $this->plano->save();

        $this->actingAs($this->usuario, 'web');
        postDocumento($this);
        postAssinar($this);

        $consolidacoes = \App\Models\PlanoTrabalhoConsolidacao::where('plano_trabalho_id', $this->plano->id)
            ->orderBy('data_inicio')
            ->get();

        expect($consolidacoes)->toHaveCount(1);
        expect($consolidacoes[0]->data_inicio)->toBe('2024-02-01');
        expect($consolidacoes[0]->data_fim)->toBe('2024-02-29');
    });

    test('trata fevereiro em ano não bissexto', function () {
        $this->plano->data_inicio = '2025-02-01';
        $this->plano->data_fim = '2025-02-28';
        $this->plano->save();

        $this->actingAs($this->usuario, 'web');
        postDocumento($this);
        postAssinar($this);

        $consolidacoes = \App\Models\PlanoTrabalhoConsolidacao::where('plano_trabalho_id', $this->plano->id)
            ->orderBy('data_inicio')
            ->get();

        expect($consolidacoes)->toHaveCount(1);
        expect($consolidacoes[0]->data_inicio)->toBe('2025-02-01');
        expect($consolidacoes[0]->data_fim)->toBe('2025-02-28');
    });

    test('trata transição julho-agosto (31 dias consecutivos)', function () {
        $this->plano->data_inicio = '2025-07-01';
        $this->plano->data_fim = '2025-08-31';
        $this->plano->save();

        $this->actingAs($this->usuario, 'web');
        postDocumento($this);
        postAssinar($this);

        $consolidacoes = \App\Models\PlanoTrabalhoConsolidacao::where('plano_trabalho_id', $this->plano->id)
            ->orderBy('data_inicio')
            ->get();

        expect($consolidacoes)->toHaveCount(2);
        expect($consolidacoes[0]->data_inicio)->toBe('2025-07-01');
        expect($consolidacoes[0]->data_fim)->toBe('2025-07-31');
        expect($consolidacoes[1]->data_inicio)->toBe('2025-08-01');
        expect($consolidacoes[1]->data_fim)->toBe('2025-08-31');
    });

    test('último período ajustado quando data_fim não coincide com fim do mês', function () {
        $this->plano->data_inicio = '2025-01-01';
        $this->plano->data_fim = '2025-03-15';
        $this->plano->save();

        $this->actingAs($this->usuario, 'web');
        postDocumento($this);
        postAssinar($this);

        $consolidacoes = \App\Models\PlanoTrabalhoConsolidacao::where('plano_trabalho_id', $this->plano->id)
            ->orderBy('data_inicio')
            ->get();

        expect($consolidacoes)->toHaveCount(3);
        expect($consolidacoes[0]->data_fim)->toBe('2025-01-31');
        expect($consolidacoes[1]->data_fim)->toBe('2025-02-28');
        expect($consolidacoes[2]->data_inicio)->toBe('2025-03-01');
        expect($consolidacoes[2]->data_fim)->toBe('2025-03-15');
    });

    test('plano de um único dia gera uma consolidação', function () {
        $this->plano->data_inicio = '2025-06-15';
        $this->plano->data_fim = '2025-06-15';
        $this->plano->save();

        $this->actingAs($this->usuario, 'web');
        postDocumento($this);
        postAssinar($this);

        $consolidacoes = \App\Models\PlanoTrabalhoConsolidacao::where('plano_trabalho_id', $this->plano->id)
            ->orderBy('data_inicio')
            ->get();

        expect($consolidacoes)->toHaveCount(1);
        expect($consolidacoes[0]->data_inicio)->toBe('2025-06-15');
        expect($consolidacoes[0]->data_fim)->toBe('2025-06-15');
    });
});

// ── POST assinatura-tcr: periodicidades alternativas ────────────────

describe('POST /api/v2/plano-trabalho/:id/documento/assinatura-tcr (periodicidades)', function () {

    test('BIMESTRAL: gera períodos de 2 meses', function () {
        $this->programa->periodicidade_consolidacao = 'BIMESTRAL';
        $this->programa->periodicidade_valor = 31;
        $this->programa->save();

        $this->plano->data_inicio = '2025-01-01';
        $this->plano->data_fim = '2025-06-30';
        $this->plano->save();

        $this->actingAs($this->usuario, 'web');
        postDocumento($this);
        postAssinar($this);

        $consolidacoes = \App\Models\PlanoTrabalhoConsolidacao::where('plano_trabalho_id', $this->plano->id)
            ->orderBy('data_inicio')
            ->get();

        expect($consolidacoes)->toHaveCount(3);
        expect($consolidacoes[0]->data_inicio)->toBe('2025-01-01');
        expect($consolidacoes[0]->data_fim)->toBe('2025-02-28');
        expect($consolidacoes[1]->data_inicio)->toBe('2025-03-01');
        expect($consolidacoes[1]->data_fim)->toBe('2025-04-30');
        expect($consolidacoes[2]->data_inicio)->toBe('2025-05-01');
        expect($consolidacoes[2]->data_fim)->toBe('2025-06-30');
    });

    test('TRIMESTRAL: gera períodos de 3 meses', function () {
        $this->programa->periodicidade_consolidacao = 'TRIMESTRAL';
        $this->programa->periodicidade_valor = 31;
        $this->programa->save();

        $this->plano->data_inicio = '2025-01-01';
        $this->plano->data_fim = '2025-06-30';
        $this->plano->save();

        $this->actingAs($this->usuario, 'web');
        postDocumento($this);
        postAssinar($this);

        $consolidacoes = \App\Models\PlanoTrabalhoConsolidacao::where('plano_trabalho_id', $this->plano->id)
            ->orderBy('data_inicio')
            ->get();

        expect($consolidacoes)->toHaveCount(2);
        expect($consolidacoes[0]->data_inicio)->toBe('2025-01-01');
        expect($consolidacoes[0]->data_fim)->toBe('2025-03-31');
        expect($consolidacoes[1]->data_inicio)->toBe('2025-04-01');
        expect($consolidacoes[1]->data_fim)->toBe('2025-06-30');
    });

    test('SEMESTRAL: gera períodos de 6 meses', function () {
        $this->programa->periodicidade_consolidacao = 'SEMESTRAL';
        $this->programa->periodicidade_valor = 31;
        $this->programa->save();

        $this->plano->data_inicio = '2025-01-01';
        $this->plano->data_fim = '2025-12-31';
        $this->plano->save();

        $this->actingAs($this->usuario, 'web');
        postDocumento($this);
        postAssinar($this);

        $consolidacoes = \App\Models\PlanoTrabalhoConsolidacao::where('plano_trabalho_id', $this->plano->id)
            ->orderBy('data_inicio')
            ->get();

        expect($consolidacoes)->toHaveCount(2);
        expect($consolidacoes[0]->data_inicio)->toBe('2025-01-01');
        expect($consolidacoes[0]->data_fim)->toBe('2025-06-30');
        expect($consolidacoes[1]->data_inicio)->toBe('2025-07-01');
        expect($consolidacoes[1]->data_fim)->toBe('2025-12-31');
    });

    test('DIAS: gera períodos de N dias', function () {
        $this->programa->periodicidade_consolidacao = 'DIAS';
        $this->programa->periodicidade_valor = 15;
        $this->programa->save();

        $this->plano->data_inicio = '2025-03-01';
        $this->plano->data_fim = '2025-03-31';
        $this->plano->save();

        $this->actingAs($this->usuario, 'web');
        postDocumento($this);
        postAssinar($this);

        $consolidacoes = \App\Models\PlanoTrabalhoConsolidacao::where('plano_trabalho_id', $this->plano->id)
            ->orderBy('data_inicio')
            ->get();

        expect($consolidacoes->count())->toBeGreaterThanOrEqual(2);
        expect($consolidacoes[0]->data_inicio)->toBe('2025-03-01');
        expect($consolidacoes->last()->data_fim)->toBe('2025-03-31');

        foreach ($consolidacoes as $c) {
            expect($c->data_inicio <= $c->data_fim)->toBeTrue();
        }
    });

    test('SEMANAL: gera períodos semanais', function () {
        $this->programa->periodicidade_consolidacao = 'SEMANAL';
        $this->programa->periodicidade_valor = 1; // segunda-feira
        $this->programa->save();

        // 2025-03-03 é segunda-feira
        $this->plano->data_inicio = '2025-03-03';
        $this->plano->data_fim = '2025-03-23';
        $this->plano->save();

        $this->actingAs($this->usuario, 'web');
        postDocumento($this);
        postAssinar($this);

        $consolidacoes = \App\Models\PlanoTrabalhoConsolidacao::where('plano_trabalho_id', $this->plano->id)
            ->orderBy('data_inicio')
            ->get();

        expect($consolidacoes->count())->toBeGreaterThanOrEqual(2);

        foreach ($consolidacoes as $c) {
            expect($c->data_inicio)->not->toBeNull();
            expect($c->data_fim)->not->toBeNull();
            expect($c->data_inicio <= $c->data_fim)->toBeTrue();
        }
    });

    test('QUINZENAL: gera períodos quinzenais', function () {
        $this->programa->periodicidade_consolidacao = 'QUINZENAL';
        $this->programa->periodicidade_valor = 1; // segunda-feira
        $this->programa->save();

        $this->plano->data_inicio = '2025-03-03';
        $this->plano->data_fim = '2025-04-30';
        $this->plano->save();

        $this->actingAs($this->usuario, 'web');
        postDocumento($this);
        postAssinar($this);

        $consolidacoes = \App\Models\PlanoTrabalhoConsolidacao::where('plano_trabalho_id', $this->plano->id)
            ->orderBy('data_inicio')
            ->get();

        expect($consolidacoes->count())->toBeGreaterThanOrEqual(2);

        foreach ($consolidacoes as $c) {
            expect($c->data_inicio <= $c->data_fim)->toBeTrue();
        }
    });

    test('BIMESTRAL com fevereiro bissexto: ajusta corretamente', function () {
        $this->programa->periodicidade_consolidacao = 'BIMESTRAL';
        $this->programa->periodicidade_valor = 31;
        $this->programa->save();

        $this->plano->data_inicio = '2024-01-01';
        $this->plano->data_fim = '2024-04-30';
        $this->plano->save();

        $this->actingAs($this->usuario, 'web');
        postDocumento($this);
        postAssinar($this);

        $consolidacoes = \App\Models\PlanoTrabalhoConsolidacao::where('plano_trabalho_id', $this->plano->id)
            ->orderBy('data_inicio')
            ->get();

        expect($consolidacoes)->toHaveCount(2);
        expect($consolidacoes[0]->data_inicio)->toBe('2024-01-01');
        expect($consolidacoes[0]->data_fim)->toBe('2024-02-29');
        expect($consolidacoes[1]->data_inicio)->toBe('2024-03-01');
        expect($consolidacoes[1]->data_fim)->toBe('2024-04-30');
    });

    test('TRIMESTRAL com último período truncado pela data_fim do plano', function () {
        $this->programa->periodicidade_consolidacao = 'TRIMESTRAL';
        $this->programa->periodicidade_valor = 31;
        $this->programa->save();

        $this->plano->data_inicio = '2025-01-01';
        $this->plano->data_fim = '2025-05-15';
        $this->plano->save();

        $this->actingAs($this->usuario, 'web');
        postDocumento($this);
        postAssinar($this);

        $consolidacoes = \App\Models\PlanoTrabalhoConsolidacao::where('plano_trabalho_id', $this->plano->id)
            ->orderBy('data_inicio')
            ->get();

        expect($consolidacoes)->toHaveCount(2);
        expect($consolidacoes[0]->data_fim)->toBe('2025-03-31');
        expect($consolidacoes[1]->data_inicio)->toBe('2025-04-01');
        expect($consolidacoes[1]->data_fim)->toBe('2025-05-15');
    });

    test('sem gaps entre períodos consecutivos', function () {
        $this->plano->data_inicio = '2025-01-01';
        $this->plano->data_fim = '2025-12-31';
        $this->plano->save();

        $this->actingAs($this->usuario, 'web');
        postDocumento($this);
        postAssinar($this);

        $consolidacoes = \App\Models\PlanoTrabalhoConsolidacao::where('plano_trabalho_id', $this->plano->id)
            ->orderBy('data_inicio')
            ->get();

        for ($i = 1; $i < $consolidacoes->count(); $i++) {
            $fimAnterior = \Carbon\Carbon::parse($consolidacoes[$i - 1]->data_fim);
            $inicioAtual = \Carbon\Carbon::parse($consolidacoes[$i]->data_inicio);

            expect($inicioAtual->diffInDays($fimAnterior))->toBe(1);
        }
    });
});
