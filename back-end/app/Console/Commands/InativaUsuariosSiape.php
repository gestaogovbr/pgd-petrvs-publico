<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class InativaUsuarioSiape extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:inativa-usuario-siape {tenant}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Executa a inativação de usuários SIAPE';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        if (!$this->argument('tenant')) {
            Log::error("Tenant não informado.");
            return;
        }
        $job = new \App\Jobs\InativacaoUsuariosSiape($this->argument('tenant'));
        $job->handle();
        Log::info("Inativação de usuários SIAPE executada com sucesso.");
    }

   
}
