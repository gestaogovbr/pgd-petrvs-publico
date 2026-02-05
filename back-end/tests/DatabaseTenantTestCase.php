<?php

namespace Tests;

use App\Models\Tenant;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

abstract class DatabaseTenantTestCase extends TestCase
{
    use RefreshDatabase;

    protected $tenant;

    protected function setUp(): void
    {
        parent::setUp();
        
        $this->initializeTenant();
    }

    protected function initializeTenant()
    {
        $this->tenant = Tenant::create([
            'id' => 'test_tenant_' . uniqid(),
        ]);

        tenancy()->initialize($this->tenant);
        
        $this->loadTenantSchema();
        
        DB::connection('tenant')->beginTransaction();
    }

    protected function loadTenantSchema()
    {
        if (!Schema::connection('tenant')->hasTable('usuarios')) {
            $path = database_path('schema/tenant-schema.sql');
            
            if (file_exists($path)) {
                $config = config('database.connections.tenant');
                
                $host = gethostbyname($config['host']);
                
                $command = sprintf(
                    'mysql -h %s -P %s -u %s -p%s %s < %s',
                    escapeshellarg($host),
                    escapeshellarg($config['port']),
                    escapeshellarg($config['username']),
                    escapeshellarg($config['password']),
                    escapeshellarg($config['database']),
                    escapeshellarg($path)
                );
                
                exec($command, $output, $returnVar);
                
                if ($returnVar !== 0) {
                     throw new \Exception("Erro ao importar schema do tenant via mysql CLI. Exit code: $returnVar. Host resolvido: $host. Verifique credenciais e conexão.");
                }
            } else {
                $this->artisan('migrate', [
                    '--path' => 'database/migrations/tenant',
                    '--database' => 'tenant',
                    '--force' => true,
                ]);
            }
        }
    }

    protected function tearDown(): void
    {
        // Rollback na conexão do tenant
        if (DB::connection('tenant')->transactionLevel() > 0) {
            DB::connection('tenant')->rollBack();
        }
        
        // Finaliza tenância para voltar ao contexto central
        // Isso é importante para que o RefreshDatabase (que roda depois)
        // consiga limpar o banco principal corretamente se necessário
        tenancy()->end();
        
        parent::tearDown();
    }
}
