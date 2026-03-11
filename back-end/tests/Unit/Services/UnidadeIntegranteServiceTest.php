<?php

use App\Services\Siape\Unidade\Integracao as UnidadeIntegracao;
use App\Services\UnidadeIntegranteService;
use App\Repository\UnidadeIntegranteAtribuicaoRepository;
use App\Repository\UnidadeIntegranteRepository;
use App\Repository\UnidadeRepository;
use App\Repository\UsuarioRepository;
use Tests\TestCase;

uses(TestCase::class);

describe('UnidadeIntegranteService - salvarIntegrantes', function () {
    afterEach(function () {
        Mockery::close();
        app()->forgetInstance(UnidadeIntegracao::class);
    });

    it('resolve Integracao via container com parâmetro vinculos', function () {
        $capturedParams = [];

        app()->instance(UnidadeIntegranteRepository::class, Mockery::mock(UnidadeIntegranteRepository::class));
        app()->instance(UnidadeIntegranteAtribuicaoRepository::class, Mockery::mock(UnidadeIntegranteAtribuicaoRepository::class));
        app()->instance(UsuarioRepository::class, Mockery::mock(UsuarioRepository::class));
        app()->instance(UnidadeRepository::class, Mockery::mock(UnidadeRepository::class));

        app()->bind(UnidadeIntegracao::class, function ($app, array $params) use (&$capturedParams) {
            $capturedParams = $params;

            $integracaoMock = Mockery::mock();
            $integracaoMock->shouldReceive('setTransaction')->once()->with(false);
            $integracaoMock->shouldReceive('processar')->once();
            $integracaoMock->shouldReceive('getAtribuicoesFinais')->once()->andReturn([]);

            return $integracaoMock;
        });

        $service = new UnidadeIntegranteService();
        $service->salvarIntegrantes([], false);

        expect($capturedParams)->toHaveKey('vinculos')
            ->and($capturedParams['vinculos'])->toBe([])
            ->and($capturedParams)->toHaveKeys([
                'unidadeIntegranteRepository',
                'unidadeIntegranteAtribuicaoRepository',
                'usuarioRepository',
                'unidadeRepository',
            ]);
    });
});
