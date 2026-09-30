<?php

declare(strict_types=1);

use App\DTOs\RelatorioAgente\RelatorioAgenteQueryDTO;
use App\Exceptions\ServerException;
use App\Http\Controllers\RelatorioAgenteController;
use App\Models\Usuario;
use App\Services\RelatorioAgenteAuthorization;
use App\Services\RelatorioAgenteService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\Response;
use Tests\TestCase;

uses(TestCase::class);

afterEach(function () {
    Mockery::close();
});

function makeRelatorioAgenteControllerUsuario(string $id = 'usuario-1'): Usuario
{
    $usuario = new Usuario();
    $usuario->id = $id;

    return $usuario;
}

function makeRelatorioAgenteController(
    ?RelatorioAgenteService $service = null,
    ?RelatorioAgenteAuthorization $authorization = null,
): RelatorioAgenteController {
    return new RelatorioAgenteController(
        $service ?? Mockery::mock(RelatorioAgenteService::class),
        $authorization ?? Mockery::mock(RelatorioAgenteAuthorization::class),
    );
}

test('query retorna json com linhas quando autorizado', function () {
    $usuario = makeRelatorioAgenteControllerUsuario();
    $queryDto = RelatorioAgenteQueryDTO::fromValidatedRequest([
        'filters' => ['unidade_id' => 'u-1'],
        'page' => 1,
        'limit' => 10,
    ]);

    $authorization = Mockery::mock(RelatorioAgenteAuthorization::class);
    $authorization->shouldReceive('usuarioAutorizado')->once()->andReturn($usuario);
    $authorization->shouldReceive('aplicarFiltroParticipante')
        ->once()
        ->with(Mockery::type(RelatorioAgenteQueryDTO::class), $usuario)
        ->andReturn($queryDto);

    $service = Mockery::mock(RelatorioAgenteService::class);
    $service->shouldReceive('query')
        ->once()
        ->with($queryDto->toQueryArray())
        ->andReturn([
            'count' => 1,
            'rows' => collect([(object) ['id' => 'ag-1', 'nome' => 'Ana']]),
        ]);

    $response = makeRelatorioAgenteController($service, $authorization)->query(
        Request::create('/api/RelatorioAgente/query', 'POST', [
            'filters' => ['unidade_id' => 'u-1'],
            'page' => 1,
            'limit' => 10,
        ]),
    );

    expect($response)->toBeInstanceOf(JsonResponse::class)
        ->and($response->getStatusCode())->toBe(Response::HTTP_OK)
        ->and($response->getData(true))->toMatchArray([
            'success' => true,
            'count' => 1,
            'extra' => [],
        ])
        ->and($response->getData(true)['rows'])->toHaveCount(1);
});

test('query rejeita acesso sem autorização', function () {
    $authorization = Mockery::mock(RelatorioAgenteAuthorization::class);
    $authorization->shouldReceive('usuarioAutorizado')
        ->once()
        ->andThrow(new ServerException('RelatorioAgente', RelatorioAgenteAuthorization::MSG_ACESSO_NEGADO));

    $response = makeRelatorioAgenteController(
        Mockery::mock(RelatorioAgenteService::class),
        $authorization,
    )->query(Request::create('/api/RelatorioAgente/query', 'POST', []));

    expect($response)->toBeInstanceOf(JsonResponse::class)
        ->and($response->getStatusCode())->toBe(Response::HTTP_FORBIDDEN)
        ->and($response->getData(true)['error'])->toContain(RelatorioAgenteAuthorization::MSG_ACESSO_NEGADO);
});

test('query retorna 422 quando a validação falha', function () {
    $usuario = makeRelatorioAgenteControllerUsuario();

    $authorization = Mockery::mock(RelatorioAgenteAuthorization::class);
    $authorization->shouldReceive('usuarioAutorizado')->once()->andReturn($usuario);
    $authorization->shouldReceive('aplicarFiltroParticipante')->never();

    $response = makeRelatorioAgenteController(
        Mockery::mock(RelatorioAgenteService::class),
        $authorization,
    )->query(Request::create('/api/RelatorioAgente/query', 'POST', [
        'filters' => [
            'data_inicial_pedagio' => 'data-invalida',
        ],
    ]));

    expect($response)->toBeInstanceOf(JsonResponse::class)
        ->and($response->getStatusCode())->toBe(Response::HTTP_UNPROCESSABLE_ENTITY)
        ->and($response->getData(true))->toHaveKey('error');
});

test('query retorna 500 quando ocorre erro inesperado', function () {
    Log::shouldReceive('error')->once();

    $usuario = makeRelatorioAgenteControllerUsuario();
    $queryDto = RelatorioAgenteQueryDTO::fromValidatedRequest([]);

    $authorization = Mockery::mock(RelatorioAgenteAuthorization::class);
    $authorization->shouldReceive('usuarioAutorizado')->once()->andReturn($usuario);
    $authorization->shouldReceive('aplicarFiltroParticipante')
        ->once()
        ->andReturn($queryDto);

    $service = Mockery::mock(RelatorioAgenteService::class);
    $service->shouldReceive('query')
        ->once()
        ->andThrow(new RuntimeException('falha interna'));

    $response = makeRelatorioAgenteController($service, $authorization)->query(
        Request::create('/api/RelatorioAgente/query', 'POST', []),
    );

    expect($response)->toBeInstanceOf(JsonResponse::class)
        ->and($response->getStatusCode())->toBe(Response::HTTP_INTERNAL_SERVER_ERROR)
        ->and($response->getData(true)['error'])->toBe('Ocorreu um erro inesperado.');
});

test('query no endpoint xls dispara download do excel', function () {
    Excel::fake();

    $usuario = makeRelatorioAgenteControllerUsuario();
    $queryDto = RelatorioAgenteQueryDTO::fromValidatedRequest([
        'filters' => ['unidade_id' => 'u-1'],
    ]);

    $authorization = Mockery::mock(RelatorioAgenteAuthorization::class);
    $authorization->shouldReceive('usuarioAutorizado')->once()->andReturn($usuario);
    $authorization->shouldReceive('aplicarFiltroParticipante')
        ->once()
        ->andReturn($queryDto);

    $service = Mockery::mock(RelatorioAgenteService::class);
    $service->shouldReceive('query')
        ->once()
        ->andReturn([
            'count' => 1,
            'rows' => collect([(object) ['id' => 'ag-1']]),
        ]);

    makeRelatorioAgenteController($service, $authorization)->query(
        Request::create('/api/RelatorioAgente/xls', 'POST', [
            'filters' => ['unidade_id' => 'u-1'],
        ]),
    );

    Excel::assertDownloaded('relatorio-agentes.xlsx');
});
