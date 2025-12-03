<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Events\QueryExecuted;

class DatabaseTuningServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        if (!$this->isEnabled()) {
            return;
        }
        if (!$this->ensureConnection()) {
            return;
        }
        if (!$this->isMysqlDriver()) {
            return;
        }
        $longQueryTime = (float) config('slow_query.long_query_time', 1.0);
        $this->applyLongQueryTime($longQueryTime);
        $this->applyLogQueriesNotUsingIndexes();
        $this->applyMinExaminedRowLimit();
        $this->registerSlowQueryListener($longQueryTime);
    }

    private function isEnabled(): bool
    {
        return (bool) config('slow_query.enabled');
    }

    private function ensureConnection(): bool
    {
        try {
            DB::connection()->getPdo();
            return true;
        } catch (\Throwable $e) {
            Log::warning('Falha ao abrir conexão para aplicar tuning', ['error' => $e->getMessage()]);
            return false;
        }
    }

    private function isMysqlDriver(): bool
    {
        $driver = config('database.default');
        $conn = config("database.connections.$driver.driver");
        return $conn === 'mysql';
    }

    private function applyLongQueryTime(float $seconds): void
    {
        try {
            DB::statement('SET SESSION long_query_time = ' . $seconds);
        } catch (\Throwable $e) {
            Log::warning('Falha ao setar long_query_time', ['error' => $e->getMessage()]);
        }
    }

    private function applyLogQueriesNotUsingIndexes(): void
    {
        if (!config('slow_query.log_queries_not_using_indexes', true)) {
            return;
        }
        try {
            DB::statement('SET SESSION log_queries_not_using_indexes = 1');
        } catch (\Throwable $e) {
            Log::warning('Falha ao setar log_queries_not_using_indexes', ['error' => $e->getMessage()]);
        }
    }

    private function applyMinExaminedRowLimit(): void
    {
        $minExamined = (int) config('slow_query.min_examined_row_limit', 1000);
        if ($minExamined <= 0) {
            return;
        }
        try {
            DB::statement('SET SESSION min_examined_row_limit = ' . $minExamined);
        } catch (\Throwable $e) {
            Log::warning('Falha ao setar min_examined_row_limit', ['error' => $e->getMessage()]);
        }
    }

    private function registerSlowQueryListener(float $longQueryTime): void
    {
        $thresholdMs = (int) round($longQueryTime * 1000);
        $logExplain = (bool) config('slow_query.log_queries_not_using_indexes', true);
        $logPath = storage_path('logs/mysql-slow.log');
        DB::listen(function (QueryExecuted $event) use ($thresholdMs, $logExplain, $logPath) {
            $timeMs = (int) round($event->time);
            if ($timeMs < $thresholdMs) {
                return;
            }
            $entry = $this->buildEntry($event, $timeMs);
            $this->attachExplainIfApplicable($entry, $event, $logExplain);
            $this->writeSlowLog($logPath, $entry);
        });
    }

    private function buildEntry(QueryExecuted $event, int $timeMs): array
    {
        return [
            'ts' => now()->toIso8601String(),
            'conn' => $event->connectionName,
            'time_ms' => $timeMs,
            'sql' => $event->sql,
            'bindings' => $event->bindings,
        ];
    }

    private function attachExplainIfApplicable(array &$entry, QueryExecuted $event, bool $logExplain): void
    {
        $sqlLower = strtolower(ltrim($event->sql));
        if (!$logExplain || !str_starts_with($sqlLower, 'select') || str_starts_with($sqlLower, 'explain')) {
            return;
        }
        try {
            $explain = DB::connection($event->connectionName)->select('EXPLAIN ' . $event->sql, $event->bindings);
            $entry['explain'] = $explain;
        } catch (\Throwable $e) {
            $entry['explain_error'] = $e->getMessage();
        }
    }

    private function writeSlowLog(string $logPath, array $entry): void
    {
        try {
            @file_put_contents($logPath, json_encode($entry, JSON_UNESCAPED_UNICODE) . PHP_EOL, FILE_APPEND);
        } catch (\Throwable $e) {
            Log::warning('Falha ao escrever mysql-slow.log', ['error' => $e->getMessage()]);
        }
    }
}
