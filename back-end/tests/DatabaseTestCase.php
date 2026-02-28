<?php

namespace Tests;

use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Tenant;

abstract class DatabaseTestCase extends TestCase
{
    use RefreshDatabase;

    protected $seed = false;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Configurações adicionais de setup se necessário
    }

    /**
     * Cria e inicializa um tenant para testes
     */
    protected function setupTenant(array $attributes = []): Tenant
    {
        $tenant = Tenant::create($attributes + [
            'id' => 'test_tenant_' . uniqid(),
        ]);
        
        tenancy()->initialize($tenant);
        
        $this->artisan('migrate', [
            '--path' => 'database/migrations/tenant',
            '--force' => true,
        ]);

        return $tenant;
    }
}
