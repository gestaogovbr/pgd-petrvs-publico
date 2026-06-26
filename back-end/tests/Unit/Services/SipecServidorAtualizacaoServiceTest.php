<?php

use App\Models\Perfil;
use App\Models\Unidade;
use App\Models\Usuario;
use App\Repository\IntegracaoServidorRepository;
use App\Repository\UnidadeRepository;
use App\Repository\UsuarioRepository;
use App\Services\Sipec\Servidor\SipecServidorAtualizacaoService;
use App\Services\UnidadeIntegranteService;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Tests\TestCase;

uses(TestCase::class);

afterEach(function () {
    Mockery::close();
});

function setupLogMockAtualizacao(): void
{
    $loggerMock = Mockery::mock(\Psr\Log\LoggerInterface::class);
    $loggerMock->shouldReceive('info', 'warning', 'error', 'debug', 'notice', 'log', 'critical', 'alert', 'emergency')->withAnyArgs();
    Log::shouldReceive('channel')->andReturn($loggerMock);
    Log::shouldReceive('error', 'info', 'warning', 'debug', 'critical', 'log', 'alert', 'emergency', 'notice')->withAnyArgs();
    Log::shouldReceive('stack')->andReturn($loggerMock);
    Log::shouldReceive('driver')->andReturn($loggerMock);
}

function buildService(
    ?IntegracaoServidorRepository $integracaoRepo = null,
    ?UsuarioRepository $usuarioRepo = null,
    ?UnidadeRepository $unidadeRepo = null,
    ?UnidadeIntegranteService $unidadeIntegranteService = null,
    ?Perfil $perfil = null,
): SipecServidorAtualizacaoService {
    $p = $perfil ?? Mockery::mock(Perfil::class)->makePartial();
    if (!isset($p->id)) {
        $p->id = 'perfil-participante-id';
    }

    return new class(
        $integracaoRepo ?? Mockery::mock(IntegracaoServidorRepository::class),
        $usuarioRepo ?? Mockery::mock(UsuarioRepository::class),
        $unidadeRepo ?? Mockery::mock(UnidadeRepository::class),
        $unidadeIntegranteService ?? Mockery::mock(UnidadeIntegranteService::class),
        $p,
    ) extends SipecServidorAtualizacaoService {
        private Perfil $testPerfil;
        public function __construct($a, $b, $c, $d, Perfil $perfil) {
            parent::__construct($a, $b, $c, $d);
            $this->testPerfil = $perfil;
        }
        protected function getPerfilParticipante(): ?\App\Models\Perfil {
            return $this->testPerfil;
        }
    };
}

describe('SipecServidorAtualizacaoService - atualizarDadosPessoais', function () {

    test('deve atualizar dados quando há divergência', function () {
        setupLogMockAtualizacao();

        $linha = (object) [
            'id' => 'user-1',
            'matriculasiape' => '1234567',
            'nome_servidor' => 'João Atualizado',
            'nome_guerra' => 'João',
            'emailfuncional' => 'joao@gov.br',
            'cod_jornada' => '40',
            'nome_jornada' => '40 HORAS',
            'modalidade_pgd' => 'parcial',
            'participa_pgd' => 'sim',
            'ident_unica' => '999',
            'data_modificacao' => '2025-06-01',
            'data_nascimento' => '1990-01-01',
        ];

        $integracaoRepo = Mockery::mock(IntegracaoServidorRepository::class);
        $integracaoRepo->shouldReceive('buscarAtualizacoesDados')->once()->andReturn([$linha]);
        $integracaoRepo->shouldReceive('getAtualizacoesLotacoes')->andReturn([]);
        $integracaoRepo->shouldReceive('getServidoresInseridosNaoLotados')->andReturn([]);
        $integracaoRepo->shouldReceive('getUsuariosAusentes')->andReturn([]);
        $integracaoRepo->shouldReceive('getMatriculaByCpf')->andReturn(null);

        $usuarioRepo = Mockery::mock(UsuarioRepository::class);
        $usuarioRepo->shouldReceive('update')
            ->with('user-1', Mockery::on(fn(array $data) => $data['nome'] === 'João Atualizado' && $data['email'] === 'joao@gov.br'))
            ->once()
            ->andReturn(Mockery::mock(Usuario::class));
        $usuarioRepo->shouldReceive('findAllSemMatricula')->andReturn(new EloquentCollection());
        $usuarioRepo->shouldReceive('findByEmail')->andReturn(null);

        DB::shouldReceive('transaction')->zeroOrMoreTimes()->andReturnUsing(fn($cb) => $cb());

        $service = buildService($integracaoRepo, $usuarioRepo);
        $resultado = $service->processar();

        expect($resultado['dados_pessoais'])->toBe(1);
    });

    test('deve pular registro sem id', function () {
        setupLogMockAtualizacao();

        $linha = (object) [
            'id' => null,
            'matriculasiape' => '1234567',
            'nome_servidor' => 'Teste',
            'nome_guerra' => 'T',
            'emailfuncional' => null,
            'cod_jornada' => null,
            'nome_jornada' => null,
            'modalidade_pgd' => null,
            'participa_pgd' => null,
            'ident_unica' => null,
            'data_modificacao' => null,
            'data_nascimento' => null,
        ];

        $integracaoRepo = Mockery::mock(IntegracaoServidorRepository::class);
        $integracaoRepo->shouldReceive('buscarAtualizacoesDados')->once()->andReturn([$linha]);
        $integracaoRepo->shouldReceive('getAtualizacoesLotacoes')->andReturn([]);
        $integracaoRepo->shouldReceive('getServidoresInseridosNaoLotados')->andReturn([]);
        $integracaoRepo->shouldReceive('getUsuariosAusentes')->andReturn([]);
        $integracaoRepo->shouldReceive('getMatriculaByCpf')->andReturn(null);

        $usuarioRepo = Mockery::mock(UsuarioRepository::class);
        $usuarioRepo->shouldNotReceive('update');
        $usuarioRepo->shouldReceive('findAllSemMatricula')->andReturn(new EloquentCollection());

        DB::shouldReceive('transaction')->zeroOrMoreTimes()->andReturnUsing(fn($cb) => $cb());

        $service = buildService($integracaoRepo, $usuarioRepo);
        $resultado = $service->processar();

        expect($resultado['dados_pessoais'])->toBe(0);
    });
});

