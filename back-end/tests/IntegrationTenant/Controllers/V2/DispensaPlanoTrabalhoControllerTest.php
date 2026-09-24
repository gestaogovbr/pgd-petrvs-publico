<?php

namespace Tests\IntegrationTenant\Controllers\V2;

use App\Enums\PerfilEnum;
use App\Http\Middleware\VerifyAppVersion;
use App\Models\DispensaPlanoTrabalho;
use App\Models\DispensaPlanoTrabalhoHistorico;
use App\Models\Perfil;
use App\Models\Unidade;
use App\Models\UnidadeIntegrante;
use App\Models\UnidadeIntegranteAtribuicao;
use App\Models\Usuario;
use App\V2\Usuario\DispensaPlanoTrabalho\DispensaPlanoTrabalhoAuthorization;
use App\V2\Usuario\DispensaPlanoTrabalho\DispensaPlanoTrabalhoController;
use App\V2\Usuario\DispensaPlanoTrabalho\DispensaPlanoTrabalhoOperacao;
use Carbon\Carbon;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;

beforeEach(function () {
    $this->withoutMiddleware(VerifyAppVersion::class);

    if (!Route::has('__tests.v2.dispensa_pt.show')) {
        Route::middleware(['api'])->get(
            '/api/__tests/v2/usuario/{id}/dispensa-plano-trabalho',
            [DispensaPlanoTrabalhoController::class, 'show']
        )->name('__tests.v2.dispensa_pt.show');
    }

    if (!Route::has('__tests.v2.dispensa_pt.store')) {
        Route::middleware(['api'])->post(
            '/api/__tests/v2/usuario/{id}/dispensa-plano-trabalho',
            [DispensaPlanoTrabalhoController::class, 'store']
        )->name('__tests.v2.dispensa_pt.store');
    }

    if (!Route::has('__tests.v2.dispensa_pt.encerrar')) {
        Route::middleware(['api'])->post(
            '/api/__tests/v2/usuario/{id}/dispensa-plano-trabalho/encerrar',
            [DispensaPlanoTrabalhoController::class, 'encerrar']
        )->name('__tests.v2.dispensa_pt.encerrar');
    }

    Carbon::setTestNow(Carbon::parse('2026-08-24 12:00:00'));

    $this->perfilDev = Perfil::factory()->create(['nivel' => PerfilEnum::DESENVOLVEDOR->value]);
    $this->perfilUnidade = Perfil::factory()->create(['nivel' => PerfilEnum::UNIDADE->value]);

    $this->ator = Usuario::factory()->create(['perfil_id' => $this->perfilDev->id]);
    $this->agente = Usuario::factory()->create();

    $this->unidadeExecutora = Unidade::factory()->create(['executora' => 1]);
    $integrante = UnidadeIntegrante::create([
        'id' => (string) Str::uuid(),
        'usuario_id' => $this->agente->id,
        'unidade_id' => $this->unidadeExecutora->id,
    ]);
    UnidadeIntegranteAtribuicao::create([
        'id' => (string) Str::uuid(),
        'unidade_integrante_id' => $integrante->id,
        'atribuicao' => 'GESTOR',
    ]);
});

afterEach(function () {
    Carbon::setTestNow();
});

