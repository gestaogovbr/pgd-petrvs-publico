<?php

namespace Tests\IntegrationTenant\Services;

use App\Enums\StatusEnum;
use App\Jobs\Envio\ExportarParticipanteJob;
use App\Models\PlanoEntrega;
use App\Models\PlanoEntregaEntrega;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoEntrega;
use App\Services\API_PGD\PlanoTrabalhoEnvioService;
use Illuminate\Support\Facades\Queue;

beforeEach(function () {
    Queue::fake();
});

describe('PlanoTrabalhoEnvioService', function () {
    it('registra conclusão e log no PT quando plano de entrega relacionado não pode ser agendado', function () {
        $planoTrabalho = PlanoTrabalho::factory()->ativo()->create([
            'data_agendamento_envio' => null,
            'data_conclusao_envio' => null,
            'log_envio' => null,
        ]);

        $planoEntrega = PlanoEntrega::factory()->create([
            'status' => StatusEnum::INCLUIDO->value,
        ]);

        $planoEntregaEntrega = PlanoEntregaEntrega::factory()
            ->forPlanoEntrega($planoEntrega)
            ->create();

        PlanoTrabalhoEntrega::factory()->create([
            'plano_trabalho_id' => $planoTrabalho->id,
            'plano_entrega_entrega_id' => $planoEntregaEntrega->id,
        ]);

        $resultado = PlanoTrabalhoEnvioService::processar(tenant('id'), $planoTrabalho->fresh(), 'teste');

        expect($resultado)->toBeFalse();

        $planoTrabalhoAtualizado = $planoTrabalho->fresh();

        expect($planoTrabalhoAtualizado->data_agendamento_envio)->toBeNull();
        expect($planoTrabalhoAtualizado->data_conclusao_envio)->not->toBeNull();
        expect($planoTrabalhoAtualizado->log_envio)
            ->toContain('Erro no agendamento do '.$planoEntrega->identificacaoEnvio())
            ->not->toContain((string) $planoEntrega->id);

        Queue::assertNotPushed(ExportarParticipanteJob::class);
    });
});
