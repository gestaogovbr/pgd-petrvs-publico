<?php

namespace Tests\Unit\Services;

use App\Services\TenantService;
use App\Exceptions\ServerException;
use ReflectionMethod;
use Tests\DatabaseTenantTestCase;

uses(DatabaseTenantTestCase::class);

describe('TenantService - Normalização de with', function () {
    it('remove campos, vazios e duplicados do with', function () {
        $service = new TenantService();
        $method = new ReflectionMethod(TenantService::class, 'normalizeWith');
        $method->setAccessible(true);

        $normalized = $method->invoke($service, [
            'domains:domain',
            'domains:id,domain',
            'usuario',
            '',
            'usuario',
        ]);

        expect($normalized)->toBe([
            'domains',
            'usuario',
        ]);
    });

    it('filtra o with pelo joinable do TenantService', function () {
        $service = new TenantService();
        $method = new ReflectionMethod(TenantService::class, 'normalizeWith');
        $method->setAccessible(true);

        $normalized = $method->invoke($service, [
            'domains:domain',
            'usuario',
            'entidade',
        ]);

        $filtered = $service->getJoinable($normalized);

        expect($filtered)->toBe([
            'domains',
        ]);
    });
});

describe('TenantService - Deploy de tenant', function () {
    it('falha ao buscar cidade quando código IBGE é vazio', function () {
        $service = new TenantService();
        $method = new ReflectionMethod(TenantService::class, 'getCidadeIdByCodigoIbge');
        $method->setAccessible(true);

        expect(fn () => $method->invoke($service, ''))->toThrow(ServerException::class);
    });
});
