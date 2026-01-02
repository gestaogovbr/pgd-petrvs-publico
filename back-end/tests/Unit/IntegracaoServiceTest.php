<?php

use App\Services\IntegracaoService;
use App\Services\UtilService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Mockery\MockInterface;
use Tests\TestCase;

uses(TestCase::class);

/*
 * Testes para o método processarAtualizacoesDados de IntegracaoService.
 * 
 * Propósito:
 * O método processarAtualizacoesDados é responsável por persistir atualizações de dados dos servidores
 * em lotes (chunks) dentro de transações de banco de dados, minimizando deadlocks e tempo de bloqueio.
 * 
 * Requisitos:
 * - Entrada: Array de objetos com dados dos servidores e string SQL de atualização.
 * - Saída: Void. Efetua atualizações no banco.
 * - Deve processar em lotes de 50 itens.
 * - Deve validar email e modalidade PGD antes de atualizar.
 * - Deve converter data de modificação usando UtilService.
 * - Deve registrar logs.
 */

describe('IntegracaoService - processarAtualizacoesDados', function () {
    
    afterEach(function () {
        Mockery::close();
    });

    it('deve processar atualizações em lotes e chamar dependências corretamente', function () {
        // 1. Arrange
        // Criar 55 itens para garantir que haja 2 chunks (50 + 5)
        $atualizacoesDados = [];
        for ($i = 0; $i < 55; $i++) {
            $atualizacoesDados[] = (object) [
                'matriculasiape' => "MAT{$i}",
                'emailfuncional' => "email{$i}@gov.br",
                'id' => "ID{$i}",
                'modalidade_pgd' => 1,
                'nome_servidor' => "Servidor {$i}",
                'nome_guerra' => "Guerra {$i}",
                'cod_jornada' => "COD{$i}",
                'nome_jornada' => "Jornada {$i}",
                'participa_pgd' => true,
                'ident_unica' => "UID{$i}",
                'data_modificacao' => '2023-10-01',
                'data_nascimento' => '1990-01-01',
            ];
        }

        $sqlUpdateDados = "UPDATE usuarios SET ...";

        // Mock DB Transaction
        // Esperamos 2 chamadas (2 chunks)
        DB::shouldReceive('transaction')
            ->twice()
            ->with(Mockery::on(function ($callback) {
                $callback(); // Executa a closure passada para transaction
                return true;
            }), 3); // 3 retries

        // Mock DB Update
        // Esperamos 55 atualizações
        DB::shouldReceive('update')
            ->times(55)
            ->with($sqlUpdateDados, Mockery::type('array'));

        // Mock Log Facade para interceptar SiapeLog
        $loggerMock = Mockery::mock(\Psr\Log\LoggerInterface::class);
        $loggerMock->shouldReceive('info')->times(55);

        Log::shouldReceive('channel')
            ->with('siape')
            ->andReturn($loggerMock);

        // Mock UtilService
        // $utilServiceMock = Mockery::mock('overload:App\Services\UtilService' . UtilService::class);
        // $utilServiceMock->shouldReceive('asDateTime')
        //     ->times(55)
        //     ->andReturn(new DateTime('2023-10-01 00:00:00'));

        // Partial Mock do IntegracaoService
        /** @var IntegracaoService|MockInterface $service */
        $service = Mockery::mock(IntegracaoService::class)
            ->makePartial()
            ->shouldAllowMockingProtectedMethods();
        
        // Injetar mock do UtilService
        /** @var UtilService $utilServiceMock */
        // $service->UtilService = $utilServiceMock;

        // Mockar métodos internos chamados dentro do loop
        $service->shouldReceive('verificaSeOEmailJaEstaVinculadoEAlteraParaEmailFake')
            ->times(55);
        
        $service->shouldReceive('validarModalidadePgd')
            ->times(55)
            ->andReturn(1);

        // Acesso ao método privado via Reflection
        $reflection = new ReflectionClass(IntegracaoService::class);
        $method = $reflection->getMethod('processarAtualizacoesDados');
        $method->setAccessible(true);

        // 2. Act
        $method->invoke($service, $atualizacoesDados, $sqlUpdateDados);

        // 3. Assert
        // As validações são feitas pelos expectations do Mockery
    });

    it('não deve realizar operações se a lista de dados estiver vazia', function () {
        // Arrange
        $atualizacoesDados = [];
        $sqlUpdateDados = "UPDATE ...";

        DB::shouldReceive('transaction')->never();
        
        $service = Mockery::mock(IntegracaoService::class)->makePartial();

        $reflection = new ReflectionClass(IntegracaoService::class);
        $method = $reflection->getMethod('processarAtualizacoesDados');
        $method->setAccessible(true);

        // Act
        $method->invoke($service, $atualizacoesDados, $sqlUpdateDados);
    });

    it('deve lançar exceção se a transação do banco falhar', function () {
        // Arrange
        $atualizacoesDados = [(object) ['matriculasiape' => '123']]; // Um item
        $sqlUpdateDados = "UPDATE ...";

        // Simula erro no banco
        DB::shouldReceive('transaction')
            ->once()
            ->andThrow(new Exception("Deadlock detectado"));

        $service = Mockery::mock(IntegracaoService::class)->makePartial();

        $reflection = new ReflectionClass(IntegracaoService::class);
        $method = $reflection->getMethod('processarAtualizacoesDados');
        $method->setAccessible(true);

        // Act & Assert
        expect(fn() => $method->invoke($service, $atualizacoesDados, $sqlUpdateDados))
            ->toThrow(Exception::class, "Deadlock detectado");
    });
});
