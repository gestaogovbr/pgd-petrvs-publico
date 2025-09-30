<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class InativaUnidadesSiape extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:inativa-unidades-siape {tenant}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Executa a inativação de unidades SIAPE';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        if (!$this->argument('tenant')) {
            Log::error("Tenant não informado.");
            $this->error('Tenant é obrigatório.');
            return 1;
        }
        
        $job = new \App\Jobs\InativacaoUnidadesSiape($this->argument('tenant'));
        $job->handle();
        
        Log::info("Inativação de unidades SIAPE executada com sucesso.");
        $this->info('Job InativacaoUnidadesSiape executado com sucesso.');
        
        return 0;
    }
}