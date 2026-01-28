<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Cache;
use Carbon\Carbon;
use Symfony\Component\Finder\SplFileInfo;

class CleanupLogs extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'logs:cleanup';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Clean up tenant logs older than 7 days and clear laravel.log weekly';

    private const LOG_RETENTION_DAYS = 7;
    private const CENTRAL_LOG_FILENAME = 'laravel.log';
    private const TENANT_LOG_REGEX = '/^.+?-(\d{2}-\d{2}-\d{4})-laravel\.log$/';
    private const DATE_FORMAT = 'd-m-Y';
    private const CACHE_KEY_LAST_CLEAR = 'laravel_log_last_clear';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $logPath = storage_path('logs');
        
        if (! File::exists($logPath)) {
            $this->info("Log directory does not exist.");
            return 0;
        }

        $deletedCount = $this->cleanupTenantLogs($logPath);
        
        $this->info("Cleanup completed. Deleted {$deletedCount} tenant log files.");

        $this->cleanupCentralLog($logPath);

        return 0;
    }

    /**
     * Iterate through log files and delete old tenant logs.
     */
    private function cleanupTenantLogs(string $logPath): int
    {
        $files = File::files($logPath);
        $deletedCount = 0;

        foreach ($files as $file) {
            if ($this->shouldDeleteTenantLog($file)) {
                File::delete($file->getPathname());
                $deletedCount++;
                $this->info("Deleted old log: " . $file->getFilename());
            }
        }

        return $deletedCount;
    }

    /**
     * Determine if a tenant log file should be deleted.
     */
    private function shouldDeleteTenantLog(SplFileInfo $file): bool
    {
        if (! preg_match(self::TENANT_LOG_REGEX, $file->getFilename(), $matches)) {
            return false;
        }

        try {
            $logDate = Carbon::createFromFormat(self::DATE_FORMAT, $matches[1])->startOfDay();
            return $logDate->diffInDays(now()->startOfDay(), false) > self::LOG_RETENTION_DAYS;
        } catch (\Throwable $e) {
            return false;
        }
    }

    /**
     * Clear the central laravel.log if the retention period has passed.
     */
    private function cleanupCentralLog(string $logPath): void
    {
        $laravelLogPath = $logPath . DIRECTORY_SEPARATOR . self::CENTRAL_LOG_FILENAME;

        if ($this->shouldClearCentralLog()) {
            if (File::exists($laravelLogPath)) {
                File::put($laravelLogPath, '');
                $this->info("Cleared content of " . self::CENTRAL_LOG_FILENAME);
            }
            
            Cache::put(self::CACHE_KEY_LAST_CLEAR, now()->toDateTimeString());
        }
    }

    /**
     * Check if the central log should be cleared based on the last clear date.
     */
    private function shouldClearCentralLog(): bool
    {
        $lastClear = Cache::get(self::CACHE_KEY_LAST_CLEAR);

        if (! $lastClear) {
            return true;
        }

        $lastClearDate = Carbon::parse($lastClear);
        
        return $lastClearDate->diffInDays(now(), false) >= self::LOG_RETENTION_DAYS;
    }
}