describe('SipecServidorAtualizacaoService - atualizarLotacoes', function () {

    test('deve mover lotação quando unidade mudou', function () {
        setupLogMockAtualizacao();

        $lotacao = (object) ['usuario_id' => 'user-1', 'exercicio_atual_id' => 'unidade-nova-id'];

        $integracaoRepo = Mockery::mock(IntegracaoServidorRepository::class);
        $integracaoRepo->shouldReceive('buscarAtualizacoesDados')->andReturn([]);
        $integracaoRepo->shouldReceive('getAtualizacoesLotacoes')->once()->andReturn([$lotacao]);
        $integracaoRepo->shouldReceive('getServidoresInseridosNaoLotados')->once()->andReturn([]);
        $integracaoRepo->shouldReceive('getUsuariosAusentes')->andReturn([]);
        $integracaoRepo->shouldReceive('getMatriculaByCpf')->andReturn(null);

        $usuarioRepo = Mockery::mock(UsuarioRepository::class);
        $usuarioRepo->shouldReceive('findAllSemMatricula')->andReturn(new EloquentCollection());

        $unidadeIntegranteService = Mockery::mock(UnidadeIntegranteService::class);
        $unidadeIntegranteService->shouldReceive('salvarIntegrantes')
            ->with(Mockery::on(fn(array $v) => $v[0]['usuario_id'] === 'user-1' && $v[0]['unidade_id'] === 'unidade-nova-id'), false, true)
            ->once()->andReturn([]);

        DB::shouldReceive('transaction')->zeroOrMoreTimes()->andReturnUsing(fn($cb) => $cb());

        $service = buildService($integracaoRepo, $usuarioRepo, null, $unidadeIntegranteService);
        $resultado = $service->processar();

        expect($resultado['lotacoes_movidas'])->toBe(1);
    });

    test('deve inserir lotação de servidor não lotado', function () {
        setupLogMockAtualizacao();

        $naoLotado = (object) ['usuario_id' => 'user-2', 'unidade_id' => 'unidade-id', 'matricula' => '7777777'];

        $integracaoRepo = Mockery::mock(IntegracaoServidorRepository::class);
        $integracaoRepo->shouldReceive('buscarAtualizacoesDados')->andReturn([]);
        $integracaoRepo->shouldReceive('getAtualizacoesLotacoes')->once()->andReturn([]);
        $integracaoRepo->shouldReceive('getServidoresInseridosNaoLotados')->once()->andReturn([$naoLotado]);
        $integracaoRepo->shouldReceive('getUsuariosAusentes')->andReturn([]);
        $integracaoRepo->shouldReceive('getMatriculaByCpf')->andReturn(null);

        $usuarioRepo = Mockery::mock(UsuarioRepository::class);
        $usuarioRepo->shouldReceive('findAllSemMatricula')->andReturn(new EloquentCollection());

        $unidadeIntegranteService = Mockery::mock(UnidadeIntegranteService::class);
        $unidadeIntegranteService->shouldReceive('salvarIntegrantes')->once()->andReturn([]);

        DB::shouldReceive('transaction')->zeroOrMoreTimes()->andReturnUsing(fn($cb) => $cb());

        $service = buildService($integracaoRepo, $usuarioRepo, null, $unidadeIntegranteService);
        $resultado = $service->processar();

        expect($resultado['lotacoes_inseridas'])->toBe(1);
    });
});

