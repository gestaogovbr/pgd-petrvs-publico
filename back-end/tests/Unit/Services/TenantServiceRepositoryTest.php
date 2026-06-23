<?php

declare(strict_types=1);

use App\Repository\TenantRepository;
use App\Services\TenantService;

uses(Tests\TestCase::class);

test('TenantService injeta TenantRepository pelo container', function () {
    $service = new TenantService();
    $property = (new \ReflectionClass(TenantService::class))->getProperty('tenantRepository');
    $property->setAccessible(true);

    expect($property->getValue($service))->toBeInstanceOf(TenantRepository::class);
});
