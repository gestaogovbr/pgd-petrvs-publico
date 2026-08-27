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

    if (!Route::has('__tests.v2.usuario.show')) {
        Route::middleware(['api'])->get('/api/__tests/v2/usuario/{usuarioId}', [UsuarioController::class, 'show'])->name('__tests.v2.usuario.show')->whereUuid('usuarioId');
        Route::middleware(['api'])->get('/api/__tests/v2/usuario/cpf/{cpf}/unidades', [UsuarioController::class, 'unidadesVinculadasPorCpf'])->name('__tests.v2.usuario.unidades-cpf');
    }

    $this->perfilUnidade = Perfil::factory()->create(['nivel' => PerfilEnum::UNIDADE->value, 'nome' => 'Unidade']);
    $this->perfilParticipante = Perfil::factory()->create(['nivel' => PerfilEnum::PARTICIPANTE->value, 'nome' => 'Participante']);
    $this->perfilAdmMaster = Perfil::factory()->create(['nivel' => PerfilEnum::ADMINISTRADOR_MASTER->value, 'nome' => 'Adm Master']);

    $tipoVis = TipoCapacidade::firstOrCreate(
        ['codigo' => 'MOD_USER_VIS'],
        ['id' => Str::uuid()->toString(), 'descricao' => 'Permite visualizar perfil de outros usuários']
    );

    $tipoTudo = TipoCapacidade::firstOrCreate(
        ['codigo' => 'MOD_USER_TUDO'],
        ['id' => Str::uuid()->toString(), 'descricao' => 'Permite consultar qualquer usuário independente de lotação']
    );

    // Chefia (Unidade) tem MOD_USER_VIS
    Capacidade::firstOrCreate(
        ['perfil_id' => $this->perfilUnidade->id, 'tipo_capacidade_id' => $tipoVis->id],
        ['id' => Str::uuid()->toString()]
    );

    // Adm Master tem MOD_USER_VIS e MOD_USER_TUDO
    Capacidade::firstOrCreate(
        ['perfil_id' => $this->perfilAdmMaster->id, 'tipo_capacidade_id' => $tipoVis->id],
        ['id' => Str::uuid()->toString()]
    );
    Capacidade::firstOrCreate(
        ['perfil_id' => $this->perfilAdmMaster->id, 'tipo_capacidade_id' => $tipoTudo->id],
        ['id' => Str::uuid()->toString()]
    );

    $this->unidadePai = Unidade::factory()->create(['sigla' => 'PAI']);
    $this->unidadeFilha = Unidade::factory()->create(['sigla' => 'FILHA', 'unidade_pai_id' => $this->unidadePai->id]);
    $this->unidadeOutra = Unidade::factory()->create(['sigla' => 'OUTRA']);

    $this->chefia = Usuario::factory()->create(['perfil_id' => $this->perfilUnidade->id]);
    $this->cpfParticipante = fake()->unique()->numerify('###########');
    $this->participante = Usuario::factory()->create(['perfil_id' => $this->perfilParticipante->id, 'cpf' => $this->cpfParticipante]);
    $this->admMaster = Usuario::factory()->create(['perfil_id' => $this->perfilAdmMaster->id]);

    UnidadeIntegranteAtribuicao::factory()->gestor()->paraUsuarioUnidade($this->chefia->id, $this->unidadePai->id)->create();
    UnidadeIntegranteAtribuicao::factory()->lotado()->paraUsuarioUnidade($this->participante->id, $this->unidadeFilha->id)->create();
});

describe('GET /usuario/{id} (show)', function () {

    test('participante pode visualizar próprio perfil', function () {
        $this->actingAs($this->participante);

        $response = $this->getJson("/api/__tests/v2/usuario/{$this->participante->id}");

        $response->assertStatus(200)->assertJsonPath('success', true);
    });

    test('participante não pode visualizar perfil de outro', function () {
        $this->actingAs($this->participante);

        $response = $this->getJson("/api/__tests/v2/usuario/{$this->chefia->id}");

        $response->assertStatus(403);
    });

    test('chefia pode visualizar subordinado', function () {
        $this->actingAs($this->chefia);

        $response = $this->getJson("/api/__tests/v2/usuario/{$this->participante->id}");

        $response->assertStatus(200)->assertJsonPath('success', true);
    });

    test('chefia não pode visualizar fora do escopo', function () {
        $outroParticipante = Usuario::factory()->create(['perfil_id' => $this->perfilParticipante->id]);
        UnidadeIntegranteAtribuicao::factory()->lotado()->paraUsuarioUnidade($outroParticipante->id, $this->unidadeOutra->id)->create();

        $this->actingAs($this->chefia);

        $response = $this->getJson("/api/__tests/v2/usuario/{$outroParticipante->id}");

        $response->assertStatus(403);
    });

    test('adm master pode visualizar qualquer perfil', function () {
        $this->actingAs($this->admMaster);

        $response = $this->getJson("/api/__tests/v2/usuario/{$this->participante->id}");

        $response->assertStatus(200)->assertJsonPath('success', true);
    });

    test('retorna 404 para usuário inexistente', function () {
        $this->actingAs($this->admMaster);

        $response = $this->getJson('/api/__tests/v2/usuario/00000000-0000-0000-0000-000000000000');

        $response->assertStatus(404);
    });
});

describe('GET /usuario/cpf/{cpf}/unidades (unidadesVinculadasPorCpf)', function () {

    test('participante não pode consultar unidades de outro por CPF', function () {
        $this->actingAs($this->participante);

        $response = $this->getJson("/api/__tests/v2/usuario/cpf/{$this->chefia->cpf}/unidades");

        $response->assertStatus(403);
    });

    test('chefia pode consultar unidades de subordinado por CPF', function () {
        $this->actingAs($this->chefia);

        $response = $this->getJson("/api/__tests/v2/usuario/cpf/{$this->cpfParticipante}/unidades");

        $response->assertStatus(200)->assertJsonPath('success', true);
    });

    test('chefia pode consultar unidades quando CPF é compartilhado e subordinado não é o primeiro registro', function () {
        $cpfCompartilhado = fake()->unique()->numerify('###########');

        $foraDoEscopo = Usuario::factory()->create([
            'perfil_id' => $this->perfilParticipante->id,
            'cpf' => $cpfCompartilhado,
            'created_at' => now()->subDay(),
        ]);
        UnidadeIntegranteAtribuicao::factory()->lotado()->paraUsuarioUnidade($foraDoEscopo->id, $this->unidadeOutra->id)->create();

        $noEscopo = Usuario::factory()->create([
            'perfil_id' => $this->perfilParticipante->id,
            'cpf' => $cpfCompartilhado,
        ]);
        UnidadeIntegranteAtribuicao::factory()->lotado()->paraUsuarioUnidade($noEscopo->id, $this->unidadeFilha->id)->create();

        $this->actingAs($this->chefia);

        $response = $this->getJson("/api/__tests/v2/usuario/cpf/{$cpfCompartilhado}/unidades");

        $response->assertStatus(200)->assertJsonPath('success', true);
    });

    test('adm master pode consultar unidades de qualquer usuário por CPF', function () {
        $this->actingAs($this->admMaster);

        $response = $this->getJson("/api/__tests/v2/usuario/cpf/{$this->cpfParticipante}/unidades");

        $response->assertStatus(200)->assertJsonPath('success', true);
    });

    test('retorna 404 para CPF inexistente', function () {
        $this->actingAs($this->admMaster);

        $response = $this->getJson('/api/__tests/v2/usuario/cpf/00000000000/unidades');

        $response->assertStatus(404);
    });
});
