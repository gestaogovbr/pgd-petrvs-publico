<?php

namespace App\Jobs;

use App\Models\PlanoEntrega;
use App\Models\PlanoTrabalho;
use App\Models\Tenant;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ArquivarPlanosAvaliadosJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        public int $days = 90
    ) {}

    public function handle(): void
    {
        $cutoffDate = now()->subDays($this->days)->toDateString();
        $now = now();

        $tenants = Tenant::all();
        
        foreach ($tenants as $tenant) {
            tenancy()->initialize($tenant);
            
            DB::transaction(function () use ($cutoffDate, $now, $tenant) {
                $ptCount = PlanoTrabalho::whereNull('data_arquivamento')
                    ->where('avaliado_at', '<=', $cutoffDate)
                    ->update(['data_arquivamento' => $now]);

                $peCount = PlanoEntrega::whereNull('data_arquivamento')
                    ->where('avaliado_at', '<=', $cutoffDate)
                    ->update(['data_arquivamento' => $now]);

                Log::info("Tenant {$tenant->id}: Planos arquivados: {$ptCount} PTs, {$peCount} PEs");
            });
        }
    }
}
