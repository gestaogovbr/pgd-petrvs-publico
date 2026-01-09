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
        \App\Console\Commands\InativaUnidadesSiape::class,
        \App\Console\Commands\InativaUnidadesTemporarios::class,
        \App\Console\Commands\SlowLogCheck::class,
        \App\Console\Commands\NotifySlowQuery::class,
        \App\Console\Commands\SlowLogWatch::class,
        \App\Console\Commands\SlowLogPrune::class,
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
        
        $schedule->call(function () {
            $tenants = \App\Models\Tenant::all();
            foreach ($tenants as $tenant) {
                \App\Jobs\InativacaoUnidadesSiape::dispatch($tenant->id);
            }
        })->dailyAt('00:15')->name('Inativação Unidades SIAPE');
        
        // Job para inativar unidades temporárias às 00:30 diariamente
        $schedule->call(function () {
            $tenants = \App\Models\Tenant::all();
            foreach ($tenants as $tenant) {
                \App\Jobs\InativacaoUnidadesTemporarios::dispatch($tenant->id);
            }
        })->dailyAt('00:30')->name('Inativação Unidades Temporários');
        
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

        $schedule->command('planos:arquivar-avaliados --days=90')->dailyAt('04:00')->name('Arquivar Planos Avaliados (PTs e PEs)');

        $schedule->command('db:slow-log:prune-old')->dailyAt('04:00');
        $schedule->command('db:slow-log:ensure-daily --perm=777')->dailyAt('00:01');
        
        $schedule->command('logs:cleanup')->dailyAt('00:01');
    }
}
