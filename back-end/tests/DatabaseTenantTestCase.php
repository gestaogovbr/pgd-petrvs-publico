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
    protected $tenantId = 'tenant_test';

    protected function setUp(): void
    {
        parent::setUp();
        
        $this->initializeTenant();
    }

    protected function initializeTenant()
    {
        $this->tenant = Tenant::find($this->tenantId);

        if (!$this->tenant) {
            // Verifica se o banco de dados já existe para evitar erro ao criar o tenant
            $tempTenant = new Tenant(['id' => $this->tenantId]);
            $databaseName = $tempTenant->database()->getName();
            
            $dbExists = false;
            try {
                $check = DB::select("SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?", [$databaseName]);
                $dbExists = !empty($check);
            } catch (\Throwable $e) {
                // Ignora erro
            }

            if ($dbExists) {
                // Se o banco existe, cria o registro sem disparar eventos de criação de banco
                $this->tenant = Tenant::withoutEvents(function () {
                    return Tenant::create(['id' => $this->tenantId]);
                });
            } else {
                $this->tenant = Tenant::create([
                    'id' => $this->tenantId,
                ]);
            }
        }

        tenancy()->initialize($this->tenant);
        
        $this->loadTenantSchema();

        // Ensure sequences table has a row (required for stored procedures)
        if (Schema::connection('tenant')->hasTable('sequences')) {
            if (DB::connection('tenant')->table('sequences')->count() == 0) {
                 DB::connection('tenant')->table('sequences')->insert([
                    'created_at' => now(), 
                    'updated_at' => now()
                 ]);
            }
        }
        
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
