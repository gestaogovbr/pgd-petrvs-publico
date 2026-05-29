<?php

namespace Tests\Unit\Jobs;

use App\Jobs\Envio\AgendarEnvioPlanosEntregasJob;
use App\Services\Envio\AgendarEnvioPlanosEntregasService;
use Mockery;
use Tests\TenantTestCase;

uses(TenantTestCase::class);

afterEach(function () {
    Mockery::close();
});

describe('AgendarEnvioPlanosEntregasJob', function () {
    it('delega o fluxo para o AgendarEnvioPlanosEntregasService', function () {
        $service = Mockery::mock(AgendarEnvioPlanosEntregasService::class);
        $service->shouldReceive('executar')->once()->with('tenant-uuid');

        $job = new AgendarEnvioPlanosEntregasJob('tenant-uuid');
        $job->handle($service);
    });
});
