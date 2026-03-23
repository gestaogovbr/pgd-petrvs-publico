<?php

namespace App\Jobs\Envio;

use App\Services\API_PGD\PlanoTrabalhoEnvioService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Stancl\Tenancy\Database\Models\Tenant as TenantModel;
use App\Exceptions\EnvioNaoAgendadoException;
use App\Models\PlanoTrabalho;

class AgendarEnvioPlanosTrabalhosJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int|string $tenantId;

    public int $timeout = 0;
    public int $tries = 1;

    public function __construct(int|string $tenantId)
    {
        $this->tenantId = $tenantId;
    }

    public function handle(): void
    {
        $tenant = TenantModel::findOrFail($this->tenantId);

        tenancy()->initialize($tenant);

        Log::info("Iniciando agendamento de envio de PT para tenant {$tenant->id}");

        $qtde = 0;

        DB::table('planos_trabalhos')
            ->whereNull('planos_trabalhos.deleted_at')
            ->whereIn('planos_trabalhos.status', ['ATIVO', 'CONCLUIDO', 'AVALIADO'])
            ->select('planos_trabalhos.id')
            ->chunkById(100, function ($planosTrabalho) use (&$qtde, $tenant) {

                foreach ($planosTrabalho as $planoTrabalho) {
                    $qtde++;
                    $model = PlanoTrabalho::find($planoTrabalho->id);
                    try{
                        PlanoTrabalhoEnvioService::processar($tenant->id, $model, 'AgendarEnvioPlanosTrabalhosJob');
                    }catch(EnvioNaoAgendadoException $e) {
                        Log::error("Erro ao agendar via Job o PE #{$planoTrabalho->id}: {$e->getMessage()}");
                    }
                }

                Log::info("Chunk processado ({$qtde} planos de trabalho até agora)");
            });

        tenancy()->end();

        Log::info("Agendamento finalizado ({$qtde} planos de trabalho)");
    }
}
