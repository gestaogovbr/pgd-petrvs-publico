<?php

use App\Events\CodigoOrgaoAlterado;
use App\Jobs\MarcarUnidadesAntigasJob;
use Illuminate\Support\Facades\Queue;

uses(Tests\TestCase::class);

it('enfileira marcação de unidades antigas ao receber o evento', function () {
    Queue::fake();

    event(new CodigoOrgaoAlterado('ANPD', '20000', '30212'));

    Queue::assertPushed(MarcarUnidadesAntigasJob::class);
});
