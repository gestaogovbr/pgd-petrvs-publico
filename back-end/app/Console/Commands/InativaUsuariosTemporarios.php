<?php

namespace App\Console\Commands;

use App\Jobs\InativacaoUsuariosTemporarios;
use Illuminate\Console\Command;

class InativaUsuariosTemporarios extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'usuarios:inativar-temporarios {tenant}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Inativa usuários com situacao_siape ATIVO_TEMPORARIO após 30 dias';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $tenantId = $this->argument('tenant');
        
        $this->info("Executando inativação de usuários temporários para o tenant: {$tenantId}");
        
        InativacaoUsuariosTemporarios::dispatch($tenantId);
        
        $this->info("Job de inativação de usuários temporários executado com sucesso!");
        
        return 0;
    }
}