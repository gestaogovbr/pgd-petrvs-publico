<?php

use App\Models\JobSchedule;
use App\Models\Tenant;
use Carbon\Carbon;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $now = Carbon::now();

        $tentans = Tenant::all();
        foreach ($tentans as $key => $tenant) {
            $now->addMinutes($key + 10);
            $this->geraJob($tenant->id, $now);
        }
    }

    private function geraJob(string $tenantId, Carbon $now)
    {
        $minute = $now->format('i');
        $hour = $now->format('H');
        $expressaoCron = "{$minute} {$hour} * * *";
        $job = new JobSchedule([
            'nome' => 'Busca Dados Siape ' . $tenantId,
            'classe' => 'BuscarDadosSiapeJob',
            'minutos' => $minute,
            'horas' => $hour,
            'dias' => 0,
            'semanas' => 0,
            'meses' => 0,
            'expressao_cron' => $expressaoCron,
            'ativo' => 1,
            'tenant_id' => $tenantId,
            'parameters' => '[]'
        ]);
        $job->saveOrFail();

        $now->addMinutes(5);
        $minute = $now->format('i');
        $hour = $now->format('H');
        $expressaoCron = "{$minute} {$hour} * * *";

        $job = new JobSchedule([
            'nome' => 'Sincroniza Dados Siape ' . $tenantId,
            'classe' => 'SincronizarSiapeJob',
            'minutos' => $minute,
            'horas' => $hour,
            'dias' => 0,
            'semanas' => 0,
            'meses' => 0,
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
    }
};
