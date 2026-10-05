<?php

namespace Tests\IntegrationTenant\Observers;

use App\Enums\StatusEnum;
use App\Jobs\Envio\ExportarParticipanteJob;
use App\Models\PlanoTrabalho;
use App\Models\Usuario;
use App\Services\PlanoTrabalhoService;
use Illuminate\Support\Facades\Bus;
use Mockery;

beforeEach(function () {
    Bus::fake();

    tenant()->api_cod_unidade_autorizadora = '1234567890';
    tenant()->save();

    $this->usuario = Usuario::factory()->create();
    $this->actingAs($this->usuario);

    $this->planoTrabalhoService = app(PlanoTrabalhoService::class);

    $this->planoTrabalho = PlanoTrabalho::factory()->create([
        'usuario_id' => $this->usuario->id,
    ]);
});

afterAll(function () {
    Mockery::close();
});

describe('PlanoTrabalhoObserver', function () {

    it('NÃO é chamado ao criar PT', function () {
        // O primeiro batch do envio contém o participante; se não há batch, a cadeia não iniciou.
        Bus::assertNothingBatched();
    });

    it('É chamado ao alterar PT ATIVO', function () {
        $this->planoTrabalho->status = StatusEnum::ATIVO->value;
        $this->planoTrabalho->save();

        Bus::assertBatched(function ($batch) {
            return $batch->jobs->count() === 1
                && $batch->jobs->first() instanceof ExportarParticipanteJob;
        });
    });

    it('É chamado ao ativar PT', function () {
        $data = [
            'id' => $this->planoTrabalho->id,
            'justificativa' => 'Ativação do plano de trabalho',
        ];

        $this->planoTrabalhoService->ativar($data, null);

        Bus::assertBatched(function ($batch) {
            return $batch->jobs->count() === 1
                && $batch->jobs->first() instanceof ExportarParticipanteJob;
        });
    });

    it('É chamado ao Reativar PT', function () {
        $data = [
            'id' => $this->planoTrabalho->id,
            'justificativa' => 'Reativação do plano de trabalho',
        ];

        $this->planoTrabalhoService->reativar($data, null);

        Bus::assertBatched(function ($batch) {
            return $batch->jobs->count() === 1
                && $batch->jobs->first() instanceof ExportarParticipanteJob;
        });
    });

    it('É chamado ao alterar PT AVALIADO', function () {
        $this->planoTrabalho->status = StatusEnum::AVALIADO->value;
        $this->planoTrabalho->save();

        Bus::assertBatched(function ($batch) {
            return $batch->jobs->count() === 1
                && $batch->jobs->first() instanceof ExportarParticipanteJob;
        });
    });

    it('É chamado ao alterar PT CONCLUIDO', function () {
        $this->planoTrabalho->status = StatusEnum::CONCLUIDO->value;
        $this->planoTrabalho->save();

        Bus::assertBatched(function ($batch) {
            return $batch->jobs->count() === 1
                && $batch->jobs->first() instanceof ExportarParticipanteJob;
        });
    });

    it('NÃO é chamado ao cancelar PT', function () {
        $this->planoTrabalhoService->cancelarPlanoTrabalho([
            'id' => $this->planoTrabalho->id,
            'justificativa' => 'Cancelamento do plano de trabalho',
        ], $this->planoTrabalho->unidade_id);

        Bus::assertNothingBatched();
    });

});
