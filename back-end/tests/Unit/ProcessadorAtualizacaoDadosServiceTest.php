<?php

use App\Services\IntegracaoService;
use App\Services\ProcessadorAtualizacaoDadosService;
use App\Services\UtilService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Mockery\MockInterface;
use Tests\TestCase;

uses(TestCase::class);

/*
 * Testes para o método processarDadosPessoais de IntegracaoService.
 * 
 * Propósito:
 * O método processarDadosPessoais é responsável por persistir atualizações de dados dos servidores
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
describe('ProcessadorAtualizacaoDadosService - processar', function () {
    
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
        DB::shouldReceive('select')
            ->andReturn($atualizacoesDados);

        $sqlUpdateDados = "UPDATE usuarios SET " .
            "nome = :nome, apelido = :nomeguerra, " .
            "email = :email, " .
            "ident_unica = :ident_unica, " .
            "cod_jornada = :cod_jornada, " .
            "nome_jornada = :nome_jornada, " .
            "data_nascimento = :data_nascimento, " .
            "tipo_modalidade_id = :tipo_modalidade_id, " .
            "participa_pgd = :participa_pgd, " .
            "data_modificacao = :data_modificacao WHERE id = :id";

        // Mock DB Transaction
        // Esperamos 2 chamadas (2 chunks)
        DB::shouldReceive('transaction')
            ->twice()
            ->with(Mockery::on(function ($callback) {
                $callback(); // Executa a closure passada para transaction
                return true;
            }), 3); // 3 retries

        // Mock DB Update
        // Esperamos 55 atualizações com os parâmetros corretos
        DB::shouldReceive('update')
            ->times(55)
            ->with($sqlUpdateDados, Mockery::on(function ($bindings) {
                // Validação estrita para garantir que não ocorra erro de parâmetro inválido
                return array_key_exists('tipo_modalidade_id', $bindings) 
                    && !array_key_exists('modalidade_pgd', $bindings);
            }));

        // Mock Log Facade para interceptar SiapeLog
        $loggerMock = Mockery::mock(\Psr\Log\LoggerInterface::class);
        $loggerMock->shouldReceive('info')->times(56);

        Log::shouldReceive('channel')
            ->with('siape')
            ->andReturn($loggerMock);
            

        // Mock UtilService
        $criar_mock_utils = false; # O mock mexe com a implementação do método, então influi na execução dos outros testes

        if($criar_mock_utils) {
            $utilServiceMock = Mockery::mock('alias:'.UtilService::class);
            $utilServiceMock->shouldReceive('asDateTime')
                ->times(55)
                ->andReturn(new DateTime('2023-10-01 00:00:00'));
        }

        // Partial Mock do IntegracaoService
        /** @var ProcessadorAtualizacaoDadosService|MockInterface $service */
        $service = Mockery::mock(ProcessadorAtualizacaoDadosService::class)
            ->makePartial()
            ->shouldAllowMockingProtectedMethods();


        // Acesso ao método privado via Reflection
        $reflection = new ReflectionClass(ProcessadorAtualizacaoDadosService::class);
        $method = $reflection->getMethod('processarDadosPessoais');
        $method->setAccessible(true);

        $property = $reflection->getProperty('result');
        $property->setAccessible(true);
        $property->setValue($service, [
            'unidades' => ['Resultado' => 'Não foi executado!', 'Observações' => [], 'Falhas' => []],
            'servidores' => ['Resultado' => 'Não foi executado!', 'Observações' => [], 'Falhas' => []],
            'gestores' => ['Resultado' => '', 'Observações' => [], 'Falhas' => []]
        ]);

        // Configuração de services dependentes
        $integracaoServiceMock = Mockery::mock(IntegracaoService::class);
        
        // Mockar métodos internos chamados dentro do loop
        $integracaoServiceMock->shouldReceive('verificaSeOEmailJaEstaVinculadoEAlteraParaEmailFake')
            ->times(55);
        
        $integracaoServiceMock->shouldReceive('validarModalidadePgd')
            ->times(55)
            ->andReturn(1);

        $property = $reflection->getParentClass()->getProperty('_services');
        $property->setAccessible(true);
        $property->setValue($service, ['integracaoService' => $integracaoServiceMock]);

        // 2. Act
        $method->invoke($service);

        // 3. Assert
        // As validações são feitas pelos expectations do Mockery
    });

    it('não deve realizar operações se a lista de dados estiver vazia', function () {
        // Arrange
        $atualizacoesDados = [];
        $sqlUpdateDados = "UPDATE ...";
        DB::shouldReceive('select')
            ->andReturn($atualizacoesDados);

        DB::shouldReceive('transaction')->never();
        
        $service = Mockery::mock(ProcessadorAtualizacaoDadosService::class)->makePartial();

        $reflection = new ReflectionClass(ProcessadorAtualizacaoDadosService::class);
        $method = $reflection->getMethod('processarDadosPessoais');
        $method->setAccessible(true);

        // Act
        $method->invoke($service, $atualizacoesDados, $sqlUpdateDados);
    });

    it('deve lançar exceção se a transação do banco falhar', function () {
        // Arrange
        $atualizacoesDados = [(object) ['matriculasiape' => '123']]; // Um item
        $sqlUpdateDados = "UPDATE ...";

        DB::shouldReceive('select')
            ->andReturn($atualizacoesDados);

        // Simula erro no banco
        DB::shouldReceive('transaction')
            ->once()
            ->andThrow(new Exception("Deadlock detectado"));

        $service = Mockery::mock(ProcessadorAtualizacaoDadosService::class)->makePartial();

        $reflection = new ReflectionClass(ProcessadorAtualizacaoDadosService::class);
        $method = $reflection->getMethod('processarDadosPessoais');
        $method->setAccessible(true);

        // Act & Assert
        expect(fn() => $method->invoke($service, $atualizacoesDados, $sqlUpdateDados))
            ->toThrow(Exception::class, "Deadlock detectado");
    });
});
