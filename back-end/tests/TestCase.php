<?php

namespace Tests;

use App\Models\Tenant;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;

    protected $tenancy = false;
    protected $tenant = null;
    protected $tenantId = '_test';

    protected function setUp(): void
    {
        parent::setUp();

        static::disableRabbitMQ();

        if ($this->tenancy) {
            $this->initializeTenant();
        }
    }

    public static function disableRabbitMQ() {
        config()->set('queue.connections.rabbitmq.driver', 'sync');
    }

    protected function migrateFreshUsing()
    {
        return [
            '--schema-path' => 'database/schema/mysql-schema.sql',
        ];
    }

    /*public function initializeTenancy()
    {
        $this->tenant = Tenant::create();

        tenancy()->initialize($this->tenant);
    }*/

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
        if ($this->tenancy) {
            tenancy()->end();
        }
        parent::tearDown();
    }

    public static function tearDownAfterClass(): void
    {
        static::$tenant?->delete();

        parent::tearDownAfterClass();
    }
}
