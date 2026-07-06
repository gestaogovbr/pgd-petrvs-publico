<?php

use App\Models\Afastamento;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\TipoMotivoAfastamento;
use App\Models\Usuario;
use App\V2\Ocorrencia\OcorrenciaController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;

beforeEach(function () {
    if (!Route::has('__tests.v2.observer-status.store')) {
        Route::middleware(['api'])->post('/api/__tests/v2/ocorrencia', [OcorrenciaController::class, 'store'])
            ->name('__tests.v2.observer-status.store');
    }
    if (!Route::has('__tests.v2.observer-status.update')) {
        Route::middleware(['api'])->put('/api/__tests/v2/ocorrencia/{ocorrenciaId}', [OcorrenciaController::class, 'update'])
            ->name('__tests.v2.observer-status.update');
    }
    if (!Route::has('__tests.v2.observer-status.destroy')) {
        Route::middleware(['api'])->delete('/api/__tests/v2/ocorrencia/{ocorrenciaId}', [OcorrenciaController::class, 'destroy'])
            ->name('__tests.v2.observer-status.destroy');
    }

    // Desabilitar PGD export (evita erro de tenant sem configuração)
    \App\Observers\PlanoTrabalhoObserver::$skipProcessar = true;

    $this->usuario = Usuario::factory()->create();
    $this->actingAs($this->usuario);

    $this->tipoMotivo = TipoMotivoAfastamento::firstOrCreate(
        ['codigo' => '05'],
        ['nome' => 'Férias', 'sigla' => 'FE', 'calculo' => 'DECRESCIMO', 'data_inicio' => now(), 'situacao' => 'ATIVO', 'icone' => 'bi bi-sun', 'cor' => '#00AA00', 'horas' => 0, 'integracao' => 0]
    );

    $this->plano = PlanoTrabalho::factory()->ativo()->create([
        'usuario_id' => $this->usuario->id,
        'data_inicio' => '2026-05-01',
        'data_fim' => '2026-06-30',
    ]);

    PlanoTrabalhoConsolidacao::factory()->create([
        'plano_trabalho_id' => $this->plano->id,
        'data_inicio' => '2026-05-01',
        'data_fim' => '2026-05-31',
    ]);

    PlanoTrabalhoConsolidacao::factory()->create([
        'plano_trabalho_id' => $this->plano->id,
        'data_inicio' => '2026-06-01',
        'data_fim' => '2026-06-30',
    ]);
});

describe('Observer: transição de status do PT', function () {

    test('criar ocorrência cobrindo todas consolidações → PT ATIVO → CONCLUIDO', function () {
        expect($this->plano->status)->toBe('ATIVO');

        $this->postJson('/api/__tests/v2/ocorrencia', [
            'usuario_id' => $this->usuario->id,
            'observacoes' => 'Cobertura total',
            'data_inicio' => '2026-05-01',
            'data_fim' => '2026-06-30',
            'tipo_motivo_afastamento_id' => $this->tipoMotivo->id,
        ])->assertStatus(201);

        expect($this->plano->fresh()->status)->toBe('CONCLUIDO');
    });

    test('editar ocorrência encolhendo → PT CONCLUIDO → ATIVO', function () {
        $afId = Str::uuid()->toString();
        DB::connection('tenant')->table('afastamentos')->insert([
            'id' => $afId,
            'usuario_id' => $this->usuario->id,
            'data_inicio' => '2026-05-01',
            'data_fim' => '2026-06-30',
            'tipo_motivo_afastamento_id' => $this->tipoMotivo->id,
            'observacoes' => 'Total',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        $this->plano->forceFill(['status' => 'CONCLUIDO'])->save();

        expect($this->plano->fresh()->status)->toBe('CONCLUIDO');

        $afastamento = \App\Models\Afastamento::find($afId);
        $afastamento->update(['data_fim' => '2026-05-31']);

        expect($this->plano->fresh()->status)->toBe('ATIVO');
    });

    test('excluir ocorrência → PT CONCLUIDO → ATIVO', function () {
        $afId = Str::uuid()->toString();
        DB::connection('tenant')->table('afastamentos')->insert([
            'id' => $afId,
            'usuario_id' => $this->usuario->id,
            'data_inicio' => '2026-05-01',
            'data_fim' => '2026-06-30',
            'tipo_motivo_afastamento_id' => $this->tipoMotivo->id,
            'observacoes' => 'Total',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        $this->plano->forceFill(['status' => 'CONCLUIDO'])->save();

        expect($this->plano->fresh()->status)->toBe('CONCLUIDO');

        $this->deleteJson("/api/__tests/v2/ocorrencia/{$afId}", [
            'usuario_id' => $this->usuario->id,
        ])->assertStatus(204);

        expect($this->plano->fresh()->status)->toBe('ATIVO');
    });

    test('mover ocorrência para fora do PT → PT CONCLUIDO → ATIVO', function () {
        $afId = Str::uuid()->toString();
        DB::connection('tenant')->table('afastamentos')->insert([
            'id' => $afId,
            'usuario_id' => $this->usuario->id,
            'data_inicio' => '2026-05-01',
            'data_fim' => '2026-06-30',
            'tipo_motivo_afastamento_id' => $this->tipoMotivo->id,
            'observacoes' => 'Total',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        $this->plano->forceFill(['status' => 'CONCLUIDO'])->save();

        expect($this->plano->fresh()->status)->toBe('CONCLUIDO');

        $afastamento = \App\Models\Afastamento::find($afId);
        $afastamento->update(['data_inicio' => '2026-01-01', 'data_fim' => '2026-01-31']);

        expect($this->plano->fresh()->status)->toBe('ATIVO');
    });

    test('excluir ocorrência → PT CONCLUIDO arquivado → ATIVO desarquivado', function () {
        $afId = Str::uuid()->toString();
        DB::connection('tenant')->table('afastamentos')->insert([
            'id' => $afId,
            'usuario_id' => $this->usuario->id,
            'data_inicio' => '2026-05-01',
            'data_fim' => '2026-06-30',
            'tipo_motivo_afastamento_id' => $this->tipoMotivo->id,
            'observacoes' => 'Total',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        $this->plano->forceFill(['status' => 'CONCLUIDO', 'data_arquivamento' => '2026-06-01'])->save();

        expect($this->plano->fresh()->data_arquivamento)->not->toBeNull();

        $this->deleteJson("/api/__tests/v2/ocorrencia/{$afId}", [
            'usuario_id' => $this->usuario->id,
        ])->assertStatus(204);

        $plano = $this->plano->fresh();
        expect($plano->status)->toBe('ATIVO');
        expect($plano->data_arquivamento)->toBeNull();
    });
});
