<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Stancl\Tenancy\Contracts\Tenant;

class MigrateTenant extends Command
{
    protected $signature = 'tenant:migrate {tenant}';
    protected $description = 'Run migrations for a specific tenant';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $tenant = $this->argument('tenant');

        // Use o serviço tenancy para configurar o tenant
        $tenant = tenancy()->find($tenant);
        tenancy()->initialize($tenant);

        // Execute a migração para o tenant
        $exitCode = $this->call('migrate');

        // Restaure o ambiente de tenancy padrão
        tenancy()->end();

        if ($exitCode === 0) {
            $this->info('Migração bem-sucedida para o tenant ' . $tenant->getTenantKey());
        } else {
            $this->error('Erro durante a migração para o tenant ' . $tenant->getTenantKey());
        }
    }
}
