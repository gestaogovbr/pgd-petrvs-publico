<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class EnsureDailySlowLog extends Command
{
    protected $signature = 'db:slow-log:ensure-daily {--perm=777}';
    protected $description = 'Garante a criação do log diário dd-mm-YYYY-mysql-slow.log com permissões desejadas';

    public function handle()
    {
        $dir = storage_path('logs');
        @mkdir($dir, 0777, true);
        $filename = now()->format('d-m-Y') . '-mysql-slow.log';
        $path = $dir . DIRECTORY_SEPARATOR . $filename;

        if (!file_exists($path)) {
            if (@touch($path) === false) {
                $this->error('Falha ao criar arquivo: ' . $path);
                return 1;
            }
        }

        $permOpt = (string) $this->option('perm');
        $perm = octdec($permOpt);
        if ($perm <= 0) { $perm = 0777; }
        @chmod($path, $perm);

        $this->info('Arquivo diário garantido: ' . $path . ' (permissão ' . $permOpt . ')');
        return 0;
    }
}

