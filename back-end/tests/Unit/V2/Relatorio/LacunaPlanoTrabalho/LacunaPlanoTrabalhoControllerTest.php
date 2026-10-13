<?php

declare(strict_types=1);

use App\Exceptions\ServerException;
use App\Models\Usuario;
use App\Services\RelatorioLacunaPlanoTrabalhoAuthorization;
use App\V2\Relatorio\LacunaPlanoTrabalho\LacunaPlanoTrabalhoController;
use App\V2\Relatorio\LacunaPlanoTrabalho\LacunaPlanoTrabalhoService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;
use Tests\TestCase;

uses(TestCase::class);

afterEach(function () {
    Mockery::close();
});

function makeLacunaPlanoTrabalhoControllerUsuario(string $id = 'usuario-1'): Usuario
{
    $usuario = new Usuario();
    $usuario->id = $id;

    return $usuario;
}

function makeLacunaPlanoTrabalhoController(
    ?LacunaPlanoTrabalhoService $service = null,
    ?RelatorioLacunaPlanoTrabalhoAuthorization $authorization = null,
): LacunaPlanoTrabalhoController {
    return new LacunaPlanoTrabalhoController(
        $service ?? Mockery::mock(LacunaPlanoTrabalhoService::class),
        $authorization ?? Mockery::mock(RelatorioLacunaPlanoTrabalhoAuthorization::class),
    );
}

test('index retorna json com dados quando autorizado', function () {
    $usuario = makeLacunaPlanoTrabalhoControllerUsuario();

    $authorization = Mockery::mock(RelatorioLacunaPlanoTrabalhoAuthorization::class);
    $authorization->shouldReceive('usuarioAutorizado')->once()->andReturn($usuario);

    $paginator = new LengthAwarePaginator(
        items: [(object) ['id' => '1', 'nome' => 'Agente']],
        total: 1,
        perPage: 20,
        currentPage: 1,
    );

    $service = Mockery::mock(LacunaPlanoTrabalhoService::class);
    $service->shouldReceive('index')
        ->once()
        ->andReturn($paginator);

    $response = makeLacunaPlanoTrabalhoController($service, $authorization)->index(
        Request::create('/api/v2/relatorio-lacuna-plano-trabalho', 'GET', [
            'filters' => [
                'unidade_id' => '11111111-1111-1111-1111-111111111111',
                'periodo_inicio' => '2024-01-01',
                'periodo_fim' => '2024-01-31',
            ],
            'page' => 1,
        ]),
    );

    expect($response)->toBeInstanceOf(JsonResponse::class)
        ->and($response->getStatusCode())->toBe(Response::HTTP_OK)
        ->and($response->getData(true)['success'])->toBeTrue();
});

test('index rejeita acesso sem autorização', function () {
    $authorization = Mockery::mock(RelatorioLacunaPlanoTrabalhoAuthorization::class);
    $authorization->shouldReceive('usuarioAutorizado')
        ->once()
        ->andThrow(new ServerException('RelatorioLacunaPlanoTrabalho'));

    $response = makeLacunaPlanoTrabalhoController(
        Mockery::mock(LacunaPlanoTrabalhoService::class),
        $authorization,
    )->index(Request::create('/api/v2/relatorio-lacuna-plano-trabalho', 'GET', []));

    expect($response)->toBeInstanceOf(JsonResponse::class)
        ->and($response->getStatusCode())->toBe(Response::HTTP_FORBIDDEN)
        ->and($response->getData(true)['error'])->toContain(RelatorioLacunaPlanoTrabalhoAuthorization::MSG_ACESSO_NEGADO);
});

test('index retorna 500 quando ocorre erro inesperado', function () {
    Log::shouldReceive('error')->once();

    $usuario = makeLacunaPlanoTrabalhoControllerUsuario();

    $authorization = Mockery::mock(RelatorioLacunaPlanoTrabalhoAuthorization::class);
    $authorization->shouldReceive('usuarioAutorizado')->once()->andReturn($usuario);

    $service = Mockery::mock(LacunaPlanoTrabalhoService::class);
    $service->shouldReceive('index')
        ->once()
        ->andThrow(new RuntimeException('falha interna'));

    $response = makeLacunaPlanoTrabalhoController($service, $authorization)->index(
        Request::create('/api/v2/relatorio-lacuna-plano-trabalho', 'GET', [
            'filters' => [
                'unidade_id' => '11111111-1111-1111-1111-111111111111',
                'periodo_inicio' => '2024-01-01',
                'periodo_fim' => '2024-01-31',
            ],
        ]),
    );

    expect($response)->toBeInstanceOf(JsonResponse::class)
        ->and($response->getStatusCode())->toBe(Response::HTTP_INTERNAL_SERVER_ERROR)
        ->and($response->getData(true)['error'])->toBe('Ocorreu um erro inesperado.');
});
