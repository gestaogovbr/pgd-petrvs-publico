<?php

use App\Services\IntegracaoGestorService;
use App\Services\Siape\Gestor\Integracao as GestorIntegracao;
use App\Models\Usuario;
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
        $loggerMock->shouldReceive('info')->times(4); // Iniciando, Montagem, Mensagens, Concluida
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

        // Mock Protected Methods
        $service->shouldReceive('montarArrayChefias')
            ->once()
            ->andReturn($chefiasMock);

        $service->shouldReceive('createGestorIntegracao')
            ->once()
            ->with($chefiasMock, Mockery::type(Usuario::class), Mockery::any(), Mockery::any(), Mockery::any(), $config)
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
        $loggerMock->shouldReceive('error')->once(); // Expected error log in catch block

        // Log facade mock setup
        Log::shouldReceive('channel')->with('siape')->andReturn($loggerMock);
        // Allow other log calls (e.g. from report($e))
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
        
        $service = new IntegracaoGestorService();

        // Act
        $result = $service->atualizarGestores($inputs, $config);

        // Assert
        expect($result['Resultado'])->toContain('Os gestores não foram atualizados, conforme solicitado!');
    });
});
