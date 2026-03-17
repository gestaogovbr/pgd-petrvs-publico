<?php

use App\DTOs\PlanoTrabalho\PlanoTrabalhoConsolidacaoDataDTO;
use App\Enums\StatusEnum;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Repository\PlanoTrabalhoConsolidacaoRepository;
use Illuminate\Support\Facades\DB;

beforeEach(function () {
    DB::statement('SET FOREIGN_KEY_CHECKS=0');
    $this->repository = app(PlanoTrabalhoConsolidacaoRepository::class);
});

afterEach(function () {
    DB::statement('SET FOREIGN_KEY_CHECKS=1');
});

describe('PlanoTrabalhoConsolidacaoRepository', function () {
    describe('#findConsolidacaoById - busca consolidação por ID', function () {
        test('retorna consolidação com relacionamentos', function () {
            DB::table('planos_trabalhos')->insert([
                'id' => 'plano-1',
                'usuario_id' => 'user-1',
                'programa_id' => 'programa-1',
                'unidade_id' => 'unidade-1',
                'tipo_modalidade_id' => 'tipo-modalidade-1',
                'criacao_usuario_id' => 'criador-1',
                'data_inicio' => '2024-01-01 00:00:00',
                'data_fim' => '2024-01-31 23:59:59',
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            DB::table('planos_trabalhos_consolidacoes')->insert([
                'id' => 'consolidacao-1',
                'plano_trabalho_id' => 'plano-1',
                'data_inicio' => '2024-01-01',
                'data_fim' => '2024-01-31',
                'data_conclusao' => '2024-02-01 10:00:00',
                'status' => StatusEnum::CONCLUIDO->value,
                'created_at' => now(),
                'updated_at' => now(),
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
            DB::table('planos_trabalhos')->insert([
                'id' => 'plano-1',
                'usuario_id' => 'user-1',
                'programa_id' => 'programa-1',
                'unidade_id' => 'unidade-1',
                'tipo_modalidade_id' => 'tipo-modalidade-1',
                'criacao_usuario_id' => 'criador-1',
                'data_inicio' => '2024-01-01 00:00:00',
                'data_fim' => '2024-01-31 23:59:59',
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            DB::table('planos_trabalhos_consolidacoes')->insert([
                'id' => 'consolidacao-1',
                'plano_trabalho_id' => 'plano-1',
                'data_inicio' => '2024-01-01',
                'data_fim' => '2024-01-31',
                'data_conclusao' => '2024-02-01 10:00:00',
                'status' => StatusEnum::CONCLUIDO->value,
                'justificativa_conclusao' => 'Concluído com sucesso',
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            $resultado = $this->repository->getConsolidacaoData('consolidacao-1');

            expect($resultado)->toBeInstanceOf(PlanoTrabalhoConsolidacaoDataDTO::class);
            expect($resultado->status)->toBe(StatusEnum::CONCLUIDO->value);
            expect($resultado->justificativaConclusao)->toBe('Concluído com sucesso');
        });

        test('filtra atividades por período quando não concluído', function () {
            DB::table('planos_trabalhos')->insert([
                'id' => 'plano-1',
                'usuario_id' => 'user-1',
                'programa_id' => 'programa-1',
                'unidade_id' => 'unidade-1',
                'tipo_modalidade_id' => 'tipo-modalidade-1',
                'criacao_usuario_id' => 'criador-1',
                'data_inicio' => '2024-01-01 00:00:00',
                'data_fim' => '2024-01-31 23:59:59',
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            DB::table('planos_trabalhos_consolidacoes')->insert([
                'id' => 'consolidacao-1',
                'plano_trabalho_id' => 'plano-1',
                'data_inicio' => '2024-01-01',
                'data_fim' => '2024-01-31',
                'status' => StatusEnum::INCLUIDO->value,
                'created_at' => now(),
                'updated_at' => now(),
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
                'updated_at' => now(),
            ]);

            $resultado = $this->repository->getConsolidacaoData('consolidacao-1');

            expect($resultado)->toBeInstanceOf(PlanoTrabalhoConsolidacaoDataDTO::class);
            expect($resultado->atividades)->toHaveCount(1);
            expect($resultado->atividades[0]->id)->toBe('atividade-1');
        });

        test('filtra afastamentos por período quando não concluído', function () {
            DB::table('planos_trabalhos')->insert([
                'id' => 'plano-1',
                'usuario_id' => 'user-1',
                'programa_id' => 'programa-1',
                'unidade_id' => 'unidade-1',
                'tipo_modalidade_id' => 'tipo-modalidade-1',
                'criacao_usuario_id' => 'criador-1',
                'data_inicio' => '2024-01-01 00:00:00',
                'data_fim' => '2024-01-31 23:59:59',
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            DB::table('planos_trabalhos_consolidacoes')->insert([
                'id' => 'consolidacao-1',
                'plano_trabalho_id' => 'plano-1',
                'data_inicio' => '2024-01-01',
                'data_fim' => '2024-01-31',
                'status' => StatusEnum::INCLUIDO->value,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            DB::table('afastamentos')->insert([
                'id' => 'afastamento-1',
                'usuario_id' => 'user-1',
                'tipo_motivo_afastamento_id' => 'tipo-1',
                'data_inicio' => '2024-01-10',
                'data_fim' => '2024-01-15',
                'observacoes' => 'Afastamento no período',
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            $resultado = $this->repository->getConsolidacaoData('consolidacao-1');

            expect($resultado)->toBeInstanceOf(PlanoTrabalhoConsolidacaoDataDTO::class);
            expect($resultado->afastamentos)->toHaveCount(1);
            expect($resultado->afastamentos[0]->id)->toBe('afastamento-1');
        });

        test('filtra ocorrências por período quando não concluído', function () {
            DB::table('planos_trabalhos')->insert([
                'id' => 'plano-1',
                'usuario_id' => 'user-1',
                'programa_id' => 'programa-1',
                'unidade_id' => 'unidade-1',
                'tipo_modalidade_id' => 'tipo-modalidade-1',
                'criacao_usuario_id' => 'criador-1',
                'data_inicio' => '2024-01-01 00:00:00',
                'data_fim' => '2024-01-31 23:59:59',
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            DB::table('planos_trabalhos_consolidacoes')->insert([
                'id' => 'consolidacao-1',
                'plano_trabalho_id' => 'plano-1',
                'data_inicio' => '2024-01-01',
                'data_fim' => '2024-01-31',
                'status' => StatusEnum::INCLUIDO->value,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            DB::table('ocorrencias')->insert([
                'id' => 'ocorrencia-1',
                'usuario_id' => 'user-1',
                'plano_trabalho_id' => 'plano-1',
                'data_inicio' => '2024-01-10 08:00:00',
                'data_fim' => '2024-01-10 18:00:00',
                'descricao' => 'Ocorrência no período',
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            $resultado = $this->repository->getConsolidacaoData('consolidacao-1');

            expect($resultado)->toBeInstanceOf(PlanoTrabalhoConsolidacaoDataDTO::class);
            expect($resultado->ocorrencias)->toHaveCount(1);
            expect($resultado->ocorrencias[0]->id)->toBe('ocorrencia-1');
        });

        test('retorna null quando consolidação não existe', function () {
            $resultado = $this->repository->getConsolidacaoData('inexistente');

            expect($resultado)->toBeNull();
        });
    });

    describe('#getPendentesAvaliacao - busca consolidações concluídas pendentes de avaliação', function () {
        test('não inclui consolidação do gestor titular para chefe substituto', function () {
            DB::table('unidades_integrantes')->insert([
                'id' => 'ui-titular-1',
                'unidade_id' => 'unidade-1',
                'usuario_id' => 'user-titular',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
            DB::table('unidades_integrantes_atribuicoes')->insert([
                'id' => 'uia-titular-1',
                'atribuicao' => 'GESTOR',
                'unidade_integrante_id' => 'ui-titular-1',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
            DB::table('unidades_integrantes')->insert([
                'id' => 'ui-substituto-1',
                'unidade_id' => 'unidade-1',
                'usuario_id' => 'user-substituto',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
            DB::table('unidades_integrantes_atribuicoes')->insert([
                'id' => 'uia-substituto-1',
                'atribuicao' => 'GESTOR_SUBSTITUTO',
                'unidade_integrante_id' => 'ui-substituto-1',
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            DB::table('planos_trabalhos')->insert([
                [
                    'id' => 'plano-titular',
                    'numero' => 1001,
                    'usuario_id' => 'user-titular',
                    'programa_id' => 'programa-1',
                    'unidade_id' => 'unidade-1',
                    'tipo_modalidade_id' => 'tipo-modalidade-1',
                    'criacao_usuario_id' => 'criador-1',
                    'data_inicio' => '2024-01-01 00:00:00',
                    'data_fim' => '2024-01-31 23:59:59',
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'id' => 'plano-participante',
                    'numero' => 1002,
                    'usuario_id' => 'user-participante',
                    'programa_id' => 'programa-1',
                    'unidade_id' => 'unidade-1',
                    'tipo_modalidade_id' => 'tipo-modalidade-1',
                    'criacao_usuario_id' => 'criador-1',
                    'data_inicio' => '2024-01-01 00:00:00',
                    'data_fim' => '2024-01-31 23:59:59',
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
            ]);

            DB::table('planos_trabalhos_consolidacoes')->insert([
                [
                    'id' => 'consolidacao-titular',
                    'plano_trabalho_id' => 'plano-titular',
                    'data_inicio' => '2024-01-01',
                    'data_fim' => '2024-01-31',
                    'data_conclusao' => '2024-02-01 10:00:00',
                    'status' => StatusEnum::CONCLUIDO->value,
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'id' => 'consolidacao-participante',
                    'plano_trabalho_id' => 'plano-participante',
                    'data_inicio' => '2024-01-01',
                    'data_fim' => '2024-01-31',
                    'data_conclusao' => '2024-02-01 10:00:00',
                    'status' => StatusEnum::CONCLUIDO->value,
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
            ]);

            $createdAt = now()->subDays(10);
            DB::table('status_justificativas')->insert([
                [
                    'id' => 'status-titular-1',
                    'codigo' => StatusEnum::CONCLUIDO->value,
                    'justificativa' => 'ok',
                    'plano_trabalho_consolidacao_id' => 'consolidacao-titular',
                    'usuario_id' => 'user-titular',
                    'created_at' => $createdAt,
                    'updated_at' => $createdAt,
                ],
                [
                    'id' => 'status-participante-1',
                    'codigo' => StatusEnum::CONCLUIDO->value,
                    'justificativa' => 'ok',
                    'plano_trabalho_consolidacao_id' => 'consolidacao-participante',
                    'usuario_id' => 'user-participante',
                    'created_at' => $createdAt,
                    'updated_at' => $createdAt,
                ],
            ]);

            $resultado = $this->repository->getPendentesAvaliacao(
                ['unidade-1'],
                [],
                'user-substituto',
                now()->subDays(5),
            );

            expect($resultado)->toHaveCount(1);
            expect($resultado->first()->id)->toBe('consolidacao-participante');
            expect($resultado->first()->planoTrabalho?->usuario_id)->toBe('user-participante');
        });

        test('inclui consolidação do gestor titular quando usuário não é chefe substituto', function () {
            DB::table('unidades_integrantes')->insert([
                'id' => 'ui-titular-1',
                'unidade_id' => 'unidade-1',
                'usuario_id' => 'user-titular',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
            DB::table('unidades_integrantes_atribuicoes')->insert([
                'id' => 'uia-titular-1',
                'atribuicao' => 'GESTOR',
                'unidade_integrante_id' => 'ui-titular-1',
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            DB::table('planos_trabalhos')->insert([
                [
                    'id' => 'plano-titular',
                    'numero' => 2001,
                    'usuario_id' => 'user-titular',
                    'programa_id' => 'programa-1',
                    'unidade_id' => 'unidade-1',
                    'tipo_modalidade_id' => 'tipo-modalidade-1',
                    'criacao_usuario_id' => 'criador-1',
                    'data_inicio' => '2024-01-01 00:00:00',
                    'data_fim' => '2024-01-31 23:59:59',
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'id' => 'plano-participante',
                    'numero' => 2002,
                    'usuario_id' => 'user-participante',
                    'programa_id' => 'programa-1',
                    'unidade_id' => 'unidade-1',
                    'tipo_modalidade_id' => 'tipo-modalidade-1',
                    'criacao_usuario_id' => 'criador-1',
                    'data_inicio' => '2024-01-01 00:00:00',
                    'data_fim' => '2024-01-31 23:59:59',
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
            ]);

            DB::table('planos_trabalhos_consolidacoes')->insert([
                [
                    'id' => 'consolidacao-titular',
                    'plano_trabalho_id' => 'plano-titular',
                    'data_inicio' => '2024-01-01',
                    'data_fim' => '2024-01-31',
                    'data_conclusao' => '2024-02-01 10:00:00',
                    'status' => StatusEnum::CONCLUIDO->value,
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'id' => 'consolidacao-participante',
                    'plano_trabalho_id' => 'plano-participante',
                    'data_inicio' => '2024-01-01',
                    'data_fim' => '2024-01-31',
                    'data_conclusao' => '2024-02-01 10:00:00',
                    'status' => StatusEnum::CONCLUIDO->value,
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
            ]);

            $createdAt = now()->subDays(10);
            DB::table('status_justificativas')->insert([
                [
                    'id' => 'status-titular-1',
                    'codigo' => StatusEnum::CONCLUIDO->value,
                    'justificativa' => 'ok',
                    'plano_trabalho_consolidacao_id' => 'consolidacao-titular',
                    'usuario_id' => 'user-titular',
                    'created_at' => $createdAt,
                    'updated_at' => $createdAt,
                ],
                [
                    'id' => 'status-participante-1',
                    'codigo' => StatusEnum::CONCLUIDO->value,
                    'justificativa' => 'ok',
                    'plano_trabalho_consolidacao_id' => 'consolidacao-participante',
                    'usuario_id' => 'user-participante',
                    'created_at' => $createdAt,
                    'updated_at' => $createdAt,
                ],
            ]);

            $resultado = $this->repository->getPendentesAvaliacao(
                ['unidade-1'],
                [],
                'usuario-qualquer',
                now()->subDays(5),
            );

            expect($resultado)->toHaveCount(2);
            expect($resultado->pluck('id')->contains('consolidacao-titular'))->toBeTrue();
            expect($resultado->pluck('id')->contains('consolidacao-participante'))->toBeTrue();
        });

        test('inclui apenas gestor titular das unidades subordinadas imediatas', function () {
            DB::table('unidades_integrantes')->insert([
                'id' => 'ui-titular-sub-1',
                'unidade_id' => 'unidade-sub',
                'usuario_id' => 'user-titular-sub',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
            DB::table('unidades_integrantes_atribuicoes')->insert([
                'id' => 'uia-titular-sub-1',
                'atribuicao' => 'GESTOR',
                'unidade_integrante_id' => 'ui-titular-sub-1',
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            DB::table('planos_trabalhos')->insert([
                [
                    'id' => 'plano-titular-sub',
                    'numero' => 3001,
                    'usuario_id' => 'user-titular-sub',
                    'programa_id' => 'programa-1',
                    'unidade_id' => 'unidade-sub',
                    'tipo_modalidade_id' => 'tipo-modalidade-1',
                    'criacao_usuario_id' => 'criador-1',
                    'data_inicio' => '2024-01-01 00:00:00',
                    'data_fim' => '2024-01-31 23:59:59',
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'id' => 'plano-participante-sub',
                    'numero' => 3002,
                    'usuario_id' => 'user-participante-sub',
                    'programa_id' => 'programa-1',
                    'unidade_id' => 'unidade-sub',
                    'tipo_modalidade_id' => 'tipo-modalidade-1',
                    'criacao_usuario_id' => 'criador-1',
                    'data_inicio' => '2024-01-01 00:00:00',
                    'data_fim' => '2024-01-31 23:59:59',
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
            ]);

            DB::table('planos_trabalhos_consolidacoes')->insert([
                [
                    'id' => 'consolidacao-titular-sub',
                    'plano_trabalho_id' => 'plano-titular-sub',
                    'data_inicio' => '2024-01-01',
                    'data_fim' => '2024-01-31',
                    'data_conclusao' => '2024-02-01 10:00:00',
                    'status' => StatusEnum::CONCLUIDO->value,
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'id' => 'consolidacao-participante-sub',
                    'plano_trabalho_id' => 'plano-participante-sub',
                    'data_inicio' => '2024-01-01',
                    'data_fim' => '2024-01-31',
                    'data_conclusao' => '2024-02-01 10:00:00',
                    'status' => StatusEnum::CONCLUIDO->value,
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
            ]);

            $createdAt = now()->subDays(10);
            DB::table('status_justificativas')->insert([
                [
                    'id' => 'status-titular-sub-1',
                    'codigo' => StatusEnum::CONCLUIDO->value,
                    'justificativa' => 'ok',
                    'plano_trabalho_consolidacao_id' => 'consolidacao-titular-sub',
                    'usuario_id' => 'user-titular-sub',
                    'created_at' => $createdAt,
                    'updated_at' => $createdAt,
                ],
                [
                    'id' => 'status-participante-sub-1',
                    'codigo' => StatusEnum::CONCLUIDO->value,
                    'justificativa' => 'ok',
                    'plano_trabalho_consolidacao_id' => 'consolidacao-participante-sub',
                    'usuario_id' => 'user-participante-sub',
                    'created_at' => $createdAt,
                    'updated_at' => $createdAt,
                ],
            ]);

            $resultado = $this->repository->getPendentesAvaliacao(
                ['unidade-superior'],
                ['unidade-sub'],
                'user-chefe',
                now()->subDays(5),
            );

            expect($resultado)->toHaveCount(1);
            expect($resultado->first()->id)->toBe('consolidacao-titular-sub');
        });
    });
});
