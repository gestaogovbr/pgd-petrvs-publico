<?php

namespace Tests\Unit\Services;

use App\Jobs\Envio\ExportarParticipanteJob;
use App\Jobs\Envio\ExportarPlanoTrabalhoJob;
use App\Models\PlanoTrabalho;
use App\Services\API_PGD\Builder\PlanoTrabalhoEnvioJobBuilder;
use Illuminate\Support\Facades\Bus;
use Tests\TenantTestCase;

uses(TenantTestCase::class);

describe('PlanoTrabalhoEnvioJobBuilder', function () {
    it('monta cadeia com participante e plano de trabalho', function () {
        Bus::fake();

        $planoTrabalho = PlanoTrabalho::factory()->ativo()->create();

        PlanoTrabalhoEnvioJobBuilder::make(tenant('id'), $planoTrabalho->fresh(['usuario']), 'teste')->dispatch();

        Bus::assertChained([
            ExportarParticipanteJob::class,
            ExportarPlanoTrabalhoJob::class,
        ]);
    });

    it('monta cadeia apenas com plano de trabalho quando participante já foi enviado', function () {
        Bus::fake();

        $planoTrabalho = PlanoTrabalho::factory()->ativo()->create();
        $usuario = $planoTrabalho->usuario;
        $usuario->forceFill([
            'data_envio_api_pgd' => now(),
            'updated_at' => now()->subMinute(),
        ])->saveQuietly();

        PlanoTrabalhoEnvioJobBuilder::make(tenant('id'), $planoTrabalho->fresh(['usuario']), 'teste')->dispatch();

        Bus::assertChained([
            ExportarPlanoTrabalhoJob::class,
        ]);

        Bus::assertNotDispatched(ExportarParticipanteJob::class);
    });
});
