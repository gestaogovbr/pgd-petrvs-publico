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
        // Cria o tenant no banco principal
        $this->tenant = Tenant::create([
            'id' => 'test_tenant_' . uniqid(),
        ]);

        // Inicializa o contexto do tenant
        tenancy()->initialize($this->tenant);
        
        // Carrega o schema do tenant
        $this->loadTenantSchema();
        
        // Inicia transação no banco do tenant para isolamento
        DB::connection('tenant')->beginTransaction();
    }

    protected function loadTenantSchema()
    {
        // Verifica se tabela chave existe para evitar recarregar schema desnecessariamente
        if (!Schema::connection('tenant')->hasTable('usuarios')) {
            $path = database_path('schema/tenant-schema.sql');
            
            if (file_exists($path)) {
                // Usa mysql CLI para importar schema (necessário para procedures/triggers)
                $config = config('database.connections.tenant');
                
                // Resolve host para IP para evitar problemas de DNS no CLI dentro do container
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
                
                // Executa o comando e captura saída e status
                exec($command, $output, $returnVar);
                
                if ($returnVar !== 0) {
                     // Fallback ou erro explícito
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
