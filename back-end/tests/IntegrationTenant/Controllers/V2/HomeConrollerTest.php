<?php

namespace Tests\IntegrationTenant\Controllers\V2;

use App\Enums\PerfilEnum;
use App\Models\Afastamento;
use App\Models\Perfil;
use App\Models\TipoMotivoAfastamento;
use App\Models\Unidade;
use App\Models\UnidadeIntegranteAtribuicao;
use App\Models\Usuario;
use App\V2\Home\HomeController;
use Illuminate\Support\Facades\Route;

beforeEach(function () {
    Route::middleware(['api'])->get(
        '/api/__tests/v2/home/em-ferias',
        [HomeController::class, 'emFerias']
    );

    $this->unidadePai = Unidade::factory()->create();
    $this->unidadeFilho = Unidade::factory()->create(['unidade_pai_id' => $this->unidadePai->id]);
    $this->unidadeNeto = Unidade::factory()->create(['unidade_pai_id' => $this->unidadeFilho->id]);

    $perfilParticipante = Perfil::factory()->create(['nivel' => PerfilEnum::PARTICIPANTE->value, 'nome' => 'Participante']);

    $this->gestor = Usuario::factory()->create();
    $this->participante = Usuario::factory()->create(['perfil_id' => $perfilParticipante->id]);
    $this->participanteNeto = Usuario::factory()->create(['perfil_id' => $perfilParticipante->id]);

    UnidadeIntegranteAtribuicao::factory()->gestor()->paraUsuarioUnidade($this->gestor->id, $this->unidadePai->id)->create();
    UnidadeIntegranteAtribuicao::factory()->lotado()->paraUsuarioUnidade($this->participante->id, $this->unidadePai->id)->create();
    UnidadeIntegranteAtribuicao::factory()->lotado()->paraUsuarioUnidade($this->participanteNeto->id, $this->unidadeNeto->id)->create();
});

describe('GET /api/v2/home/em-ferias', function () {
    beforeEach(function () {
        $ferias = TipoMotivoAfastamento::factory()->ferias()->create();
        Afastamento::factory()->create([
            'usuario_id' => $this->participante->id,
            'tipo_motivo_afastamento_id' => $ferias->id,
            'data_inicio' => now()->subDay(),
            'data_fim' => now()->addDays(5),
        ]);
        Afastamento::factory()->create([
            'usuario_id' => $this->participanteNeto->id,
            'tipo_motivo_afastamento_id' => $ferias->id,
            'data_inicio' => now()->subDay(),
            'data_fim' => now()->addDays(5),
        ]);
    });

    test('retorna em férias na unidade do usuário', function () {
        $response = $this->actingAs($this->gestor)
            ->getJson('/api/__tests/v2/home/em-ferias?' . http_build_query([
                'unidade_id' => $this->unidadePai->id,
                'subordinadas' => '0',
            ]));

        $response->assertOk();
        $response->assertJsonCount(1, 'data.em_ferias');
        $response->assertJsonPath('data.em_ferias.0.nome', $this->participante->nome);
    });

    test('retorna em férias na unidade + subordinadas', function () {
        $response = $this->actingAs($this->gestor)
            ->getJson('/api/__tests/v2/home/em-ferias?' . http_build_query([
                'unidade_id' => $this->unidadePai->id,
                'subordinadas' => '1',
            ]));

        $response->assertOk();
        $response->assertJsonCount(2, 'data.em_ferias');
    });

    test('permite acesso de participante na própria unidade', function () {
        $response = $this->actingAs($this->participante)
            ->getJson('/api/__tests/v2/home/em-ferias?' . http_build_query([
                'unidade_id' => $this->unidadePai->id,
                'subordinadas' => '0',
            ]));

        $response->assertOk();
        $response->assertJsonCount(1, 'data.em_ferias');
        $response->assertJsonPath('data.em_ferias.0.nome', $this->participante->nome);
    });

    test('rejeita subordinadas para perfil participante', function () {
        $response = $this->actingAs($this->participante)
            ->getJson('/api/__tests/v2/home/em-ferias?' . http_build_query([
                'unidade_id' => $this->unidadePai->id,
                'subordinadas' => '1',
            ]));

        $response->assertStatus(422);
    });

    test('rejeita requisição sem unidade_id', function () {
        $response = $this->actingAs($this->gestor)
            ->getJson('/api/__tests/v2/home/em-ferias');

        $response->assertStatus(422);
    });
});
