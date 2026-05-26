<?php

namespace Tests\Unit\Jobs;

use App\Jobs\Envio\AgendarEnvioPlanosTrabalhosJob;
use App\Services\Envio\AgendarEnvioPlanosTrabalhosService;
use Mockery;
use Tests\TenantTestCase;

uses(TenantTestCase::class);

afterEach(function () {
    Mockery::close();
});

describe('AgendarEnvioPlanosTrabalhosJob', function () {
    it('delega o fluxo para o AgendarEnvioPlanosTrabalhosService', function () {
        $service = Mockery::mock(AgendarEnvioPlanosTrabalhosService::class);
        $service->shouldReceive('executar')->once()->with('tenant-uuid');

        $job = new AgendarEnvioPlanosTrabalhosJob('tenant-uuid');
        $job->handle($service);
    });
});
