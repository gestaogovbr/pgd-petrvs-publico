<?php

use App\Enums\PerfilEnum;
use App\Models\Capacidade;
use App\Models\Perfil;
use App\Models\TipoCapacidade;
use App\Models\Unidade;
use App\Models\UnidadeIntegranteAtribuicao;
use App\Models\Usuario;
use App\V2\Usuario\UsuarioController;
use Illuminate\Support\Facades\Queue;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;

beforeEach(function () {
    Queue::fake();

    if (!Route::has('__tests.v2.usuario.dados-pessoais')) {
        Route::middleware(['api'])->patch('/api/__tests/v2/usuario/{usuarioId}/dados-pessoais', [UsuarioController::class, 'updateDadosPessoais'])->name('__tests.v2.usuario.dados-pessoais');
        Route::middleware(['api'])->patch('/api/__tests/v2/usuario/{usuarioId}/texto-complementar', [UsuarioController::class, 'updateTextoComplementar'])->name('__tests.v2.usuario.texto-complementar');
        Route::middleware(['api'])->patch('/api/__tests/v2/usuario/{usuarioId}/perfil', [UsuarioController::class, 'updatePerfil'])->name('__tests.v2.usuario.perfil');
        Route::middleware(['api'])->put('/api/__tests/v2/usuario/{usuarioId}/atribuicoes', [UsuarioController::class, 'updateAtribuicoes'])->name('__tests.v2.usuario.atribuicoes');
    }

    $this->perfilUnidade = Perfil::factory()->create(['nivel' => PerfilEnum::UNIDADE->value, 'nome' => 'Unidade']);
    $this->perfilParticipante = Perfil::factory()->create(['nivel' => PerfilEnum::PARTICIPANTE->value, 'nome' => 'Participante']);
    $this->perfilAdmMaster = Perfil::factory()->create(['nivel' => PerfilEnum::ADMINISTRADOR_MASTER->value, 'nome' => 'Adm Master']);
    $this->perfilAdmNegocial = Perfil::factory()->create(['nivel' => PerfilEnum::ADMINISTRADOR_NEGOCIAL->value, 'nome' => 'Adm Negocial']);

    $tipoCapacidade = TipoCapacidade::firstOrCreate(
        ['codigo' => 'MOD_USER_EDT'],
        ['id' => Str::uuid()->toString(), 'descricao' => 'Permite alterar usuário']
    );

    foreach ([$this->perfilUnidade, $this->perfilAdmMaster, $this->perfilAdmNegocial] as $perfil) {
        Capacidade::firstOrCreate(
            ['perfil_id' => $perfil->id, 'tipo_capacidade_id' => $tipoCapacidade->id],
            ['id' => Str::uuid()->toString()]
        );
    }

    $this->unidadePai = Unidade::factory()->create(['sigla' => 'PAI']);
    $this->unidadeFilha = Unidade::factory()->create(['sigla' => 'FILHA', 'unidade_pai_id' => $this->unidadePai->id]);
    $this->unidadeOutra = Unidade::factory()->create(['sigla' => 'OUTRA']);

    $this->chefia = Usuario::factory()->create(['perfil_id' => $this->perfilUnidade->id]);
    $this->participante = Usuario::factory()->create(['perfil_id' => $this->perfilParticipante->id]);
    $this->admMaster = Usuario::factory()->create(['perfil_id' => $this->perfilAdmMaster->id]);

    UnidadeIntegranteAtribuicao::factory()->gestor()->paraUsuarioUnidade($this->chefia->id, $this->unidadePai->id)->create();
    UnidadeIntegranteAtribuicao::factory()->lotado()->paraUsuarioUnidade($this->participante->id, $this->unidadeFilha->id)->create();
});

describe('PATCH /usuario/{id}/dados-pessoais', function () {

    test('chefia pode editar telefone de subordinado', function () {
        $this->actingAs($this->chefia);

        $response = $this->patchJson("/api/__tests/v2/usuario/{$this->participante->id}/dados-pessoais", [
            'telefone' => '61999991111',
        ]);

        $response->assertStatus(200)->assertJsonPath('success', true);
        $this->assertDatabaseHas('usuarios', ['id' => $this->participante->id, 'telefone' => '61999991111']);
    });

    test('participante pode editar próprio telefone', function () {
        $this->actingAs($this->participante);

        $response = $this->patchJson("/api/__tests/v2/usuario/{$this->participante->id}/dados-pessoais", [
            'telefone' => '61888880000',
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('usuarios', ['id' => $this->participante->id, 'telefone' => '61888880000']);
    });

    test('participante não pode editar telefone de outro', function () {
        $this->actingAs($this->participante);

        $response = $this->patchJson("/api/__tests/v2/usuario/{$this->chefia->id}/dados-pessoais", [
            'telefone' => '61777770000',
        ]);

        $response->assertStatus(403);
    });

    test('chefia não pode editar fora do escopo', function () {
        $outroParticipante = Usuario::factory()->create(['perfil_id' => $this->perfilParticipante->id]);
        UnidadeIntegranteAtribuicao::factory()->lotado()->paraUsuarioUnidade($outroParticipante->id, $this->unidadeOutra->id)->create();

        $this->actingAs($this->chefia);

        $response = $this->patchJson("/api/__tests/v2/usuario/{$outroParticipante->id}/dados-pessoais", [
            'telefone' => '123',
        ]);

        $response->assertStatus(403);
    });

    test('retorna 404 para usuário inexistente', function () {
        $this->actingAs($this->admMaster);

        $response = $this->patchJson('/api/__tests/v2/usuario/00000000-0000-0000-0000-000000000000/dados-pessoais', [
            'telefone' => '123',
        ]);

        $response->assertStatus(404);
    });
});

describe('PATCH /usuario/{id}/texto-complementar', function () {

    test('adm master pode editar texto complementar', function () {
        $this->actingAs($this->admMaster);

        $response = $this->patchJson("/api/__tests/v2/usuario/{$this->participante->id}/texto-complementar", [
            'texto_complementar_plano' => '<p>Novo TCR</p>',
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('usuarios', ['id' => $this->participante->id, 'texto_complementar_plano' => '<p>Novo TCR</p>']);
    });

    test('participante não pode editar texto complementar de outro', function () {
        $this->actingAs($this->participante);

        $response = $this->patchJson("/api/__tests/v2/usuario/{$this->chefia->id}/texto-complementar", [
            'texto_complementar_plano' => 'bloqueado',
        ]);

        $response->assertStatus(403);
    });
});

describe('PATCH /usuario/{id}/perfil', function () {

    test('chefia não pode atribuir perfil superior ao seu', function () {
        $this->actingAs($this->chefia);

        $response = $this->patchJson("/api/__tests/v2/usuario/{$this->participante->id}/perfil", [
            'perfil_id' => $this->perfilAdmNegocial->id,
        ]);

        $response->assertStatus(403);
    });

    test('adm master pode atribuir perfil válido', function () {
        $this->actingAs($this->admMaster);

        $response = $this->patchJson("/api/__tests/v2/usuario/{$this->participante->id}/perfil", [
            'perfil_id' => $this->perfilUnidade->id,
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('usuarios', ['id' => $this->participante->id, 'perfil_id' => $this->perfilUnidade->id]);
    });

    test('retorna 422 para perfil_id inválido', function () {
        $this->actingAs($this->admMaster);

        $response = $this->patchJson("/api/__tests/v2/usuario/{$this->participante->id}/perfil", [
            'perfil_id' => 'nao-uuid',
        ]);

        $response->assertStatus(422);
    });
});
