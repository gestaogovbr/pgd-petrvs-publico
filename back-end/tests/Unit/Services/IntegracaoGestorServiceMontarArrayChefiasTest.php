<?php

use App\Services\IntegracaoGestorService;
use App\Models\Usuario;
use App\Models\IntegracaoServidor;
use App\Repository\IntegracaoUnidadeRepository;
use App\Repository\IntegracaoServidorRepository;
use App\Repository\UsuarioRepository;
use Illuminate\Support\Facades\Log;
use Mockery\MockInterface;
use Tests\TestCase;

uses(TestCase::class);

afterEach(function () {
    Mockery::close();
});

function setupSiapeLogMockChefias(): void
{
    $loggerMock = Mockery::mock(\Psr\Log\LoggerInterface::class);
    $loggerMock->shouldReceive('info', 'warning', 'error', 'debug', 'notice')->withAnyArgs();
    Log::shouldReceive('channel')->with('siape')->andReturn($loggerMock);
}

function invokeMontarArrayChefias(IntegracaoGestorService|MockInterface $service): array
{
    $method = new ReflectionMethod(IntegracaoGestorService::class, 'montarArrayChefias');
    $method->setAccessible(true);
    return $method->invoke($service);
}

function createChefiasServiceWithMocks(
    ?IntegracaoUnidadeRepository $integracaoUnidadeRepo = null,
    ?IntegracaoServidorRepository $integracaoServidorRepo = null,
    ?UsuarioRepository $usuarioRepo = null,
): IntegracaoGestorService {
    return new IntegracaoGestorService(
        $integracaoUnidadeRepo ?? Mockery::mock(IntegracaoUnidadeRepository::class),
        $integracaoServidorRepo ?? Mockery::mock(IntegracaoServidorRepository::class),
        $usuarioRepo ?? Mockery::mock(UsuarioRepository::class),
    );
}

