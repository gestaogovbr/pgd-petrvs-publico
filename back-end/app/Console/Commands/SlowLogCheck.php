<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Str;

class SlowLogCheck extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'db:slow-log:check {--limit=20}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Lê storage/logs/mysql-slow.log, agrupa por query e exibe relatório das piores queries';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $path = storage_path('logs/mysql-slow.log');
        if (!file_exists($path)) {
            $this->error('Arquivo não encontrado: ' . $path);
            return 1;
        }
        $lines = @file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) ?: [];
        if (!count($lines)) {
            $this->warn('Arquivo de log vazio.');
            return 0;
        }
        $stats = [];
        foreach ($lines as $line) {
            $trim = ltrim($line);
            if ($trim === '' || str_starts_with($trim, 'mariadbd,') || str_starts_with($trim, '#')) {
                continue;
            }
            $data = json_decode($trim, true);
            if (!is_array($data) || !isset($data['sql'])) {
                continue;
            }
            $sql = preg_replace('/\s+/', ' ', trim($data['sql']));
            $timeMs = (int) ($data['time_ms'] ?? 0);
            if (!isset($stats[$sql])) {
                $stats[$sql] = [
                    'count' => 0,
                    'total_ms' => 0,
                    'max_ms' => 0,
                    'min_ms' => PHP_INT_MAX,
                    'sql' => $sql,
                    'flags' => [],
                ];
            }
            $s =& $stats[$sql];
            $s['count'] += 1;
            $s['total_ms'] += $timeMs;
            $s['max_ms'] = max($s['max_ms'], $timeMs);
            $s['min_ms'] = min($s['min_ms'], $timeMs);
            if (isset($data['explain'][0]) && is_array($data['explain'][0])) {
                $ex = $data['explain'][0];
                $type = strtolower((string)($ex['type'] ?? ''));
                $extra = strtolower((string)($ex['Extra'] ?? ''));
                $key = $ex['key'] ?? null;
                if ($type === 'all') $s['flags']['FULLSCAN'] = true;
                if ($key === null || $key === '') $s['flags']['NO_INDEX'] = true;
                if (str_contains($extra, 'using filesort')) $s['flags']['FILESORT'] = true;
                if (str_contains($extra, 'using temporary')) $s['flags']['TEMPORARY'] = true;
            }
        }
        if (!count($stats)) {
            $this->warn('Nenhuma entrada JSON válida encontrada no slow log.');
            return 0;
        }
        $rows = array_values($stats);
        usort($rows, function ($a, $b) {
            if ($a['total_ms'] === $b['total_ms']) {
                return $b['max_ms'] <=> $a['max_ms'];
            }
            return $b['total_ms'] <=> $a['total_ms'];
        });
        $limit = (int) $this->option('limit');
        if ($limit > 0) {
            $rows = array_slice($rows, 0, $limit);
        }
        $table = [];
        foreach ($rows as $r) {
            $flags = implode(',', array_keys(array_filter($r['flags'])));
            $table[] = [
                'count' => $r['count'],
                'avg_ms' => number_format($r['total_ms'] / max(1, $r['count']), 2),
                'max_ms' => $r['max_ms'],
                'total_ms' => $r['total_ms'],
                'flags' => $flags,
                'sql' => Str::limit($r['sql'], 200),
            ];
        }
        $this->info('Relatório de slow queries (ordenado por total_ms):');
        $this->table(['count','avg_ms','max_ms','total_ms','flags','sql'], $table);
        return 0;
    }
}
