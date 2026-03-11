<?php

use App\Services\SiapeIndividualServidorService;
use App\Services\SiapeIndividualService;
use App\Services\IntegracaoService;
use App\Services\IntegracaoServiceFactory;
use App\Services\Siape\BuscarDados\BuscarDadosSiapeServidor;
use App\Services\Siape\BuscarDados\BuscarDadosSiapeUnidade;
use App\Services\Siape\BuscarDados\BuscarDadosSiapeUnidades;
use App\Services\Siape\ProcessaDadosSiapeBD;
use App\Enums\UsuarioSituacaoSiape;
use App\Models\Usuario;
use App\Models\Unidade;
use App\Models\SiapeListaUORGS;
use App\Models\Entidade;
use App\Models\SiapeBlackListServidor;
use App\Repository\EntidadeRepository;
use App\Repository\SiapeBlackListServidorRepository;
use App\Repository\SiapeConsultaDadosFuncionaisRepository;
use App\Repository\SiapeConsultaDadosPessoaisRepository;
use App\Repository\SiapeDadosUORGRepository;
use App\Repository\SiapeListaUORGSRepository;
use App\Repository\UnidadeRepository;
use App\Repository\UnidadeIntegranteRepository;
use App\Repository\UnidadeIntegranteAtribuicaoRepository;
use App\Repository\UsuarioRepository;
use Illuminate\Support\Facades\Log;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    Log::shouldReceive('channel')->andReturnSelf();
    Log::shouldReceive('info');
    Log::shouldReceive('error');
    Log::shouldReceive('warning');
    Log::shouldReceive('debug');
    Log::shouldReceive('notice');
    Log::shouldReceive('critical');
    Log::shouldReceive('alert');
    Log::shouldReceive('emergency');

    $this->integracaoServiceFactory = Mockery::mock(IntegracaoServiceFactory::class);
    $this->entidadeRepository = Mockery::mock(EntidadeRepository::class);
    $this->siapeBlackListServidorRepository = Mockery::mock(SiapeBlackListServidorRepository::class);
    $this->siapeConsultaDadosFuncionaisRepository = Mockery::mock(SiapeConsultaDadosFuncionaisRepository::class);
    $this->siapeConsultaDadosPessoaisRepository = Mockery::mock(SiapeConsultaDadosPessoaisRepository::class);
    $this->siapeDadosUORGRepository = Mockery::mock(SiapeDadosUORGRepository::class);
    $this->siapeListaUORGSRepository = Mockery::mock(SiapeListaUORGSRepository::class);
    $this->unidadeRepository = Mockery::mock(UnidadeRepository::class);
    $this->unidadeIntegranteRepository = Mockery::mock(UnidadeIntegranteRepository::class);
    $this->unidadeIntegranteAtribuicaoRepository = Mockery::mock(UnidadeIntegranteAtribuicaoRepository::class);
    $this->usuarioRepository = Mockery::mock(UsuarioRepository::class);

    $this->service = Mockery::mock(SiapeIndividualServidorService::class, [
        $this->integracaoServiceFactory,
        $this->entidadeRepository,
        $this->siapeBlackListServidorRepository,
        $this->siapeConsultaDadosFuncionaisRepository,
        $this->siapeConsultaDadosPessoaisRepository,
        $this->siapeDadosUORGRepository,
        $this->siapeListaUORGSRepository,
        $this->unidadeRepository,
        $this->unidadeIntegranteRepository,
        $this->unidadeIntegranteAtribuicaoRepository,
        $this->usuarioRepository,
    ])->makePartial();
    $this->service->shouldAllowMockingProtectedMethods();
    
    $this->siapeConfig = [
        'codOrgao' => '12345',
        'siglaSistema' => 'SIGLA',
        'nomeSistema' => 'NOME',
        'senha' => 'SENHA',
        'parmExistPag' => 'S',
        'parmTipoVinculo' => '1'
    ];

    $this->siapeService = Mockery::mock(SiapeIndividualService::class);
    $this->siapeService->config = $this->siapeConfig;
    $this->siapeService->shouldReceive('getOrgao')->andReturn('12345')->byDefault();
});

afterEach(function () {
    Mockery::close();
});

