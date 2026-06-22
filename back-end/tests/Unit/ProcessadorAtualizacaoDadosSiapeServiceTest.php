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
            "modalidade_pgd = :modalidade_pgd, " .
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

describe('ProcessadorAtualizacaoDadosSiapeService - cadastrarUsuariosAusentes com matriculas diferentes no batch', function () {
    afterEach(function () {
        Mockery::close();
    });

    it('deve criar novo usuario quando mesmo cpf+unidade aparece com segunda matricula no batch', function () {
        // Arrange: 2 registros com mesmo CPF, mesma unidade, matriculas diferentes
        $dadosBase = [
            'cpf' => '12345678901',
            'exercicio' => 'COD001',
            'nome' => 'Servidor A',
            'apelido' => 'A',
            'telefone' => null,
            'data_nascimento' => null,
            'sexo' => 'M',
            'situacao_funcional' => 'ATIVO',
            'modalidade_pgd' => 1,
            'uf' => 'DF',
            'data_modificacao' => '2024-01-01',
            'ident_unica' => 'UID1',
            'emailfuncional' => 'a@gov.br',
        ];

        $vinculos = [
            (object) array_merge($dadosBase, ['matricula' => '1111111']),
            (object) array_merge($dadosBase, ['matricula' => '2222222']),
        ];

        $integracaoServidorRepositoryMock = Mockery::mock(IntegracaoServidorRepository::class);
        $integracaoServidorRepositoryMock->shouldReceive('getUsuariosAusentes')
            ->once()
            ->andReturn($vinculos);

        $unidadeObj = Mockery::mock(\App\Models\Unidade::class)->makePartial();
        $unidadeObj->id = 'unidade-uuid-1';
        $unidadeRepositoryMock = Mockery::mock(\App\Repository\UnidadeRepository::class);
        $unidadeRepositoryMock->shouldReceive('findByCodigo')
            ->with('COD001')
            ->andReturn($unidadeObj);

        $usuarioServiceMock = Mockery::mock(UsuarioService::class);

        // Primeira chamada: retorna false (atualizou matricula)
        $usuarioServiceMock->shouldReceive('verificaSeUsuarioSoMudouMatricula')
            ->once()
            ->with('12345678901', 'unidade-uuid-1', '1111111', 'COD001', Mockery::on(function (&$batch) {
                // Simula o comportamento real: registra no batch
                $batch['12345678901|unidade-uuid-1'] = true;
                return true;
            }))
            ->andReturn(false);

        // Segunda chamada: batch já tem a chave, retorna true (criar novo)
        $usuarioServiceMock->shouldReceive('verificaSeUsuarioSoMudouMatricula')
            ->once()
            ->with('12345678901', 'unidade-uuid-1', '2222222', 'COD001', Mockery::on(function ($batch) {
                return isset($batch['12345678901|unidade-uuid-1']);
            }))
            ->andReturn(true);

        // Segundo registro gera usuario novo
        $usuarioMock = Mockery::mock(\App\Models\Usuario::class)->makePartial();
        $usuarioMock->id = 'novo-user-id';
        $usuarioMock->email = 'a@gov.br';
        $usuarioMock->matricula = '2222222';
        $usuarioMock->shouldReceive('toArray')->andReturn(['id' => 'novo-user-id']);
        $usuarioMock->shouldReceive('getAttributes')->andReturn(['id' => 'novo-user-id', 'matricula' => '2222222']);
        $usuarioMock->shouldReceive('getUnidadesAtribuicoesAttribute')->andReturn([]);

        $usuarioServiceMock->shouldReceive('gerarUsuario')
            ->once()
            ->andReturn($usuarioMock);

        $integracaoServiceMock = Mockery::mock(IntegracaoService::class);
        $integracaoServiceMock->shouldReceive('validarModalidadePgd')->andReturn(1);
        $integracaoServiceMock->shouldReceive('liberarEmailDuplicadoDefinindoComoNulo')->once();

        $usuarioRepositoryMock = Mockery::mock(\App\Repository\UsuarioRepository::class);
        $usuarioCriado = Mockery::mock(\App\Models\Usuario::class)->makePartial();
        $usuarioCriado->id = 'novo-user-id';
        $usuarioRepositoryMock->shouldReceive('create')
            ->once()
            ->andReturn($usuarioCriado);

        $unidadeIntegranteMock = Mockery::mock(UnidadeIntegranteService::class);
        $unidadeIntegranteMock->shouldReceive('salvarIntegrantes')->once();

        $nivelAcessoMock = Mockery::mock('alias:' . \App\Services\NivelAcessoService::class);
        $perfilMock = (object) ['id' => 'perfil-participante-id'];
        $nivelAcessoMock->shouldReceive('getPerfilParticipante')->andReturn($perfilMock);

        $loggerMock = Mockery::mock(\Psr\Log\LoggerInterface::class);
        $loggerMock->shouldReceive('info', 'warning', 'error')->zeroOrMoreTimes();
        Log::shouldReceive('channel')->with('siape')->andReturn($loggerMock);

        // Build service via reflection
        $service = Mockery::mock(ProcessadorAtualizacaoDadosSiapeService::class)
            ->makePartial()
            ->shouldAllowMockingProtectedMethods();

        $reflection = new ReflectionClass(ProcessadorAtualizacaoDadosSiapeService::class);

        $repoProperty = $reflection->getProperty('integracaoServidorRepository');
        $repoProperty->setAccessible(true);
        $repoProperty->setValue($service, $integracaoServidorRepositoryMock);

        $unidadeRepoProperty = $reflection->getProperty('unidadeRepository');
        $unidadeRepoProperty->setAccessible(true);
        $unidadeRepoProperty->setValue($service, $unidadeRepositoryMock);

        $usuarioRepoProperty = $reflection->getProperty('usuarioRepository');
        $usuarioRepoProperty->setAccessible(true);
        $usuarioRepoProperty->setValue($service, $usuarioRepositoryMock);

        $resultProperty = $reflection->getProperty('result');
        $resultProperty->setAccessible(true);
        $resultProperty->setValue($service, [
            'unidades' => ['Resultado' => '', 'Observações' => [], 'Falhas' => []],
            'servidores' => ['Resultado' => '', 'Observações' => [], 'Falhas' => []],
            'gestores' => ['Resultado' => '', 'Observações' => [], 'Falhas' => []],
        ]);

        $usuarioComumProperty = $reflection->getProperty('usuarioComum');
        $usuarioComumProperty->setAccessible(true);
        $usuarioComumProperty->setValue($service, 'Participante');

        $parentProperty = $reflection->getParentClass()->getProperty('_services');
        $parentProperty->setAccessible(true);
        $parentProperty->setValue($service, [
            'usuarioService' => $usuarioServiceMock,
            'unidadeIntegrante' => $unidadeIntegranteMock,
            'integracaoService' => $integracaoServiceMock,
            'nivelAcessoService' => $nivelAcessoMock,
        ]);

        // Act
        $method = $reflection->getMethod('cadastrarUsuariosAusentes');
        $method->setAccessible(true);
        $method->invoke($service);

        // Assert: Mockery expectations validam que:
        // - verificaSeUsuarioSoMudouMatricula foi chamado 2x
        // - gerarUsuario foi chamado 1x (apenas para o segundo registro)
        // - create foi chamado 1x (novo usuario criado)
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
        $unidadeIntegranteMock->shouldReceive('salvarIntegrantes')
            ->once()
            ->with(Mockery::on(function (array $vinculo) {
                return ($vinculo[0]['usuario_id'] ?? null) === 'usuario_id'
                    && ($vinculo[0]['unidade_id'] ?? null) === 'unidade_id'
                    && ($vinculo[0]['atribuicoes'] ?? null) === ['LOTADO'];
            }), false, true)
            ->andReturn(['ok' => true]);

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
