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

    $tipoMotivoRepo = Mockery::mock(\App\Repository\TipoMotivoAfastamentoRepository::class);
    $tipoMotivoRepo->shouldReceive('findById')->andReturn(null);

    return new OcorrenciaImpactoPolicy($consolidacaoRepo, $dispensaPolicy, $tipoMotivoRepo);
}

describe('OcorrenciaImpactoPolicy::calcularImpacto', function () {

    test('retorna sem impacto quando não há consolidações afetadas', function () {
        $policy = makePolicy([]);
        $resultado = $policy->calcularImpacto(new OcorrenciaOperacaoDTO('user-1', '2026-05-01', '2026-05-31', null, 'criar'));

        expect($resultado->temImpacto())->toBeFalse();
    });

    test('retorna gera_dispensa quando criação dispensa consolidação', function () {
        $policy = makePolicy([buildRow()], isDispensadaAtual: false, seraDispensadaApos: true);

        $resultado = $policy->calcularImpacto(new OcorrenciaOperacaoDTO('user-1', '2026-04-15', '2026-06-15', null, 'criar'));

        expect($resultado->geraDispensa)->toBeTrue();
        expect($resultado->removeDispensa)->toBeFalse();
    });

    test('retorna sem impacto quando estado não muda', function () {
        $policy = makePolicy([buildRow()], isDispensadaAtual: false, seraDispensadaApos: false);

        $resultado = $policy->calcularImpacto(new OcorrenciaOperacaoDTO('user-1', '2026-05-10', '2026-05-20', null, 'criar'));

        expect($resultado->temImpacto())->toBeFalse();
    });

    test('detecta remoção de dispensa na exclusão', function () {
        $policy = makePolicy([buildRow()], isDispensadaAtual: true, seraDispensadaApos: false);

        $resultado = $policy->calcularImpacto(new OcorrenciaOperacaoDTO('user-1', '2026-04-15', '2026-06-15', 'oc-existente', 'excluir'));

        expect($resultado->removeDispensa)->toBeTrue();
        expect($resultado->geraDispensa)->toBeFalse();
    });
});
