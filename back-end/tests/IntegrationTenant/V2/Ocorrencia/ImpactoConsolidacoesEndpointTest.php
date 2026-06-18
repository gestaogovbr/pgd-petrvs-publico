<?php

use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\TipoAvaliacao;
use App\Models\TipoMotivoAfastamento;
use App\Models\Usuario;
use App\V2\Ocorrencia\OcorrenciaController;
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
            ->assertJsonPath('data.gera_dispensa', false)
            ->assertJsonPath('data.remove_dispensa', false)
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
            ->assertJsonPath('data.gera_dispensa', true)
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
            ->assertJsonPath('data.remove_dispensa', true)
            ->assertJsonPath('data.operacao_bloqueada', false);
    });

    test('detecta remoção de dispensa quando encolhimento cria gap entre afastamentos', function () {
        // Afastamento 1: 01/05 a 05/05
        $af1Id = Str::uuid()->toString();
        DB::connection('tenant')->table('afastamentos')->insert([
            'id' => $af1Id,
            'usuario_id' => $this->usuario->id,
            'data_inicio' => '2026-05-01',
            'data_fim' => '2026-05-05',
            'tipo_motivo_afastamento_id' => $this->tipoNaoCompensacao->id,
            'observacoes' => 'Afastamento 1',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Afastamento 2: 06/05 a 31/05 (cobre junto com af1 toda a consolidação)
        $af2Id = Str::uuid()->toString();
        DB::connection('tenant')->table('afastamentos')->insert([
            'id' => $af2Id,
            'usuario_id' => $this->usuario->id,
            'data_inicio' => '2026-05-06',
            'data_fim' => '2026-05-31',
            'tipo_motivo_afastamento_id' => $this->tipoNaoCompensacao->id,
            'observacoes' => 'Afastamento 2',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Edita af2 para 07/05 a 31/05 → gap no dia 06 → perde cobertura total
        $response = $this->getJson('/api/__tests/v2/ocorrencia/impacto-consolidacoes?' . http_build_query([
            'usuario_id' => $this->usuario->id,
            'data_inicio' => '2026-05-07',
            'data_fim' => '2026-05-31',
            'ocorrencia_id' => $af2Id,
            'operacao' => 'editar',
        ]));

        $response->assertStatus(200)
            ->assertJsonPath('data.remove_dispensa', true)
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
            ->assertJsonPath('data.remove_dispensa', true)
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
            ->assertJsonPath('data.gera_dispensa', true)
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

describe('Mudança de tipo compensação/não-compensação', function () {

    beforeEach(function () {
        $tipoAvaliacao = TipoAvaliacao::factory()->create();
        $this->tipoAvaliacaoNotaId = Str::uuid()->toString();
        DB::connection('tenant')->table('tipos_avaliacoes_notas')->insert([
            'id' => $this->tipoAvaliacaoNotaId,
            'tipo_avaliacao_id' => $tipoAvaliacao->id,
            'sequencia' => 1,
            'nota' => json_encode(['valor' => 'IV']),
            'descricao' => 'Nota IV',
            'pergunta' => 'Pergunta',
            'aprova' => 0,
            'justifica' => 0,
            'icone' => 'bi bi-star',
            'cor' => '#FF0000',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        $this->tipoAvaliacaoId = $tipoAvaliacao->id;

        $this->tipoCompensacao = TipoMotivoAfastamento::firstOrCreate(
            ['codigo' => '15'],
            ['nome' => 'Greve (compensação)', 'sigla' => 'GC', 'calculo' => 'DECRESCIMO', 'data_inicio' => now(), 'situacao' => 'ATIVO', 'icone' => 'bi bi-flag', 'cor' => '#FFFF00', 'horas' => 0, 'integracao' => 0]
        );
    });

    test('bloqueia ao mudar ocorrência para compensação quando a dispensa resultante é removida em PT concluído com recurso', function () {
        $this->plano->update(['status' => 'CONCLUIDO']);

        DB::connection('tenant')->table('avaliacoes')->insert([
            'id' => Str::uuid()->toString(),
            'plano_trabalho_consolidacao_id' => $this->consolidacao->id,
            'avaliador_id' => $this->usuario->id,
            'data_avaliacao' => '2026-06-01',
            'nota' => json_encode(['nota' => 'IV']),
            'justificativas' => json_encode([]),
            'tipo_avaliacao_id' => $this->tipoAvaliacaoId,
            'tipo_avaliacao_nota_id' => $this->tipoAvaliacaoNotaId,
            'recurso' => 'Discordo da nota',
            'data_recurso' => '2026-06-05',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $af1Id = Str::uuid()->toString();
        $af2Id = Str::uuid()->toString();

        DB::connection('tenant')->table('afastamentos')->insert([
            ['id' => $af1Id, 'usuario_id' => $this->usuario->id, 'data_inicio' => '2026-05-01', 'data_fim' => '2026-05-15', 'tipo_motivo_afastamento_id' => $this->tipoNaoCompensacao->id, 'observacoes' => 'af1', 'created_at' => now(), 'updated_at' => now()],
            ['id' => $af2Id, 'usuario_id' => $this->usuario->id, 'data_inicio' => '2026-05-16', 'data_fim' => '2026-05-31', 'tipo_motivo_afastamento_id' => $this->tipoNaoCompensacao->id, 'observacoes' => 'af2', 'created_at' => now(), 'updated_at' => now()],
        ]);

        // Editar af2 para tipo compensação → remove dispensa → PT concluído com recurso → bloqueio
        $response = $this->getJson('/api/__tests/v2/ocorrencia/impacto-consolidacoes?' . http_build_query([
            'usuario_id' => $this->usuario->id,
            'data_inicio' => '2026-05-16',
            'data_fim' => '2026-05-31',
            'ocorrencia_id' => $af2Id,
            'operacao' => 'editar',
            'tipo_motivo_afastamento_id' => $this->tipoCompensacao->id,
        ]));

        $response->assertStatus(200)
            ->assertJsonPath('data.operacao_bloqueada', true)
            ->assertJsonPath('data.remove_dispensa', true);
    });

    test('bloqueia ao mudar ocorrência de compensação para não-compensação quando gera dispensa em PT concluído com recurso', function () {
        $this->plano->update(['status' => 'CONCLUIDO']);

        DB::connection('tenant')->table('avaliacoes')->insert([
            'id' => Str::uuid()->toString(),
            'plano_trabalho_consolidacao_id' => $this->consolidacao->id,
            'avaliador_id' => $this->usuario->id,
            'data_avaliacao' => '2026-06-01',
            'nota' => json_encode(['nota' => 'IV']),
            'justificativas' => json_encode([]),
            'tipo_avaliacao_id' => $this->tipoAvaliacaoId,
            'tipo_avaliacao_nota_id' => $this->tipoAvaliacaoNotaId,
            'recurso' => 'Discordo da nota',
            'data_recurso' => '2026-06-05',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $af1Id = Str::uuid()->toString();
        $af2Id = Str::uuid()->toString();

        DB::connection('tenant')->table('afastamentos')->insert([
            ['id' => $af1Id, 'usuario_id' => $this->usuario->id, 'data_inicio' => '2026-05-01', 'data_fim' => '2026-05-15', 'tipo_motivo_afastamento_id' => $this->tipoNaoCompensacao->id, 'observacoes' => 'af1', 'created_at' => now(), 'updated_at' => now()],
            ['id' => $af2Id, 'usuario_id' => $this->usuario->id, 'data_inicio' => '2026-05-16', 'data_fim' => '2026-05-31', 'tipo_motivo_afastamento_id' => $this->tipoCompensacao->id, 'observacoes' => 'af2 comp', 'created_at' => now(), 'updated_at' => now()],
        ]);

        // Editar af2 de compensação para não-compensação → gera dispensa → PT concluído com recurso → bloqueio
        $response = $this->getJson('/api/__tests/v2/ocorrencia/impacto-consolidacoes?' . http_build_query([
            'usuario_id' => $this->usuario->id,
            'data_inicio' => '2026-05-16',
            'data_fim' => '2026-05-31',
            'ocorrencia_id' => $af2Id,
            'operacao' => 'editar',
            'tipo_motivo_afastamento_id' => $this->tipoNaoCompensacao->id,
        ]));

        $response->assertStatus(200)
            ->assertJsonPath('data.operacao_bloqueada', true)
            ->assertJsonPath('data.gera_dispensa', true);
    });
});
