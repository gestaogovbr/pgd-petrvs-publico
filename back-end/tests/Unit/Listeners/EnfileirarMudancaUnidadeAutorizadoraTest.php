<?php

use App\Events\UnidadeAutorizadoraAlteradaEvent;
use App\Jobs\AtualizarCodUnidadeAutorizadoraJob;
use Illuminate\Support\Facades\Queue;

uses(Tests\TestCase::class);

it('enfileira atualização completa ao preencher autorizadora pela primeira vez', function () {
    Queue::fake();

    event(new UnidadeAutorizadoraAlteradaEvent('ANPD', '32589478925114', false));

    Queue::assertPushed(AtualizarCodUnidadeAutorizadoraJob::class, function (AtualizarCodUnidadeAutorizadoraJob $job) {
        $reflection = new ReflectionClass($job);

        return $reflection->getProperty('tenantId')->getValue($job) === 'ANPD'
            && $reflection->getProperty('codUnidadeAutorizadora')->getValue($job) === '32589478925114'
            && $reflection->getProperty('somenteSemCodigo')->getValue($job) === false;
    });
});

it('enfileira preenchimento só de registros sem código com o valor anterior', function () {
    Queue::fake();

    event(new UnidadeAutorizadoraAlteradaEvent('ANPD', '1111111111', true));

    Queue::assertPushed(AtualizarCodUnidadeAutorizadoraJob::class, function (AtualizarCodUnidadeAutorizadoraJob $job) {
        $reflection = new ReflectionClass($job);

        return $reflection->getProperty('tenantId')->getValue($job) === 'ANPD'
            && $reflection->getProperty('codUnidadeAutorizadora')->getValue($job) === '1111111111'
            && $reflection->getProperty('somenteSemCodigo')->getValue($job) === true;
    });
});
