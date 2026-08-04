<?php

namespace Tests\Unit\Services;

use App\Jobs\Envio\ExportarParticipanteJob;
use App\Models\Tenant;
use App\Models\Usuario;
use App\Repository\EnvioParticipanteRepository;
use App\Repository\UsuarioRepository;
use App\Services\Envio\AgendarEnvioParticipantesService;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Queue;
use Mockery;
use Tests\TenantTestCase;

uses(TenantTestCase::class);

afterEach(function () {
    Mockery::close();
});

describe('AgendarEnvioParticipantesService', function () {
    beforeEach(function () {
        Log::spy();
    });

    function usuarioValidoParaEnvio(int|string $id): Usuario
    {
        $usuario = new Usuario();
        $usuario->id = (string) $id;
        $usuario->matricula = '12345';
        $usuario->data_envio_api_pgd = null;
        $usuario->updated_at = now();

        return $usuario;
    }

    it('percorre os chunks, carrega usuários e enfileira envio', function () {
        Queue::fake();

        $usuarioRepo = Mockery::mock(UsuarioRepository::class);
        $usuarioRepo->shouldReceive('findAllParaEnvio')
            ->once()
            ->with(AgendarEnvioParticipantesService::CHUNK_SIZE, Mockery::type('callable'))
            ->andReturnUsing(function (int $chunkSize, callable $callback): void {
                $callback(collect([(object) ['id' => 10], (object) ['id' => 20]]));
            });

        $usuarioRepo->shouldReceive('findById')->with('10')->andReturn(usuarioValidoParaEnvio(10));
        $usuarioRepo->shouldReceive('findById')->with('20')->andReturn(usuarioValidoParaEnvio(20));

        $service = new AgendarEnvioParticipantesService($usuarioRepo);
        $service->executarAgendamentoNoTenant(tenant());

        Queue::assertPushed(ExportarParticipanteJob::class, 2);
    });

    it('invoca o callback uma vez por chunk quando o repositório emite vários chunks', function () {
        Queue::fake();

        $usuarioRepo = Mockery::mock(UsuarioRepository::class);
        $chunks = 0;
        $usuarioRepo->shouldReceive('findAllParaEnvio')
            ->once()
            ->andReturnUsing(function (int $chunkSize, callable $callback) use (&$chunks): void {
                $callback(collect([(object) ['id' => 1]]));
                $chunks++;
                $callback(collect([(object) ['id' => 2]]));
                $chunks++;
            });

        $usuarioRepo->shouldReceive('findById')->with('1')->andReturn(usuarioValidoParaEnvio(1));
        $usuarioRepo->shouldReceive('findById')->with('2')->andReturn(usuarioValidoParaEnvio(2));

        $tenant =  tenant();

        $service = new AgendarEnvioParticipantesService($usuarioRepo);
        $service->executarAgendamentoNoTenant($tenant);

        expect($chunks)->toBe(2);
        Queue::assertPushed(ExportarParticipanteJob::class, 2);
    });
});
