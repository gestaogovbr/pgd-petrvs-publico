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
        \App\Console\Commands\RunBuscaDadosAssincronosJob::class,
        \App\Console\Commands\InativaUsuarioSiape::class,
    ];

    protected function commands()
    {
        $this->load(__DIR__.'/Commands');
        require base_path('routes/console.php');
    }

    protected function schedule(Schedule $schedule)
    {
        $schedule->command('telescope:prune --hours=72')->daily();
        $agendamentosPrincipal = JobSchedule::where('ativo', true)->get();
        foreach ($agendamentosPrincipal as $jobEntity) {
            $job = JobWithoutTenant::getJob($jobEntity->classe);

            if (!$job instanceof JobWithoutTenant) {
                $job = new JobBase($jobEntity);
            }
            
            $schedule->job($job)
                ->name($jobEntity->nome)
                ->cron($jobEntity->expressao_cron);
        }

        $schedule->command('horizon:snapshot')->everyFiveMinutes();
    }
}
