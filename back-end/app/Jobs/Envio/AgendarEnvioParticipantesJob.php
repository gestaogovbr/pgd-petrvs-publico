<?php

namespace App\Jobs\Envio;

use App\Jobs\Envio\ExportarParticipanteJob;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Stancl\Tenancy\Database\Models\Tenant as TenantModel;

class AgendarEnvioParticipantesJob implements ShouldQueue
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

        Log::info("Iniciando agendamento PGD para tenant {$tenant->id}");

        $qtde = 0;

        DB::table('usuarios')
            ->join(
                'programas_participantes',
                'usuarios.id',
                '=',
                'programas_participantes.usuario_id'
            )
            ->whereNull('usuarios.deleted_at')
            ->whereNull('programas_participantes.deleted_at')

            ->whereExists(function ($q) {
                $q->select(DB::raw(1))
                  ->from('planos_trabalhos as pt')
                  ->whereColumn('pt.usuario_id', 'usuarios.id')
                  ->whereNull('pt.deleted_at')
                  ->limit(1);
            })

            ->whereExists(function ($q) {
                $q->select(DB::raw(1))
                  ->from('documentos_assinaturas as da')
                  ->whereColumn('da.usuario_id', 'usuarios.id')
                  ->whereNull('da.deleted_at')
                  ->limit(1);
            })

            // idempotência
            ->whereNull('usuarios.data_agendamento_envio')

            ->select('usuarios.id')
            ->distinct()

            ->chunkById(100, function ($usuarios) use (&$qtde, $tenant) {

                foreach ($usuarios as $usuario) {

                    $qtde++;

                    $timestamp = now();

                    DB::table('usuarios')
                        ->where('id', $usuario->id)
                        ->update([
                            'data_agendamento_envio' => now(),
                        ]);

                    ExportarParticipanteJob::dispatch(
                        $tenant->id,
                        $usuario->id,
                        $timestamp
                    )
                    ->onConnection('rabbitmq')
                    ->onQueue('pgd_queue');
                }

                Log::info("Chunk processado ({$qtde} usuários até agora)");
            }, 'usuarios.id');

        tenancy()->end();

        Log::info("Agendamento finalizado ({$qtde} usuários)");
    }
}
