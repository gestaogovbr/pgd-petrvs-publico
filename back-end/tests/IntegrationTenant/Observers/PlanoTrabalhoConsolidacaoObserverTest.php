<?php

namespace Tests\IntegrationTenant\Observers;

use App\Enums\StatusEnum;
use App\Jobs\Envio\ExportarParticipanteJob;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\Usuario;
use Illuminate\Support\Facades\Bus;
use Mockery;

beforeEach(function () {
    Bus::fake();

    tenant()->api_cod_unidade_autorizadora = '1234567890';
    tenant()->save();

    $this->usuario = Usuario::factory()->create();
    $this->actingAs($this->usuario);
});

afterAll(function () {
    Mockery::close();
});

describe('PlanoTrabalhoConsolidacaoObserver', function () {

    it('É chamado ao CONCLUIR PT', function () {
        $planoTrabalho = PlanoTrabalho::factory()->create([
            'status' => StatusEnum::ATIVO->value,
            'usuario_id' => $this->usuario->id,
        ]);

        $consolidacao = PlanoTrabalhoConsolidacao::factory()->create([
            'plano_trabalho_id' => $planoTrabalho->id,
            'status' => StatusEnum::INCLUIDO->value,
        ]);

        Bus::assertNothingBatched();

        $consolidacao->status = StatusEnum::CONCLUIDO->value;
        $consolidacao->save();

        // O envio despacha o primeiro job em batch; os demais entram no then após sucesso.
        Bus::assertBatched(function ($batch) {
            return $batch->jobs->count() === 1
                && $batch->jobs->first() instanceof ExportarParticipanteJob;
        });
    });
});
