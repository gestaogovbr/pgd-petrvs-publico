<?php

namespace App\Logging;

use Monolog\Logger;
use Monolog\Handler\StreamHandler;

class TenantCustomLogger
{
    private const DATE_FORMAT = 'd-m-Y';
    private const DIRECTORY_PERMISSIONS = 0755;
    private const DEFAULT_LOG_FILENAME = 'laravel.log';
    private const DEFAULT_LOG_LEVEL = 'debug';
    private const LOGGER_CHANNEL = 'tenant_custom';

    /**
     * Create a custom Monolog instance.
     *
     * @param  array  $config
     * @return \Monolog\Logger
     */
    public function __invoke(array $config)
    {
        $path = $this->resolveLogPath();
        
        $this->ensureDirectoryExists($path);

        $logger = new Logger(self::LOGGER_CHANNEL);
        $logger->pushHandler(new StreamHandler(
            $path, 
            $config['level'] ?? self::DEFAULT_LOG_LEVEL
        ));

        return $logger;
    }

    /**
     * Resolve the log file path based on tenant presence.
     */
    private function resolveLogPath(): string
    {
        $tenantId = $this->getTenantId();

        if (! $tenantId) {
            return storage_path('logs/' . self::DEFAULT_LOG_FILENAME);
        }

        // Format: tenant_id-dd-mm-YYYY-laravel.log
        $filename = sprintf(
            '%s-%s-%s', 
            $tenantId, 
            date(self::DATE_FORMAT), 
            self::DEFAULT_LOG_FILENAME
        );
        
        return storage_path('logs/' . $filename);
    }

    /**
     * Ensure the log directory exists.
     */
    private function ensureDirectoryExists(string $path): void
    {
        $directory = dirname($path);
        
        if (! is_dir($directory)) {
            mkdir($directory, self::DIRECTORY_PERMISSIONS, true);
        }
    }

    /**
     * Detect current tenant ID.
     * 
     * @return string|null
     */
    protected function getTenantId()
    {
        try {
            if (function_exists('tenancy') && tenancy()->initialized) {
                return tenancy()->tenant->id;
            }
        } catch (\Throwable $e) {
            // Fallback if tenancy fails or not found
        }
        
        return null;
    }
}
