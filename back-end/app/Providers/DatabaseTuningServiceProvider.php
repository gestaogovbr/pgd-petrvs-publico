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
        DB::listen(function (QueryExecuted $event) use ($thresholdMs, $logExplain) {
            $timeMs = (int) round($event->time);
            if ($timeMs < $thresholdMs) {
                return;
            }
            $entry = $this->buildEntry($event, $timeMs);
            $this->attachExplainIfApplicable($entry, $event, $logExplain);
            $this->writeSlowLog($this->currentSlowLogPath(), $entry);
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
            'tenant' => $this->resolveTenantId(),
            'file' => $this->resolveSourceFile(),
        ];
    }

    private function resolveTenantId(): ?string
    {
        try {
            return function_exists('tenant') ? tenant('id') : null;
        } catch (\Throwable $e) {
            return null;
        }
    }

    private function resolveSourceFile(): ?string
    {
        $frames = debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS);
        $self = __FILE__;
        $isAppFile = function (?string $file) use ($self): bool {
            if (!$file) return false;
            if (str_contains($file, DIRECTORY_SEPARATOR . 'vendor' . DIRECTORY_SEPARATOR)) return false;
            if (str_contains($file, DIRECTORY_SEPARATOR . 'bootstrap' . DIRECTORY_SEPARATOR)) return false;
            if ($file === $self) return false;
            if (str_contains($file, DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'Providers' . DIRECTORY_SEPARATOR)) return false;
            return true;
        };

        $idx = null;
        for ($i = 0; $i < count($frames); $i++) {
            $class = $frames[$i]['class'] ?? '';
            $func = $frames[$i]['function'] ?? '';
            $file = $frames[$i]['file'] ?? '';
            if (str_contains($class, 'Illuminate\\Database\\Connection') && in_array($func, ['run','select','statement','insert','update'])) {
                $idx = $i; break;
            }
            if (str_contains($class, 'PDOStatement') && $func === 'execute') {
                $idx = $i; break;
            }
        }

        if ($idx !== null) {
            for ($j = $idx + 1; $j < count($frames); $j++) {
                $file = $frames[$j]['file'] ?? null;
                if ($isAppFile($file)) return $file;
            }
        }

        for ($i = count($frames) - 1; $i >= 0; $i--) {
            $file = $frames[$i]['file'] ?? null;
            if ($isAppFile($file)) return $file;
        }
        return null;
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

    private function currentSlowLogPath(): string
    {
        $filename = now()->format('d-m-Y') . '-mysql-slow.log';
        return storage_path('logs/' . $filename);
    }
}
