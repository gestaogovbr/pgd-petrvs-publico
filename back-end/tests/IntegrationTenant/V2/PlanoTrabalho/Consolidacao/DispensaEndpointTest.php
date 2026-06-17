<?php

use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\TipoMotivoAfastamento;
use App\Models\Usuario;
use App\V2\PlanoTrabalho\Consolidacao\PlanoTrabalhoConsolidacaoController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;

beforeEach(function () {
    if (!Route::has('__tests.v2.consolidacao.dispensas')) {
        Route::middleware(['api'])->get(
            '/api/__tests/v2/plano-trabalho/{planoTrabalhoId}/consolidacao/dispensas',
            [PlanoTrabalhoConsolidacaoController::class, 'dispensas']
        )->name('__tests.v2.consolidacao.dispensas');
    }

    $this->usuario = Usuario::factory()->create();
    $this->actingAs($this->usuario);

    $this->tipoNaoCompensacao = TipoMotivoAfastamento::firstOrCreate(
        ['codigo' => '01'],
        ['nome' => 'Licença Médica', 'sigla' => 'LM', 'calculo' => 'DECRESCIMO', 'data_inicio' => now(), 'situacao' => 'ATIVO', 'icone' => 'bi bi-heart', 'cor' => '#FF0000', 'horas' => 0, 'integracao' => 0]
    );

    $this->tipoCompensacao = TipoMotivoAfastamento::firstOrCreate(
        ['codigo' => '15'],
        ['nome' => 'Greve (compensação)', 'sigla' => 'GC', 'calculo' => 'DECRESCIMO', 'data_inicio' => now(), 'situacao' => 'ATIVO', 'icone' => 'bi bi-flag', 'cor' => '#FFFF00', 'horas' => 0, 'integracao' => 0]
    );

    $this->plano = PlanoTrabalho::factory()->ativo()->create([
        'usuario_id' => $this->usuario->id,
        'data_inicio' => '2026-05-01',
        'data_fim' => '2026-07-31',
    ]);
});

describe('GET /api/v2/plano-trabalho/{id}/consolidacao/dispensas', function () {

    test('retorna consolidações dispensadas quando totalmente cobertas por ocorrência', function () {
        $consolidacao = PlanoTrabalhoConsolidacao::factory()->create([
            'plano_trabalho_id' => $this->plano->id,
            'data_inicio' => '2026-05-01',
            'data_fim' => '2026-05-31',
        ]);

        DB::connection('tenant')->table('afastamentos')->insert([
            'id' => Str::uuid()->toString(),
            'usuario_id' => $this->usuario->id,
            'data_inicio' => '2026-04-15',
            'data_fim' => '2026-06-15',
            'tipo_motivo_afastamento_id' => $this->tipoNaoCompensacao->id,
            'observacoes' => 'Teste',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $response = $this->getJson("/api/__tests/v2/plano-trabalho/{$this->plano->id}/consolidacao/dispensas");

        $response->assertStatus(200)
            ->assertJsonPath('success', true)
            ->assertJsonPath('data', [$consolidacao->id]);
    });

    test('não dispensa quando ocorrência é de compensação', function () {
        PlanoTrabalhoConsolidacao::factory()->create([
            'plano_trabalho_id' => $this->plano->id,
            'data_inicio' => '2026-05-01',
            'data_fim' => '2026-05-31',
        ]);

        DB::connection('tenant')->table('afastamentos')->insert([
            'id' => Str::uuid()->toString(),
            'usuario_id' => $this->usuario->id,
            'data_inicio' => '2026-04-15',
            'data_fim' => '2026-06-15',
            'tipo_motivo_afastamento_id' => $this->tipoCompensacao->id,
            'observacoes' => 'Teste comp',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $response = $this->getJson("/api/__tests/v2/plano-trabalho/{$this->plano->id}/consolidacao/dispensas");

        $response->assertStatus(200)
            ->assertJsonPath('data', []);
    });

    test('dispensa com múltiplas ocorrências cobrindo o período', function () {
        $consolidacao = PlanoTrabalhoConsolidacao::factory()->create([
            'plano_trabalho_id' => $this->plano->id,
            'data_inicio' => '2026-05-01',
            'data_fim' => '2026-05-31',
        ]);

        DB::connection('tenant')->table('afastamentos')->insert([
            ['id' => Str::uuid()->toString(), 'usuario_id' => $this->usuario->id, 'data_inicio' => '2026-04-15', 'data_fim' => '2026-05-15', 'tipo_motivo_afastamento_id' => $this->tipoNaoCompensacao->id, 'observacoes' => 'af1', 'created_at' => now(), 'updated_at' => now()],
            ['id' => Str::uuid()->toString(), 'usuario_id' => $this->usuario->id, 'data_inicio' => '2026-05-16', 'data_fim' => '2026-06-15', 'tipo_motivo_afastamento_id' => $this->tipoNaoCompensacao->id, 'observacoes' => 'af2', 'created_at' => now(), 'updated_at' => now()],
        ]);

        $response = $this->getJson("/api/__tests/v2/plano-trabalho/{$this->plano->id}/consolidacao/dispensas");

        $response->assertStatus(200)
            ->assertJsonPath('data', [$consolidacao->id]);
    });

    test('retorna 422 para uuid inválido', function () {
        $response = $this->getJson('/api/__tests/v2/plano-trabalho/not-a-uuid/consolidacao/dispensas');

        $response->assertStatus(422);
    });

    test('retorna 404 para plano inexistente', function () {
        $response = $this->getJson('/api/__tests/v2/plano-trabalho/00000000-0000-0000-0000-000000000000/consolidacao/dispensas');

        $response->assertStatus(404);
    });
});
