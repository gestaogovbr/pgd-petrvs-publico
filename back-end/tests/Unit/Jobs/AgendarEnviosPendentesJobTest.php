<?php

namespace Tests\Unit\Jobs;

use App\Jobs\Envio\AgendarEnviosPendentesJob;
use App\Services\Envio\AgendarEnviosPendentesService;
use Mockery;
use Tests\TenantTestCase;

uses(TenantTestCase::class);

afterEach(function () {
    Mockery::close();
});

describe('AgendarEnviosPendentesJob', function () {
    it('delega o fluxo para o AgendarEnviosPendentesService', function () {
        $service = Mockery::mock(AgendarEnviosPendentesService::class);
        $service->shouldReceive('executar')->once()->with('tenant-uuid');

        $job = new AgendarEnviosPendentesJob('tenant-uuid');
        $job->handle($service);
    });
});
