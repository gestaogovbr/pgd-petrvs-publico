<?php

use App\Enums\StatusEnum;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Repository\PlanoTrabalhoConsolidacaoRepository;
use Illuminate\Support\Facades\DB;
use Tests\DatabaseSetup;

uses(Tests\TestCase::class);

beforeEach(function () {
    DatabaseSetup::DBup();
    $this->repository = new PlanoTrabalhoConsolidacaoRepository();
});

describe('PlanoTrabalhoConsolidacaoRepository', function () {
    describe('#findConsolidacaoById - busca consolidação por ID', function () {
        test('retorna consolidação com relacionamentos', function () {
            DB::table('planos_trabalhos_consolidacoes')->insert([
                'id' => 'consolidacao-1',
                'plano_trabalho_id' => 'plano-1',
                'data_inicio' => '2024-01-01',
                'data_fim' => '2024-01-31',
                'data_conclusao' => '2024-02-01 10:00:00',
                'status' => StatusEnum::CONCLUIDO->value,
                'created_at' => now(),
                'updated_at' => now()
            ]);

            $resultado = $this->repository->findConsolidacaoById('consolidacao-1');

            expect($resultado)->toBeInstanceOf(PlanoTrabalhoConsolidacao::class);
            expect($resultado->id)->toBe('consolidacao-1');
            expect($resultado->status)->toBe(StatusEnum::CONCLUIDO->value);
        });

        test('retorna null quando não encontra', function () {
            $resultado = $this->repository->findConsolidacaoById('inexistente');

            expect($resultado)->toBeNull();
        });
    });

    describe('#getConsolidacaoData - retorna dados completos da consolidação', function () {
        test('retorna estrutura completa para consolidação concluída', function () {
            DB::table('planos_trabalhos_consolidacoes')->insert([
                'id' => 'consolidacao-1',
                'plano_trabalho_id' => 'plano-1',
                'data_inicio' => '2024-01-01',
                'data_fim' => '2024-01-31',
                'data_conclusao' => '2024-02-01 10:00:00',
                'status' => StatusEnum::CONCLUIDO->value,
                'justificativa_conclusao' => 'Concluído com sucesso',
                'created_at' => now(),
                'updated_at' => now()
            ]);

            DB::table('planos_trabalhos')->insert([
                'id' => 'plano-1',
                'usuario_id' => 'user-1',
                'programa_id' => 'programa-1',
                'unidade_id' => 'unidade-1',
                'created_at' => now(),
                'updated_at' => now()
            ]);

            $resultado = $this->repository->getConsolidacaoData('consolidacao-1');

            expect($resultado)->toHaveKeys([
                'programa',
                'planoTrabalho',
                'planosEntregas',
                'atividades',
                'afastamentos',
                'ocorrencias',
                'comparecimentos',
                'status',
                'justificativa_conclusao'
            ]);
            expect($resultado['status'])->toBe(StatusEnum::CONCLUIDO->value);
            expect($resultado['justificativa_conclusao'])->toBe('Concluído com sucesso');
        });

        test('filtra atividades por período quando não concluído', function () {
            DB::table('planos_trabalhos_consolidacoes')->insert([
                'id' => 'consolidacao-1',
                'plano_trabalho_id' => 'plano-1',
                'data_inicio' => '2024-01-01',
                'data_fim' => '2024-01-31',
                'status' => StatusEnum::INCLUIDO->value,
                'created_at' => now(),
                'updated_at' => now()
            ]);

            DB::table('planos_trabalhos')->insert([
                'id' => 'plano-1',
                'usuario_id' => 'user-1',
                'programa_id' => 'programa-1',
                'unidade_id' => 'unidade-1',
                'created_at' => now(),
                'updated_at' => now()
            ]);

            DB::table('atividades')->insert([
                'id' => 'atividade-1',
                'numero' => 1,
                'descricao' => 'Atividade no período',
                'data_distribuicao' => '2024-01-15 08:00:00',
                'data_estipulada_entrega' => '2024-01-20 18:00:00',
                'tempo_planejado' => 8.0,
                'esforco' => 6.0,
                'usuario_id' => 'user-1',
                'demandante_id' => 'user-1',
                'unidade_id' => 'unidade-1',
                'created_at' => now(),
                'updated_at' => now()
            ]);

            $resultado = $this->repository->getConsolidacaoData('consolidacao-1');

            expect($resultado['atividades'])->toHaveCount(1);
            expect($resultado['atividades'][0]->id)->toBe('atividade-1');
        });

        test('filtra afastamentos por período quando não concluído', function () {
            DB::table('planos_trabalhos_consolidacoes')->insert([
                'id' => 'consolidacao-1',
                'plano_trabalho_id' => 'plano-1',
                'data_inicio' => '2024-01-01',
                'data_fim' => '2024-01-31',
                'status' => StatusEnum::INCLUIDO->value,
                'created_at' => now(),
                'updated_at' => now()
            ]);

            DB::table('planos_trabalhos')->insert([
                'id' => 'plano-1',
                'usuario_id' => 'user-1',
                'programa_id' => 'programa-1',
                'unidade_id' => 'unidade-1',
                'created_at' => now(),
                'updated_at' => now()
            ]);

            DB::table('afastamentos')->insert([
                'id' => 'afastamento-1',
                'usuario_id' => 'user-1',
                'tipo_motivo_afastamento_id' => 'tipo-1',
                'data_inicio' => '2024-01-10',
                'data_fim' => '2024-01-15',
                'observacoes' => 'Afastamento no período',
                'created_at' => now(),
                'updated_at' => now()
            ]);

            $resultado = $this->repository->getConsolidacaoData('consolidacao-1');

            expect($resultado['afastamentos'])->toHaveCount(1);
            expect($resultado['afastamentos'][0]->id)->toBe('afastamento-1');
        });

        test('filtra ocorrências por período quando não concluído', function () {
            DB::table('planos_trabalhos_consolidacoes')->insert([
                'id' => 'consolidacao-1',
                'plano_trabalho_id' => 'plano-1',
                'data_inicio' => '2024-01-01',
                'data_fim' => '2024-01-31',
                'status' => StatusEnum::INCLUIDO->value,
                'created_at' => now(),
                'updated_at' => now()
            ]);

            DB::table('planos_trabalhos')->insert([
                'id' => 'plano-1',
                'usuario_id' => 'user-1',
                'programa_id' => 'programa-1',
                'unidade_id' => 'unidade-1',
                'created_at' => now(),
                'updated_at' => now()
            ]);

            DB::table('ocorrencias')->insert([
                'id' => 'ocorrencia-1',
                'usuario_id' => 'user-1',
                'plano_trabalho_id' => 'plano-1',
                'data_inicio' => '2024-01-10 08:00:00',
                'data_fim' => '2024-01-10 18:00:00',
                'descricao' => 'Ocorrência no período',
                'created_at' => now(),
                'updated_at' => now()
            ]);

            $resultado = $this->repository->getConsolidacaoData('consolidacao-1');

            expect($resultado['ocorrencias'])->toHaveCount(1);
            expect($resultado['ocorrencias'][0]->id)->toBe('ocorrencia-1');
        });
    });
});
