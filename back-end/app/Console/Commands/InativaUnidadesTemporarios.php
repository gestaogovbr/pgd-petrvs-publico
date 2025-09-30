<?php

namespace App\Console\Commands;

use App\Jobs\InativacaoUnidadesTemporarios;
use Illuminate\Console\Command;

class InativaUnidadesTemporarios extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'unidades:inativar-temporarios {tenant}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Inativa unidades com data_inicio_inativacao após 30 dias';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $tenantId = $this->argument('tenant');
        
        if (empty($tenantId)) {
            $this->error('O parâmetro tenant é obrigatório!');
            return 1;
        }
        
        $this->info("Executando inativação de unidades temporárias para o tenant: {$tenantId}");
        
        InativacaoUnidadesTemporarios::dispatch($tenantId);
        
        $this->info("Job de inativação de unidades temporárias executado com sucesso!");
        
        return 0;
    }
}