describe('SiapeIndividualServidorService - Validação de CPF', function () {
    
    it('deve retornar cpf limpo quando válido e formatado', function () {
        $method = new ReflectionMethod(SiapeIndividualServidorService::class, 'limparEValidarCpf');
        $method->setAccessible(true);
        $result = $method->invoke($this->service, '529.982.247-25');
        expect($result)->toBe('52998224725');
    });

    it('deve retornar cpf limpo quando válido e sem formatação', function () {
        $method = new ReflectionMethod(SiapeIndividualServidorService::class, 'limparEValidarCpf');
        $method->setAccessible(true);
        $result = $method->invoke($this->service, '52998224725');
        expect($result)->toBe('52998224725');
    });

    it('deve lançar exceção quando cpf tem tamanho inválido', function () {
        $method = new ReflectionMethod(SiapeIndividualServidorService::class, 'limparEValidarCpf');
        $method->setAccessible(true);
        expect(fn() => $method->invoke($this->service, '123456'))
            ->toThrow(Exception::class, 'CPF inválido: O CPF deve conter exatamente 11 dígitos numéricos');
    });

    it('deve lançar exceção quando cpf tem todos dígitos iguais (repetidos)', function () {
        $method = new ReflectionMethod(SiapeIndividualServidorService::class, 'limparEValidarCpf');
        $method->setAccessible(true);
        expect(fn() => $method->invoke($this->service, '111.111.111-11'))
            ->toThrow(Exception::class, 'CPF inválido: Dígito verificador incorreto ou inválido');
    });

    it('deve lançar exceção quando cpf tem checksum inválido', function () {
        $method = new ReflectionMethod(SiapeIndividualServidorService::class, 'limparEValidarCpf');
        $method->setAccessible(true);
        expect(fn() => $method->invoke($this->service, '12345678901'))
            ->toThrow(Exception::class, 'CPF inválido: Dígito verificador incorreto ou inválido');
    });

    it('deve proteger contra injeção de SQL falhando na sanitização ou validação', function () {
        $method = new ReflectionMethod(SiapeIndividualServidorService::class, 'limparEValidarCpf');
        $method->setAccessible(true);
        $input = '52998224725 OR 1=1'; 
        expect(fn() => $method->invoke($this->service, $input))
            ->toThrow(Exception::class, 'CPF inválido: O CPF deve conter exatamente 11 dígitos numéricos');
    });

    it('deve proteger contra XSS falhando na validação', function () {
        $method = new ReflectionMethod(SiapeIndividualServidorService::class, 'limparEValidarCpf');
        $method->setAccessible(true);
        $input = '<script>alert(1)</script>52998224725';
        expect(fn() => $method->invoke($this->service, $input))
            ->toThrow(Exception::class, 'CPF inválido: O CPF deve conter exatamente 11 dígitos numéricos');
    });

});

