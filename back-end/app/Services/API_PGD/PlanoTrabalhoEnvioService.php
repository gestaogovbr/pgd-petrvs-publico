<?php

namespace App\Services\API_PGD;

use App\Exceptions\EnvioNaoAgendadoException;
use App\Jobs\Envio\ExportarPlanoTrabalhoJob;
use App\Models\PlanoTrabalho;
use App\Repository\PlanoEntregaRepository;
use App\Repository\PlanoTrabalhoRepository;
use App\Repository\UsuarioRepository;
use App\Services\API_PGD\Builder\PlanoTrabalhoEnvioJobBuilder;
use Illuminate\Support\Facades\Log;
use Throwable;

// classe responsavel por enviar o job de PT
// encadeia no processo o Participante e os PE relacionados às entregas
class PlanoTrabalhoEnvioService
{
    public static function processar($tenantId, PlanoTrabalho $planoTrabalho, string $origem = '')
    {
        try {
            $planoTrabalho->loadMissing(['usuario', 'entregas.planoEntregaEntrega.planoEntrega']);

            $planoTrabalhoId = (string) $planoTrabalho->id;
            $planoTrabalhoIdentificacao = $planoTrabalho->identificacaoEnvio();

            PlanoTrabalhoEnvioJobBuilder::make($tenantId, $planoTrabalho, $origem)
                ->catch(function (Throwable $e) use ($tenantId, $planoTrabalhoId, $planoTrabalhoIdentificacao): void {
                    self::registrarFalhaDependenciaChain($tenantId, $planoTrabalhoId, $planoTrabalhoIdentificacao, $e);
                })
                ->dispatch();

            Log::info("{$planoTrabalhoIdentificacao} agendado", [$origem]);

            return true;
        } catch (EnvioNaoAgendadoException $e) {
            Log::info("Envio do {$planoTrabalho->identificacaoEnvio()} não agendado: ".$e->getMessage(), [$origem]);

            if ($e->isErroDependencia()) {
                self::registrarErroAgendamentoDependencia($planoTrabalho, self::montarMensagemErroDependencia($e));
            }
        } catch (\Exception $e) {
            throw $e;
        }

        return false;
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

    public static function registrarFalhaDependenciaChain(
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
