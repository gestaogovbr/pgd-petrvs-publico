<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class SeedTenant extends Command
{
    protected $signature = 'tenant:seed {tenant?} {--class=DatabaseSeeder} {--force}';
    protected $description = 'Run database seeders for a specific tenant or all tenants';

    public function handle()
    {
        $tenantId = $this->argument('tenant');
        $class = $this->option('class');
        $params = [
            '--class' => $class,
            '--force' => $this->option('force'),
        ];

        if ($tenantId) {
            $this->info("Executando seeder {$class} para o tenant {$tenantId}...");
            $params['--tenants'] = [$tenantId];

            return $this->call('tenants:seed', $params);
        }

        $this->info("Executando seeder {$class} para todos os tenants...");
        return $this->call('tenants:seed', $params);
    }
}
