<?php

namespace Tests\IntegrationTenant\Observers;

use App\Enums\StatusEnum;
use App\Jobs\Envio\ExportarParticipanteJob;
use App\Jobs\Envio\ExportarPlanoTrabalhoJob;
use App\Models\PlanoTrabalho;
use App\Models\Usuario;
use App\Services\PlanoTrabalhoService;
use Illuminate\Support\Facades\Queue;
use Mockery;

beforeEach(function () {
    Queue::fake();

    $this->usuario = Usuario::factory()->create();
    $this->actingAs($this->usuario);

    $this->planoTrabalhoService = app(PlanoTrabalhoService::class);

    $this->planoTrabalho = PlanoTrabalho::factory()->create();
});

afterAll(function () {
    Mockery::close();
});

describe('PlanoTrabalhoObserver', function () {

    it('NÃO é chamado ao criar PT', function () {
        // testa o ExportarParticipanteJob porque é o primeiro da cadeia de envio do PT, se ele não for chamado, os demais também não serão
        Queue::assertNotPushed(ExportarParticipanteJob::class);
    });

    it('É chamado ao alterar PT ATIVO', function () {
        $this->planoTrabalho->status = StatusEnum::ATIVO->value;
        $this->planoTrabalho->save();

        // testa o ExportarParticipanteJob porque é o primeiro da cadeia de envio do PT, se ele for chamado, os demais também serão
        Queue::assertPushed(ExportarParticipanteJob::class, function ($job) {
            return collect($job->chained)->filter(function ($payload) {
                return strpos($payload, ExportarPlanoTrabalhoJob::class) !== false;
            })->isNotEmpty();
        });
    });

    it('É chamado ao ativar PT', function () {
        $data = [
            'id' => $this->planoTrabalho->id,
            'justificativa' => 'Ativação do plano de trabalho',
        ];

        $this->planoTrabalhoService->ativar($data, null);

        // testa o ExportarParticipanteJob porque é o primeiro da cadeia de envio do PT, se ele for chamado, os demais também serão
        Queue::assertPushed(ExportarParticipanteJob::class, function ($job) {
            return collect($job->chained)->filter(function ($payload) {
                return strpos($payload, ExportarPlanoTrabalhoJob::class) !== false;
            })->isNotEmpty();
        });
    });

    it('É chamado ao Reativar PT', function () {
        $data = [
            'id' => $this->planoTrabalho->id,
            'justificativa' => 'Reativação do plano de trabalho',
        ];

        $this->planoTrabalhoService->reativar($data, null);

        // testa o ExportarParticipanteJob porque é o primeiro da cadeia de envio do PT, se ele for chamado, os demais também serão
        Queue::assertPushed(ExportarParticipanteJob::class, function ($job) {
            return collect($job->chained)->filter(function ($payload) {
                return strpos($payload, ExportarPlanoTrabalhoJob::class) !== false;
            })->isNotEmpty();
        });
    });

    it('É chamado ao alterar PT AVALIADO', function () {
        $this->planoTrabalho->status = StatusEnum::AVALIADO->value;
        $this->planoTrabalho->save();

        Queue::assertPushed(ExportarParticipanteJob::class, function ($job) {
            return collect($job->chained)->filter(function ($payload) {
                return strpos($payload, ExportarPlanoTrabalhoJob::class) !== false;
            })->isNotEmpty();
        });
    });

    it('É chamado ao alterar PT CONCLUIDO', function () {
        $this->planoTrabalho->status = StatusEnum::CONCLUIDO->value;
        $this->planoTrabalho->save();

        Queue::assertPushed(ExportarParticipanteJob::class, function ($job) {
            return collect($job->chained)->filter(function ($payload) {
                return strpos($payload, ExportarPlanoTrabalhoJob::class) !== false;
            })->isNotEmpty();
        });
    });

    it('NÃO é chamado ao cancelar PT', function () {
        $this->planoTrabalhoService->cancelarPlanoTrabalho([
            'id' => $this->planoTrabalho->id,
            'justificativa' => 'Cancelamento do plano de trabalho',
        ], $this->planoTrabalho->unidade_id);

        Queue::assertNotPushed(ExportarParticipanteJob::class);
    });

});
