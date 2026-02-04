<?php

namespace App\Services\API_PGD;

use App\Models\PlanoTrabalho;
use App\Services\API_PGD\Builder\PlanoEntregaEnvioJobBuilder;
use App\Services\API_PGD\Builder\PlanoTrabalhoEnvioJobBuilder;
use App\Services\API_PGD\Builder\UsuarioEnvioJobBuilder;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Exceptions\EnvioNaoAgendadoException;

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
                Log::info("PT ID {$planoTrabalho->id} não necessita envio");
                return false;
            }

            // FASE 1 - Envio do Participante do PT
            $jobUsuario = UsuarioEnvioJobBuilder::make($tenantId, $planoTrabalho->usuario, $origem);
            if (empty($jobUsuario)) {
                DB::rollBack();
                Log::info("PT #{$planoTrabalho->id} não necessita envio - Usuário não gerou job");
                return false;
            }
            $jobChain[] = $jobUsuario;


            // FASE 2 - Envio dos Planos de Entrega, para devido envio das entregas vinculadas ao plano de trabalho
            foreach($planoTrabalho->entregas as $planoTrabalhoEntrega) {
                if ($planoTrabalhoEntrega->plano_entrega_entrega_id) {
                    $jobEntrega = PlanoEntregaEnvioJobBuilder::make($tenantId, $planoTrabalhoEntrega->planoEntregaEntrega->planoEntrega, $origem);
                    if (!empty($jobEntrega)) {
                        $jobChain[] = $jobEntrega;
                    }
                }
            }

            // FASE 3 - Envio do Plano de Trabalho
            $jobChain[] = $jobPlanoTrabalho;

            DB::commit();

            Bus::chain($jobChain)->dispatch();

            Log::info("PT #{$planoTrabalho->id} agendado", [$origem]);

            return true;
        } catch(EnvioNaoAgendadoException $e) {
            Log::info("Envio do PT #{$planoTrabalho->id} não agendado: " . $e->getMessage(), [$origem]);
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }

        return false;
    }
}
