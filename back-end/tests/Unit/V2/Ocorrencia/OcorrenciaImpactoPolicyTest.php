<?php

use App\Repository\PlanoTrabalhoConsolidacaoRepository;
use App\V2\Ocorrencia\DTOs\OcorrenciaOperacaoDTO;
use App\V2\PlanoTrabalho\Consolidacao\DispensaAvaliacaoPolicy;
use App\V2\Ocorrencia\OcorrenciaImpactoPolicy;
use Tests\TestCase;

uses(TestCase::class);

afterEach(function () {
    Mockery::close();
});

function buildRow(array $overrides = []): object
{
    return (object) array_merge([
        'cons_id' => 'cons-1',
        'cons_data_inicio' => '2026-05-01',
        'cons_data_fim' => '2026-05-31',
        'plano_trabalho_id' => 'pt-1',
        'pt_status' => 'ATIVO',
        'pt_data_inicio' => '2026-05-01',
        'pt_data_fim' => '2026-07-31',
        'has_atividade' => false,
        'has_recurso' => false,
        'is_prazo_avaliacao_terminado' => false,
    ], $overrides);
}

function makePolicy(array $rows, bool $isDispensadaAtual = false, bool $seraDispensadaApos = true): OcorrenciaImpactoPolicy
{
    $consolidacaoRepo = Mockery::mock(PlanoTrabalhoConsolidacaoRepository::class);
    $consolidacaoRepo->shouldReceive('findConsolidacoesParaImpactoDispensa')->andReturn(collect($rows));

    $dispensaPolicy = Mockery::mock(DispensaAvaliacaoPolicy::class);
    $dispensaPolicy->shouldReceive('isConsolidacaoDispensada')->andReturn($isDispensadaAtual);
    $dispensaPolicy->shouldReceive('isConsolidacaoDispensadaApos')->andReturn($seraDispensadaApos);

    return new OcorrenciaImpactoPolicy($consolidacaoRepo, $dispensaPolicy);
}

describe('OcorrenciaImpactoPolicy::calcularImpacto', function () {

    test('retorna sem impacto quando não há consolidações afetadas', function () {
        $policy = makePolicy([]);
        $resultado = $policy->calcularImpacto(new OcorrenciaOperacaoDTO('user-1', '2026-05-01', '2026-05-31', null, 'criar'));

        expect($resultado->temImpacto())->toBeFalse();
        expect($resultado->operacaoBloqueada)->toBeFalse();
    });

    test('retorna com impacto quando gera dispensa em PT ativo', function () {
        $policy = makePolicy([buildRow()], isDispensadaAtual: false, seraDispensadaApos: true);

        $resultado = $policy->calcularImpacto(new OcorrenciaOperacaoDTO('user-1', '2026-04-15', '2026-06-15', null, 'criar'));

        expect($resultado->temImpacto())->toBeTrue();
        expect($resultado->operacaoBloqueada)->toBeFalse();
    });

    test('retorna sem impacto quando estado não muda', function () {
        $policy = makePolicy([buildRow()], isDispensadaAtual: false, seraDispensadaApos: false);

        $resultado = $policy->calcularImpacto(new OcorrenciaOperacaoDTO('user-1', '2026-05-10', '2026-05-20', null, 'criar'));

        expect($resultado->temImpacto())->toBeFalse();
    });

    test('bloqueia quando PT é CONCLUIDO e há recurso', function () {
        $policy = makePolicy(
            [buildRow(['pt_status' => 'CONCLUIDO', 'has_recurso' => true])],
            isDispensadaAtual: false,
            seraDispensadaApos: true,
        );

        $resultado = $policy->calcularImpacto(new OcorrenciaOperacaoDTO('user-1', '2026-04-15', '2026-06-15', null, 'criar'));

        expect($resultado->operacaoBloqueada)->toBeTrue();
    });

    test('bloqueia quando PT é CONCLUIDO e prazo de avaliação expirou', function () {
        $policy = makePolicy(
            [buildRow(['pt_status' => 'CONCLUIDO', 'is_prazo_avaliacao_terminado' => true])],
            isDispensadaAtual: false,
            seraDispensadaApos: true,
        );

        $resultado = $policy->calcularImpacto(new OcorrenciaOperacaoDTO('user-1', '2026-04-15', '2026-06-15', null, 'criar'));

        expect($resultado->operacaoBloqueada)->toBeTrue();
    });

    test('permite quando PT é CONCLUIDO sem recurso e dentro do prazo', function () {
        $policy = makePolicy(
            [buildRow(['pt_status' => 'CONCLUIDO'])],
            isDispensadaAtual: false,
            seraDispensadaApos: true,
        );

        $resultado = $policy->calcularImpacto(new OcorrenciaOperacaoDTO('user-1', '2026-04-15', '2026-06-15', null, 'criar'));

        expect($resultado->temImpacto())->toBeTrue();
        expect($resultado->operacaoBloqueada)->toBeFalse();
    });

    test('detecta remoção de dispensa na edição', function () {
        $policy = makePolicy([buildRow()], isDispensadaAtual: true, seraDispensadaApos: false);

        $resultado = $policy->calcularImpacto(new OcorrenciaOperacaoDTO('user-1', '2026-05-10', '2026-05-20', 'oc-existente', 'editar'));

        expect($resultado->temImpacto())->toBeTrue();
        expect($resultado->operacaoBloqueada)->toBeFalse();
    });

    test('detecta remoção de dispensa na exclusão', function () {
        $policy = makePolicy([buildRow()], isDispensadaAtual: true, seraDispensadaApos: false);

        $resultado = $policy->calcularImpacto(new OcorrenciaOperacaoDTO('user-1', '2026-04-15', '2026-06-15', 'oc-existente', 'excluir'));

        expect($resultado->temImpacto())->toBeTrue();
        expect($resultado->operacaoBloqueada)->toBeFalse();
    });

    test('prioriza bloqueio sobre impacto quando múltiplas consolidações', function () {
        $policy = makePolicy(
            [
                buildRow(['pt_status' => 'CONCLUIDO', 'has_recurso' => true, 'cons_id' => 'cons-1']),
                buildRow(['pt_status' => 'ATIVO', 'cons_id' => 'cons-2']),
            ],
            isDispensadaAtual: false,
            seraDispensadaApos: true,
        );

        $resultado = $policy->calcularImpacto(new OcorrenciaOperacaoDTO('user-1', '2026-04-15', '2026-06-15', null, 'criar'));

        expect($resultado->operacaoBloqueada)->toBeTrue();
    });
});
