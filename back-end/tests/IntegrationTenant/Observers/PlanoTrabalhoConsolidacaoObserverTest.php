<?php

namespace Tests\IntegrationTenant\Observers;

use App\Enums\StatusEnum;
use App\Jobs\Envio\ExportarParticipanteJob;
use App\Jobs\Envio\ExportarPlanoTrabalhoJob;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\Usuario;
use Illuminate\Support\Facades\Queue;
use Mockery;

beforeEach(function () {
    Queue::fake();

    $this->usuario = Usuario::factory()->create();
    $this->actingAs($this->usuario);
});

afterAll(function () {
    Mockery::close();
});

describe('PlanoTrabalhoConsolidacaoObserver', function () {

    it('É chamado ao CONCLUIR PT', function () {
        $planoTrabalho = PlanoTrabalho::factory()->create([
            'status' => StatusEnum::ATIVO->value
        ]);

        $consolidacao = PlanoTrabalhoConsolidacao::factory()->create([
            'plano_trabalho_id' => $planoTrabalho->id,
            'status' => StatusEnum::INCLUIDO->value
        ]);

        Queue::assertNotPushed(ExportarParticipanteJob::class);

        $consolidacao->status = StatusEnum::CONCLUIDO->value;
        $consolidacao->save();
        
        Queue::assertPushed(ExportarParticipanteJob::class, function ($job) {
            return collect($job->chained)->filter(function ($payload) {
                return strpos($payload, ExportarPlanoTrabalhoJob::class) !== false;
            })->isNotEmpty();
        });
    });
});
