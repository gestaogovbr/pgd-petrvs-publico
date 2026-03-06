<?php

namespace Tests\IntegrationTenant\Observers;

use App\Enums\PlanoTrabalhoStatus;
use App\Enums\StatusEnum;
use App\Jobs\Envio\ExportarParticipanteJob;
use App\Jobs\Envio\ExportarPlanoTrabalhoJob;
use App\Models\PlanoTrabalho;
use App\Services\API_PGD\PlanoTrabalhoEnvioService;
use Illuminate\Support\Facades\Bus;
use Mockery;


beforeEach(function () {
    Bus::fake();
});

afterAll(function () {
    Mockery::close();
});

describe('PlanoTrabalhoObserver', function () {

    it('PlanoTrabalho Observer NÃO é chamado ao criar plano de Trabalho', function () {
        $planoTrabalho = PlanoTrabalho::factory()->create();

        Bus::assertNotDispatched(ExportarPlanoTrabalhoJob::class);
    });

    it('PlanoTrabalho Observer É chamado ao alterar plano de Trabalho ATIVO', function () {
        $planoTrabalho = PlanoTrabalho::factory()->create();
        $planoTrabalho->status = StatusEnum::ATIVO->value;
        $planoTrabalho->save();

        Bus::assertChained([
            ExportarParticipanteJob::class,
        ]);
    });

    it('PlanoTrabalho Observer É chamado ao alterar plano de Trabalho AVALIADO', function () {
        $planoTrabalho = PlanoTrabalho::factory()->create();
        $planoTrabalho->status = StatusEnum::AVALIADO->value;
        $planoTrabalho->save();

        Bus::assertDispatched(ExportarPlanoTrabalhoJob::class);
    });

    it('PlanoTrabalho Observer É chamado ao alterar plano de Trabalho CONCLUIDO', function () {
        $planoTrabalho = PlanoTrabalho::factory()->create();
        $planoTrabalho->status = StatusEnum::CONCLUIDO->value;
        $planoTrabalho->save();

        Bus::assertDispatched(ExportarPlanoTrabalhoJob::class);
    });

    it('PlanoTrabalho Observer ao cancelar plano de Trabalho o agendamento não é realizado', function () {
        $planoTrabalho = PlanoTrabalho::factory()->create();
        $planoTrabalho->status = StatusEnum::CANCELADO->value;
        $planoTrabalho->save();

        Bus::assertNotDispatched(ExportarPlanoTrabalhoJob::class);
    });

});
