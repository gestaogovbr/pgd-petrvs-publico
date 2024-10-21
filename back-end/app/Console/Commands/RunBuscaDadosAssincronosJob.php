<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class RunBuscaDadosAssincronosJob extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:run-busca-dados-assincronos-job  {tenant}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Comando para sincronizar os dados do SIAPE';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $tenantId = $this->argument('tenant');
        if(!$tenantId){
            $this->error('Tenant não informado.');
            return;
        }

        $classe = new \App\Jobs\BuscarDadosSiapeJob($tenantId);
        $classe->handle();
        $this->info('Job executado com sucesso.');
    }
}
