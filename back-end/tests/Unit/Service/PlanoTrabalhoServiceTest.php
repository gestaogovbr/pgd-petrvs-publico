<?php

use App\Models\PlanoTrabalho;
use App\Services\PlanoTrabalhoService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    if (!Schema::hasTable('programas')) {
        Schema::create('programas', function ($table) {
            $table->string('id')->primary();
            $table->timestamps();
            $table->softDeletes();
            $table->string('nome');
            $table->string('periodicidade_consolidacao')->default('MENSAL');
            $table->integer('periodicidade_valor')->default(1);
            $table->datetime('data_inicio');
            $table->datetime('data_fim');
        });
    }

    if (!Schema::hasTable('planos_trabalhos')) {
        Schema::create('planos_trabalhos', function ($table) {
            $table->string('id')->primary();
            $table->timestamps();
            $table->softDeletes();
            $table->string('programa_id');
            $table->string('usuario_id');
            $table->string('unidade_id');
            $table->datetime('data_inicio');
            $table->datetime('data_fim');
            $table->string('status')->default('INCLUIDO');
        });
    }

    if (!Schema::hasTable('planos_trabalhos_consolidacoes')) {
        Schema::create('planos_trabalhos_consolidacoes', function ($table) {
            $table->string('id')->primary();
            $table->timestamps();
            $table->softDeletes();
            $table->date('data_inicio');
            $table->date('data_fim');
            $table->datetime('data_conclusao')->nullable();
            $table->string('status')->default('INCLUIDO');
            $table->string('plano_trabalho_id');
            $table->string('avaliacao_id')->nullable();
            $table->text('justificativa_conclusao')->nullable();
        });
    }

    $this->service = new PlanoTrabalhoService();
});

describe('PlanoTrabalhoService', function () {
    test('testa fluxo de mudanças de período do plano com consolidações mensais', function () {
        // Criar programa
        DB::table('programas')->insert([
            'id' => 'programa-1',
            'nome' => 'Programa Teste',
            'periodicidade_consolidacao' => 'MENSAL',
            'periodicidade_valor' => 31,
            'data_inicio' => '2026-01-01',
            'data_fim' => '2026-12-31'
        ]);

        // Criar plano inicial: 01-01-2026 ~ 01-04-2026
        DB::table('planos_trabalhos')->insert([
            'id' => 'plano-1',
            'programa_id' => 'programa-1',
            'usuario_id' => 'usuario-1',
            'unidade_id' => 'unidade-1',
            'data_inicio' => '2026-01-01',
            'data_fim' => '2026-04-01',
            'status' => 'ATIVO'
        ]);

        $plano = PlanoTrabalho::find('plano-1');

        // Primeira atualização: 01-01-2026 ~ 01-04-2026
        $this->service->atualizaConsolidacoes($plano);

        $consolidacoes = DB::table('planos_trabalhos_consolidacoes')
            ->where('plano_trabalho_id', 'plano-1')
            ->whereNull('deleted_at')
            ->orderBy('data_inicio')
            ->get();

        expect($consolidacoes)->toHaveCount(4);
        expect($consolidacoes[0]->data_inicio)->toBe('2026-01-01');
        expect($consolidacoes[0]->data_fim)->toBe('2026-01-31');
        expect($consolidacoes[1]->data_inicio)->toBe('2026-02-01');
        expect($consolidacoes[1]->data_fim)->toBe('2026-02-28');
        expect($consolidacoes[2]->data_inicio)->toBe('2026-03-01');
        expect($consolidacoes[2]->data_fim)->toBe('2026-03-31');
        expect($consolidacoes[3]->data_inicio)->toBe('2026-04-01');
        expect($consolidacoes[3]->data_fim)->toBe('2026-04-01');

        // Alterar plano para: 01-01-2026 ~ 31-01-2026
        DB::table('planos_trabalhos')
            ->where('id', 'plano-1')
            ->update([
                'data_inicio' => '2026-01-01',
                'data_fim' => '2026-01-31'
            ]);

        $plano = PlanoTrabalho::find('plano-1');
        $this->service->atualizaConsolidacoes($plano);

        $consolidacoes = DB::table('planos_trabalhos_consolidacoes')
            ->where('plano_trabalho_id', 'plano-1')
            ->whereNull('deleted_at')
            ->orderBy('data_inicio')
            ->get();

        expect($consolidacoes)->toHaveCount(1);
        expect($consolidacoes[0]->data_inicio)->toBe('2026-01-01');
        expect($consolidacoes[0]->data_fim)->toBe('2026-01-31');

        // Alterar plano para: 08-01-2026 ~ 31-01-2026
        DB::table('planos_trabalhos')
            ->where('id', 'plano-1')
            ->update([
                'data_inicio' => '2026-01-08',
                'data_fim' => '2026-01-31'
            ]);

        $plano = PlanoTrabalho::find('plano-1');
        $this->service->atualizaConsolidacoes($plano);

        $consolidacoes = DB::table('planos_trabalhos_consolidacoes')
            ->where('plano_trabalho_id', 'plano-1')
            ->whereNull('deleted_at')
            ->orderBy('data_inicio')
            ->get();

        expect($consolidacoes)->toHaveCount(1);
        expect($consolidacoes[0]->data_inicio)->toBe('2026-01-08');
        expect($consolidacoes[0]->data_fim)->toBe('2026-01-31');
    });
});
