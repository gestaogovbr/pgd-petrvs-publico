<?php

namespace Tests\Unit\Jobs;

use App\Jobs\Envio\AgendarEnvioPlanosTrabalhosJob;
use App\Services\Envio\AgendarEnvioPlanosTrabalhosService;
use Illuminate\Queue\Middleware\WithoutOverlapping;
use Mockery;
use Tests\TenantTestCase;

uses(TenantTestCase::class);

afterEach(function () {
    Mockery::close();
});

describe('AgendarEnvioPlanosTrabalhosJob', function () {
    it('usa WithoutOverlapping global entre tenants', function () {
        $jobTenantA = new AgendarEnvioPlanosTrabalhosJob('tenant-a');
        $jobTenantB = new AgendarEnvioPlanosTrabalhosJob('tenant-b');

        expect($jobTenantA->middleware())->toHaveCount(1)
            ->and($jobTenantA->middleware()[0])->toBeInstanceOf(WithoutOverlapping::class)
            ->and($jobTenantB->middleware()[0])->toBeInstanceOf(WithoutOverlapping::class);
    });

    it('delega o fluxo para o AgendarEnvioPlanosTrabalhosService', function () {
        $service = Mockery::mock(AgendarEnvioPlanosTrabalhosService::class);
        $service->shouldReceive('executar')->once()->with('tenant-uuid');

        $job = new AgendarEnvioPlanosTrabalhosJob('tenant-uuid');
        $job->handle($service);
    });
});
