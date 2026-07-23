<?php

use App\Enums\Atribuicao;
use App\Models\IntegracaoServidor;
use App\Models\Usuario;
use App\Repository\IntegracaoServidorRepository;
use App\Repository\IntegracaoUnidadeRepository;
use App\Repository\UnidadeIntegranteAtribuicaoRepository;
use App\Repository\UnidadeIntegranteRepository;
use App\Repository\UsuarioRepository;
use App\Services\NivelAcessoService;
use App\Services\Sipec\Gestor\SipecGestorIntegracaoService;
use App\Services\UnidadeIntegranteService;
use Illuminate\Support\Facades\Log;
use Psr\Log\LoggerInterface;
use Tests\TestCase;

uses(TestCase::class);

afterEach(function () {
    Mockery::close();
});

function setupLogMockGestor(): void
{
    $loggerMock = Mockery::mock(LoggerInterface::class);
    $loggerMock->shouldReceive('info', 'warning', 'error', 'debug', 'notice', 'log', 'critical', 'alert', 'emergency')->withAnyArgs();
    Log::shouldReceive('channel')->andReturn($loggerMock);
    Log::shouldReceive('error', 'info', 'warning', 'debug', 'critical', 'log', 'alert', 'emergency', 'notice')->withAnyArgs();
}

function buildGestorService(
    ?IntegracaoUnidadeRepository $integracaoUnidadeRepo = null,
    ?IntegracaoServidorRepository $integracaoServidorRepo = null,
    ?UsuarioRepository $usuarioRepo = null,
    ?UnidadeIntegranteService $unidadeIntegranteService = null,
): SipecGestorIntegracaoService {
    $nivelAcessoService = Mockery::mock(NivelAcessoService::class);

    return new SipecGestorIntegracaoService(
        $integracaoUnidadeRepo ?? Mockery::mock(IntegracaoUnidadeRepository::class),
        $integracaoServidorRepo ?? Mockery::mock(IntegracaoServidorRepository::class),
        $usuarioRepo ?? Mockery::mock(UsuarioRepository::class),
        $unidadeIntegranteService ?? Mockery::mock(UnidadeIntegranteService::class),
        Mockery::mock(UnidadeIntegranteRepository::class),
        Mockery::mock(UnidadeIntegranteAtribuicaoRepository::class),
        $nivelAcessoService,
    );
}

function mockUnidadeChefia(?string $cpfTitular, ?string $cpfSubstituto = null): object
{
    return (object) [
        'id_unidade' => 'unidade-uuid',
        'codigo_unidade' => '1000',
        'cpf_titular' => $cpfTitular,
        'cpf_substituto' => $cpfSubstituto,
    ];
}

describe('SipecGestorIntegracaoService', function () {

    test('deve ignorar quando servidor não encontrado em integracao_servidores', function () {
        setupLogMockGestor();

        $integracaoUnidadeRepo = Mockery::mock(IntegracaoUnidadeRepository::class);
        $integracaoUnidadeRepo->shouldReceive('getUnidadesComChefiasCompleto')
            ->andReturn(collect([mockUnidadeChefia('99999999999')]));

        $integracaoServidorRepo = Mockery::mock(IntegracaoServidorRepository::class);
        $integracaoServidorRepo->shouldReceive('findByCpfAndCodigoExercicio')
            ->with('99999999999', '1000')
            ->andReturn(null);

        $usuarioRepo = Mockery::mock(UsuarioRepository::class);
        $usuarioRepo->shouldNotReceive('findByMatricula');

        $unidadeIntegranteService = Mockery::mock(UnidadeIntegranteService::class);
        $unidadeIntegranteService->shouldNotReceive('salvarIntegrantes');

        $service = buildGestorService($integracaoUnidadeRepo, $integracaoServidorRepo, $usuarioRepo, $unidadeIntegranteService);
        $resultado = $service->processar();

        expect($resultado['ignorados'])->toBe(1)
            ->and($resultado['titulares_atualizados'])->toBe(0);
    });

    test('deve ignorar quando usuario já é gestor da unidade', function () {
        setupLogMockGestor();

        $servidor = Mockery::mock(IntegracaoServidor::class)->makePartial();
        $servidor->matriculasiape = '1111111';

        $usuario = Mockery::mock(Usuario::class)->makePartial();
        $usuario->id = 'user-already-gestor';

        $integracaoUnidadeRepo = Mockery::mock(IntegracaoUnidadeRepository::class);
        $integracaoUnidadeRepo->shouldReceive('getUnidadesComChefiasCompleto')
            ->andReturn(collect([mockUnidadeChefia('33333333333')]));

        $integracaoServidorRepo = Mockery::mock(IntegracaoServidorRepository::class);
        $integracaoServidorRepo->shouldReceive('findByCpfAndCodigoExercicio')->andReturn($servidor);

        $usuarioRepo = Mockery::mock(UsuarioRepository::class);
        $usuarioRepo->shouldReceive('findByMatricula')->andReturn($usuario);
        $usuarioRepo->shouldReceive('isIntegrante')
            ->with('user-already-gestor', 'unidade-uuid', Atribuicao::GESTOR->value)
            ->andReturn(true);

        $unidadeIntegranteService = Mockery::mock(UnidadeIntegranteService::class);
        $unidadeIntegranteService->shouldNotReceive('salvarIntegrantes');

        $service = buildGestorService($integracaoUnidadeRepo, $integracaoServidorRepo, $usuarioRepo, $unidadeIntegranteService);
        $resultado = $service->processar();

        expect($resultado['titulares_atualizados'])->toBe(0);
    });

    // Testes de fluxo completo (transferirTitularidade, promoverPerfilParaChefia)
    // requerem integration test com BD real — mocks de Eloquent model não funcionam
    // adequadamente no Pest para propriedades acessadas via __get (id, perfil_id).
});
