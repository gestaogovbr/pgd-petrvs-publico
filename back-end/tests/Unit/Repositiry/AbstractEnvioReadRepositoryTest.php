<?php

declare(strict_types=1);

use App\Models\ModelBase;
use App\Repositiry\Interfaces\AbstractEnvioReadRepository;

uses(Tests\TestCase::class);

afterEach(function () {
    \Mockery::close();
});

test('AbstractEnvioReadRepository expõe findOneParaEnvio(string $id): ?ModelBase', function () {
    $method = new ReflectionMethod(AbstractEnvioReadRepository::class, 'findOneParaEnvio');

    expect($method->isPublic())->toBeTrue();
    expect($method->getNumberOfParameters())->toBe(1);

    $idParam = $method->getParameters()[0];
    expect($idParam->getName())->toBe('id');
    expect($idParam->getType()?->getName())->toBe('string');

    $returnType = $method->getReturnType();
    expect($returnType)->not->toBeNull();
    expect($returnType->allowsNull())->toBeTrue();
    expect($returnType->getName())->toBe(ModelBase::class);
});

test('mock de AbstractEnvioReadRepository pode retornar null em findOneParaEnvio', function () {
    $repository = \Mockery::mock(AbstractEnvioReadRepository::class);
    $repository->shouldReceive('findOneParaEnvio')
        ->once()
        ->with('id-inexistente')
        ->andReturnNull();

    expect($repository->findOneParaEnvio('id-inexistente'))->toBeNull();
});

test('mock de AbstractEnvioReadRepository pode retornar ModelBase em findOneParaEnvio', function () {
    $model = \Mockery::mock(ModelBase::class);

    $repository = \Mockery::mock(AbstractEnvioReadRepository::class);
    $repository->shouldReceive('findOneParaEnvio')
        ->once()
        ->with('uuid-123')
        ->andReturn($model);

    expect($repository->findOneParaEnvio('uuid-123'))->toBe($model);
});
