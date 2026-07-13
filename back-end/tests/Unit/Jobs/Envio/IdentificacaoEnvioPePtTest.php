<?php

use App\Jobs\Envio\ExportarPlanoEntregaJob;
use App\Jobs\Envio\ExportarPlanoTrabalhoJob;
use App\Models\PlanoEntrega;
use App\Models\PlanoTrabalho;

describe('Identificação de envio PE/PT', function () {
    it('identificacaoEnvio de PE e PT usa apenas o numero', function () {
        $planoEntrega = (new ReflectionClass(PlanoEntrega::class))->newInstanceWithoutConstructor();
        $planoEntrega->numero = 10;
        $planoEntrega->id = 'pe-uuid';

        $planoTrabalho = (new ReflectionClass(PlanoTrabalho::class))->newInstanceWithoutConstructor();
        $planoTrabalho->numero = 20;
        $planoTrabalho->id = 'pt-uuid';

        expect($planoEntrega->identificacaoEnvio())->toBe('PE #10');
        expect($planoTrabalho->identificacaoEnvio())->toBe('PT #20');
    });

    it('logItemLabel e tags dos jobs usam o numero', function () {
        $peJob = new ExportarPlanoEntregaJob('tenant-1', 'pe-uuid', '', 10);
        $ptJob = new ExportarPlanoTrabalhoJob('tenant-1', 'pt-uuid', '', 20);

        $logItemLabel = new ReflectionMethod(ExportarPlanoEntregaJob::class, 'logItemLabel');
        $logItemLabel->setAccessible(true);

        expect($logItemLabel->invoke($peJob))->toBe('PE #10');
        expect($peJob->tags())->toBe(['tenant-1', '10']);

        $ptLogItemLabel = new ReflectionMethod(ExportarPlanoTrabalhoJob::class, 'logItemLabel');
        $ptLogItemLabel->setAccessible(true);

        expect($ptLogItemLabel->invoke($ptJob))->toBe('PT #20');
        expect($ptJob->tags())->toBe(['tenant-1', '20']);
    });
});
