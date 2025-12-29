<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class SlowLogPrune extends Command
{
    protected $signature = 'db:slow-log:prune {--keep=0 : Quantidade de linhas recentes a manter (0 para limpar tudo)}';
    protected $description = 'Limpa o slow log diário atual, opcionalmente mantendo as últimas N linhas';

    public function handle()
    {
        $path = storage_path('logs/' . now()->format('d-m-Y') . '-mysql-slow.log');
        if (!file_exists($path)) {
            $this->warn('Arquivo não encontrado: ' . $path);
            return 0;
        }

        $keep = max(0, (int) $this->option('keep'));
        if ($keep === 0) {
            // rotaçao simples: remove e recria para evitar descritores pendentes
            @unlink($path);
            $created = @touch($path);
            if (!$created) {
                $this->error('Falha ao recriar arquivo: permissão negada ou caminho inválido.');
                return 1;
            }
            @chmod($path, 0660);
            try { DB::statement('FLUSH SLOW LOGS'); } catch (\Throwable $e) {}
            $this->info('mysql-slow.log limpo (0 linhas mantidas).');
            return 0;
        }

        $lines = @file($path, FILE_IGNORE_NEW_LINES) ?: [];
        $total = count($lines);
        $start = max(0, $total - $keep);
        $slice = array_slice($lines, $start);
        $payload = implode(PHP_EOL, $slice) . (count($slice) ? PHP_EOL : '');
        $written = file_put_contents($path, $payload);
        if ($written === false) {
            $this->error('Falha ao escrever: permissão negada ou arquivo indisponível.');
            return 1;
        }
        @chmod($path, 0660);
        try { DB::statement('FLUSH SLOW LOGS'); } catch (\Throwable $e) {}
        $this->info("mysql-slow.log limpo (mantidas {$keep} linhas).");
        return 0;
    }
}
