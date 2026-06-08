<?php

namespace Tests\Unit\Services;

use App\Services\IntegracaoSiapeService;
use Mockery;
use ReflectionMethod;
use Tests\TestCase;

uses(TestCase::class);

afterEach(function () {
    Mockery::close();
});

describe('IntegracaoSiapeService - processarContratoTemporario (private)', function () {

    it('retorna true quando situacao funcional nao eh contrato temporario', function () {
        $service = Mockery::mock(IntegracaoSiapeService::class)->makePartial();
        $service->shouldAllowMockingProtectedMethods();
        $service->shouldNotReceive('getUnidadeRepository');
        $method = new ReflectionMethod(IntegracaoSiapeService::class, 'processarContratoTemporario');
        $method->setAccessible(true);

        $dados = ['codSitFuncional' => IntegracaoSiapeService::SITUACAO_FUNCIONAL_ATIVO_EM_OUTRO_ORGAO];
        $resultado = $method->invokeArgs($service, [&$dados]);

        expect($resultado)->toBeTrue();
        expect($dados)->not->toHaveKey('codUorgExercicio');
    });

    it('retorna false quando for contrato temporario e sigla vazia', function () {
        $service = Mockery::mock(IntegracaoSiapeService::class)->makePartial();
        $service->shouldAllowMockingProtectedMethods();
        $service->shouldNotReceive('getUnidadeRepository');
        $method = new ReflectionMethod(IntegracaoSiapeService::class, 'processarContratoTemporario');
        $method->setAccessible(true);

        $dados = [
            'codSitFuncional' => IntegracaoSiapeService::SITUACOES_FUNCIONAIS_CONTRATO_TEMPORARIO[3],
            'siglaUorgLotacao' => '   '
        ];

        $resultado = $method->invokeArgs($service, [&$dados]);
        expect($resultado)->toBeFalse();
    });

    it('retorna true quando for contrato temporario, sigla vazia e codUorgExercicio preenchido', function () {
        $service = Mockery::mock(IntegracaoSiapeService::class)->makePartial();
        $service->shouldAllowMockingProtectedMethods();
        $service->shouldNotReceive('getUnidadeRepository');
        $method = new ReflectionMethod(IntegracaoSiapeService::class, 'processarContratoTemporario');
        $method->setAccessible(true);

        $dados = [
            'codSitFuncional' => IntegracaoSiapeService::SITUACOES_FUNCIONAIS_CONTRATO_TEMPORARIO[3],
            'siglaUorgLotacao' => '   ',
            'codUorgExercicio' => '123',
        ];

        $resultado = $method->invokeArgs($service, [&$dados]);
        expect($resultado)->toBeTrue();
        expect($dados['codUorgExercicio'])->toBe('123');
    });

    it('retorna false quando unidade pela sigla nao for encontrada', function () {
        $repo = Mockery::mock('App\Repository\UnidadeRepository');
        $repo->shouldReceive('findBySigla')->with('ABC')->andReturn(null);

        $service = Mockery::mock(IntegracaoSiapeService::class)->makePartial();
        $service->shouldAllowMockingProtectedMethods();
        $service->shouldReceive('getUnidadeRepository')->andReturn($repo);
        $method = new ReflectionMethod(IntegracaoSiapeService::class, 'processarContratoTemporario');
        $method->setAccessible(true);

        $dados = [
            'codSitFuncional' => IntegracaoSiapeService::SITUACOES_FUNCIONAIS_CONTRATO_TEMPORARIO[3],
            'siglaUorgLotacao' => 'ABC'
        ];

        $resultado = $method->invokeArgs($service, [&$dados]);
        expect($resultado)->toBeFalse();
    });

    it('define codUorgExercicio e retorna true quando unidade encontrada pela sigla', function () {
        $repo = Mockery::mock('App\Repository\UnidadeRepository');
        $unidade = new \App\Models\Unidade();
        $unidade->codigo = '999';
        $repo->shouldReceive('findBySigla')->with('DEF')->andReturn($unidade);

        $service = Mockery::mock(IntegracaoSiapeService::class)->makePartial();
        $service->shouldAllowMockingProtectedMethods();
        $service->shouldReceive('getUnidadeRepository')->andReturn($repo);
        $method = new ReflectionMethod(IntegracaoSiapeService::class, 'processarContratoTemporario');
        $method->setAccessible(true);

        $dados = [
            'codSitFuncional' => IntegracaoSiapeService::SITUACOES_FUNCIONAIS_CONTRATO_TEMPORARIO[3],
            'siglaUorgLotacao' => 'DEF'
        ];

        $resultado = $method->invokeArgs($service, [&$dados]);
        expect($resultado)->toBeTrue();
        expect($dados['codUorgExercicio'])->toBe('999');
    });
});
