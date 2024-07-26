<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\API_PGD\OrgaoCentralService;

class EnviaDadosApiPGD extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'job:envia-api-pgd {tenant}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Envia para API do PGD dados do Petrvs';

    
    /**
     * Execute the console command.
     */
    public function handle(OrgaoCentralService $orgaoCentralService)
    {
        $tenant = $this->argument('tenant');
    
        $orgaoCentralService->exportar($tenant);
    }

}
