<?php

namespace Tests\IntegrationTenant\Observers;

use App\Enums\PlanoEntregaStatus;
use App\Jobs\Envio\ExportarPlanoEntregaJob;
use App\Models\PlanoEntrega;
use App\Observers\PlanoEntregaObserver;
use App\Services\API_PGD\PlanoEntregaEnvioService;
use Illuminate\Support\Facades\Bus;
use Mockery;


beforeEach(function () {
    Bus::fake();
});

afterAll(function () {
    Mockery::close();
});

describe('PlanoEntregaObserver', function () {

    it('PlanoEntrega Observer NÃO é chamado ao criar plano de entrega', function () {
        $planoEntrega = PlanoEntrega::factory()->create();

        Bus::assertNotDispatched(ExportarPlanoEntregaJob::class);
    });

    it('PlanoEntrega Observer É chamado ao alterar plano de entrega ATIVO', function () {
        $planoEntrega = PlanoEntrega::factory()->create();
        $planoEntrega->status = PlanoEntregaStatus::ATIVO->value;
        $planoEntrega->save();

        Bus::assertDispatched(ExportarPlanoEntregaJob::class);
    });

    it('PlanoEntrega Observer É chamado ao alterar plano de entrega AVALIADO', function () {
        $planoEntrega = PlanoEntrega::factory()->create();
        $planoEntrega->status = PlanoEntregaStatus::AVALIADO->value;
        $planoEntrega->save();

        Bus::assertDispatched(ExportarPlanoEntregaJob::class);
    });

    it('PlanoEntrega Observer É chamado ao alterar plano de entrega CONCLUIDO', function () {
        $planoEntrega = PlanoEntrega::factory()->create();
        $planoEntrega->status = PlanoEntregaStatus::CONCLUIDO->value;
        $planoEntrega->save();

        Bus::assertDispatched(ExportarPlanoEntregaJob::class);
    });

    it('PlanoEntrega Observer NÃO é chamado ao alterar plano de entrega CANCELADO', function () {
        $planoEntrega = PlanoEntrega::factory()->create();
        $planoEntrega->status = PlanoEntregaStatus::CANCELADO->value;
        $planoEntrega->save();

        Bus::assertNotDispatched(ExportarPlanoEntregaJob::class);
    });

});
