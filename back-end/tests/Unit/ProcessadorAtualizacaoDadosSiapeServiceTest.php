<?php

use App\Services\IntegracaoService;
use App\Services\UsuarioService;
use App\Services\UnidadeIntegranteService;
use App\Services\ProcessadorAtualizacaoDadosSiapeService;
use App\Services\UtilService;
use App\Repository\IntegracaoServidorRepository;
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
describe('ProcessadorAtualizacaoDadosSiapeService - processar', function () {
    
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

        // Mock Repository
        $integracaoServidorRepositoryMock = Mockery::mock(IntegracaoServidorRepository::class);
        $integracaoServidorRepositoryMock->shouldReceive('buscarAtualizacoesDados')
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

        // Mock Log Facade para interceptar SiapeLog
        $loggerMock = Mockery::mock(\Psr\Log\LoggerInterface::class);
        $loggerMock->shouldReceive('info')->times(1);

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
        /** @var ProcessadorAtualizacaoDadosSiapeService|MockInterface $service */
        $service = Mockery::mock(ProcessadorAtualizacaoDadosSiapeService::class)
            ->makePartial()
            ->shouldAllowMockingProtectedMethods();


        // Acesso ao método privado via Reflection
        $reflection = new ReflectionClass(ProcessadorAtualizacaoDadosSiapeService::class);
        $method = $reflection->getMethod('processarDadosPessoais');
        $method->setAccessible(true);

        $property = $reflection->getProperty('result');
        $property->setAccessible(true);
        $property->setValue($service, [
            'unidades' => ['Resultado' => 'Não foi executado!', 'Observações' => [], 'Falhas' => []],
            'servidores' => ['Resultado' => 'Não foi executado!', 'Observações' => [], 'Falhas' => []],
            'gestores' => ['Resultado' => '', 'Observações' => [], 'Falhas' => []]
        ]);
        
        // Inject Repository Mock
        $repoProperty = $reflection->getProperty('integracaoServidorRepository');
        $repoProperty->setAccessible(true);
        $repoProperty->setValue($service, $integracaoServidorRepositoryMock);

        // Configuração de services dependentes
        $integracaoServiceMock = Mockery::mock(IntegracaoService::class);
        $usuarioServiceMock = Mockery::mock(UsuarioService::class);
        
        $usuarioServiceMock->shouldReceive('atualizarServidor')
            ->times(55);

        $property = $reflection->getParentClass()->getProperty('_services');
        $property->setAccessible(true);
        $property->setValue($service, ['integracaoService' => $integracaoServiceMock,
        'usuarioService' => $usuarioServiceMock]);

        // 2. Act
        $method->invoke($service);

        // 3. Assert
        // As validações são feitas pelos expectations do Mockery
    });

    it('não deve realizar operações se a lista de dados estiver vazia', function () {
        // Arrange
        $atualizacoesDados = [];
        $sqlUpdateDados = "UPDATE ...";
        
        // Mock Repository
        $integracaoServidorRepositoryMock = Mockery::mock(IntegracaoServidorRepository::class);
        $integracaoServidorRepositoryMock->shouldReceive('buscarAtualizacoesDados')
            ->andReturn($atualizacoesDados);

        DB::shouldReceive('transaction')->never();
        
        $service = Mockery::mock(ProcessadorAtualizacaoDadosSiapeService::class)->makePartial();

        $reflection = new ReflectionClass(ProcessadorAtualizacaoDadosSiapeService::class);
        $method = $reflection->getMethod('processarDadosPessoais');
        $method->setAccessible(true);
        
        // Inject Repository Mock
        $repoProperty = $reflection->getProperty('integracaoServidorRepository');
        $repoProperty->setAccessible(true);
        $repoProperty->setValue($service, $integracaoServidorRepositoryMock);
        
        // Inject result property
        $property = $reflection->getProperty('result');
        $property->setAccessible(true);
        $property->setValue($service, [
            'unidades' => ['Resultado' => 'Não foi executado!', 'Observações' => [], 'Falhas' => []],
            'servidores' => ['Resultado' => 'Não foi executado!', 'Observações' => [], 'Falhas' => []],
            'gestores' => ['Resultado' => '', 'Observações' => [], 'Falhas' => []]
        ]);

        // Mock Log Facade para evitar erro no log
        $loggerMock = Mockery::mock(\Psr\Log\LoggerInterface::class);
        $loggerMock->shouldReceive('info')->times(1);
        Log::shouldReceive('channel')->with('siape')->andReturn($loggerMock);

        // Act
        $method->invoke($service, $atualizacoesDados, $sqlUpdateDados);
    });

    it('deve lançar exceção se a transação do banco falhar', function () {
        // Arrange
        $atualizacoesDados = [(object) ['matriculasiape' => '123']]; // Um item
        $sqlUpdateDados = "UPDATE ...";

        // Mock Repository
        $integracaoServidorRepositoryMock = Mockery::mock(IntegracaoServidorRepository::class);
        $integracaoServidorRepositoryMock->shouldReceive('buscarAtualizacoesDados')
            ->andReturn($atualizacoesDados);

        // Simula erro no banco
        DB::shouldReceive('transaction')
            ->once()
            ->andThrow(new Exception("Deadlock detectado"));

        $service = Mockery::mock(ProcessadorAtualizacaoDadosSiapeService::class)->makePartial();

        $reflection = new ReflectionClass(ProcessadorAtualizacaoDadosSiapeService::class);
        $method = $reflection->getMethod('processarDadosPessoais');
        $method->setAccessible(true);
        
        // Inject Repository Mock
        $repoProperty = $reflection->getProperty('integracaoServidorRepository');
        $repoProperty->setAccessible(true);
        $repoProperty->setValue($service, $integracaoServidorRepositoryMock);
        
        // Inject result property
        $property = $reflection->getProperty('result');
        $property->setAccessible(true);
        $property->setValue($service, [
            'unidades' => ['Resultado' => 'Não foi executado!', 'Observações' => [], 'Falhas' => []],
            'servidores' => ['Resultado' => 'Não foi executado!', 'Observações' => [], 'Falhas' => []],
            'gestores' => ['Resultado' => '', 'Observações' => [], 'Falhas' => []]
        ]);

        // Act & Assert
        expect(fn() => $method->invoke($service, $atualizacoesDados, $sqlUpdateDados))
            ->toThrow(Exception::class, "Deadlock detectado");
    });
});

