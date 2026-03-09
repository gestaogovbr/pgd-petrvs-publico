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
    }

    /**
     * Define hooks to migrate the database before each test.
     *
     * @return array
     */
    protected function migrateFreshUsing()
    {
        return [
            '--schema-path' => 'database/schema/mysql-schema.sql',
        ];
    }

}