describe('IntegracaoGestorService - montarArrayChefias', function () {

    it('deve retornar chefia com id_chefe null quando cpf_chefe for vazio', function () {
        setupSiapeLogMockChefias();

        $unidade = (object) [
            'id_unidade' => 10,
            'codigo_unidade' => '001',
            'cpf_chefe' => null,
        ];

        $integracaoUnidadeRepo = Mockery::mock(IntegracaoUnidadeRepository::class);
        $integracaoUnidadeRepo->shouldReceive('getUnidadesComChefias')
            ->once()
            ->andReturn(collect([$unidade]));

        $service = createChefiasServiceWithMocks(integracaoUnidadeRepo: $integracaoUnidadeRepo);
        $result = invokeMontarArrayChefias($service);

        expect($result)->toHaveCount(1)
            ->and($result[0]['id_unidade'])->toBe(10)
            ->and($result[0]['id_chefe'])->toBeNull();
    });

    it('deve ignorar chefe quando usuario nao existe na tabela usuarios', function () {
        setupSiapeLogMockChefias();

        $unidade = (object) [
            'id_unidade' => 10,
            'codigo_unidade' => '001',
            'cpf_chefe' => '12345678901',
        ];

        $integracaoUnidadeRepo = Mockery::mock(IntegracaoUnidadeRepository::class);
        $integracaoUnidadeRepo->shouldReceive('getUnidadesComChefias')
            ->once()
            ->andReturn(collect([$unidade]));

        $integracaoServidorRepo = Mockery::mock(IntegracaoServidorRepository::class);
        $integracaoServidorRepo->shouldReceive('findByCpfAndCodigoExercicio')
            ->with('12345678901', '001')
            ->andReturn(null);

        $usuarioRepo = Mockery::mock(UsuarioRepository::class);
        $usuarioRepo->shouldReceive('findByCpf')
            ->with('12345678901')
            ->andReturn(null);

        $service = createChefiasServiceWithMocks($integracaoUnidadeRepo, $integracaoServidorRepo, $usuarioRepo);
        $result = invokeMontarArrayChefias($service);

        expect($result)->toBeEmpty();
    });

    it('deve ignorar chefe que ja possui chefia na unidade', function () {
        setupSiapeLogMockChefias();

        $unidade = (object) [
            'id_unidade' => 10,
            'codigo_unidade' => '001',
            'cpf_chefe' => '12345678901',
        ];

        $mockUsuario = Mockery::mock(Usuario::class)->makePartial();
        $mockUsuario->id = 5;

        $integracaoUnidadeRepo = Mockery::mock(IntegracaoUnidadeRepository::class);
        $integracaoUnidadeRepo->shouldReceive('getUnidadesComChefias')
            ->once()
            ->andReturn(collect([$unidade]));

        $integracaoServidorRepo = Mockery::mock(IntegracaoServidorRepository::class);
        $integracaoServidorRepo->shouldReceive('findByCpfAndCodigoExercicio')
            ->with('12345678901', '001')
            ->andReturn(Mockery::mock(IntegracaoServidor::class));

        $usuarioRepo = Mockery::mock(UsuarioRepository::class);
        $usuarioRepo->shouldReceive('findByCpf')
            ->with('12345678901')
            ->andReturn($mockUsuario);
        $usuarioRepo->shouldReceive('isIntegrante')
            ->with(5, 10, 'GESTOR')
            ->andReturn(true);

        $service = createChefiasServiceWithMocks($integracaoUnidadeRepo, $integracaoServidorRepo, $usuarioRepo);
        $result = invokeMontarArrayChefias($service);

        expect($result)->toBeEmpty();
    });

    it('deve adicionar chefia quando usuario existe e nao e chefe da unidade', function () {
        setupSiapeLogMockChefias();

        $unidade = (object) [
            'id_unidade' => 10,
            'codigo_unidade' => '001',
            'cpf_chefe' => '12345678901',
        ];

        $mockUsuario = Mockery::mock(Usuario::class)->makePartial();
        $mockUsuario->id = 5;

        $integracaoUnidadeRepo = Mockery::mock(IntegracaoUnidadeRepository::class);
        $integracaoUnidadeRepo->shouldReceive('getUnidadesComChefias')
            ->once()
            ->andReturn(collect([$unidade]));

        $integracaoServidorRepo = Mockery::mock(IntegracaoServidorRepository::class);
        $integracaoServidorRepo->shouldReceive('findByCpfAndCodigoExercicio')
            ->with('12345678901', '001')
            ->andReturn(Mockery::mock(IntegracaoServidor::class));

        $usuarioRepo = Mockery::mock(UsuarioRepository::class);
        $usuarioRepo->shouldReceive('findByCpf')
            ->with('12345678901')
            ->andReturn($mockUsuario);
        $usuarioRepo->shouldReceive('isIntegrante')
            ->with(5, 10, 'GESTOR')
            ->andReturn(false);

        $service = createChefiasServiceWithMocks($integracaoUnidadeRepo, $integracaoServidorRepo, $usuarioRepo);
        $result = invokeMontarArrayChefias($service);

        expect($result)->toHaveCount(1)
            ->and($result[0]['id_unidade'])->toBe(10)
            ->and($result[0]['id_chefe'])->toBe(5);
    });

    it('deve designar chefe sem alterar lotacao mesmo lotado em outra unidade', function () {
        setupSiapeLogMockChefias();

        $unidade = (object) [
            'id_unidade' => 10,
            'codigo_unidade' => '001',
            'cpf_chefe' => '99988877766',
        ];

        $mockUsuario = Mockery::mock(Usuario::class)->makePartial();
        $mockUsuario->id = 7;

        $integracaoUnidadeRepo = Mockery::mock(IntegracaoUnidadeRepository::class);
        $integracaoUnidadeRepo->shouldReceive('getUnidadesComChefias')
            ->once()
            ->andReturn(collect([$unidade]));

        $integracaoServidorRepo = Mockery::mock(IntegracaoServidorRepository::class);
        $integracaoServidorRepo->shouldReceive('findByCpfAndCodigoExercicio')
            ->with('99988877766', '001')
            ->andReturn(null);

        $usuarioRepo = Mockery::mock(UsuarioRepository::class);
        $usuarioRepo->shouldReceive('findByCpf')
            ->with('99988877766')
            ->andReturn($mockUsuario);
        $usuarioRepo->shouldReceive('isIntegrante')
            ->with(7, 10, 'GESTOR')
            ->andReturn(false);

        $service = createChefiasServiceWithMocks($integracaoUnidadeRepo, $integracaoServidorRepo, $usuarioRepo);
        $result = invokeMontarArrayChefias($service);

        expect($result)->toHaveCount(1)
            ->and($result[0]['id_unidade'])->toBe(10)
            ->and($result[0]['id_chefe'])->toBe(7);
    });

    it('deve processar multiplas unidades corretamente', function () {
        setupSiapeLogMockChefias();

        $unidades = collect([
            (object) ['id_unidade' => 1, 'codigo_unidade' => '001', 'cpf_chefe' => null],
            (object) ['id_unidade' => 2, 'codigo_unidade' => '002', 'cpf_chefe' => '11122233344'],
            (object) ['id_unidade' => 3, 'codigo_unidade' => '003', 'cpf_chefe' => '55566677788'],
        ]);

        $mockUsuario2 = Mockery::mock(Usuario::class)->makePartial();
        $mockUsuario2->id = 2;
        $mockUsuario3 = Mockery::mock(Usuario::class)->makePartial();
        $mockUsuario3->id = 3;

        $integracaoUnidadeRepo = Mockery::mock(IntegracaoUnidadeRepository::class);
        $integracaoUnidadeRepo->shouldReceive('getUnidadesComChefias')
            ->once()
            ->andReturn($unidades);

        $integracaoServidorRepo = Mockery::mock(IntegracaoServidorRepository::class);
        $integracaoServidorRepo->shouldReceive('findByCpfAndCodigoExercicio')
            ->with('11122233344', '002')
            ->andReturn(Mockery::mock(IntegracaoServidor::class));
        $integracaoServidorRepo->shouldReceive('findByCpfAndCodigoExercicio')
            ->with('55566677788', '003')
            ->andReturn(Mockery::mock(IntegracaoServidor::class));

        $usuarioRepo = Mockery::mock(UsuarioRepository::class);
        $usuarioRepo->shouldReceive('findByCpf')
            ->with('11122233344')
            ->andReturn($mockUsuario2);
        $usuarioRepo->shouldReceive('findByCpf')
            ->with('55566677788')
            ->andReturn($mockUsuario3);
        $usuarioRepo->shouldReceive('isIntegrante')
            ->with(2, 2, 'GESTOR')
            ->andReturn(true);
        $usuarioRepo->shouldReceive('isIntegrante')
            ->with(3, 3, 'GESTOR')
            ->andReturn(false);

        $service = createChefiasServiceWithMocks($integracaoUnidadeRepo, $integracaoServidorRepo, $usuarioRepo);
        $result = invokeMontarArrayChefias($service);

        // Unidade 1: cpf vazio -> id_chefe null
        // Unidade 2: já é gestor -> ignorado
        // Unidade 3: não é gestor -> adicionado
        expect($result)->toHaveCount(2)
            ->and($result[0])->toBe(['id_unidade' => 1, 'id_chefe' => null])
            ->and($result[1])->toBe(['id_unidade' => 3, 'id_chefe' => 3]);
    });
});
