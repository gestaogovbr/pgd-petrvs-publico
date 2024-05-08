<?php

namespace App\Console;

use App\Jobs\JobBase;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use App\Models\JobAgendado;
use Illuminate\Support\Facades\App;
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
        // Agendamento de JOBS
        $agendamentosPrincipal = JobAgendado::where('ativo', true)->get();
        foreach ($agendamentosPrincipal as $job) {
            $jobClass = new JobBase($job);
            if ($job->diario) {
                $schedule->job($jobClass)->dailyAt($job->horario);
            } else {
                $targetDate = Carbon::parse($job->expressao_cron);
                if ($targetDate->isFuture()) {
                    $schedule->job($jobClass)->at($targetDate->format('Y-m-d H:i'));
                }
            }
        }

        //Aqui virão outros agendamentos
    }
}
