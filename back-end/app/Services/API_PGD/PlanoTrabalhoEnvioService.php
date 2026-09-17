<?php

namespace App\Services\API_PGD;

use App\Exceptions\EnvioNaoAgendadoException;
use App\Jobs\Envio\ExportarItemJob;
use App\Jobs\Envio\ExportarPlanoTrabalhoJob;
use App\Models\PlanoTrabalho;
use App\Repository\PlanoEntregaRepository;
use App\Repository\PlanoTrabalhoRepository;
use App\Repository\UsuarioRepository;
use App\Services\API_PGD\Builder\PlanoTrabalhoEnvioJobBuilder;
use Illuminate\Bus\Batch;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\Log;
use Throwable;

// classe responsavel por enviar o job de PT
class PlanoTrabalhoEnvioService
{
    private const NOME_BATCH_ENVIO_PLANO_TRABALHO = 'envio-plano-trabalho';

    public static function processar($tenantId, PlanoTrabalho $planoTrabalho, string $origem = '')
    {
        try{
            $jobs = PlanoTrabalhoEnvioJobBuilder::make($tenantId, $planoTrabalho, $origem);

            if (empty($jobs)) {
                Log::info("{$planoTrabalho->identificacaoEnvio()} não necessita envio");
                return false;
            }

            $planoTrabalhoId = (string) $planoTrabalho->id;
            $planoTrabalhoIdentificacao = $planoTrabalho->identificacaoEnvio();

            self::dispatchSequenciaEnvio($jobs, $tenantId, $planoTrabalhoId, $planoTrabalhoIdentificacao);

            Log::info("{$planoTrabalho->identificacaoEnvio()} agendado", [$origem]);

            return true;
        } catch(EnvioNaoAgendadoException $e) {
            Log::info("Envio do {$planoTrabalho->identificacaoEnvio()} não agendado: " . $e->getMessage(), [$origem]);

            if ($e->isErroDependencia()) {
                self::registrarErroAgendamentoDependencia($planoTrabalho, self::montarMensagemErroDependencia($e));
            }
        } catch (\Exception $e) {
            throw $e;
        }

        return false;
    }

    /**
     * Despacha um job por vez em batch. O próximo só entra no then, após sucesso do batch atual.
     *
     * @param array<int, ShouldQueue> $jobs
     */
    private static function dispatchSequenciaEnvio(
        array $jobs,
        string|int $tenantId,
        string $planoTrabalhoId,
        string $planoTrabalhoIdentificacao,
    ): void {
        if ($jobs === []) {
            return;
        }

        $jobAtual = array_shift($jobs);

        $pendingBatch = Bus::batch([$jobAtual])
            ->name(self::nomeBatchEnvio($planoTrabalhoId, $jobAtual))
            ->catch(function (Batch $batch, Throwable $e) use ($tenantId, $planoTrabalhoId, $planoTrabalhoIdentificacao): void {
                self::registrarFalhaDependenciaChain($tenantId, $planoTrabalhoId, $planoTrabalhoIdentificacao, $e);
            });

        if ($jobs !== []) {
            $pendingBatch->then(function () use ($jobs, $tenantId, $planoTrabalhoId, $planoTrabalhoIdentificacao): void {
                self::dispatchSequenciaEnvio($jobs, $tenantId, $planoTrabalhoId, $planoTrabalhoIdentificacao);
            });
        }

        $pendingBatch->dispatch();
    }

    private static function nomeBatchEnvio(string $planoTrabalhoId, object $job): string
    {
        $etapa = $job instanceof ExportarItemJob ? $job->tag() : class_basename($job);

        return self::NOME_BATCH_ENVIO_PLANO_TRABALHO.' '.$planoTrabalhoId.' '.$etapa;
    }

    private static function montarMensagemErroDependencia(EnvioNaoAgendadoException $e): string
    {
        return match ($e->getTipo()) {
            'PlanoEntrega' => self::mensagemErroPlanoEntrega($e),
            'PlanoTrabalho' => self::mensagemErroPlanoTrabalho($e),
            'Usuario', 'Participante' => self::mensagemErroParticipante($e),
            default => $e->getMessage(),
        };
    }

    private static function mensagemErroPlanoEntrega(EnvioNaoAgendadoException $e): string
    {
        $planoEntregaRepository = app()->make(PlanoEntregaRepository::class);
        $planoEntrega = $planoEntregaRepository->findById($e->getItemId());
        $identificacao = $planoEntrega?->identificacaoEnvio() ?? 'PE';

        return "Erro no agendamento do {$identificacao} relacionado: {$e->getMessage()}";
    }

    private static function mensagemErroPlanoTrabalho(EnvioNaoAgendadoException $e): string
    {
        $planoTrabalhoRepository = app()->make(PlanoTrabalhoRepository::class);
        $planoTrabalho = $planoTrabalhoRepository->findById($e->getItemId());
        $identificacao = $planoTrabalho?->identificacaoEnvio() ?? 'PT';

        return "Erro no agendamento do {$identificacao}: {$e->getMessage()}";
    }

    private static function mensagemErroParticipante(EnvioNaoAgendadoException $e): string
    {
        $usuarioRepository = app()->make(UsuarioRepository::class);
        $usuario = $usuarioRepository->findById($e->getItemId());
        $identificacao = $usuario?->identificacaoEnvio() ?? 'Participante';

        return "Erro no agendamento do {$identificacao}: {$e->getMessage()}";
    }

    private static function registrarErroAgendamentoDependencia(PlanoTrabalho $planoTrabalho, string $mensagem): void
    {
        $planoTrabalhoRepository = app()->make(PlanoTrabalhoRepository::class);
        $planoTrabalhoRepository->registrarConclusao($planoTrabalho, $mensagem);
    }

    private static function isFalhaEnvioProprioPlanoTrabalho(Throwable $e): bool
    {
        return str_contains($e->getMessage(), ExportarPlanoTrabalhoJob::class);
    }

    private static function registrarFalhaDependenciaChain(
        string|int $tenantId,
        string $planoTrabalhoId,
        string $planoTrabalhoIdentificacao,
        Throwable $e,
    ): void {
        if (self::isFalhaEnvioProprioPlanoTrabalho($e)) {
            return;
        }

        $tenant = tenancy()->find((string) $tenantId);
        if ($tenant === null) {
            Log::error(
                "{$planoTrabalhoIdentificacao} - falha em dependência do envio sem tenant: {$e->getMessage()}"
            );

            return;
        }

        $shouldEndTenancy = false;

        if (! tenancy()->initialized || (string) tenant()->getTenantKey() !== (string) $tenant->getTenantKey()) {
            if (tenancy()->initialized) {
                tenancy()->end();
            }

            tenancy()->initialize($tenant);
            $shouldEndTenancy = true;
        }

        try {
            $planoTrabalhoRepository = app()->make(PlanoTrabalhoRepository::class);
            $model = $planoTrabalhoRepository->findById($planoTrabalhoId);

            if ($model === null || $model->data_tentativa_envio !== null) {
                return;
            }

            $planoTrabalhoRepository->registrarInsucesso(
                $model,
                'Falha em dependência do envio: '.$e->getMessage()
            );
        } catch (Throwable $chainError) {
            Log::error(
                "{$planoTrabalhoIdentificacao} - erro ao registrar falha da cadeia de envio: {$chainError->getMessage()}",
                ['exception' => $chainError]
            );
        } finally {
            if ($shouldEndTenancy) {
                tenancy()->end();
            }
        }
    }
}
