<?php

declare(strict_types=1);

use App\Repository\Interfaces\EnvioWriteRepositoryInterface;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

uses(Tests\TestCase::class);

afterEach(function () {
    Mockery::close();
});

test('EnvioWriteRepositoryInterface declara agendarEnvio, registrarTentativa, registrarSucesso e registrarInsucesso', function () {
    $reflection = new ReflectionClass(EnvioWriteRepositoryInterface::class);

    expect($reflection->hasMethod('agendarEnvio'))->toBeTrue();
    $agendar = $reflection->getMethod('agendarEnvio');
    expect($agendar->getNumberOfParameters())->toBe(2);
    expect($agendar->getParameters()[0]->getType()?->getName())->toBe(Model::class);
    expect($agendar->getParameters()[1]->getType()?->getName())->toBe(Carbon::class);

    expect($reflection->hasMethod('registrarTentativa'))->toBeTrue();
    expect($reflection->hasMethod('registrarSucesso'))->toBeTrue();
    expect($reflection->hasMethod('registrarInsucesso'))->toBeTrue();

    $tentativa = $reflection->getMethod('registrarTentativa');
    expect($tentativa->getNumberOfParameters())->toBe(1);
    expect($tentativa->getParameters()[0]->getType()?->getName())->toBe(Model::class);

    $sucesso = $reflection->getMethod('registrarSucesso');
    expect($sucesso->getNumberOfParameters())->toBe(1);
    expect($sucesso->getParameters()[0]->getType()?->getName())->toBe(Model::class);

    $insucesso = $reflection->getMethod('registrarInsucesso');
    expect($insucesso->getNumberOfParameters())->toBe(2);
    expect($insucesso->getParameters()[0]->getType()?->getName())->toBe(Model::class);
    expect($insucesso->getParameters()[1]->getType()?->getName())->toBe('string');
});

test('mock de EnvioWriteRepositoryInterface aceita registrarSucesso e registrarInsucesso', function () {
    $model = Mockery::mock(Model::class);

    $repository = Mockery::mock(EnvioWriteRepositoryInterface::class);
    $repository->shouldReceive('registrarSucesso')
        ->once()
        ->with($model);
    $repository->shouldReceive('registrarInsucesso')
        ->once()
        ->with($model, 'falha de teste');

    $repository->registrarSucesso($model);
    $repository->registrarInsucesso($model, 'falha de teste');
});
