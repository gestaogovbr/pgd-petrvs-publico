<?php

namespace Tests\IntegrationTenant\Controllers\V2;

use App\V2\PlanoTrabalho\Entrega\PlanoTrabalhoEntregaController;
use App\Models\Entrega;
use App\Models\Perfil;
use App\Models\PlanoEntrega;
use App\Models\PlanoEntregaEntrega;
use App\Models\PlanoTrabalho;
use App\Models\Programa;
use App\Models\Unidade;
use App\Models\Documento;
use App\Models\Usuario;
use Illuminate\Support\Facades\Route;

function criarDocumentoTCR(string $planoTrabalhoId): Documento
{
    return Documento::create([
        'titulo' => 'TCR Teste',
        'tipo' => 'HTML',
        'especie' => 'TCR',
        'conteudo' => 'conteudo',
        'status' => 'GERADO',
        'plano_trabalho_id' => $planoTrabalhoId,
    ]);
}

beforeEach(function () {
    if (!Route::has('__tests.v2.plano-trabalho.entrega.store')) {
        Route::middleware(['api'])->post(
            '/api/__tests/v2/plano-trabalho/{planoTrabalhoId}/entrega',
            [PlanoTrabalhoEntregaController::class, 'store']
        )->name('__tests.v2.plano-trabalho.entrega.store');
    }
    if (!Route::has('__tests.v2.plano-trabalho.entrega.update')) {
        Route::middleware(['api'])->put(
            '/api/__tests/v2/plano-trabalho/{planoTrabalhoId}/entrega/{entregaId}',
            [PlanoTrabalhoEntregaController::class, 'update']
        )->name('__tests.v2.plano-trabalho.entrega.update');
    }
    if (!Route::has('__tests.v2.plano-trabalho.entrega.destroy')) {
        Route::middleware(['api'])->delete(
            '/api/__tests/v2/plano-trabalho/{planoTrabalhoId}/entrega/{entregaId}',
            [PlanoTrabalhoEntregaController::class, 'destroy']
        )->name('__tests.v2.plano-trabalho.entrega.destroy');
    }

    $perfil = Perfil::factory()->create(['nivel' => 3]);
    $this->unidade = Unidade::factory()->create();
    $this->usuario = Usuario::factory()->create([
        'perfil_id' => $perfil->id,
    ]);
    $this->programa = Programa::factory()->create([
        'data_inicio' => '2024-01-01',
        'data_fim' => '2025-12-31',
    ]);

    $this->plano = PlanoTrabalho::factory()->create([
        'usuario_id' => $this->usuario->id,
        'unidade_id' => $this->unidade->id,
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
    $this->planoEntregaEntrega = PlanoEntregaEntrega::factory()->create([
        'plano_entrega_id' => $planoEntrega->id,
        'entrega_id' => $entregaCatalogo->id,
        'unidade_id' => $this->unidade->id,
    ]);
});

// ── store: validação de request ─────────────────────────────────────

describe('POST /api/v2/plano-trabalho/:id/entrega (validação)', function () {

    test('retorna 422 quando payload vazio', function () {
        $this->actingAs($this->usuario, 'web');

        $this->postJson("/api/__tests/v2/plano-trabalho/{$this->plano->id}/entrega", [])
            ->assertStatus(422);
    });

    test('retorna 422 quando plano_entrega_entrega_id não é uuid', function () {
        $this->actingAs($this->usuario, 'web');

        $this->postJson("/api/__tests/v2/plano-trabalho/{$this->plano->id}/entrega", [
            'origem' => 'PROPRIA_UNIDADE',
            'plano_entrega_entrega_id' => 'nao-uuid',
        ])->assertStatus(422);
    });

    test('retorna 422 quando descricao excede 1000 caracteres', function () {
        $this->actingAs($this->usuario, 'web');

        $this->postJson("/api/__tests/v2/plano-trabalho/{$this->plano->id}/entrega", [
            'origem' => 'PROPRIA_UNIDADE',
            'plano_entrega_entrega_id' => $this->planoEntregaEntrega->id,
            'descricao' => str_repeat('a', 1001),
        ])->assertStatus(422);
    });

    test('retorna 422 quando forca_trabalho é negativa', function () {
        $this->actingAs($this->usuario, 'web');

        $this->postJson("/api/__tests/v2/plano-trabalho/{$this->plano->id}/entrega", [
            'origem' => 'PROPRIA_UNIDADE',
            'plano_entrega_entrega_id' => $this->planoEntregaEntrega->id,
            'forca_trabalho' => -1,
        ])->assertStatus(422);
    });
});

// ── store: guard de status ──────────────────────────────────────────

describe('POST /api/v2/plano-trabalho/:id/entrega (guard)', function () {

    test('retorna 404 quando plano de trabalho não encontrado', function () {
        $this->actingAs($this->usuario, 'web');

        $this->postJson('/api/__tests/v2/plano-trabalho/' . fake()->uuid() . '/entrega', [
            'origem' => 'PROPRIA_UNIDADE',
            'plano_entrega_entrega_id' => $this->planoEntregaEntrega->id,
        ])->assertStatus(404);
    });

    test('retorna 422 quando plano de trabalho está ATIVO', function () {
        $this->actingAs($this->usuario, 'web');

        $this->plano->status = 'ATIVO';
        $this->plano->save();

        $this->postJson("/api/__tests/v2/plano-trabalho/{$this->plano->id}/entrega", [
            'origem' => 'PROPRIA_UNIDADE',
            'plano_entrega_entrega_id' => $this->planoEntregaEntrega->id,
        ])->assertStatus(422);
    });
});

// ── store: happy path ───────────────────────────────────────────────

describe('POST /api/v2/plano-trabalho/:id/entrega (happy path)', function () {

    test('persiste entrega com status INCLUIDO e retorna 201', function () {
        $this->actingAs($this->usuario, 'web');

        $response = $this->postJson("/api/__tests/v2/plano-trabalho/{$this->plano->id}/entrega", [
            'origem' => 'PROPRIA_UNIDADE',
            'plano_entrega_entrega_id' => $this->planoEntregaEntrega->id,
            'forca_trabalho' => 50,
            'descricao' => 'Construção da rampa',
        ]);

        $response->assertStatus(201)
            ->assertJsonPath('success', true);

        $this->assertDatabaseHas('planos_trabalhos_entregas', [
            'plano_trabalho_id' => $this->plano->id,
            'plano_entrega_entrega_id' => $this->planoEntregaEntrega->id,
            'descricao' => 'Construção da rampa',
        ]);
    });

    test('persiste entrega com status AGUARDANDO_ASSINATURA', function () {
        $this->actingAs($this->usuario, 'web');

        $this->plano->status = 'AGUARDANDO_ASSINATURA';
        $this->plano->save();

        $response = $this->postJson("/api/__tests/v2/plano-trabalho/{$this->plano->id}/entrega", [
            'origem' => 'PROPRIA_UNIDADE',
            'plano_entrega_entrega_id' => $this->planoEntregaEntrega->id,
            'forca_trabalho' => 30,
            'descricao' => 'Instalação do piso tátil',
        ]);

        $response->assertStatus(201);

        $this->assertDatabaseHas('planos_trabalhos_entregas', [
            'plano_trabalho_id' => $this->plano->id,
            'descricao' => 'Instalação do piso tátil',
        ]);
    });

    test('retorno inclui plano_entrega_entrega com unidade', function () {
        $this->actingAs($this->usuario, 'web');

        $response = $this->postJson("/api/__tests/v2/plano-trabalho/{$this->plano->id}/entrega", [
            'origem' => 'PROPRIA_UNIDADE',
            'plano_entrega_entrega_id' => $this->planoEntregaEntrega->id,
            'forca_trabalho' => 25,
            'descricao' => 'Teste retorno',
        ]);

        $data = $response->json('data');

        expect($data['plano_entrega_entrega'])->toHaveKeys(['id', 'descricao', 'plano_entrega']);
        expect($data['plano_entrega_entrega']['plano_entrega']['unidade'])->toHaveKeys(['id', 'sigla', 'nome']);
    });

    test('aceita forca_trabalho acima de 100', function () {
        $this->actingAs($this->usuario, 'web');

        $response = $this->postJson("/api/__tests/v2/plano-trabalho/{$this->plano->id}/entrega", [
            'origem' => 'PROPRIA_UNIDADE',
            'plano_entrega_entrega_id' => $this->planoEntregaEntrega->id,
            'forca_trabalho' => 150,
            'descricao' => 'Entrega com CHD alto',
        ]);

        $response->assertStatus(201);

        $this->assertDatabaseHas('planos_trabalhos_entregas', [
            'plano_trabalho_id' => $this->plano->id,
            'forca_trabalho' => 150,
        ]);
    });
});

// ── TCR invalidação após operações bem-sucedidas ────────────────────

describe('POST /api/v2/plano-trabalho/:id/entrega (invalidação TCR)', function () {

    test('invalida TCR após criar entrega com sucesso', function () {
        $this->actingAs($this->usuario, 'web');

        $documento = criarDocumentoTCR($this->plano->id);
        $this->plano->update(['documento_id' => $documento->id]);

        $response = $this->postJson("/api/__tests/v2/plano-trabalho/{$this->plano->id}/entrega", [
            'origem' => 'PROPRIA_UNIDADE',
            'plano_entrega_entrega_id' => $this->planoEntregaEntrega->id,
            'forca_trabalho' => 50,
            'descricao' => 'Nova entrega',
        ]);

        $response->assertStatus(201);

        $this->plano->refresh();
        expect($this->plano->documento_id)->toBeNull();
    });

    test('não invalida TCR quando store falha por validação', function () {
        $this->actingAs($this->usuario, 'web');

        $documento = criarDocumentoTCR($this->plano->id);
        $this->plano->update(['documento_id' => $documento->id]);

        $response = $this->postJson("/api/__tests/v2/plano-trabalho/{$this->plano->id}/entrega", []);

        $response->assertStatus(422);

        $this->plano->refresh();
        expect($this->plano->documento_id)->toBe($documento->id);
    });
});

describe('PUT /api/v2/plano-trabalho/:id/entrega/:eid (invalidação TCR)', function () {

    test('invalida TCR após atualizar entrega com sucesso', function () {
        $this->actingAs($this->usuario, 'web');

        $entregaCatalogo2 = Entrega::factory()->create(['unidade_id' => $this->unidade->id]);
        $planoEntrega = PlanoEntrega::factory()->create([
            'unidade_id' => $this->unidade->id,
            'programa_id' => $this->programa->id,
            'criacao_usuario_id' => $this->usuario->id,
        ]);
        $planoEntregaEntrega2 = PlanoEntregaEntrega::factory()->create([
            'plano_entrega_id' => $planoEntrega->id,
            'entrega_id' => $entregaCatalogo2->id,
            'unidade_id' => $this->unidade->id,
        ]);

        $entrega = $this->plano->entregas()->create([
            'plano_entrega_entrega_id' => $this->planoEntregaEntrega->id,
            'origem' => 'PROPRIA_UNIDADE',
            'forca_trabalho' => 50,
            'descricao' => 'Original',
        ]);

        $documento = criarDocumentoTCR($this->plano->id);
        $this->plano->update(['documento_id' => $documento->id]);

        $response = $this->putJson("/api/__tests/v2/plano-trabalho/{$this->plano->id}/entrega/{$entrega->id}", [
            'origem' => 'PROPRIA_UNIDADE',
            'plano_entrega_entrega_id' => $planoEntregaEntrega2->id,
            'forca_trabalho' => 75,
            'descricao' => 'Atualizada',
        ]);

        $response->assertStatus(200);

        $this->plano->refresh();
        expect($this->plano->documento_id)->toBeNull();
    });

    test('não invalida TCR quando update falha por validação', function () {
        $this->actingAs($this->usuario, 'web');

        $entrega = $this->plano->entregas()->create([
            'plano_entrega_entrega_id' => $this->planoEntregaEntrega->id,
            'origem' => 'PROPRIA_UNIDADE',
            'forca_trabalho' => 50,
            'descricao' => 'Original',
        ]);

        $documento = criarDocumentoTCR($this->plano->id);
        $this->plano->update(['documento_id' => $documento->id]);

        $response = $this->putJson("/api/__tests/v2/plano-trabalho/{$this->plano->id}/entrega/{$entrega->id}", []);

        $response->assertStatus(422);

        $this->plano->refresh();
        expect($this->plano->documento_id)->toBe($documento->id);
    });
});

describe('DELETE /api/v2/plano-trabalho/:id/entrega/:eid (invalidação TCR)', function () {

    test('invalida TCR após remover entrega com sucesso', function () {
        $this->actingAs($this->usuario, 'web');

        $entrega = $this->plano->entregas()->create([
            'plano_entrega_entrega_id' => $this->planoEntregaEntrega->id,
            'origem' => 'PROPRIA_UNIDADE',
            'forca_trabalho' => 50,
            'descricao' => 'Para remover',
        ]);

        $documento = criarDocumentoTCR($this->plano->id);
        $this->plano->update(['documento_id' => $documento->id]);

        $response = $this->deleteJson("/api/__tests/v2/plano-trabalho/{$this->plano->id}/entrega/{$entrega->id}");

        $response->assertStatus(204);

        $this->plano->refresh();
        expect($this->plano->documento_id)->toBeNull();
    });

    test('não invalida TCR quando entrega não existe', function () {
        $this->actingAs($this->usuario, 'web');

        $documento = criarDocumentoTCR($this->plano->id);
        $this->plano->update(['documento_id' => $documento->id]);

        $response = $this->deleteJson("/api/__tests/v2/plano-trabalho/{$this->plano->id}/entrega/" . fake()->uuid());

        $response->assertStatus(500);

        $this->plano->refresh();
        expect($this->plano->documento_id)->toBe($documento->id);
    });
});
