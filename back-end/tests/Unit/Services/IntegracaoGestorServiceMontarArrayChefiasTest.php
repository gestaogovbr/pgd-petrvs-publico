<?php

use App\Services\IntegracaoGestorService;
use Illuminate\Support\Facades\DB;
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

function createDbQueryMockChefias(mixed $returnValue, string $method = 'get'): object
{
    $queryMock = Mockery::mock('Illuminate\Database\Query\Builder');
    $queryMock->shouldReceive('join')->andReturnSelf();
    $queryMock->shouldReceive('select')->andReturnSelf();
    $queryMock->shouldReceive('where')->andReturnSelf();
    $queryMock->shouldReceive('whereNull')->andReturnSelf();
    $queryMock->shouldReceive($method)->andReturn($returnValue);
    return $queryMock;
}

function invokeMontarArrayChefias(IntegracaoGestorService|MockInterface $service): array
{
    $method = new ReflectionMethod(IntegracaoGestorService::class, 'montarArrayChefias');
    $method->setAccessible(true);
    return $method->invoke($service);
}

function createChefiasServiceMock(): MockInterface
{
    return Mockery::mock(IntegracaoGestorService::class)
        ->makePartial()
        ->shouldAllowMockingProtectedMethods();
}

describe('IntegracaoGestorService - montarArrayChefias', function () {

    it('deve retornar chefia com id_chefe null quando cpf_chefe for vazio', function () {
        setupSiapeLogMockChefias();

        $unidade = (object) [
            'id_unidade' => 10,
            'codigo_unidade' => '001',
            'cpf_chefe' => null,
        ];

        $queryUnidades = createDbQueryMockChefias(collect([$unidade]));
        DB::shouldReceive('table')->with('integracao_unidades as iu')->andReturn($queryUnidades);

        $service = createChefiasServiceMock();
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

        $queryUnidades = createDbQueryMockChefias(collect([$unidade]));
        $queryServidores = createDbQueryMockChefias(null, 'first');

        DB::shouldReceive('table')->with('integracao_unidades as iu')->andReturn($queryUnidades);
        DB::shouldReceive('table')->with('integracao_servidores')->andReturn($queryServidores);

        $service = createChefiasServiceMock();
        $service->shouldReceive('findUsuarioByCpf')
            ->with('12345678901')
            ->andReturn(null);

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

        $mockUsuario = Mockery::mock(\App\Models\Usuario::class)->makePartial();
        $mockUsuario->id = 5;

        $queryUnidades = createDbQueryMockChefias(collect([$unidade]));
        $queryServidores = createDbQueryMockChefias((object) ['cpf' => '12345678901'], 'first');
        $queryChefia = createDbQueryMockChefias(true, 'exists');

        DB::shouldReceive('table')->with('integracao_unidades as iu')->andReturn($queryUnidades);
        DB::shouldReceive('table')->with('integracao_servidores')->andReturn($queryServidores);
        DB::shouldReceive('table')->with('usuarios as u')->andReturn($queryChefia);

        $service = createChefiasServiceMock();
        $service->shouldReceive('findUsuarioByCpf')
            ->with('12345678901')
            ->andReturn($mockUsuario);

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

        $mockUsuario = Mockery::mock(\App\Models\Usuario::class)->makePartial();
        $mockUsuario->id = 5;

        $queryUnidades = createDbQueryMockChefias(collect([$unidade]));
        $queryServidores = createDbQueryMockChefias((object) ['cpf' => '12345678901'], 'first');
        $queryChefia = createDbQueryMockChefias(false, 'exists');

        DB::shouldReceive('table')->with('integracao_unidades as iu')->andReturn($queryUnidades);
        DB::shouldReceive('table')->with('integracao_servidores')->andReturn($queryServidores);
        DB::shouldReceive('table')->with('usuarios as u')->andReturn($queryChefia);

        $service = createChefiasServiceMock();
        $service->shouldReceive('findUsuarioByCpf')
            ->with('12345678901')
            ->andReturn($mockUsuario);

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

        $mockUsuario = Mockery::mock(\App\Models\Usuario::class)->makePartial();
        $mockUsuario->id = 7;

        $queryUnidades = createDbQueryMockChefias(collect([$unidade]));
        $queryServidores = createDbQueryMockChefias(null, 'first');
        $queryChefia = createDbQueryMockChefias(false, 'exists');

        DB::shouldReceive('table')->with('integracao_unidades as iu')->andReturn($queryUnidades);
        DB::shouldReceive('table')->with('integracao_servidores')->andReturn($queryServidores);
        DB::shouldReceive('table')->with('usuarios as u')->andReturn($queryChefia);

        $service = createChefiasServiceMock();
        $service->shouldReceive('findUsuarioByCpf')
            ->with('99988877766')
            ->andReturn($mockUsuario);

        // Garante que salvarIntegrantes NÃO é chamado (regra de negócio removida)
        $unidadeIntegranteService = Mockery::mock(\App\Services\UnidadeIntegranteService::class);
        $unidadeIntegranteService->shouldNotReceive('salvarIntegrantes');
        $service->unidadeIntegranteService = $unidadeIntegranteService;

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

        $queryUnidades = createDbQueryMockChefias($unidades);

        // Servidor encontrado para ambos CPFs
        $queryServidores = createDbQueryMockChefias((object) ['cpf' => 'any'], 'first');

        // Primeiro chefe já é gestor, segundo não
        $queryChefia1 = createDbQueryMockChefias(true, 'exists');
        $queryChefia2 = createDbQueryMockChefias(false, 'exists');

        DB::shouldReceive('table')->with('integracao_unidades as iu')->once()->andReturn($queryUnidades);
        DB::shouldReceive('table')->with('integracao_servidores')->twice()->andReturn($queryServidores);
        DB::shouldReceive('table')->with('usuarios as u')->twice()
            ->andReturn($queryChefia1, $queryChefia2);

        $service = createChefiasServiceMock();
        $mockUsuario2 = Mockery::mock(\App\Models\Usuario::class)->makePartial();
        $mockUsuario2->id = 2;
        $mockUsuario3 = Mockery::mock(\App\Models\Usuario::class)->makePartial();
        $mockUsuario3->id = 3;

        $service->shouldReceive('findUsuarioByCpf')
            ->with('11122233344')->andReturn($mockUsuario2);
        $service->shouldReceive('findUsuarioByCpf')
            ->with('55566677788')->andReturn($mockUsuario3);

        $result = invokeMontarArrayChefias($service);

        // Unidade 1: cpf vazio -> id_chefe null
        // Unidade 2: já é gestor -> ignorado
        // Unidade 3: não é gestor -> adicionado
        expect($result)->toHaveCount(2)
            ->and($result[0])->toBe(['id_unidade' => 1, 'id_chefe' => null])
            ->and($result[1])->toBe(['id_unidade' => 3, 'id_chefe' => 3]);
    });
});
