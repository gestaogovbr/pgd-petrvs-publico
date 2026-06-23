<?php

namespace App\Services\API_PGD;

use App\Exceptions\EnvioNaoAgendadoException;
use App\Jobs\Envio\ExportarPlanoTrabalhoJob;
use App\Models\PlanoTrabalho;
use App\Repository\PlanoTrabalhoRepository;
use App\Repository\UsuarioRepository;
use App\Services\API_PGD\Builder\PlanoEntregaEnvioJobBuilder;
use App\Services\API_PGD\Builder\PlanoTrabalhoEnvioJobBuilder;
use App\Services\API_PGD\Builder\UsuarioEnvioJobBuilder;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\Log;
use Throwable;

// classe responsavel por enviar o job de PT
// encadeia no processo o Participante e os PE relacionados às entregas
class PlanoTrabalhoEnvioService
{
    public static function processar($tenantId, PlanoTrabalho $planoTrabalho, string $origem = '')
    {
        $jobChain = [];

        try{
            // FASE 1 - Envio do Participante do PT
            $jobUsuario = UsuarioEnvioJobBuilder::make($tenantId, $planoTrabalho->usuario, $origem);
            if ($jobUsuario !== null) {
                $jobChain[] = $jobUsuario;
            } else {
                Log::info("{$planoTrabalho->identificacaoEnvio()} participante já enviado e sem alterações pendentes");
            }

            // FASE 2 - Envio dos Planos de Entrega, para devido envio das entregas vinculadas ao plano de trabalho
            $planoTrabalho->loadMissing('entregas.planoEntregaEntrega.planoEntrega');

            foreach ($planoTrabalho->entregas as $planoTrabalhoEntrega) {
                if (!$planoTrabalhoEntrega->plano_entrega_entrega_id) {
                    continue;
                }

                $planoEntrega = $planoTrabalhoEntrega->planoEntregaEntrega?->planoEntrega;
                if ($planoEntrega === null) {
                    Log::warning("{$planoTrabalho->identificacaoEnvio()} entrega #{$planoTrabalhoEntrega->id} com plano_entrega_entrega_id inválido ou excluído");
                    continue;
                }

                $jobEntrega = PlanoEntregaEnvioJobBuilder::make($tenantId, $planoEntrega, $origem);
                if (!empty($jobEntrega)) {
                    $jobChain[] = $jobEntrega;
                }
            }

            // FASE 3 - Envio do Plano de Trabalho (agendado somente após dependências válidas)
            $jobPlanoTrabalho = PlanoTrabalhoEnvioJobBuilder::make($tenantId, $planoTrabalho, $origem);

            if (empty($jobPlanoTrabalho)) {
                Log::info("{$planoTrabalho->identificacaoEnvio()} não necessita envio");
                return false;
            }

            $jobChain[] = $jobPlanoTrabalho;

            $planoTrabalhoId = (string) $planoTrabalho->id;
            $planoTrabalhoIdentificacao = $planoTrabalho->identificacaoEnvio();

            Bus::chain($jobChain)
                ->catch(function (Throwable $e) use ($tenantId, $planoTrabalhoId, $planoTrabalhoIdentificacao): void {
                    self::registrarFalhaDependenciaChain($tenantId, $planoTrabalhoId, $planoTrabalhoIdentificacao, $e);
                })
                ->dispatch();

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

    private static function montarMensagemErroDependencia(EnvioNaoAgendadoException $e): string
    {
        return match ($e->getTipo()) {
            'PlanoEntrega' => "Erro no agendamento do plano de entrega #{$e->getItemId()} relacionado: {$e->getMessage()}",
            'Usuario', 'Participante' => self::mensagemErroParticipante($e),
            default => $e->getMessage(),
        };
    }

    private static function mensagemErroParticipante(EnvioNaoAgendadoException $e): string
    {
        $usuarioRepository = app()->make(UsuarioRepository::class);
        $usuario = $usuarioRepository->findById($e->getItemId());
        $identificacao = $usuario?->identificacaoEnvio() ?? 'Participante ('.$e->getItemId().')';

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
