<?php

namespace Tests\IntegrationTenant\Controllers\V2;

use App\Models\Feriado;
use App\Models\PlanoTrabalho;
use App\Models\Unidade;
use App\Models\UnidadeIntegranteAtribuicao;
use App\Models\Usuario;
use App\V2\Home\HomeController;
use Carbon\Carbon;
use Illuminate\Support\Facades\Route;

beforeEach(function () {
    Route::middleware(['api'])->get(
        '/api/__tests/v2/home/resumo-equipe',
        [HomeController::class, 'resumoEquipe']
    );

    $this->unidade = Unidade::factory()->create();
    $this->gestor = Usuario::factory()->create();

    UnidadeIntegranteAtribuicao::factory()->gestor()->paraUsuarioUnidade($this->gestor->id, $this->unidade->id)->create();
});

describe('capacidade_equipe_horas_mensais', function () {

    test('retorna 0 quando não há PTs ativos no mês', function () {
        $response = $this->actingAs($this->gestor)
            ->getJson('/api/__tests/v2/home/resumo-equipe?' . http_build_query([
                'unidade_id' => $this->unidade->id,
                'subordinadas' => '0',
            ]));

        $response->assertOk();
        $response->assertJsonPath('data.capacidade_equipe_horas_mensais', 0);
    });

    test('calcula horas para PT integral no mês', function () {
        Carbon::setTestNow(Carbon::create(2026, 7, 15));

        PlanoTrabalho::factory()->ativo()->create([
            'unidade_id' => $this->unidade->id,
            'carga_horaria' => 8.0,
            'data_inicio' => '2026-07-01',
            'data_fim' => '2026-07-31',
        ]);

        $response = $this->actingAs($this->gestor)
            ->getJson('/api/__tests/v2/home/resumo-equipe?' . http_build_query([
                'unidade_id' => $this->unidade->id,
                'subordinadas' => '0',
            ]));

        $response->assertOk();

        // Julho 2026 tem 23 dias úteis (sem feriados cadastrados)
        $horas = $response->json('data.capacidade_equipe_horas_mensais');
        expect($horas)->toEqual(184.0); // 8h × 23 dias úteis

        Carbon::setTestNow();
    });

    test('calcula horas proporcionais para PT parcial no mês', function () {
        Carbon::setTestNow(Carbon::create(2026, 7, 15));

        PlanoTrabalho::factory()->ativo()->create([
            'unidade_id' => $this->unidade->id,
            'carga_horaria' => 8.0,
            'data_inicio' => '2026-07-13', // segunda-feira
            'data_fim' => '2026-07-17',    // sexta-feira
        ]);

        $response = $this->actingAs($this->gestor)
            ->getJson('/api/__tests/v2/home/resumo-equipe?' . http_build_query([
                'unidade_id' => $this->unidade->id,
                'subordinadas' => '0',
            ]));

        $response->assertOk();

        // 13(seg) a 17(sex) = 5 dias úteis
        $horas = $response->json('data.capacidade_equipe_horas_mensais');
        expect($horas)->toEqual(40.0); // 8h × 5 dias

        Carbon::setTestNow();
    });

    test('desconta feriado nacional do cálculo', function () {
        Carbon::setTestNow(Carbon::create(2026, 7, 15));

        Feriado::factory()->create([
            'nome' => 'Feriado Teste',
            'dia' => 15,
            'mes' => 7,
            'ano' => 2026,
            'tipoDia' => 'MES',
            'recorrente' => 0,
            'abrangencia' => 'NACIONAL',
        ]);

        PlanoTrabalho::factory()->ativo()->create([
            'unidade_id' => $this->unidade->id,
            'carga_horaria' => 8.0,
            'data_inicio' => '2026-07-13', // segunda
            'data_fim' => '2026-07-17',    // sexta
        ]);

        $response = $this->actingAs($this->gestor)
            ->getJson('/api/__tests/v2/home/resumo-equipe?' . http_build_query([
                'unidade_id' => $this->unidade->id,
                'subordinadas' => '0',
            ]));

        $response->assertOk();

        // 13(seg), 14(ter), 15(qua-FERIADO), 16(qui), 17(sex) = 4 dias úteis
        $horas = $response->json('data.capacidade_equipe_horas_mensais');
        expect($horas)->toEqual(32.0); // 8h × 4 dias

        Carbon::setTestNow();
    });

    test('soma capacidade de múltiplos PTs na mesma unidade', function () {
        Carbon::setTestNow(Carbon::create(2026, 7, 15));

        PlanoTrabalho::factory()->ativo()->create([
            'unidade_id' => $this->unidade->id,
            'carga_horaria' => 8.0,
            'data_inicio' => '2026-07-01',
            'data_fim' => '2026-07-31',
        ]);

        PlanoTrabalho::factory()->ativo()->create([
            'unidade_id' => $this->unidade->id,
            'carga_horaria' => 6.0,
            'data_inicio' => '2026-07-01',
            'data_fim' => '2026-07-31',
        ]);

        $response = $this->actingAs($this->gestor)
            ->getJson('/api/__tests/v2/home/resumo-equipe?' . http_build_query([
                'unidade_id' => $this->unidade->id,
                'subordinadas' => '0',
            ]));

        $response->assertOk();

        // (8 + 6) × 23 dias úteis = 322
        $horas = $response->json('data.capacidade_equipe_horas_mensais');
        expect($horas)->toEqual(322.0);

        Carbon::setTestNow();
    });

    test('ignora PTs que não são ATIVO', function () {
        Carbon::setTestNow(Carbon::create(2026, 7, 15));

        PlanoTrabalho::factory()->ativo()->create([
            'unidade_id' => $this->unidade->id,
            'carga_horaria' => 8.0,
            'data_inicio' => '2026-07-01',
            'data_fim' => '2026-07-31',
        ]);

        PlanoTrabalho::factory()->concluido()->create([
            'unidade_id' => $this->unidade->id,
            'carga_horaria' => 6.0,
            'data_inicio' => '2026-07-01',
            'data_fim' => '2026-07-31',
        ]);

        $response = $this->actingAs($this->gestor)
            ->getJson('/api/__tests/v2/home/resumo-equipe?' . http_build_query([
                'unidade_id' => $this->unidade->id,
                'subordinadas' => '0',
            ]));

        $response->assertOk();

        // Apenas o ATIVO: 8 × 23 = 184
        $horas = $response->json('data.capacidade_equipe_horas_mensais');
        expect($horas)->toEqual(184.0);

        Carbon::setTestNow();
    });

    test('inclui PTs de subordinadas quando flag ativada', function () {
        Carbon::setTestNow(Carbon::create(2026, 7, 15));

        $unidadeFilha = Unidade::factory()->create(['unidade_pai_id' => $this->unidade->id]);

        PlanoTrabalho::factory()->ativo()->create([
            'unidade_id' => $this->unidade->id,
            'carga_horaria' => 8.0,
            'data_inicio' => '2026-07-01',
            'data_fim' => '2026-07-31',
        ]);

        PlanoTrabalho::factory()->ativo()->create([
            'unidade_id' => $unidadeFilha->id,
            'carga_horaria' => 6.0,
            'data_inicio' => '2026-07-01',
            'data_fim' => '2026-07-31',
        ]);

        $response = $this->actingAs($this->gestor)
            ->getJson('/api/__tests/v2/home/resumo-equipe?' . http_build_query([
                'unidade_id' => $this->unidade->id,
                'subordinadas' => '1',
            ]));

        $response->assertOk();

        // (8 + 6) × 23 = 322
        $horas = $response->json('data.capacidade_equipe_horas_mensais');
        expect($horas)->toEqual(322.0);

        Carbon::setTestNow();
    });

    test('não inclui PTs de subordinadas quando flag desativada', function () {
        Carbon::setTestNow(Carbon::create(2026, 7, 15));

        $unidadeFilha = Unidade::factory()->create(['unidade_pai_id' => $this->unidade->id]);

        PlanoTrabalho::factory()->ativo()->create([
            'unidade_id' => $this->unidade->id,
            'carga_horaria' => 8.0,
            'data_inicio' => '2026-07-01',
            'data_fim' => '2026-07-31',
        ]);

        PlanoTrabalho::factory()->ativo()->create([
            'unidade_id' => $unidadeFilha->id,
            'carga_horaria' => 6.0,
            'data_inicio' => '2026-07-01',
            'data_fim' => '2026-07-31',
        ]);

        $response = $this->actingAs($this->gestor)
            ->getJson('/api/__tests/v2/home/resumo-equipe?' . http_build_query([
                'unidade_id' => $this->unidade->id,
                'subordinadas' => '0',
            ]));

        $response->assertOk();

        // Apenas unidade pai: 8 × 23 = 184
        $horas = $response->json('data.capacidade_equipe_horas_mensais');
        expect($horas)->toEqual(184.0);

        Carbon::setTestNow();
    });

    test('desconta feriado estadual quando unidade está no estado', function () {
        Carbon::setTestNow(Carbon::create(2026, 7, 15));

        $cidade = \App\Models\Cidade::create([
            'id' => fake()->uuid(),
            'codigo_ibge' => '3550308',
            'nome' => 'São Paulo',
            'tipo' => 'CAPITAL',
            'uf' => 'SP',
            'timezone' => -3,
        ]);

        $this->unidade->update(['cidade_id' => $cidade->id]);

        Feriado::factory()->create([
            'nome' => 'Revolução Constitucionalista',
            'dia' => 14,
            'mes' => 7,
            'tipoDia' => 'MES',
            'recorrente' => 1,
            'abrangencia' => 'ESTADUAL',
            'uf' => 'SP',
        ]);

        PlanoTrabalho::factory()->ativo()->create([
            'unidade_id' => $this->unidade->id,
            'carga_horaria' => 8.0,
            'data_inicio' => '2026-07-13', // segunda
            'data_fim' => '2026-07-17',    // sexta
        ]);

        $response = $this->actingAs($this->gestor)
            ->getJson('/api/__tests/v2/home/resumo-equipe?' . http_build_query([
                'unidade_id' => $this->unidade->id,
                'subordinadas' => '0',
            ]));

        $response->assertOk();

        // 13(seg), 14(ter-FERIADO ESTADUAL), 15(qua), 16(qui), 17(sex) = 4 dias úteis
        $horas = $response->json('data.capacidade_equipe_horas_mensais');
        expect($horas)->toEqual(32.0); // 8h × 4 dias

        Carbon::setTestNow();
    });

    test('desconta feriado municipal quando unidade está no município', function () {
        Carbon::setTestNow(Carbon::create(2026, 7, 15));

        $cidade = \App\Models\Cidade::create([
            'id' => fake()->uuid(),
            'codigo_ibge' => '5300108',
            'nome' => 'Brasília',
            'tipo' => 'CAPITAL',
            'uf' => 'DF',
            'timezone' => -3,
        ]);

        $this->unidade->update(['cidade_id' => $cidade->id]);

        Feriado::factory()->create([
            'nome' => 'Aniversário de Brasília',
            'dia' => 16,
            'mes' => 7,
            'tipoDia' => 'MES',
            'recorrente' => 1,
            'abrangencia' => 'MUNICIPAL',
            'cidade_id' => $cidade->id,
        ]);

        PlanoTrabalho::factory()->ativo()->create([
            'unidade_id' => $this->unidade->id,
            'carga_horaria' => 8.0,
            'data_inicio' => '2026-07-13', // segunda
            'data_fim' => '2026-07-17',    // sexta
        ]);

        $response = $this->actingAs($this->gestor)
            ->getJson('/api/__tests/v2/home/resumo-equipe?' . http_build_query([
                'unidade_id' => $this->unidade->id,
                'subordinadas' => '0',
            ]));

        $response->assertOk();

        // 13(seg), 14(ter), 15(qua), 16(qui-FERIADO MUNICIPAL), 17(sex) = 4 dias úteis
        $horas = $response->json('data.capacidade_equipe_horas_mensais');
        expect($horas)->toEqual(32.0); // 8h × 4 dias

        Carbon::setTestNow();
    });

    test('não desconta feriado estadual de outro estado', function () {
        Carbon::setTestNow(Carbon::create(2026, 7, 15));

        $cidade = \App\Models\Cidade::create([
            'id' => fake()->uuid(),
            'codigo_ibge' => '5300108',
            'nome' => 'Brasília',
            'tipo' => 'CAPITAL',
            'uf' => 'DF',
            'timezone' => -3,
        ]);

        $this->unidade->update(['cidade_id' => $cidade->id]);

        Feriado::factory()->create([
            'nome' => 'Revolução Constitucionalista',
            'dia' => 14,
            'mes' => 7,
            'tipoDia' => 'MES',
            'recorrente' => 1,
            'abrangencia' => 'ESTADUAL',
            'uf' => 'SP', // unidade está em DF, feriado é de SP
        ]);

        PlanoTrabalho::factory()->ativo()->create([
            'unidade_id' => $this->unidade->id,
            'carga_horaria' => 8.0,
            'data_inicio' => '2026-07-13',
            'data_fim' => '2026-07-17',
        ]);

        $response = $this->actingAs($this->gestor)
            ->getJson('/api/__tests/v2/home/resumo-equipe?' . http_build_query([
                'unidade_id' => $this->unidade->id,
                'subordinadas' => '0',
            ]));

        $response->assertOk();

        // Feriado de SP não se aplica a DF: 5 dias úteis
        $horas = $response->json('data.capacidade_equipe_horas_mensais');
        expect($horas)->toEqual(40.0); // 8h × 5 dias

        Carbon::setTestNow();
    });
});
