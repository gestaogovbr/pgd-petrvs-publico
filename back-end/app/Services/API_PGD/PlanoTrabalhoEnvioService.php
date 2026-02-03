<?php

namespace App\Services\API_PGD;

use App\Models\PlanoTrabalho;
use App\Services\API_PGD\Builder\PlanoEntregaEnvioJobBuilder;
use App\Services\API_PGD\Builder\PlanoTrabalhoEnvioJobBuilder;
use App\Services\API_PGD\Builder\UsuarioEnvioJobBuilder;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

// classe responsavel por enviar o job de PT
// encadeia no processo o Participante e os PE relacionados às entregas
class PlanoTrabalhoEnvioService
{
    public static function processar($tenantId, PlanoTrabalho $planoTrabalho, string $origem = '')
    {
        $jobChain = [];

        DB::beginTransaction();

        try{
            $jobPlanoTrabalho = PlanoTrabalhoEnvioJobBuilder::make($tenantId, $planoTrabalho, $origem);

            if (empty($jobPlanoTrabalho)) {
                DB::rollBack();
                Log::info("Plano de trabalho ID {$planoTrabalho->id} não necessita envio ao PGD");
                return false;
            }

            // FASE 1 - Envio do Participante do PT
            $jobUsuario = UsuarioEnvioJobBuilder::make($tenantId, $planoTrabalho->usuario, $origem);
            if (empty($jobUsuario)) {
                DB::rollBack();
                Log::info("Plano de trabalho ID {$planoTrabalho->id} não necessita envio ao PGD - Usuário não gerou job");
                return false;
            }
            $jobChain[] = $jobUsuario;

            // FASE 2 - Envio dos Planos de Entrega, para devido envio das entregas vinculadas ao plano de trabalho
            foreach($planoTrabalho->entregas as $planoEntregaEntrega) {
                if ($planoEntregaEntrega->plano_entrega_id) {
                    $jobEntrega = PlanoEntregaEnvioJobBuilder::make($tenantId, $planoEntregaEntrega->planoEntrega, $origem);
                    if ($jobEntrega) {
                        $jobChain[] = $jobEntrega;
                    }
                }
            }

            // FASE 3 - Envio do Plano de Trabalho
            $jobChain[] = $jobPlanoTrabalho;

            DB::commit();

            Log::info("Plano de trabalho ID {$planoTrabalho->id} agendado para envio com cadeia de " . count($jobChain) . " jobs.");

            Bus::chain($jobChain)
                ->dispatch();

            return true;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }

        return false;
    }
}
