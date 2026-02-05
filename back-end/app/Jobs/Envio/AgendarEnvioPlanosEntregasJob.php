<?php

namespace App\Jobs\Envio;

use App\Services\API_PGD\PlanoEntregaEnvioService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Stancl\Tenancy\Database\Models\Tenant as TenantModel;
use App\Exceptions\EnvioNaoAgendadoException;
use App\Models\PlanoEntrega;

class AgendarEnvioPlanosEntregasJob implements ShouldQueue
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

        Log::info("Iniciando agendamento de envio de planos de entrega para tenant {$tenant->id}");

        $qtde = 0;

        DB::table('planos_entregas')
            ->whereNull('planos_entregas.deleted_at')
            ->whereIn('planos_entregas.status', ['ATIVO', 'CONCLUIDO', 'AVALIADO'])
            ->select('planos_entregas.id')
            ->chunkById(100, function ($planosEntrega) use (&$qtde, $tenant) {

                foreach ($planosEntrega as $planoEntrega) {
                    $qtde++;
                    $model = PlanoEntrega::find($planoEntrega->id);
                    try{
                        PlanoEntregaEnvioService::processar($tenant->id, $model, 'AgendarEnvioPlanosEntregasJob');
                    }catch(EnvioNaoAgendadoException $e) {
                        Log::error("Erro ao agendar via Job o PE #{$planoEntrega->id}: {$e->getMessage()}");
                    }
                }

                Log::info("Chunk processado ({$qtde} planos de entrega até agora)");
            });

        tenancy()->end();

        Log::info("Agendamento finalizado ({$qtde} planos de entrega)");
    }
}
