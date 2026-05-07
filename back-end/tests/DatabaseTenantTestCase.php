<?php

namespace Tests;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;

abstract class DatabaseTenantTestCase extends TestCase
{
    use RefreshDatabase;

    protected $tenancy = true;
    protected static bool $tenantSchemaLoaded = false;

    protected function setUp(): void
    {
        parent::setUp();

        // Integração HTTP usa X-ENTIDADE; .env local com domain/subdomain ignora o header e quebra os testes.
        config()->set('petrvs.tenant.type', 'request');
    }

    protected function loadTenantSchema()
    {
        if (self::$tenantSchemaLoaded) {
            return;
        }

        $tenantDatabase = (string) config('database.connections.tenant.database');
        $databaseExists = DB::connection(config('tenancy.database.central_connection', config('database.default')))
            ->select(
                'SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ? LIMIT 1',
                [$tenantDatabase]
            );

        if (empty($databaseExists)) {
            throw new \RuntimeException("Banco tenant '{$tenantDatabase}' não existe para os testes.");
        }

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
        }

        self::$tenantSchemaLoaded = true;
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
        if (DB::connection('tenant')->transactionLevel() > 0) {
            DB::connection('tenant')->rollBack();
        }

        parent::tearDown();
    }
}
