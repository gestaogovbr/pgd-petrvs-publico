<?php

use App\Models\Perfil;
use App\Models\Usuario;
use App\Repository\IntegracaoServidorRepository;
use App\Repository\UnidadeRepository;
use App\Repository\UsuarioRepository;
use App\Services\Sipec\Servidor\SipecServidorAtualizacaoService;
use App\Services\UnidadeIntegranteService;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;
use Illuminate\Support\Facades\Log;
use Psr\Log\LoggerInterface;
use Tests\TestCase;

uses(TestCase::class);

afterEach(function () {
    Mockery::close();
});

function setupLogMockServidorAtualizacao(): void
{
    $loggerMock = Mockery::mock(LoggerInterface::class);
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
    $p = $perfil;
    if ($p === null) {
        $p = new Perfil();
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
        setupLogMockServidorAtualizacao();

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



        $service = buildService($integracaoRepo, $usuarioRepo);
        $resultado = $service->processar();

        expect($resultado['dados_pessoais'])->toBe(1);
    });

    test('deve pular registro sem id', function () {
        setupLogMockServidorAtualizacao();

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



        $service = buildService($integracaoRepo, $usuarioRepo);
        $resultado = $service->processar();

        expect($resultado['dados_pessoais'])->toBe(0);
    });
});

describe('SipecServidorAtualizacaoService - atualizarLotacoes', function () {

    test('deve mover lotação quando unidade mudou', function () {
        setupLogMockServidorAtualizacao();

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



        $service = buildService($integracaoRepo, $usuarioRepo, null, $unidadeIntegranteService);
        $resultado = $service->processar();

        expect($resultado['lotacoes_movidas'])->toBe(1);
    });

    test('deve inserir lotação de servidor não lotado', function () {
        setupLogMockServidorAtualizacao();

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



        $service = buildService($integracaoRepo, $usuarioRepo, null, $unidadeIntegranteService);
        $resultado = $service->processar();

        expect($resultado['lotacoes_inseridas'])->toBe(1);
    });
});

// Testes de cadastrarNovos movidos para tests/IntegrationTenant/Services/SipecServidorAtualizacaoServiceTest.php
// Requerem BD real com factories para testar corretamente o fluxo de matrículas duplicadas.

