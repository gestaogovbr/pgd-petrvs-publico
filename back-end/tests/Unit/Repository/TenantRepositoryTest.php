<?php

declare(strict_types=1);

use App\Models\Tenant;
use App\Repository\Tenant\Contracts\TenantReadRepositoryContract;
use App\Repository\Tenant\Contracts\TenantWriteRepositoryContract;
use App\Repository\TenantRepository;

uses(Tests\TestCase::class);

afterEach(function () {
    \Mockery::close();
});

test('TenantRepository repassa findById ao read repository', function () {
    $read = \Mockery::mock(TenantReadRepositoryContract::class);
    $write = \Mockery::mock(TenantWriteRepositoryContract::class);
    $tenant = new Tenant(['id' => 't1']);

    $read->shouldReceive('findById')
        ->once()
        ->with('t1', ['domains'])
        ->andReturn($tenant);

    $repository = new TenantRepository($read, $write);
    expect($repository->findById('t1', ['domains']))->toBe($tenant);
});
