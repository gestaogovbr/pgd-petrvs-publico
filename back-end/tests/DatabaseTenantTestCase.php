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
