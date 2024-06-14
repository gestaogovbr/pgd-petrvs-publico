<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Jobs\SincronizarSiapeJob;
use Illuminate\Support\Facades\Bus;

class RunSincronizarSiapeJob extends Command
{
    protected $signature = 'job:sincronizar-siape';
    protected $description = 'Executa o job SincronizarSiapeJob manualmente';

    public function handle()
    {
        $tenantId = null;
        $job = new SincronizarSiapeJob($tenantId);

        Bus::dispatch($job);

        $this->info('Job SincronizarSiapeJob executado com sucesso!');
    }
}
