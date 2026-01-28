<?php

namespace App\Services\API_PGD;

use App\Jobs\Envio\ExportarParticipanteJob;
use App\Jobs\Envio\ExportarPlanoEntregaJob;
use App\Jobs\Envio\ExportarPlanoTrabalhoJob;
use App\Models\PlanoTrabalho;
use App\Services\API_PGD\Builder\PlanoEntregaEnvioJobBuilder;
use App\Services\API_PGD\Builder\PlanoTrabalhoEnvioJobBuilder;
use App\Services\API_PGD\Builder\UsuarioEnvioJobBuilder;
use App\Services\API_PGD\PlanoEntregaEnvioBuilderService;
use App\Services\API_PGD\PlanoTrabalhoEnvioBuilderService;
use App\Services\API_PGD\UsuarioEnvioBuilderService;
use Carbon\Carbon;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\DB;

class PlanoTrabalhoEnvioService
{
    public static function processar($tenantId, PlanoTrabalho $planoTrabalho)
    {
        $jobChain = [];

        DB::beginTransaction();

        try{
            $jobPlanoTrabalho = PlanoTrabalhoEnvioJobBuilder::make($tenantId, $planoTrabalho);

            if (!$jobPlanoTrabalho) {
                DB::rollBack();
                return false;
            }

            // FASE 1 - Envio do Participante do PT
            $jobUsuario = UsuarioEnvioJobBuilder::make($tenantId, $planoTrabalho->usuario);
            if ($jobUsuario) {
                DB::rollBack();
                return false;
            }
            $jobChain[] = $jobUsuario;

            // FASE 2 - Envio dos Planos de Entrega, para devido envio das entregas vinculadas ao plano de trabalho
            foreach($planoTrabalho->entregas as $planoEntregaEntrega) {
                if ($planoEntregaEntrega->plano_entrega_id) {
                    $jobEntrega = PlanoEntregaEnvioJobBuilder::make($tenantId, $planoEntregaEntrega->planoEntrega);
                    if ($jobEntrega) {
                        $jobChain[] = $jobEntrega;
                    }
                }
            }

            // FASE 3 - Envio do Plano de Trabalho
            $jobChain[] = $jobPlanoTrabalho;

            DB::commit();

            Bus::chain($jobChain)->onConnection('rabbitmq')->onQueue('pgd_queue');

            return true;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }

        return false;
    }
}
