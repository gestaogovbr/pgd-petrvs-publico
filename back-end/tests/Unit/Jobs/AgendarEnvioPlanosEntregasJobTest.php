<?php

namespace Tests\Unit\Jobs;

use App\Jobs\Envio\AgendarEnvioPlanosEntregasJob;
use App\Services\Envio\AgendarEnvioPlanosEntregasService;
use Illuminate\Queue\Middleware\WithoutOverlapping;
use Mockery;
use Tests\TenantTestCase;

uses(TenantTestCase::class);

afterEach(function () {
    Mockery::close();
});

describe('AgendarEnvioPlanosEntregasJob', function () {
    it('usa WithoutOverlapping global entre tenants', function () {
        $jobTenantA = new AgendarEnvioPlanosEntregasJob('tenant-a');
        $jobTenantB = new AgendarEnvioPlanosEntregasJob('tenant-b');

        expect($jobTenantA->middleware())->toHaveCount(1)
            ->and($jobTenantA->middleware()[0])->toBeInstanceOf(WithoutOverlapping::class)
            ->and($jobTenantB->middleware()[0])->toBeInstanceOf(WithoutOverlapping::class);
    });

    it('delega o fluxo para o AgendarEnvioPlanosEntregasService', function () {
        $service = Mockery::mock(AgendarEnvioPlanosEntregasService::class);
        $service->shouldReceive('executar')->once()->with('tenant-uuid');

        $job = new AgendarEnvioPlanosEntregasJob('tenant-uuid');
        $job->handle($service);
    });
});
