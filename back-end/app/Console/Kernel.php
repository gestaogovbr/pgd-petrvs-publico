<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        //
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $agendamentos = JobAgendado::where('ativo', true)->get();
        foreach ($agendamentos as $agendamento) {
            $jobClass = 'App\Jobs\\' . $agendamento->nome_do_job;
            if (class_exists($jobClass)) {
                if ($agendamento->diario) {
                    $schedule->job(new $jobClass)->dailyAt($agendamento->horario);
                } else {
                    $schedule->job(new $jobClass)->cron($agendamento->expressao_cron);
                }
            }
        }
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
