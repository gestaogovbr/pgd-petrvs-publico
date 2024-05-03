<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use App\Models\JobAgendado;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
class Kernel extends ConsoleKernel
{

    protected $commands = [];
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');
        require base_path('routes/console.php');
    }

    protected function schedule(Schedule $schedule)
    {
        $agendamentosPrincipal = JobAgendado::where('ativo', true)->get();
        $this->scheduleJobs($schedule, $agendamentosPrincipal);

        $tenants = $this->getTenants();
        foreach ($tenants as $tenant) {
            DB::purge('tenant');
            config(['database.connections.tenant.database' => 'petrvs_' . strtolower($tenant->id)]);
            DB::reconnect('tenant');
            $agendamentos = JobAgendado::on('tenant')->where('ativo', true)->get();
            if (!empty($agendamentos)) {
                $this->scheduleJobs($schedule, $agendamentos);
            }
        }
    }

    private function scheduleJobs(Schedule $schedule, $agendamentos)
    {
        foreach ($agendamentos as $agendamento) {
            $jobClass = 'App\Jobs\\' . $agendamento->nome_do_job;
            if (class_exists($jobClass)) {
                if ($agendamento->diario) {
                    $schedule->job(new $jobClass)->dailyAt($agendamento->horario);
                } else {
                    $targetDate = Carbon::parse($agendamento->expressao_cron);
                    if ($targetDate->isFuture()) {
                        $schedule->job(new $jobClass)->at($targetDate->format('H:i'));
                    }
                }
            }
        }
    }

    private function getTenants()
    {
        return DB::table('tenants')->get();
    }

}
