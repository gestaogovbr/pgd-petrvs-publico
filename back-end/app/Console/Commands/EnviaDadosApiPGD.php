<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\API_PGD\OrgaoCentralService;
use App\Models\Tenant;

class EnviaDadosApiPGD extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'job:envia-api-pgd';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Envia para API do PGD dados do Petrvs';

    public function __construct(
        private OrgaoCentralService $orgaoCentralService
    )
    {}
    
    /**
     * Execute the console command.
     */
    public function handle()
    {
        foreach(Tenant::all() as $tenant) 
        {
            $dados = $this->obterDados($tenant->id);
            $this->orgaoCentralService->exportarDados($tenant->id, $dados);
        }
    }

    public function obterDados($tenantId) {
        return []; //TODO
    }
}
