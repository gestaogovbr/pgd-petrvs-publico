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
        
        // Job para inativar usuários temporários às 03:00 diariamente
        $schedule->call(function () {
            $tenants = \App\Models\Tenant::all();
            foreach ($tenants as $tenant) {
                \App\Jobs\InativacaoUsuariosTemporarios::dispatch($tenant->id);
            }
        })->dailyAt('03:00')->name('Inativação Usuários Temporários');
        
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
