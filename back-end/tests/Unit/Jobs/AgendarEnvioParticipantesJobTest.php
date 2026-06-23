<?php

namespace Tests\Unit\Jobs;

use App\Jobs\Envio\AgendarEnvioParticipantesJob;
use App\Services\Envio\AgendarEnvioParticipantesService;
use Mockery;
use Tests\TestCase;

uses(TestCase::class);

afterEach(function () {
    Mockery::close();
});

describe('AgendarEnvioParticipantesJob', function () {
    it('delega o fluxo para o AgendarEnvioParticipantesService', function () {
        $service = Mockery::mock(AgendarEnvioParticipantesService::class);
        $service->shouldReceive('executar')->once()->with('tenant-uuid');

        $job = new AgendarEnvioParticipantesJob('tenant-uuid');
        $job->handle($service);
    });
});