describe('Dispensa de Plano de Trabalho endpoints', function () {

    test('GET retorna flags quando agente elegível e sem dispensa', function () {
        $this->actingAs($this->ator, 'web');

        $response = $this->getJson("/api/__tests/v2/usuario/{$this->agente->id}/dispensa-plano-trabalho");

        $response->assertStatus(200)
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.usuario_id', $this->agente->id)
            ->assertJsonPath('data.elegivel', true)
            ->assertJsonPath('data.pode_formalizar', true)
            ->assertJsonPath('data.vigente', false)
            ->assertJsonPath('data.dispensa_id', null);
    });

    test('POST formaliza dispensa, grava histórico FORMALIZAR e exige elegibilidade', function () {
        $this->actingAs($this->ator, 'web');

        $response = $this->postJson("/api/__tests/v2/usuario/{$this->agente->id}/dispensa-plano-trabalho", [
            'data_inicio' => '2026-08-01',
            'ciencia' => true,
        ]);

        $response->assertStatus(200)
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.vigente', true)
            ->assertJsonPath('data.pode_encerrar', true)
            ->assertJsonPath('data.data_inicio', '2026-08-01')
            ->assertJsonPath('data.data_fim', null);

        $this->assertDatabaseHas('dispensas_plano_trabalho', [
            'usuario_id' => $this->agente->id,
            'data_inicio' => '2026-08-01',
            'data_fim' => null,
            'responsavel_id' => $this->ator->id,
        ], 'tenant');

        $this->assertDatabaseHas('dispensas_plano_trabalho_historico', [
            'usuario_id' => $this->agente->id,
            'operacao' => DispensaPlanoTrabalhoOperacao::FORMALIZAR,
            'responsavel_id' => $this->ator->id,
        ], 'tenant');
    });

    test('POST rejeita formalização quando agente não é elegível (RN07)', function () {
        $agenteInelegivel = Usuario::factory()->create();
        $this->actingAs($this->ator, 'web');

        $response = $this->postJson("/api/__tests/v2/usuario/{$agenteInelegivel->id}/dispensa-plano-trabalho", [
            'data_inicio' => '2026-08-01',
            'ciencia' => true,
        ]);

        $response->assertStatus(422)
            ->assertJsonPath('error', DispensaPlanoTrabalhoAuthorization::MSG_ELEGIBILIDADE);
    });

    test('POST exige ciência', function () {
        $this->actingAs($this->ator, 'web');

        $response = $this->postJson("/api/__tests/v2/usuario/{$this->agente->id}/dispensa-plano-trabalho", [
            'data_inicio' => '2026-08-01',
            'ciencia' => false,
        ]);

        $response->assertStatus(422);
    });

    test('POST alterar gera histórico ALTERAR sem revalidar elegibilidade', function () {
        $this->actingAs($this->ator, 'web');

        DispensaPlanoTrabalho::query()->create([
            'usuario_id' => $this->agente->id,
            'data_inicio' => '2026-07-01',
            'data_fim' => null,
            'ciencia_em' => now()->subDay(),
            'responsavel_id' => $this->ator->id,
        ]);

        // Remove elegibilidade após formalização (alteração ainda deve ser permitida)
        UnidadeIntegranteAtribuicao::query()->delete();

        $response = $this->postJson("/api/__tests/v2/usuario/{$this->agente->id}/dispensa-plano-trabalho", [
            'data_inicio' => '2026-08-10',
            'data_fim' => '2026-12-31',
            'ciencia' => true,
        ]);

        $response->assertStatus(200)
            ->assertJsonPath('data.data_inicio', '2026-08-10')
            ->assertJsonPath('data.data_fim', '2026-12-31');

        $this->assertDatabaseHas('dispensas_plano_trabalho_historico', [
            'usuario_id' => $this->agente->id,
            'operacao' => DispensaPlanoTrabalhoOperacao::ALTERAR,
        ], 'tenant');
    });

    test('POST encerrar define data_fim = hoje e grava histórico ENCERRAR', function () {
        $this->actingAs($this->ator, 'web');

        DispensaPlanoTrabalho::query()->create([
            'usuario_id' => $this->agente->id,
            'data_inicio' => '2026-08-01',
            'data_fim' => null,
            'ciencia_em' => now()->subDay(),
            'responsavel_id' => $this->ator->id,
        ]);

        $response = $this->postJson("/api/__tests/v2/usuario/{$this->agente->id}/dispensa-plano-trabalho/encerrar", [
            'ciencia' => true,
        ]);

        $response->assertStatus(200)
            ->assertJsonPath('data.data_fim', '2026-08-24')
            ->assertJsonPath('data.pode_encerrar', false);

        $this->assertDatabaseHas('dispensas_plano_trabalho', [
            'usuario_id' => $this->agente->id,
            'data_fim' => '2026-08-24',
        ], 'tenant');

        $this->assertDatabaseHas('dispensas_plano_trabalho_historico', [
            'usuario_id' => $this->agente->id,
            'operacao' => DispensaPlanoTrabalhoOperacao::ENCERRAR,
        ], 'tenant');
    });

    test('perfil sem permissão recebe 403 (RN08)', function () {
        $atorSemPermissao = Usuario::factory()->create(['perfil_id' => $this->perfilUnidade->id]);
        $this->actingAs($atorSemPermissao, 'web');

        $response = $this->postJson("/api/__tests/v2/usuario/{$this->agente->id}/dispensa-plano-trabalho", [
            'data_inicio' => '2026-08-01',
            'ciencia' => true,
        ]);

        $response->assertStatus(403)
            ->assertJsonPath('error', DispensaPlanoTrabalhoAuthorization::MSG_PERMISSAO);
    });

    test('GET inclui histórico ordenado', function () {
        $this->actingAs($this->ator, 'web');

        $dispensa = DispensaPlanoTrabalho::query()->create([
            'usuario_id' => $this->agente->id,
            'data_inicio' => '2026-08-01',
            'data_fim' => null,
            'ciencia_em' => now()->subHours(2),
            'responsavel_id' => $this->ator->id,
        ]);

        $h1 = DispensaPlanoTrabalhoHistorico::query()->create([
            'dispensa_id' => $dispensa->id,
            'usuario_id' => $this->agente->id,
            'data_inicio' => '2026-08-01',
            'data_fim' => null,
            'operacao' => DispensaPlanoTrabalhoOperacao::FORMALIZAR,
            'ciencia_em' => now()->subHours(2),
            'responsavel_id' => $this->ator->id,
        ]);
        $h1->forceFill(['created_at' => now()->subHours(2)])->save();

        $h2 = DispensaPlanoTrabalhoHistorico::query()->create([
            'dispensa_id' => $dispensa->id,
            'usuario_id' => $this->agente->id,
            'data_inicio' => '2026-08-05',
            'data_fim' => null,
            'operacao' => DispensaPlanoTrabalhoOperacao::ALTERAR,
            'ciencia_em' => now()->subHour(),
            'responsavel_id' => $this->ator->id,
        ]);
        $h2->forceFill(['created_at' => now()->subHour()])->save();

        $response = $this->getJson("/api/__tests/v2/usuario/{$this->agente->id}/dispensa-plano-trabalho");

        $response->assertStatus(200);
        $historico = $response->json('data.historico');
        expect($historico)->toHaveCount(2)
            ->and($historico[0]['operacao'])->toBe(DispensaPlanoTrabalhoOperacao::ALTERAR)
            ->and($historico[1]['operacao'])->toBe(DispensaPlanoTrabalhoOperacao::FORMALIZAR);
    });
});