describe('SipecServidorAtualizacaoService - cadastrarNovos', function () {

    test('deve criar novo usuário quando matrícula não existe', function () {
        setupLogMockAtualizacao();

        $ausente = (object) [
            'matricula' => '9999999', 'nome' => 'Maria Nova', 'cpf' => '98765432100',
            'emailfuncional' => 'maria@gov.br', 'sexo' => 'FEMININO', 'uf' => 'DF',
            'data_nascimento' => '1985-05-10', 'telefone' => null, 'apelido' => 'Maria',
            'exercicio' => '2000', 'situacao_funcional' => 'ATIVO_PERMANENTE',
            'data_modificacao' => '2025-06-01', 'ident_unica' => '123', 'modalidade_pgd' => '2', 'gestor' => null,
        ];

        $unidade = Mockery::mock(Unidade::class)->makePartial();
        $unidade->id = 'unidade-2000-id';

        $usuarioCriado = Mockery::mock(Usuario::class)->makePartial();
        $usuarioCriado->id = 'new-user-id';

        $integracaoRepo = Mockery::mock(IntegracaoServidorRepository::class);
        $integracaoRepo->shouldReceive('buscarAtualizacoesDados')->andReturn([]);
        $integracaoRepo->shouldReceive('getAtualizacoesLotacoes')->andReturn([]);
        $integracaoRepo->shouldReceive('getServidoresInseridosNaoLotados')->andReturn([]);
        $integracaoRepo->shouldReceive('getUsuariosAusentes')->once()->andReturn([$ausente]);
        $integracaoRepo->shouldReceive('getMatriculaByCpf')->andReturn(null);

        $usuarioRepo = Mockery::mock(UsuarioRepository::class);
        $usuarioRepo->shouldReceive('findAllSemMatricula')->andReturn(new EloquentCollection());
        $usuarioRepo->shouldReceive('findByCpfAndLotacao')->with('98765432100', 'unidade-2000-id', 'LOTADO')->andReturn(null);
        $usuarioRepo->shouldReceive('findByEmail')->andReturn(null);
        $usuarioRepo->shouldReceive('create')
            ->with(Mockery::on(fn(array $a) => $a['cpf'] === '98765432100' && $a['matricula'] === '9999999' && $a['modalidade_pgd'] === 'parcial'))
            ->once()->andReturn($usuarioCriado);

        $unidadeRepo = Mockery::mock(UnidadeRepository::class);
        $unidadeRepo->shouldReceive('findByCodigo')->with('2000')->andReturn($unidade);

        $unidadeIntegranteService = Mockery::mock(UnidadeIntegranteService::class);
        $unidadeIntegranteService->shouldReceive('salvarIntegrantes')->once()->andReturn([]);

        DB::shouldReceive('transaction')->zeroOrMoreTimes()->andReturnUsing(fn($cb) => $cb());

        $service = buildService($integracaoRepo, $usuarioRepo, $unidadeRepo, $unidadeIntegranteService);
        $resultado = $service->processar();

        expect($resultado['usuarios_criados'])->toBe(1)
            ->and($resultado['erros'])->toBe(0);
    });

    test('deve atualizar matrícula quando CPF já existe na mesma unidade sem matrícula', function () {
        setupLogMockAtualizacao();

        $ausente = (object) [
            'matricula' => '8888888', 'nome' => 'Pedro', 'cpf' => '11122233344',
            'emailfuncional' => null, 'sexo' => null, 'uf' => null,
            'data_nascimento' => null, 'telefone' => null, 'apelido' => null,
            'exercicio' => '3000', 'situacao_funcional' => 'ATIVO_PERMANENTE',
            'data_modificacao' => null, 'ident_unica' => null, 'modalidade_pgd' => null, 'gestor' => null,
        ];

        $unidade = Mockery::mock(Unidade::class)->makePartial();
        $unidade->id = 'unidade-3000-id';

        $usuarioExistente = Mockery::mock(Usuario::class)->makePartial();
        $usuarioExistente->id = 'existing-user-id';
        $usuarioExistente->matricula = null;

        $integracaoRepo = Mockery::mock(IntegracaoServidorRepository::class);
        $integracaoRepo->shouldReceive('buscarAtualizacoesDados')->andReturn([]);
        $integracaoRepo->shouldReceive('getAtualizacoesLotacoes')->andReturn([]);
        $integracaoRepo->shouldReceive('getServidoresInseridosNaoLotados')->andReturn([]);
        $integracaoRepo->shouldReceive('getUsuariosAusentes')->andReturn([$ausente]);
        $integracaoRepo->shouldReceive('getMatriculaByCpf')->andReturn(null);

        $usuarioRepo = Mockery::mock(UsuarioRepository::class);
        $usuarioRepo->shouldReceive('findAllSemMatricula')->andReturn(new EloquentCollection());
        $usuarioRepo->shouldReceive('findByCpfAndLotacao')->with('11122233344', 'unidade-3000-id', 'LOTADO')->andReturn($usuarioExistente);
        $usuarioRepo->shouldReceive('update')->with('existing-user-id', ['matricula' => '8888888'])->once()->andReturn($usuarioExistente);

        $unidadeRepo = Mockery::mock(UnidadeRepository::class);
        $unidadeRepo->shouldReceive('findByCodigo')->with('3000')->andReturn($unidade);

        DB::shouldReceive('transaction')->zeroOrMoreTimes()->andReturnUsing(fn($cb) => $cb());

        $service = buildService($integracaoRepo, $usuarioRepo, $unidadeRepo);
        $resultado = $service->processar();

        expect($resultado['matriculas_atualizadas'])->toBe(1)
            ->and($resultado['usuarios_criados'])->toBe(0);
    });

    test('deve criar novo usuário quando batch já alterou matrícula do mesmo CPF+unidade', function () {
        setupLogMockAtualizacao();

        $ausente1 = (object) [
            'matricula' => '1111111', 'nome' => 'Ana', 'cpf' => '55566677788',
            'emailfuncional' => null, 'sexo' => null, 'uf' => null, 'data_nascimento' => null,
            'telefone' => null, 'apelido' => null, 'exercicio' => '4000',
            'situacao_funcional' => 'ATIVO_PERMANENTE', 'data_modificacao' => null,
            'ident_unica' => null, 'modalidade_pgd' => null, 'gestor' => null,
        ];
        $ausente2 = (object) [
            'matricula' => '2222222', 'nome' => 'Ana', 'cpf' => '55566677788',
            'emailfuncional' => null, 'sexo' => null, 'uf' => null, 'data_nascimento' => null,
            'telefone' => null, 'apelido' => null, 'exercicio' => '4000',
            'situacao_funcional' => 'ATIVO_PERMANENTE', 'data_modificacao' => null,
            'ident_unica' => null, 'modalidade_pgd' => null, 'gestor' => null,
        ];

        $unidade = Mockery::mock(Unidade::class)->makePartial();
        $unidade->id = 'unidade-4000-id';

        $usuarioExistente = Mockery::mock(Usuario::class)->makePartial();
        $usuarioExistente->id = 'existing-id';
        $usuarioExistente->matricula = '0000000';

        $usuarioCriado = Mockery::mock(Usuario::class)->makePartial();
        $usuarioCriado->id = 'new-id';

        $integracaoRepo = Mockery::mock(IntegracaoServidorRepository::class);
        $integracaoRepo->shouldReceive('buscarAtualizacoesDados')->andReturn([]);
        $integracaoRepo->shouldReceive('getAtualizacoesLotacoes')->andReturn([]);
        $integracaoRepo->shouldReceive('getServidoresInseridosNaoLotados')->andReturn([]);
        $integracaoRepo->shouldReceive('getUsuariosAusentes')->once()->andReturn([$ausente1, $ausente2]);
        $integracaoRepo->shouldReceive('getMatriculaByCpf')->andReturn(null);

        $usuarioRepo = Mockery::mock(UsuarioRepository::class);
        $usuarioRepo->shouldReceive('findAllSemMatricula')->andReturn(new EloquentCollection());
        $usuarioRepo->shouldReceive('findByCpfAndLotacao')->with('55566677788', 'unidade-4000-id', 'LOTADO')->andReturn($usuarioExistente);
        $usuarioRepo->shouldReceive('update')->with('existing-id', ['matricula' => '1111111'])->once()->andReturn($usuarioExistente);
        $usuarioRepo->shouldReceive('findByEmail')->andReturn(null);
        $usuarioRepo->shouldReceive('create')->once()->andReturn($usuarioCriado);

        $unidadeRepo = Mockery::mock(UnidadeRepository::class);
        $unidadeRepo->shouldReceive('findByCodigo')->with('4000')->andReturn($unidade);

        $unidadeIntegranteService = Mockery::mock(UnidadeIntegranteService::class);
        $unidadeIntegranteService->shouldReceive('salvarIntegrantes')->once()->andReturn([]);

        DB::shouldReceive('transaction')->zeroOrMoreTimes()->andReturnUsing(fn($cb) => $cb());

        $service = buildService($integracaoRepo, $usuarioRepo, $unidadeRepo, $unidadeIntegranteService);
        $resultado = $service->processar();

        expect($resultado['matriculas_atualizadas'])->toBe(1)
            ->and($resultado['usuarios_criados'])->toBe(1);
    });
});
