<?php

use App\Models\Afastamento;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\TipoMotivoAfastamento;
use App\Models\Usuario;
use App\V2\PlanoTrabalho\Ocorrencia\OcorrenciaController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;

beforeEach(function () {
    if (!Route::has('__tests.v2.ocorrencia.impacto-consolidacoes')) {
        Route::middleware(['api'])->get(
            '/api/__tests/v2/ocorrencia/impacto-consolidacoes',
            [OcorrenciaController::class, 'impactoConsolidacoes']
        )->name('__tests.v2.ocorrencia.impacto-consolidacoes');
    }

    $this->usuario = Usuario::factory()->create();
    $this->actingAs($this->usuario);

    $this->tipoNaoCompensacao = TipoMotivoAfastamento::firstOrCreate(
        ['codigo' => '01'],
        ['nome' => 'Licença Médica', 'sigla' => 'LM', 'calculo' => 'DECRESCIMO', 'data_inicio' => now(), 'situacao' => 'ATIVO', 'icone' => 'bi bi-heart', 'cor' => '#FF0000', 'horas' => 0, 'integracao' => 0]
    );

    $this->plano = PlanoTrabalho::factory()->ativo()->create([
        'usuario_id' => $this->usuario->id,
        'data_inicio' => '2026-05-01',
        'data_fim' => '2026-07-31',
    ]);

    $this->consolidacao = PlanoTrabalhoConsolidacao::factory()->create([
        'plano_trabalho_id' => $this->plano->id,
        'data_inicio' => '2026-05-01',
        'data_fim' => '2026-05-31',
    ]);
});

describe('GET /api/v2/ocorrencia/impacto-consolidacoes', function () {

    test('retorna sem impacto quando ocorrência não cobre nenhuma consolidação', function () {
        $response = $this->getJson('/api/__tests/v2/ocorrencia/impacto-consolidacoes?' . http_build_query([
            'usuario_id' => $this->usuario->id,
            'data_inicio' => '2026-05-10',
            'data_fim' => '2026-05-20',
            'operacao' => 'criar',
        ]));

        $response->assertStatus(200)
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.tem_impacto', false)
            ->assertJsonPath('data.operacao_bloqueada', false);
    });

    test('detecta dispensa quando ocorrência cobre consolidação integralmente', function () {
        $response = $this->getJson('/api/__tests/v2/ocorrencia/impacto-consolidacoes?' . http_build_query([
            'usuario_id' => $this->usuario->id,
            'data_inicio' => '2026-04-15',
            'data_fim' => '2026-06-15',
            'operacao' => 'criar',
        ]));

        $response->assertStatus(200)
            ->assertJsonPath('data.tem_impacto', true)
            ->assertJsonPath('data.operacao_bloqueada', false);
    });

    test('detecta remoção de dispensa ao editar ocorrência (ocorrencia_id)', function () {
        $afastamentoId = Str::uuid()->toString();

        DB::connection('tenant')->table('afastamentos')->insert([
            'id' => $afastamentoId,
            'usuario_id' => $this->usuario->id,
            'data_inicio' => '2026-04-15',
            'data_fim' => '2026-06-15',
            'tipo_motivo_afastamento_id' => $this->tipoNaoCompensacao->id,
            'observacoes' => 'Teste',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $response = $this->getJson('/api/__tests/v2/ocorrencia/impacto-consolidacoes?' . http_build_query([
            'usuario_id' => $this->usuario->id,
            'data_inicio' => '2026-05-10',
            'data_fim' => '2026-05-20',
            'ocorrencia_id' => $afastamentoId,
            'operacao' => 'editar',
        ]));

        $response->assertStatus(200)
            ->assertJsonPath('data.tem_impacto', true)
            ->assertJsonPath('data.operacao_bloqueada', false);
    });

    test('detecta remoção de dispensa ao excluir ocorrência', function () {
        $afastamentoId = Str::uuid()->toString();

        DB::connection('tenant')->table('afastamentos')->insert([
            'id' => $afastamentoId,
            'usuario_id' => $this->usuario->id,
            'data_inicio' => '2026-04-15',
            'data_fim' => '2026-06-15',
            'tipo_motivo_afastamento_id' => $this->tipoNaoCompensacao->id,
            'observacoes' => 'Teste',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $response = $this->getJson('/api/__tests/v2/ocorrencia/impacto-consolidacoes?' . http_build_query([
            'usuario_id' => $this->usuario->id,
            'data_inicio' => '2026-04-15',
            'data_fim' => '2026-06-15',
            'ocorrencia_id' => $afastamentoId,
            'operacao' => 'excluir',
        ]));

        $response->assertStatus(200)
            ->assertJsonPath('data.tem_impacto', true)
            ->assertJsonPath('data.operacao_bloqueada', false);
    });

    test('retorna impacto quando múltiplos PTs do mesmo usuário são afetados', function () {
        $plano2 = PlanoTrabalho::factory()->ativo()->create([
            'usuario_id' => $this->usuario->id,
            'data_inicio' => '2026-04-01',
            'data_fim' => '2026-06-30',
        ]);

        PlanoTrabalhoConsolidacao::factory()->create([
            'plano_trabalho_id' => $plano2->id,
            'data_inicio' => '2026-05-01',
            'data_fim' => '2026-05-31',
        ]);

        $response = $this->getJson('/api/__tests/v2/ocorrencia/impacto-consolidacoes?' . http_build_query([
            'usuario_id' => $this->usuario->id,
            'data_inicio' => '2026-04-15',
            'data_fim' => '2026-06-15',
            'operacao' => 'criar',
        ]));

        $response->assertStatus(200)
            ->assertJsonPath('data.tem_impacto', true)
            ->assertJsonPath('data.operacao_bloqueada', false);
    });

    test('retorna 422 quando usuario_id é inválido', function () {
        $response = $this->getJson('/api/__tests/v2/ocorrencia/impacto-consolidacoes?' . http_build_query([
            'usuario_id' => 'not-a-uuid',
            'data_inicio' => '2026-05-01',
            'data_fim' => '2026-05-31',
            'operacao' => 'criar',
        ]));

        $response->assertStatus(422);
    });

    test('retorna 422 quando campos obrigatórios estão ausentes', function () {
        $response = $this->getJson('/api/__tests/v2/ocorrencia/impacto-consolidacoes');

        $response->assertStatus(422);
    });

    test('retorna 422 quando data_fim é anterior a data_inicio', function () {
        $response = $this->getJson('/api/__tests/v2/ocorrencia/impacto-consolidacoes?' . http_build_query([
            'usuario_id' => $this->usuario->id,
            'data_inicio' => '2026-05-31',
            'data_fim' => '2026-05-01',
            'operacao' => 'criar',
        ]));

        $response->assertStatus(422);
    });
});
