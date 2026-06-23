<?php

declare(strict_types=1);

use App\Exceptions\ServerException;
use App\Http\Controllers\EnvioPlanoEntregaController;
use Illuminate\Http\Request;

uses(Tests\TestCase::class);

afterEach(function () {
    Mockery::close();
});

test('checkPermissions retorna true', function () {
    $controller = new EnvioPlanoEntregaController();

    $result = (fn () => $this->checkPermissions('QUERY', null, null, null, null))->call($controller);

    expect($result)->toBeTrue();
});

test('query lanca excecao quando usuario nao possui permissao', function () {
    $usuario = Mockery::mock();
    $usuario->shouldReceive('hasPermissionTo')
        ->once()
        ->with('MOD_ENVIO_PE')
        ->andReturn(false);

    $controller = Mockery::mock(EnvioPlanoEntregaController::class)->makePartial();
    $controller->shouldAllowMockingProtectedMethods();
    $controller->shouldReceive('getUsuario')
        ->once()
        ->andReturn($usuario);

    $request = Request::create('/api/EnvioPlanoEntrega/query', 'POST', [
        'page' => 1,
        'limit' => 10,
        'orderBy' => [],
        'where' => [],
    ]);

    $call = fn () => $controller->query($request);

    expect($call)->toThrow(ServerException::class);
});
