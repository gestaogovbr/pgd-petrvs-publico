<?php

namespace Tests\IntegrationTenant\Services;

use App\Models\PlanoTrabalho;
use App\Models\Programa;
use App\Services\PlanoTrabalhoService;
use Illuminate\Support\Facades\DB;

beforeEach(function () {
    $this->service = new PlanoTrabalhoService();
});

describe('PlanoTrabalhoService - Períodos avaliativos e Status padrão', function () {
    test('testa fluxo de mudanças de período do plano com consolidações mensais', function () {
        $programa = Programa::factory()->create([
            'periodicidade_consolidacao' => 'MENSAL',
            'periodicidade_valor' => 31,
            'data_inicio' => '2026-01-01',
            'data_fim' => '2026-12-31',
        ]);
        
        $plano = PlanoTrabalho::factory()->create([
            'data_inicio' => '2026-01-01',
            'data_fim' => '2026-04-01',
            'programa_id' => $programa->id,
        ]);

        $plano = PlanoTrabalho::with(['programa', 'consolidacoes'])->find($plano->id);

        // Primeira atualização: 01-01-2026 ~ 01-04-2026
        $this->service->atualizaConsolidacoes($plano);

        $consolidacoes = $plano->consolidacoes()->orderBy('data_inicio')->get();

        expect($consolidacoes)->toHaveCount(4);
        expect($consolidacoes[0]->data_inicio)->toBe('2026-01-01');
        expect($consolidacoes[0]->data_fim)->toBe('2026-01-31');
        expect($consolidacoes[1]->data_inicio)->toBe('2026-02-01');
        expect($consolidacoes[1]->data_fim)->toBe('2026-02-28');
        expect($consolidacoes[2]->data_inicio)->toBe('2026-03-01');
        expect($consolidacoes[2]->data_fim)->toBe('2026-03-31');
        expect($consolidacoes[3]->data_inicio)->toBe('2026-04-01');
        expect($consolidacoes[3]->data_fim)->toBe('2026-04-01');
        foreach ($consolidacoes as $consolidacao) {
            expect($consolidacao->status)->toBe('INCLUIDO');
        }

        // Alterar plano para: 01-01-2026 ~ 31-01-2026
        DB::table('planos_trabalhos')
            ->where('id', $plano->id)
            ->update([
                'data_inicio' => '2026-01-01',
                'data_fim' => '2026-01-31'
            ]);

        $plano = PlanoTrabalho::with(['programa', 'consolidacoes'])->find($plano->id);
        $this->service->atualizaConsolidacoes($plano);

        $consolidacoes = $plano->consolidacoes()->orderBy('data_inicio')->get();

        expect($consolidacoes)->toHaveCount(1);
        expect($consolidacoes[0]->data_inicio)->toBe('2026-01-01');
        expect($consolidacoes[0]->data_fim)->toBe('2026-01-31');
        expect($consolidacoes[0]->status)->toBe('INCLUIDO');

        // Alterar plano para: 08-01-2026 ~ 31-01-2026
        DB::table('planos_trabalhos')
            ->where('id', $plano->id)
            ->update([
                'data_inicio' => '2026-01-08',
                'data_fim' => '2026-01-31'
            ]);

        $plano = PlanoTrabalho::with(['programa', 'consolidacoes'])->find($plano->id);
        $this->service->atualizaConsolidacoes($plano);

        $consolidacoes = $plano->consolidacoes()->orderBy('data_inicio')->get();

        expect($consolidacoes)->toHaveCount(1);
        expect($consolidacoes[0]->data_inicio)->toBe('2026-01-08');
        expect($consolidacoes[0]->data_fim)->toBe('2026-01-31');
        expect($consolidacoes[0]->status)->toBe('INCLUIDO');
    });
});
