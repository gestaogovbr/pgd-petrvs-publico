<?php

use App\Models\Afastamento;
use App\Models\TipoMotivoAfastamento;
use App\Models\Usuario;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

beforeEach(function () {
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

        $afastamento = Afastamento::find($afId);
        $afastamento->update(['observacoes' => 'Atualizado']);

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

        $afastamento = Afastamento::find($afId);
        $afastamento->update(['data_inicio' => '2026-08-01', 'data_fim' => '2026-08-31']);

        $af = Afastamento::find($afId);
        expect((string) $af->data_inicio)->toContain('2026-08-01');
        expect((string) $af->data_fim)->toContain('2026-08-31');
    });
});
