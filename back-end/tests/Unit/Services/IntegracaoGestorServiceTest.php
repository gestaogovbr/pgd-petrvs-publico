<?php

use App\Services\IntegracaoGestorService;
use App\Services\Siape\Gestor\Integracao as GestorIntegracao;
use App\Services\NivelAcessoService;
use App\Services\PerfilService;
use App\Services\UnidadeIntegranteService;
use App\Repository\IntegracaoUnidadeRepository;
use App\Repository\IntegracaoServidorRepository;
use App\Repository\UsuarioRepository;
use App\Repository\UnidadeRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Mockery\MockInterface;
use Tests\TestCase;

uses(TestCase::class);

describe('IntegracaoGestorService', function () {

    afterEach(function () {
        Mockery::close();
    });

    it('deve atualizar gestores com sucesso', function () {
        // Arrange
        $inputs = ['gestores' => true];
        $config = ['some' => 'config'];
        $chefiasMock = [['id_unidade' => 1, 'id_chefe' => 1]];
        $messagesRetorno = [
            'sucesso' => ['ok'],
            'erro' => [],
            'vazio' => []
        ];

        // Mock DB Transaction
        DB::shouldReceive('beginTransaction')->once();
        DB::shouldReceive('commit')->once();
        DB::shouldReceive('rollback')->never();

        // Mock Logging
        $loggerMock = Mockery::mock(\Psr\Log\LoggerInterface::class);
        $loggerMock->shouldReceive('info')->times(4);
        Log::shouldReceive('channel')->with('siape')->andReturn($loggerMock);

        // Mock GestorIntegracao
        $gestorIntegracaoMock = Mockery::mock(GestorIntegracao::class);
        $gestorIntegracaoMock->shouldReceive('processar')->once();
        $gestorIntegracaoMock->shouldReceive('getMessage')->once()->andReturn($messagesRetorno);

        // Service Partial Mock
        /** @var IntegracaoGestorService|MockInterface $service */
        $service = Mockery::mock(IntegracaoGestorService::class)
            ->makePartial()
            ->shouldAllowMockingProtectedMethods();

        $service->shouldReceive('montarArrayChefias')
            ->once()
            ->andReturn($chefiasMock);

        $service->shouldReceive('createGestorIntegracao')
            ->once()
            ->with($chefiasMock, Mockery::any(), Mockery::any(), Mockery::any(), $config)
            ->andReturn($gestorIntegracaoMock);

        // Act
        $result = $service->atualizarGestores($inputs, $config);

        // Assert
        expect($result['Resultado'])->toBe('Sucesso')
            ->and($result['Observações'])->toBeArray()
            ->and($result['Observações'][0])->toContain('1 chefias foram atualizadas com sucesso!');
    });

    it('deve tratar erro e fazer rollback', function () {
        // Arrange
        $inputs = ['gestores' => true];
        $config = [];
        
        // Mock DB Transaction
        DB::shouldReceive('beginTransaction')->once();
        DB::shouldReceive('commit')->never();
        DB::shouldReceive('rollback')->once();

        // Mock Logging
        $loggerMock = Mockery::mock(\Psr\Log\LoggerInterface::class);
        $loggerMock->shouldReceive('info')->atLeast()->once();
        $loggerMock->shouldReceive('error')->once();

        Log::shouldReceive('channel')->with('siape')->andReturn($loggerMock);
        Log::shouldReceive('error')->withAnyArgs();
        Log::shouldReceive('debug')->withAnyArgs();
        Log::shouldReceive('info')->withAnyArgs();
        Log::shouldReceive('warning')->withAnyArgs();

        // Service Partial Mock
        /** @var IntegracaoGestorService|MockInterface $service */
        $service = Mockery::mock(IntegracaoGestorService::class)
            ->makePartial()
            ->shouldAllowMockingProtectedMethods();

        $service->shouldReceive('montarArrayChefias')
            ->once()
            ->andThrow(new Exception('Database error'));

        // Act
        $result = $service->atualizarGestores($inputs, $config);

        // Assert
        expect($result['Resultado'])->toContain('ERRO: Database error');
    });

    it('não deve atualizar se input gestores for false', function () {
        // Arrange
        $inputs = ['gestores' => false];
        $config = [];
        
        $service = new IntegracaoGestorService(
            Mockery::mock(IntegracaoUnidadeRepository::class),
            Mockery::mock(IntegracaoServidorRepository::class),
            Mockery::mock(UsuarioRepository::class),
        );

        // Act
        $result = $service->atualizarGestores($inputs, $config);

        // Assert
        expect($result['Resultado'])->toContain('Os gestores não foram atualizados, conforme solicitado!');
    });

    it('deve criar GestorIntegracao com UnidadeRepository via container', function () {
        $service = new IntegracaoGestorService(
            Mockery::mock(IntegracaoUnidadeRepository::class),
            Mockery::mock(IntegracaoServidorRepository::class),
            Mockery::mock(UsuarioRepository::class),
        );

        $integracao = $service->createGestorIntegracao(
            [],
            Mockery::mock(UnidadeIntegranteService::class),
            Mockery::mock(NivelAcessoService::class),
            Mockery::mock(PerfilService::class),
            []
        );

        expect($integracao)->toBeInstanceOf(GestorIntegracao::class);

        $reflection = new ReflectionClass($integracao);
        $property = $reflection->getProperty('unidadeRepository');
        $property->setAccessible(true);
        expect($property->getValue($integracao))->toBeInstanceOf(UnidadeRepository::class);
    });
});
