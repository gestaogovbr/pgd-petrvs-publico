<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class PruneOldSlowLogs extends Command
{
    protected $signature = 'db:slow-log:prune-old';
    protected $description = 'Apaga logs diários de mysql-slow com mais de 10 dias';

    public function handle()
    {
        $dir = storage_path('logs');
        $pattern = '/^(\d{2}-\d{2}-\d{4})-mysql-slow\.log$/';
        $deleted = 0;
        $kept = 0;
        foreach (@scandir($dir) ?: [] as $file) {
            if (!preg_match($pattern, $file, $m)) {
                continue;
            }
            $dateStr = $m[1];
            $dt = \DateTime::createFromFormat('d-m-Y', $dateStr);
            if (!$dt) { continue; }
            $interval = $dt->diff(new \DateTime('today'));
            if ($interval->days > 10) {
                $path = $dir . DIRECTORY_SEPARATOR . $file;
                if (@unlink($path)) {
                    $deleted++;
                }
            } else {
                $kept++;
            }
        }
        $this->info("Prune concluído: removidos={$deleted}, mantidos={$kept}");
        return 0;
    }
}

