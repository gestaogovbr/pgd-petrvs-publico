<?php

namespace App\Console;

use App\Jobs\JobBase;
use App\Models\JobSchedule;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Illuminate\Support\Facades\Log;

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
        $agendamentosPrincipal = JobSchedule::where('ativo', true)->get();
        foreach ($agendamentosPrincipal as $job) {
            $jobClass = new JobBase($job);
            $schedule->job($jobClass)->cron($job->expressao_cron);
        }
    }
}
