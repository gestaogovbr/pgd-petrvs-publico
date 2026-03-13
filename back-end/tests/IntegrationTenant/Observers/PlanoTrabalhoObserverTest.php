<?php

namespace Tests\IntegrationTenant\Observers;

use App\Enums\PlanoTrabalhoStatus;
use App\Enums\StatusEnum;
use App\Jobs\Envio\ExportarParticipanteJob;
use App\Jobs\Envio\ExportarPlanoTrabalhoJob;
use App\Models\PlanoTrabalho;
use App\Services\API_PGD\PlanoTrabalhoEnvioService;
use Illuminate\Support\Facades\Queue;
use Mockery;


beforeEach(function () {
    Queue::fake();
});

afterAll(function () {
    Mockery::close();
});

describe('PlanoTrabalhoObserver', function () {

    it('PlanoTrabalho Observer NÃO é chamado ao criar plano de Trabalho', function () {
        $planoTrabalho = PlanoTrabalho::factory()->create();

        // testa o ExportarParticipanteJob porque é o primeiro da cadeia de envio do PT, se ele não for chamado, os demais também não serão
        Queue::assertNotPushed(ExportarParticipanteJob::class);
    });

    it('PlanoTrabalho Observer É chamado ao alterar plano de Trabalho ATIVO', function () {
        $planoTrabalho = PlanoTrabalho::factory()->create();
        $planoTrabalho->status = StatusEnum::ATIVO->value;
        $planoTrabalho->save();

        // testa o ExportarParticipanteJob porque é o primeiro da cadeia de envio do PT, se ele for chamado, os demais também serão
        Queue::assertPushed(ExportarParticipanteJob::class, function ($job) {
            return collect($job->chained)->filter(function ($payload) {
                return strpos($payload, ExportarPlanoTrabalhoJob::class) !== false;
            })->isNotEmpty();
        });
    });

    it('PlanoTrabalho Observer É chamado ao alterar plano de Trabalho AVALIADO', function () {
        $planoTrabalho = PlanoTrabalho::factory()->create();
        $planoTrabalho->status = StatusEnum::AVALIADO->value;
        $planoTrabalho->save();

        Queue::assertPushed(ExportarParticipanteJob::class, function ($job) {
            return collect($job->chained)->filter(function ($payload) {
                return strpos($payload, ExportarPlanoTrabalhoJob::class) !== false;
            })->isNotEmpty();
        });
    });

    it('PlanoTrabalho Observer É chamado ao alterar plano de Trabalho CONCLUIDO', function () {
        $planoTrabalho = PlanoTrabalho::factory()->create();
        $planoTrabalho->status = StatusEnum::CONCLUIDO->value;
        $planoTrabalho->save();

        Queue::assertPushed(ExportarParticipanteJob::class, function ($job) {
            return collect($job->chained)->filter(function ($payload) {
                return strpos($payload, ExportarPlanoTrabalhoJob::class) !== false;
            })->isNotEmpty();
        });
    });

    it('PlanoTrabalho Observer ao cancelar plano de Trabalho o agendamento não é realizado', function () {
        $planoTrabalho = PlanoTrabalho::factory()->create();
        $planoTrabalho->status = StatusEnum::CANCELADO->value;
        $planoTrabalho->save();

        Queue::assertNotPushed(ExportarParticipanteJob::class);
    });

});