describe('ProcessadorAtualizacaoDadosSiapeService - processarLotacoes', function () {
    afterEach(function () {
        Mockery::close();
    });

    it('deve separar a transação de lotações do cadastro de usuários ausentes', function () {
        $integracaoServidorRepositoryMock = Mockery::mock(IntegracaoServidorRepository::class);
        $integracaoServidorRepositoryMock->shouldReceive('getAtualizacoesLotacoes')->andReturn([]);
        $integracaoServidorRepositoryMock->shouldReceive('getServidoresInseridosNaoLotados')->andReturn([
            (object) [
                'usuario_id' => 'usuario_id',
                'unidade_id' => 'unidade_id',
                'matricula' => 'M123',
                'cpf' => '52998224725',
            ]
        ]);
        $integracaoServidorRepositoryMock->shouldReceive('getUsuariosAusentes')->never();

        $loggerMock = Mockery::mock(\Psr\Log\LoggerInterface::class);
        $loggerMock->shouldReceive('info')->atLeast()->once();
        Log::shouldReceive('channel')->with('siape')->andReturn($loggerMock);

        $usuarioServiceMock = Mockery::mock(UsuarioService::class);
        $usuarioServiceMock->shouldReceive('atualizarMatriculasUsuariosSemMatricula')->once();

        $unidadeIntegranteMock = Mockery::mock(UnidadeIntegranteService::class);
        $unidadeIntegranteMock->shouldReceive('salvarIntegrantes')->once()->andReturn(['ok' => true]);

        DB::shouldReceive('transaction')
            ->once()
            ->with(Mockery::on(function ($callback) {
                $callback();
                return true;
            }), 3)
            ->ordered();

        DB::shouldReceive('transaction')
            ->once()
            ->with(Mockery::on(fn ($callback) => is_callable($callback)), 3)
            ->andThrow(new \Exception('Falha no cadastro de usuários ausentes'))
            ->ordered();

        $service = Mockery::mock(ProcessadorAtualizacaoDadosSiapeService::class)
            ->makePartial()
            ->shouldAllowMockingProtectedMethods();

        $reflection = new ReflectionClass(ProcessadorAtualizacaoDadosSiapeService::class);
        $method = $reflection->getMethod('processarLotacoes');
        $method->setAccessible(true);

        $property = $reflection->getProperty('result');
        $property->setAccessible(true);
        $property->setValue($service, [
            'unidades' => ['Resultado' => 'Não foi executado!', 'Observações' => [], 'Falhas' => []],
            'servidores' => ['Resultado' => 'Não foi executado!', 'Observações' => [], 'Falhas' => []],
            'gestores' => ['Resultado' => '', 'Observações' => [], 'Falhas' => []]
        ]);

        $repoProperty = $reflection->getProperty('integracaoServidorRepository');
        $repoProperty->setAccessible(true);
        $repoProperty->setValue($service, $integracaoServidorRepositoryMock);

        $parentProperty = $reflection->getParentClass()->getProperty('_services');
        $parentProperty->setAccessible(true);
        $parentProperty->setValue($service, [
            'usuarioService' => $usuarioServiceMock,
            'unidadeIntegrante' => $unidadeIntegranteMock,
        ]);

        expect(fn () => $method->invoke($service))
            ->toThrow(\Exception::class, 'Falha no cadastro de usuários ausentes');
    });
});
