<?php

declare(strict_types=1);

use App\Exceptions\ServerException;
use App\Http\Controllers\RelatorioUnidadeController;
use App\Models\Usuario;
use App\Services\RelatorioUnidadeAuthorization;
use App\Services\RelatorioUnidadeService;
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

function makeRelatorioUnidadeControllerUsuario(string $id = 'usuario-1'): Usuario
{
    $usuario = new Usuario();
    $usuario->id = $id;

    return $usuario;
}

function makeRelatorioUnidadeController(
    ?RelatorioUnidadeService $service = null,
    ?RelatorioUnidadeAuthorization $authorization = null,
): RelatorioUnidadeController {
    return new RelatorioUnidadeController(
        $service ?? Mockery::mock(RelatorioUnidadeService::class),
        $authorization ?? Mockery::mock(RelatorioUnidadeAuthorization::class),
    );
}

test('query retorna json com linhas quando autorizado', function () {
    $usuario = makeRelatorioUnidadeControllerUsuario();

    $authorization = Mockery::mock(RelatorioUnidadeAuthorization::class);
    $authorization->shouldReceive('usuarioAutorizado')->once()->andReturn($usuario);

    $service = Mockery::mock(RelatorioUnidadeService::class);
    $service->shouldReceive('query')
        ->once()
        ->with(Mockery::on(function (array $data): bool {
            return ($data['filters']['unidade_id'] ?? null) === 'u-1'
                && $data['page'] === 1
                && $data['limit'] === 10;
        }))
        ->andReturn([
            'count' => 1,
            'rows' => collect([(object) ['unidade_id' => 'u-1', 'sigla' => 'ABC']]),
            'extra' => null,
        ]);

    $response = makeRelatorioUnidadeController($service, $authorization)->query(
        Request::create('/api/RelatorioUnidade/query', 'POST', [
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
            'extra' => null,
        ])
        ->and($response->getData(true)['rows'])->toHaveCount(1);
});

test('query rejeita acesso sem autorização', function () {
    $authorization = Mockery::mock(RelatorioUnidadeAuthorization::class);
    $authorization->shouldReceive('usuarioAutorizado')
        ->once()
        ->andThrow(new ServerException('RelatorioUnidade'));

    $response = makeRelatorioUnidadeController(
        Mockery::mock(RelatorioUnidadeService::class),
        $authorization,
    )->query(Request::create('/api/RelatorioUnidade/query', 'POST', []));

    expect($response)->toBeInstanceOf(JsonResponse::class)
        ->and($response->getStatusCode())->toBe(Response::HTTP_FORBIDDEN)
        ->and($response->getData(true)['error'])->toContain(RelatorioUnidadeAuthorization::MSG_ACESSO_NEGADO);
});

test('query no endpoint xls dispara download do excel', function () {
    Excel::fake();

    $usuario = makeRelatorioUnidadeControllerUsuario();

    $authorization = Mockery::mock(RelatorioUnidadeAuthorization::class);
    $authorization->shouldReceive('usuarioAutorizado')->once()->andReturn($usuario);

    $service = Mockery::mock(RelatorioUnidadeService::class);
    $service->shouldReceive('query')
        ->once()
        ->andReturn([
            'count' => 1,
            'rows' => collect([(object) ['unidade_id' => 'u-1']]),
            'extra' => null,
        ]);

    makeRelatorioUnidadeController($service, $authorization)->query(
        Request::create('/api/RelatorioUnidade/xls', 'POST', [
            'filters' => ['unidade_id' => 'u-1'],
        ]),
    );

    Excel::assertDownloaded('relatorio-unidades.xlsx');
});

test('query retorna 500 quando ocorre erro inesperado', function () {
    Log::shouldReceive('error')->once();

    $usuario = makeRelatorioUnidadeControllerUsuario();

    $authorization = Mockery::mock(RelatorioUnidadeAuthorization::class);
    $authorization->shouldReceive('usuarioAutorizado')->once()->andReturn($usuario);

    $service = Mockery::mock(RelatorioUnidadeService::class);
    $service->shouldReceive('query')
        ->once()
        ->andThrow(new RuntimeException('falha interna'));

    $response = makeRelatorioUnidadeController($service, $authorization)->query(
        Request::create('/api/RelatorioUnidade/query', 'POST', []),
    );

    expect($response)->toBeInstanceOf(JsonResponse::class)
        ->and($response->getStatusCode())->toBe(Response::HTTP_INTERNAL_SERVER_ERROR)
        ->and($response->getData(true)['error'])->toBe('Ocorreu um erro inesperado.');
});