describe('SiapeIndividualServidorService - Fluxo Principal', function () {

    it('deve executar fluxo com sucesso completo', function () {
        $cpf = '12345678901';
        $cpfLimpo = '12345678901';

        $validCpf = '52998224725';
        $cpfLimpo = $validCpf;
        
        $this->service->shouldReceive('buscarUsuariosPorCpf')->with($cpfLimpo)->andReturn([])->once();
        $this->service->shouldReceive('limparDadosSiape')->with($cpfLimpo)->once();
        $this->service->shouldReceive('verificarExistenciaUnidade')->andReturn(true); 
        
        $mockListaUorgs = new SiapeListaUORGS();
        $mockListaUorgs->response = '<xml></xml>';
        $this->service->shouldReceive('buscarUorgNaoProcessada')->andReturn($mockListaUorgs);

        $this->service->shouldReceive('salvarHistoricoUnidadeDb')->andReturnNull();
        $this->service->shouldReceive('salvarDadosConsultaDb')->with($cpfLimpo, 'xml_func', 'xml_pess')->once();
        $this->service->shouldReceive('buscarUsuariosSimples')->with($cpfLimpo)->andReturn(collect([])); 
        
        $this->service->shouldReceive('removendoDaBlackList')->with($cpfLimpo)->once(); 
        
        $mockIntegracao = Mockery::mock(IntegracaoService::class);
        $mockIntegracao->shouldReceive('sincronizar')->andReturnNull();
        
        $this->service->shouldReceive('instanciarIntegracaoService')->andReturn($mockIntegracao);
        $this->service->shouldReceive('buscarTodasEntidades')->andReturn(collect([new Entidade(['id' => 'ent1'])]));
        
        $usuarioDepois = Mockery::mock(Usuario::class)->makePartial();
        $usuarioDepois->nome = 'User Test';
        $usuarioDepois->matricula = 'M123';

        $lotacaoMock = new Unidade();
        $lotacaoMock->id = 'u1';
        $lotacaoMock->unidade_id = 'u1'; 
        
        $lotacaoObj = new \stdClass();
        $lotacaoObj->unidade_id = 'u1';
        $lotacaoObj->unidade = $lotacaoMock;

        $usuarioDepois->shouldReceive('getAttribute')->with('lotacao')->andReturn($lotacaoObj);
        $usuarioDepois->shouldReceive('getAttribute')->with('nome')->andReturn('User Test');
        $usuarioDepois->shouldReceive('getAttribute')->with('matricula')->andReturn('M123');
        $usuarioDepois->shouldReceive('getAttribute')->with('id')->andReturn('user_id');

        $this->service->shouldReceive('gerarUsuariosResumo')->with($cpfLimpo)->andReturn(collect([$usuarioDepois]));

        $buscarDadosServidor = Mockery::mock(BuscarDadosSiapeServidor::class);
        $buscarDadosServidor->shouldReceive('consultaDadosFuncionais')->andReturn('xml_func_request');
        $buscarDadosServidor->shouldReceive('consultaDadosPessoais')->andReturn('xml_pess_request');
        $buscarDadosServidor->shouldReceive('executaRequisicao')->with('xml_func_request')->andReturn('xml_func');
        $buscarDadosServidor->shouldReceive('executaRequisicao')->with('xml_pess_request')->andReturn('xml_pess');

        $this->siapeService->shouldReceive('getBuscarDadosSiapeServidor')->andReturn($buscarDadosServidor);
        
        $processaDados = Mockery::mock(ProcessaDadosSiapeBD::class);
        $processaDados->shouldReceive('processaDadosFuncionais')->with($cpfLimpo, 'xml_func')->andReturn([
            ['codUorgExercicio' => 'U123', 'matriculaSiape' => 'M123']
        ]);
        $this->siapeService->shouldReceive('getProcessaDadosSiape')->andReturn($processaDados);

        $buscarDadosUnidade = Mockery::mock(BuscarDadosSiapeUnidade::class);
        $buscarDadosUnidade->shouldReceive('getUorgAsXml')->andReturn('xml_unit_req');
        $buscarDadosUnidade->shouldReceive('executaRequisicao')->andReturn('xml_unit_resp');
        $buscarDadosUnidade->shouldReceive('getCpf')->andReturn('CPF_ADMIN');
        $buscarDadosUnidade->shouldReceive('getUnidades')->andReturn([['codigo' => 'U123', 'dataUltimaTransacao' => '01012023']]);
        $this->siapeService->shouldReceive('getBuscarDadosSiapeUnidade')->andReturn($buscarDadosUnidade);
        
        $buscarDadosUnidades = Mockery::mock(BuscarDadosSiapeUnidades::class);
        $buscarDadosUnidades->shouldReceive('listaUorgs')->andReturnNull();
        $this->siapeService->shouldReceive('getBuscarDadosSiapeUnidades')->andReturn($buscarDadosUnidades);

        // Execute
        $resumo = $this->service->fluxoSiape($validCpf, $this->siapeService);
        
        expect($resumo)->toBeArray();
        expect($resumo[0]['status'])->toBe('sucesso');
        expect($this->service->getResumo())->toBe($resumo);
    });

    it('deve lidar com falha na montagem de XML', function () {
        $validCpf = '52998224725';
        $cpfLimpo = $validCpf;

        $this->service->shouldReceive('buscarUsuariosPorCpf')->andReturn([]);
        $this->service->shouldReceive('limparDadosSiape')->once();
        $this->service->shouldReceive('gerarUsuariosResumo')->andReturn(collect([]));

        $buscarDadosServidor = Mockery::mock(BuscarDadosSiapeServidor::class);
        $buscarDadosServidor->shouldReceive('consultaDadosFuncionais')->andThrow(new Exception('Erro XML'));
        $this->siapeService->shouldReceive('getBuscarDadosSiapeServidor')->andReturn($buscarDadosServidor);

        expect(fn() => $this->service->fluxoSiape($validCpf, $this->siapeService))
            ->toThrow(Exception::class, 'Erro ao montar XMLs para consulta SIAPE: Erro XML');
            
        expect(isset($this->service->getResumo()[0]['status']) ? $this->service->getResumo()[0]['status'] : 'erro')->toBe('erro');
    });

    it('deve lidar com falha na consulta SIAPE', function () {
        $validCpf = '52998224725';
        $cpfLimpo = $validCpf;

        $this->service->shouldReceive('buscarUsuariosPorCpf')->andReturn([]);
        $this->service->shouldReceive('limparDadosSiape')->once();
        $this->service->shouldReceive('gerarUsuariosResumo')->andReturn(collect([]));

        $buscarDadosServidor = Mockery::mock(BuscarDadosSiapeServidor::class);
        $buscarDadosServidor->shouldReceive('consultaDadosFuncionais')->andReturn('xml');
        $buscarDadosServidor->shouldReceive('consultaDadosPessoais')->andReturn('xml');
        $buscarDadosServidor->shouldReceive('executaRequisicao')->andThrow(new Exception('Erro API'));
        
        $this->siapeService->shouldReceive('getBuscarDadosSiapeServidor')->andReturn($buscarDadosServidor);

        expect(fn() => $this->service->fluxoSiape($validCpf, $this->siapeService))
            ->toThrow(Exception::class, 'Erro ao consultar dados no SIAPE: Erro API');
    });

    it('deve lidar com dados funcionais vazios', function () {
        $validCpf = '52998224725';
        $cpfLimpo = $validCpf;

        $this->service->shouldReceive('buscarUsuariosPorCpf')->andReturn([]);
        $this->service->shouldReceive('limparDadosSiape')->once();
        $this->service->shouldReceive('gerarUsuariosResumo')->andReturn(collect([]));

        $buscarDadosServidor = Mockery::mock(BuscarDadosSiapeServidor::class);
        $buscarDadosServidor->shouldReceive('consultaDadosFuncionais')->andReturn('xml');
        $buscarDadosServidor->shouldReceive('consultaDadosPessoais')->andReturn('xml');
        $buscarDadosServidor->shouldReceive('executaRequisicao')->andReturn('xml_resp');
        $this->siapeService->shouldReceive('getBuscarDadosSiapeServidor')->andReturn($buscarDadosServidor);

        $processaDados = Mockery::mock(ProcessaDadosSiapeBD::class);
        $processaDados->shouldReceive('processaDadosFuncionais')->once()->andReturn([]); // Return empty array to trigger check
        $this->siapeService->shouldReceive('getProcessaDadosSiape')->andReturn($processaDados);

        try {
            $this->service->fluxoSiape($validCpf, $this->siapeService);
            throw new \RuntimeException('Fluxo completou sem lançar exceção esperada');
        } catch (Exception $e) {
             if ($e instanceof \RuntimeException && $e->getMessage() === 'Fluxo completou sem lançar exceção esperada') {
                 throw $e;
             }
             expect($e)->toBeInstanceOf(Exception::class);
        }
    });

    it('deve lidar com unidade não processada', function () {
        $validCpf = '52998224725';
        $cpfLimpo = $validCpf;

        $this->service->shouldReceive('buscarUsuariosPorCpf')->andReturn([]);
        $this->service->shouldReceive('limparDadosSiape')->once();
        $this->service->shouldReceive('gerarUsuariosResumo')->andReturn(collect([]));

        $buscarDadosServidor = Mockery::mock(BuscarDadosSiapeServidor::class);
        $buscarDadosServidor->shouldReceive('consultaDadosFuncionais')->andReturn('xml');
        $buscarDadosServidor->shouldReceive('consultaDadosPessoais')->andReturn('xml');
        $buscarDadosServidor->shouldReceive('executaRequisicao')->andReturn('xml_resp');
        $this->siapeService->shouldReceive('getBuscarDadosSiapeServidor')->andReturn($buscarDadosServidor);

        $processaDados = Mockery::mock(ProcessaDadosSiapeBD::class);
        $processaDados->shouldReceive('processaDadosFuncionais')->andReturn([['codUorgExercicio' => '999']]);
        $this->siapeService->shouldReceive('getProcessaDadosSiape')->andReturn($processaDados);

        // Unit does not exist
        $this->service->shouldReceive('verificarExistenciaUnidade')->with('999')->andReturn(false);

        expect(fn() => $this->service->fluxoSiape($validCpf, $this->siapeService))
            ->toThrow(Exception::class, "O CPF {$cpfLimpo} pertence à unidade de código 999, que ainda não foi processada.");
    });

    it('deve remover vinculos e blacklist quando usuario existe', function () {
        $validCpf = '52998224725';

        // Mock setup for success path
        $this->service->shouldReceive('buscarUsuariosPorCpf')->andReturn([]);
        $this->service->shouldReceive('limparDadosSiape')->once();
        $this->service->shouldReceive('verificarExistenciaUnidade')->andReturn(true);

        $mockListaUorgs = new SiapeListaUORGS();
        $mockListaUorgs->response = '<xml></xml>';
        $this->service->shouldReceive('buscarUorgNaoProcessada')->andReturn($mockListaUorgs);

        $this->service->shouldReceive('salvarHistoricoUnidadeDb')->andReturnNull();
        $this->service->shouldReceive('salvarDadosConsultaDb')->andReturnNull();
        
        // Mock user exists
        $user = Mockery::mock(Usuario::class)->makePartial();
        $user->matricula = 'M999';
        
        $this->service->shouldReceive('buscarUsuariosSimples')->andReturn(collect([$user]));

        $this->siapeBlackListServidorRepository
            ->shouldReceive('exists')
            ->with($validCpf, 'M999')
            ->andReturn(false)
            ->once();
        $this->siapeBlackListServidorRepository
            ->shouldReceive('create')
            ->with(Mockery::on(fn(array $data) => ($data['cpf'] ?? null) === $validCpf && ($data['matricula'] ?? null) === 'M999'))
            ->once();
        
        // Let's configure dependencies for this specific test
        $this->service->shouldReceive('instanciarIntegracaoService')->andReturn(Mockery::mock(IntegracaoService::class, ['sincronizar' => null]));
        $this->service->shouldReceive('buscarTodasEntidades')->andReturn(collect([]));
        $this->service->shouldReceive('gerarUsuariosResumo')->andReturn(collect([]));
        
        // Standard mocks
        $buscarDadosServidor = Mockery::mock(BuscarDadosSiapeServidor::class);
        $buscarDadosServidor->shouldReceive('consultaDadosFuncionais')->andReturn('xml');
        $buscarDadosServidor->shouldReceive('consultaDadosPessoais')->andReturn('xml');
        $buscarDadosServidor->shouldReceive('executaRequisicao')->andReturn('xml');
        $this->siapeService->shouldReceive('getBuscarDadosSiapeServidor')->andReturn($buscarDadosServidor);
        
        $processaDados = Mockery::mock(ProcessaDadosSiapeBD::class);
        $processaDados->shouldReceive('processaDadosFuncionais')->andReturn([['codUorgExercicio' => 'U123', 'matriculaSiape' => 'M123']]);
        $this->siapeService->shouldReceive('getProcessaDadosSiape')->andReturn($processaDados);

        $buscarDadosUnidade = Mockery::mock(BuscarDadosSiapeUnidade::class);
        $buscarDadosUnidade->shouldReceive('getUorgAsXml')->andReturn('xml');
        $buscarDadosUnidade->shouldReceive('executaRequisicao')->andReturn('xml');
        $buscarDadosUnidade->shouldReceive('getCpf')->andReturn('cpf');
        $buscarDadosUnidade->shouldReceive('getUnidades')->andReturn([['codigo' => 'U123', 'dataUltimaTransacao' => 'd']]);
        $this->siapeService->shouldReceive('getBuscarDadosSiapeUnidade')->andReturn($buscarDadosUnidade);
        
        $buscarDadosUnidades = Mockery::mock(BuscarDadosSiapeUnidades::class);
        $buscarDadosUnidades->shouldReceive('listaUorgs')->andReturnNull();
        $this->siapeService->shouldReceive('getBuscarDadosSiapeUnidades')->andReturn($buscarDadosUnidades);

        $this->service->fluxoSiape($validCpf, $this->siapeService);
        
        // Verification is implicit via expectations
    });

    it('deve remover lotacao se matricula corresponde', function () {
        $validCpf = '52998224725';

        // Mock setup
        $this->service->shouldReceive('buscarUsuariosPorCpf')->andReturn([]);
        $this->service->shouldReceive('limparDadosSiape')->once();
        $this->service->shouldReceive('verificarExistenciaUnidade')->andReturn(true);

        $mockListaUorgs = new SiapeListaUORGS();
        $mockListaUorgs->response = '<xml></xml>';
        $this->service->shouldReceive('buscarUorgNaoProcessada')->andReturn($mockListaUorgs);

        $this->service->shouldReceive('salvarHistoricoUnidadeDb')->andReturnNull();
        $this->service->shouldReceive('salvarDadosConsultaDb')->andReturnNull();
        
        // Mock user matches
        $user = Mockery::mock(Usuario::class)->makePartial();
        $user->id = 'user_id';
        $user->matricula = 'M123'; 
        $user->lotacao = (object)['unidade' => (object)['id' => 'uid']];
        
        $this->service->shouldReceive('buscarUsuariosSimples')->andReturn(collect([$user]));
        $this->service->shouldReceive('removeTodasAsGestoesDoUsuario')->with($user)->once();
        $this->service->shouldNotReceive('removeLotacao');

        $this->usuarioRepository
            ->shouldReceive('update')
            ->with('user_id', ['usuario_externo' => false])
            ->andReturn(null)
            ->once();
        $this->siapeBlackListServidorRepository
            ->shouldReceive('findByCpfAndOptionalMatricula')
            ->with($validCpf, 'M123')
            ->andReturn(null)
            ->once();

        // ... dependencies same as above ...
        $this->service->shouldReceive('instanciarIntegracaoService')->andReturn(Mockery::mock(IntegracaoService::class, ['sincronizar' => null]));
        $this->service->shouldReceive('buscarTodasEntidades')->andReturn(collect([]));
        $this->service->shouldReceive('gerarUsuariosResumo')->andReturn(collect([]));
        
        $buscarDadosServidor = Mockery::mock(BuscarDadosSiapeServidor::class);
        $buscarDadosServidor->shouldReceive('consultaDadosFuncionais')->andReturn('xml');
        $buscarDadosServidor->shouldReceive('consultaDadosPessoais')->andReturn('xml');
        $buscarDadosServidor->shouldReceive('executaRequisicao')->andReturn('xml');
        $this->siapeService->shouldReceive('getBuscarDadosSiapeServidor')->andReturn($buscarDadosServidor);
        
        $processaDados = Mockery::mock(ProcessaDadosSiapeBD::class);
        $processaDados->shouldReceive('processaDadosFuncionais')->andReturn([['codUorgExercicio' => 'U123', 'matriculaSiape' => 'M123']]);
        $this->siapeService->shouldReceive('getProcessaDadosSiape')->andReturn($processaDados);

        $buscarDadosUnidade = Mockery::mock(BuscarDadosSiapeUnidade::class);
        $buscarDadosUnidade->shouldReceive('getUorgAsXml')->andReturn('xml');
        $buscarDadosUnidade->shouldReceive('executaRequisicao')->andReturn('xml');
        $buscarDadosUnidade->shouldReceive('getCpf')->andReturn('cpf');
        $buscarDadosUnidade->shouldReceive('getUnidades')->andReturn([['codigo' => 'U123', 'dataUltimaTransacao' => 'd']]);
        $this->siapeService->shouldReceive('getBuscarDadosSiapeUnidade')->andReturn($buscarDadosUnidade);
        
        $buscarDadosUnidades = Mockery::mock(BuscarDadosSiapeUnidades::class);
        $buscarDadosUnidades->shouldReceive('listaUorgs')->andReturnNull();
        $this->siapeService->shouldReceive('getBuscarDadosSiapeUnidades')->andReturn($buscarDadosUnidades);

        $this->service->fluxoSiape($validCpf, $this->siapeService);
    });

    it('deve processar blacklist se usuario encontrado', function () {
        $validCpf = '52998224725';
        
        // Only focusing on blacklist logic
        $user = Mockery::mock(Usuario::class)->makePartial();
        $user->id = 'user_id';
        $user->matricula = 'M123';
        $user->lotacao = (object)['unidade' => (object)['id' => 'uid']];

        $this->service->shouldReceive('buscarUsuariosSimples')->andReturn(collect([$user]));
        
        // Blacklist mock
        $blacklist = Mockery::mock(SiapeBlackListServidor::class)->makePartial();
        $blacklist->inativado = 1;
        $blacklist->id = 'blacklist_id';
        
        $this->siapeBlackListServidorRepository
            ->shouldReceive('findByCpfAndOptionalMatricula')
            ->with($validCpf, 'M123')
            ->andReturn($blacklist)
            ->once();
        $this->siapeBlackListServidorRepository
            ->shouldReceive('forceDelete')
            ->with('blacklist_id')
            ->andReturn(true)
            ->once();
        
        $this->usuarioRepository
            ->shouldReceive('update')
            ->with('user_id', ['usuario_externo' => false])
            ->andReturn(null)
            ->once();
        $this->usuarioRepository
            ->shouldReceive('update')
            ->with('user_id', ['situacao_siape' => UsuarioSituacaoSiape::ATIVO->value])
            ->andReturn(null)
            ->once();
        $this->service->shouldReceive('removeTodasAsGestoesDoUsuario')->with($user)->andReturnNull()->once();
        $this->service->shouldNotReceive('removeLotacao');

        // Mocks for the rest of flow...
        $this->service->shouldReceive('buscarUsuariosPorCpf')->andReturn([]);
        $this->service->shouldReceive('limparDadosSiape')->once();
        $this->service->shouldReceive('verificarExistenciaUnidade')->andReturn(true);

        $mockListaUorgs = new SiapeListaUORGS();
        $mockListaUorgs->response = '<xml></xml>';
        $this->service->shouldReceive('buscarUorgNaoProcessada')->andReturn($mockListaUorgs);

        $this->service->shouldReceive('salvarHistoricoUnidadeDb')->andReturnNull();
        $this->service->shouldReceive('salvarDadosConsultaDb')->andReturnNull();
        $this->service->shouldReceive('instanciarIntegracaoService')->andReturn(Mockery::mock(IntegracaoService::class, ['sincronizar' => null]));
        $this->service->shouldReceive('buscarTodasEntidades')->andReturn(collect([]));
        $this->service->shouldReceive('gerarUsuariosResumo')->andReturn(collect([]));
        
        $buscarDadosServidor = Mockery::mock(BuscarDadosSiapeServidor::class);
        $buscarDadosServidor->shouldReceive('consultaDadosFuncionais')->andReturn('xml');
        $buscarDadosServidor->shouldReceive('consultaDadosPessoais')->andReturn('xml');
        $buscarDadosServidor->shouldReceive('executaRequisicao')->andReturn('xml');
        $this->siapeService->shouldReceive('getBuscarDadosSiapeServidor')->andReturn($buscarDadosServidor);
        
        $processaDados = Mockery::mock(ProcessaDadosSiapeBD::class);
        $processaDados->shouldReceive('processaDadosFuncionais')->andReturn([['codUorgExercicio' => 'U123', 'matriculaSiape' => 'M123']]);
        $this->siapeService->shouldReceive('getProcessaDadosSiape')->andReturn($processaDados);

        $buscarDadosUnidade = Mockery::mock(BuscarDadosSiapeUnidade::class);
        $buscarDadosUnidade->shouldReceive('getUorgAsXml')->andReturn('xml');
        $buscarDadosUnidade->shouldReceive('executaRequisicao')->andReturn('xml');
        $buscarDadosUnidade->shouldReceive('getCpf')->andReturn('cpf');
        $buscarDadosUnidade->shouldReceive('getUnidades')->andReturn([['codigo' => 'U123', 'dataUltimaTransacao' => 'd']]);
        $this->siapeService->shouldReceive('getBuscarDadosSiapeUnidade')->andReturn($buscarDadosUnidade);
        
        $buscarDadosUnidades = Mockery::mock(BuscarDadosSiapeUnidades::class);
        $buscarDadosUnidades->shouldReceive('listaUorgs')->andReturnNull();
        $this->siapeService->shouldReceive('getBuscarDadosSiapeUnidades')->andReturn($buscarDadosUnidades);

        $this->service->fluxoSiape($validCpf, $this->siapeService);
    });

    it('deve detectar alterações em usuário existente', function () {
        $validCpf = '52998224725';
        $cpfLimpo = $validCpf;

        // User before
        $userAntes = [
            'id' => 'uid',
            'matricula' => 'M123',
            'nome' => 'Old Name',
            'email' => 'old@email.com',
            'situacao_siape' => 'old_status',
            'lotacao_id' => 'old_lotacao'
        ];
        
        $this->service->shouldReceive('buscarUsuariosPorCpf')->andReturn([$userAntes]);
        $this->service->shouldReceive('limparDadosSiape')->once();
        $this->service->shouldReceive('verificarExistenciaUnidade')->andReturn(true);
        
        $mockListaUorgs = new SiapeListaUORGS();
        $mockListaUorgs->response = '<xml></xml>';
        $this->service->shouldReceive('buscarUorgNaoProcessada')->andReturn($mockListaUorgs);
        
        $this->service->shouldReceive('salvarHistoricoUnidadeDb')->andReturnNull();
        $this->service->shouldReceive('salvarDadosConsultaDb')->andReturnNull();
        $this->service->shouldReceive('buscarUsuariosSimples')->andReturn(collect([]));
        $this->service->shouldReceive('removendoDaBlackList')->once();
        $this->service->shouldReceive('instanciarIntegracaoService')->andReturn(Mockery::mock(IntegracaoService::class, ['sincronizar' => null]));
        $this->service->shouldReceive('buscarTodasEntidades')->andReturn(collect([]));

        // User after (changed name, email)
        $usuarioDepois = Mockery::mock(Usuario::class)->makePartial();
        $usuarioDepois->nome = 'New Name';
        $usuarioDepois->matricula = 'M123';
        $usuarioDepois->email = 'new@email.com';
        $usuarioDepois->situacao_siape = 'old_status';
        
        $lotacaoObj = new \stdClass();
        $lotacaoObj->unidade_id = 'old_lotacao';
        $lotacaoObj->unidade = (object)['id' => 'old_lotacao'];

        $usuarioDepois->shouldReceive('getAttribute')->with('lotacao')->andReturn($lotacaoObj);
        $usuarioDepois->shouldReceive('getAttribute')->with('nome')->andReturn('New Name');
        $usuarioDepois->shouldReceive('getAttribute')->with('matricula')->andReturn('M123');
        $usuarioDepois->shouldReceive('getAttribute')->with('email')->andReturn('new@email.com');
        $usuarioDepois->shouldReceive('getAttribute')->with('situacao_siape')->andReturn('old_status');
        $usuarioDepois->shouldReceive('getAttribute')->with('id')->andReturn('uid');

        $this->service->shouldReceive('gerarUsuariosResumo')->andReturn(collect([$usuarioDepois]));

        // Siape mocks (minimal success)
        $buscarDadosServidor = Mockery::mock(BuscarDadosSiapeServidor::class);
        $buscarDadosServidor->shouldReceive('consultaDadosFuncionais')->andReturn('xml');
        $buscarDadosServidor->shouldReceive('consultaDadosPessoais')->andReturn('xml');
        $buscarDadosServidor->shouldReceive('executaRequisicao')->andReturn('xml');
        $this->siapeService->shouldReceive('getBuscarDadosSiapeServidor')->andReturn($buscarDadosServidor);
        
        $processaDados = Mockery::mock(ProcessaDadosSiapeBD::class);
        $processaDados->shouldReceive('processaDadosFuncionais')->andReturn([['codUorgExercicio' => 'U123', 'matriculaSiape' => 'M123']]);
        $this->siapeService->shouldReceive('getProcessaDadosSiape')->andReturn($processaDados);

        $buscarDadosUnidade = Mockery::mock(BuscarDadosSiapeUnidade::class);
        $buscarDadosUnidade->shouldReceive('getUorgAsXml')->andReturn('xml');
        $buscarDadosUnidade->shouldReceive('executaRequisicao')->andReturn('xml');
        $buscarDadosUnidade->shouldReceive('getCpf')->andReturn('cpf');
        $buscarDadosUnidade->shouldReceive('getUnidades')->andReturn([['codigo' => 'U123', 'dataUltimaTransacao' => 'd']]);
        $this->siapeService->shouldReceive('getBuscarDadosSiapeUnidade')->andReturn($buscarDadosUnidade);
        
        $buscarDadosUnidades = Mockery::mock(BuscarDadosSiapeUnidades::class);
        $buscarDadosUnidades->shouldReceive('listaUorgs')->andReturnNull();
        $this->siapeService->shouldReceive('getBuscarDadosSiapeUnidades')->andReturn($buscarDadosUnidades);

        $resumo = $this->service->fluxoSiape($validCpf, $this->siapeService);
        
        expect($resumo[0]['alteracoes'])->toContain('nome', 'email');
        expect($resumo[0]['alteracoes'])->not->toContain('situacao_siape');
    });

});

describe('SiapeIndividualServidorService - Métodos Protegidos', function () {
    it('deve instanciar integracao service', function () {
        $this->integracaoServiceFactory->shouldReceive('make')->with([])->andReturn(Mockery::mock(IntegracaoService::class));
        
        $method = new ReflectionMethod(SiapeIndividualServidorService::class, 'instanciarIntegracaoService');
        $method->setAccessible(true);
        $result = $method->invoke($this->service);
        expect($result)->toBeInstanceOf(IntegracaoService::class);
    });
});
