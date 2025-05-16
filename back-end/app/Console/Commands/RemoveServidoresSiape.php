<?php

namespace App\Console\Commands;

use App\Jobs\RemoveServidoresSiapeJob;
use Illuminate\Console\Command;

class removeServidoresSiape extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:remove-servidores-siape {tenantId}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Remover servidores inativos no SIAPE';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $tenantId = $this->argument('tenantId');

        if (empty($tenantId)) {
            $this->error('O tenantId não pode ser vazio.');
            return;
        }
        $service = new RemoveServidoresSiapeJob($tenantId);

        $this->info("✔ RemoveServidoresSiapeJob disparado como o tenant: {$tenantId}");
        
        $service->handle();


    }
}
