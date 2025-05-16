<?php

use App\Models\JobSchedule;
use App\Models\Tenant;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Carbon\Carbon;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $date = Carbon::tomorrow()->setTime(3, 0, 0);

        $tentans = Tenant::all();
        foreach ($tentans as $key => $tenant) {
            $date->addMinutes($key + 10);
            $this->geraJob($tenant->id, $date);
        }
    }

    private function geraJob(string $tenantId, Carbon $now)
    {
        $minute = $now->format('i');
        $hour = $now->format('H');
        $expressaoCron = "{$minute} {$hour} * * *";
        $job = new JobSchedule([
            'nome' => 'Remover Servidores inativos'. $tenantId,
            'classe' => 'RemoveServidoresSiapeJob',
            'expressao_cron' => $expressaoCron,
            'ativo' => 1,
            'tenant_id' => $tenantId,
            'parameters' => '[]'
            
        ]);
        $job->saveOrFail();
    }
        /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
