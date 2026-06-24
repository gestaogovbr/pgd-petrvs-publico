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
    if (!Route::has('__tests.v2.observer-dates.update')) {
        Route::middleware(['api'])->put('/api/__tests/v2/ocorrencia/{ocorrenciaId}', [OcorrenciaController::class, 'update'])
            ->name('__tests.v2.observer-dates.update');
    }

    $this->usuario = Usuario::factory()->create();
    $this->actingAs($this->usuario);

    $this->tipoMotivo = TipoMotivoAfastamento::firstOrCreate(
        ['codigo' => '05'],
        ['nome' => 'Férias', 'sigla' => 'FE', 'calculo' => 'DECRESCIMO', 'data_inicio' => now(), 'situacao' => 'ATIVO', 'icone' => 'bi bi-sun', 'cor' => '#00AA00', 'horas' => 0, 'integracao' => 0]
    );
});

describe('AfastamentoObserver::updated - edição sem impacto em PTs', function () {

    test('edição que não muda datas não dispara verificação de datas originais', function () {
        $afId = Str::uuid()->toString();
        DB::connection('tenant')->table('afastamentos')->insert([
            'id' => $afId,
            'usuario_id' => $this->usuario->id,
            'data_inicio' => '2026-05-01',
            'data_fim' => '2026-05-31',
            'tipo_motivo_afastamento_id' => $this->tipoMotivo->id,
            'observacoes' => 'Original',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $response = $this->putJson("/api/__tests/v2/ocorrencia/{$afId}", [
            'usuario_id' => $this->usuario->id,
            'observacoes' => 'Atualizado',
        ]);

        $response->assertStatus(200);
        expect(Afastamento::find($afId)->observacoes)->toBe('Atualizado');
    });

    test('edição que move datas para período sem PTs executa sem side effects', function () {
        $afId = Str::uuid()->toString();
        DB::connection('tenant')->table('afastamentos')->insert([
            'id' => $afId,
            'usuario_id' => $this->usuario->id,
            'data_inicio' => '2026-07-01',
            'data_fim' => '2026-07-31',
            'tipo_motivo_afastamento_id' => $this->tipoMotivo->id,
            'observacoes' => 'Julho',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $response = $this->putJson("/api/__tests/v2/ocorrencia/{$afId}", [
            'usuario_id' => $this->usuario->id,
            'data_inicio' => '2026-08-01',
            'data_fim' => '2026-08-31',
        ]);

        $response->assertStatus(200);
        $af = Afastamento::find($afId);
        expect($af->data_inicio)->toContain('2026-08-01');
        expect($af->data_fim)->toContain('2026-08-31');
    });
});
