<?php

namespace Tests\Unit\Services;

use App\Jobs\Envio\ExportarParticipanteJob;
use App\Jobs\Envio\ExportarPlanoTrabalhoJob;
use App\Models\PlanoTrabalho;
use App\Repository\PlanoTrabalhoRepository;
use App\Services\API_PGD\PlanoTrabalhoEnvioService;
use Illuminate\Queue\TimeoutExceededException;
use Mockery;
use ReflectionClass;
use Tests\TenantTestCase;

uses(TenantTestCase::class);

afterEach(function () {
    Mockery::close();
});

function invokeRegistrarFalhaDependenciaChain(
    string $tenantId,
    string $planoTrabalhoId,
    string $planoTrabalhoIdentificacao,
    \Throwable $exception,
): void {
    $reflection = new ReflectionClass(PlanoTrabalhoEnvioService::class);
    $method = $reflection->getMethod('registrarFalhaDependenciaChain');
    $method->invoke(null, $tenantId, $planoTrabalhoId, $planoTrabalhoIdentificacao, $exception);
}

describe('PlanoTrabalhoEnvioService::registrarFalhaDependenciaChain', function () {
    it('não registra insucesso quando a falha é do próprio envio do plano de trabalho', function () {
        $repository = Mockery::mock(PlanoTrabalhoRepository::class);
        $repository->shouldReceive('findById')->never();
        $repository->shouldReceive('registrarInsucesso')->never();

        app()->instance(PlanoTrabalhoRepository::class, $repository);

        $exception = new TimeoutExceededException(
            ExportarPlanoTrabalhoJob::class.' has timed out.'
        );

        invokeRegistrarFalhaDependenciaChain(
            (string) tenant('id'),
            'pt-1',
            'PT #1',
            $exception,
        );
    });

    it('registra insucesso quando a falha é de dependência do envio', function () {
        $planoTrabalho = new PlanoTrabalho();
        $planoTrabalho->id = 'pt-1';

        $repository = Mockery::mock(PlanoTrabalhoRepository::class);
        $repository->shouldReceive('findById')
            ->once()
            ->with('pt-1')
            ->andReturn($planoTrabalho);
        $repository->shouldReceive('registrarInsucesso')
            ->once()
            ->with(
                $planoTrabalho,
                'Falha em dependência do envio: '.ExportarParticipanteJob::class.' has timed out.'
            );

        app()->instance(PlanoTrabalhoRepository::class, $repository);

        $exception = new TimeoutExceededException(
            ExportarParticipanteJob::class.' has timed out.'
        );

        invokeRegistrarFalhaDependenciaChain(
            (string) tenant('id'),
            'pt-1',
            'PT #1',
            $exception,
        );
    });
});
