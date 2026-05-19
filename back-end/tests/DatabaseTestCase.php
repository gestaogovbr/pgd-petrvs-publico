<?php

namespace Tests;

use Illuminate\Foundation\Testing\RefreshDatabase;

abstract class DatabaseTestCase extends TestCase
{
    use RefreshDatabase;

    private const DEFAULT_TEST_DATABASE = 'petrvs_test';
    private const DEFAULT_MYSQL_HOST = '127.0.0.1';
    private const DEFAULT_MYSQL_PORT = '3306';
    private const DEFAULT_MYSQL_USERNAME = 'root';

    private static bool $testDatabaseEnsured = false;

    protected $seed = false;

    protected function setUp(): void
    {
        $this->ensureTestDatabaseExists();
        parent::setUp();
    }

    private function ensureTestDatabaseExists(): void
    {
        if (self::$testDatabaseEnsured) {
            return;
        }

        $database = $this->readEnv('DB_DATABASE') ?: self::DEFAULT_TEST_DATABASE;
        $host = $this->readEnv('DB_HOST') ?: self::DEFAULT_MYSQL_HOST;
        $port = $this->readEnv('DB_PORT') ?: self::DEFAULT_MYSQL_PORT;
        $username = $this->readEnv('DB_USERNAME') ?: self::DEFAULT_MYSQL_USERNAME;
        $password = $this->readEnv('DB_PASSWORD') ?: '';

        if (!is_string($database) || !preg_match('/^[A-Za-z0-9_]+$/', $database)) {
            throw new \RuntimeException('Invalid DB_DATABASE value for tests.');
        }

        $dsn = sprintf('mysql:host=%s;port=%s;charset=utf8mb4', $host, $port);

        $pdo = new \PDO($dsn, $username, $password, [
            \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,
        ]);

        $pdo->exec(sprintf(
            'CREATE DATABASE IF NOT EXISTS `%s` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci',
            $database
        ));

        self::$testDatabaseEnsured = true;
    }

    private function readEnv(string $key): ?string
    {
        $value = $_SERVER[$key] ?? $_ENV[$key] ?? getenv($key);

        return is_string($value) && $value !== '' ? $value : null;
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
