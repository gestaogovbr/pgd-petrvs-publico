<?php

namespace App\Console;

use App\Jobs\JobBase;
use App\Jobs\JobWithoutTenant;
use App\Models\JobSchedule;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Illuminate\Support\Facades\Log;

class Kernel extends ConsoleKernel
{
    protected $commands = [
        \App\Console\Commands\ExecutaSiape::class,
        \App\Console\Commands\InsertLog::class,
    ];

    protected function commands()
    {
        $this->load(__DIR__.'/Commands');
        require base_path('routes/console.php');
    }

    protected function schedule(Schedule $schedule)
    {
        $agendamentosPrincipal = JobSchedule::where('ativo', true)->get();
        foreach ($agendamentosPrincipal as $jobEntity) {
            $job = JobWithoutTenant::getJob($jobEntity->classe);

            if (!$job instanceof JobWithoutTenant) {
                $job = new JobBase($jobEntity);
            }
            
            $schedule->job($job)->cron($jobEntity->expressao_cron);
        }
    }
}
