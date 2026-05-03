<?php

namespace Tests;

use App\Models\Tenant;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Artisan;

abstract class DatabaseTenantTestCase extends TestCase
{
    use RefreshDatabase;

    protected $tenancy = true;
    protected static bool $dumped = false;

    public function dump() {
        if (self::$dumped) {
            return true;
        }

        $path = database_path('schema/tenant-schema.sql');

        if (!file_exists($path)) {
            Artisan::call('schema:dump', [
                '--database' => 'tenant',
            ]);
        }

        self::$dumped = true;
    }

    protected function loadTenantSchema()
    {
        $needsSchemaReload = !Schema::connection('tenant')->hasTable('usuarios')
            || !Schema::connection('tenant')->hasColumn('usuarios', 'modalidade_pgd');

        if ($needsSchemaReload) {
            $this->dropTenantObjects();

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

    protected function dropTenantObjects(): void
    {
        DB::connection('tenant')->statement('SET FOREIGN_KEY_CHECKS=0');

        $views = DB::connection('tenant')->select("SHOW FULL TABLES WHERE Table_type = 'VIEW'");
        foreach ($views as $view) {
            $viewName = array_values((array) $view)[0] ?? null;
            if ($viewName) {
                DB::connection('tenant')->statement(sprintf('DROP VIEW IF EXISTS `%s`', str_replace('`', '``', $viewName)));
            }
        }

        $tables = DB::connection('tenant')->select("SHOW FULL TABLES WHERE Table_type = 'BASE TABLE'");
        foreach ($tables as $table) {
            $tableName = array_values((array) $table)[0] ?? null;
            if ($tableName) {
                DB::connection('tenant')->statement(sprintf('DROP TABLE IF EXISTS `%s`', str_replace('`', '``', $tableName)));
            }
        }

        DB::connection('tenant')->statement('SET FOREIGN_KEY_CHECKS=1');
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
        // tenancy()->end();

        parent::tearDown();
    }
}
