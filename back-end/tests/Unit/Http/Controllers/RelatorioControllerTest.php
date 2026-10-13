<?php

declare(strict_types=1);

use App\Exceptions\ServerException;
use App\Http\Controllers\RelatorioController;
use App\Models\Usuario;
use App\Services\RelatorioPlanoTrabalhoAuthorization;
use App\Services\RelatorioPlanoTrabalhoDetalhadoService;
use App\Services\RelatorioPlanoTrabalhoService;
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

function makeRelatorioControllerUsuario(string $id = 'usuario-1'): Usuario
{
    $usuario = new Usuario();
    $usuario->id = $id;

    return $usuario;
}

function makeRelatorioController(
    ?RelatorioPlanoTrabalhoService $service = null,
    ?RelatorioPlanoTrabalhoDetalhadoService $detalhadoService = null,
    ?RelatorioPlanoTrabalhoAuthorization $authorization = null,
): RelatorioController {
    return new RelatorioController(
        $service ?? Mockery::mock(RelatorioPlanoTrabalhoService::class),
        $detalhadoService ?? Mockery::mock(RelatorioPlanoTrabalhoDetalhadoService::class),
        $authorization ?? Mockery::mock(RelatorioPlanoTrabalhoAuthorization::class),
    );
}

test('queryPlanosTrabalho retorna json com linhas quando autorizado', function () {
    $usuario = makeRelatorioControllerUsuario();

    $authorization = Mockery::mock(RelatorioPlanoTrabalhoAuthorization::class);
    $authorization->shouldReceive('usuarioAutorizado')->once()->andReturn($usuario);

    $service = Mockery::mock(RelatorioPlanoTrabalhoService::class);
    $service->shouldReceive('query')
        ->once()
        ->with(Mockery::on(function (array $data): bool {
            return ($data['filters']['unidade_id'] ?? null) === 'u-1'
                && $data['page'] === 1
                && $data['limit'] === 10;
        }))
        ->andReturn([
            'count' => 1,
            'rows' => collect([(object) ['id' => 'pt-1', 'numero' => 10]]),
            'extra' => null,
        ]);

    $response = makeRelatorioController($service, null, $authorization)->queryPlanosTrabalho(
        Request::create('/api/Relatorio/planos-trabalho/query', 'POST', [
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

test('queryPlanosTrabalho rejeita acesso sem autorização', function () {
    $authorization = Mockery::mock(RelatorioPlanoTrabalhoAuthorization::class);
    $authorization->shouldReceive('usuarioAutorizado')
        ->once()
        ->andThrow(new ServerException('RelatorioPlanoTrabalho'));

    $response = makeRelatorioController(
        Mockery::mock(RelatorioPlanoTrabalhoService::class),
        null,
        $authorization,
    )->queryPlanosTrabalho(Request::create('/api/Relatorio/planos-trabalho/query', 'POST', []));

    expect($response)->toBeInstanceOf(JsonResponse::class)
        ->and($response->getStatusCode())->toBe(Response::HTTP_FORBIDDEN)
        ->and($response->getData(true)['error'])->toContain(RelatorioPlanoTrabalhoAuthorization::MSG_ACESSO_NEGADO);
});

test('queryPlanosTrabalhoDetalhado consulta o serviço detalhado', function () {
    $usuario = makeRelatorioControllerUsuario();

    $authorization = Mockery::mock(RelatorioPlanoTrabalhoAuthorization::class);
    $authorization->shouldReceive('usuarioAutorizado')->once()->andReturn($usuario);

    $detalhadoService = Mockery::mock(RelatorioPlanoTrabalhoDetalhadoService::class);
    $detalhadoService->shouldReceive('query')
        ->once()
        ->andReturn([
            'count' => 0,
            'rows' => collect([]),
            'extra' => null,
        ]);

    $response = makeRelatorioController(null, $detalhadoService, $authorization)
        ->queryPlanosTrabalhoDetalhado(
            Request::create('/api/Relatorio/planos-trabalho-detalhado/query', 'POST', [
                'filters' => ['unidade_id' => 'u-1'],
            ]),
        );

    expect($response)->toBeInstanceOf(JsonResponse::class)
        ->and($response->getStatusCode())->toBe(Response::HTTP_OK)
        ->and($response->getData(true)['count'])->toBe(0);
});

test('queryPlanosTrabalho no endpoint xls dispara download do excel', function () {
    Excel::fake();

    $usuario = makeRelatorioControllerUsuario();

    $authorization = Mockery::mock(RelatorioPlanoTrabalhoAuthorization::class);
    $authorization->shouldReceive('usuarioAutorizado')->once()->andReturn($usuario);

    $service = Mockery::mock(RelatorioPlanoTrabalhoService::class);
    $service->shouldReceive('query')
        ->once()
        ->andReturn([
            'count' => 1,
            'rows' => collect([(object) ['id' => 'pt-1']]),
            'extra' => null,
        ]);

    makeRelatorioController($service, null, $authorization)->queryPlanosTrabalho(
        Request::create('/api/Relatorio/planos-trabalho/xls', 'POST', [
            'filters' => ['unidade_id' => 'u-1'],
        ]),
    );

    Excel::assertDownloaded('relatorio-planos-trabalho.xlsx');
});

test('queryPlanosTrabalho retorna 500 quando ocorre erro inesperado', function () {
    Log::shouldReceive('error')->once();

    $usuario = makeRelatorioControllerUsuario();

    $authorization = Mockery::mock(RelatorioPlanoTrabalhoAuthorization::class);
    $authorization->shouldReceive('usuarioAutorizado')->once()->andReturn($usuario);

    $service = Mockery::mock(RelatorioPlanoTrabalhoService::class);
    $service->shouldReceive('query')
        ->once()
        ->andThrow(new RuntimeException('falha interna'));

    $response = makeRelatorioController($service, null, $authorization)->queryPlanosTrabalho(
        Request::create('/api/Relatorio/planos-trabalho/query', 'POST', []),
    );

    expect($response)->toBeInstanceOf(JsonResponse::class)
        ->and($response->getStatusCode())->toBe(Response::HTTP_INTERNAL_SERVER_ERROR)
        ->and($response->getData(true)['error'])->toBe('Ocorreu um erro inesperado.');
});
