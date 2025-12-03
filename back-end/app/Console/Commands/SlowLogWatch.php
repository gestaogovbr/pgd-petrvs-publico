<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use function extension_loaded;
use function function_exists;
use function stream_set_blocking;
use function usleep;
use function sleep;
use function clearstatcache;
use function stat;

class SlowLogWatch extends Command
{
    protected $signature = 'db:slow-log:watch {--interval=5}';
    protected $description = 'Observa alterações em storage/logs/mysql-slow.log e dispara db:slow-log:notify ao modificar';
    private const MICROSECONDS_IN_SECOND = 1000000;

    public function handle()
    {
        $path = storage_path('logs/mysql-slow.log');
        $interval = max(1, (int) $this->option('interval'));

        $this->info('Iniciando watcher do slow log em: ' . $path);

        if ($this->hasInotify()) {
            $this->info('Watcher modo: inotify (intervalo ' . $interval . 's).');
            $this->watchInotify($path, $interval);
            return 0;
        }

        $this->info('Watcher modo: polling (intervalo ' . $interval . 's).');
        $this->watchPolling($path, $interval);
        return 0;
    }

    private function hasInotify(): bool
    {
        return extension_loaded('inotify')
            && function_exists('inotify_init')
            && function_exists('inotify_add_watch')
            && function_exists('inotify_read');
    }

    private function getInotifyMask(): int
    {
        $mask = 0;
        $mask |= defined('IN_MODIFY') ? constant('IN_MODIFY') : 0;
        $mask |= defined('IN_CLOSE_WRITE') ? constant('IN_CLOSE_WRITE') : 0;
        $mask |= defined('IN_MOVE') ? constant('IN_MOVE') : 0;
        $mask |= defined('IN_CREATE') ? constant('IN_CREATE') : 0;
        return $mask;
    }

    private function notify(): void
    {
        Artisan::call('db:slow-log:notify');
        $this->line(trim(Artisan::output()));
    }

    private function watchInotify(string $path, int $interval): void
    {
        $this->info('Usando inotify para observar alterações.');
        $fd = @call_user_func('inotify_init');
        if ($fd === false) {
            $this->warn('Falha ao iniciar inotify. Alternando para polling.');
            $this->watchPolling($path, $interval);
            return;
        }

        stream_set_blocking($fd, false);
        $watch = @call_user_func('inotify_add_watch', $fd, $path, $this->getInotifyMask());
        if ($watch === false) {
            $this->warn('Falha ao adicionar watch no arquivo. Alternando para polling.');
            $this->watchPolling($path, $interval);
            return;
        }

        while (true) {
            $events = @call_user_func('inotify_read', $fd) ?: [];
            if (!empty($events)) {
                $this->line('Alteração detectada. Enviando notificação...');
                $this->notify();
            }
            usleep($interval * self::MICROSECONDS_IN_SECOND);
        }
    }

    private function watchPolling(string $path, int $interval): void
    {
        $this->info('Usando polling (intervalo ' . $interval . 's).');
        $lastMtime = null;
        $lastSize = null;

        while (true) {
            clearstatcache(true, $path);
            $stat = @stat($path);
            if ($stat === false) {
                $this->warn('Arquivo não encontrado. Aguardando criação...');
                sleep($interval);
                continue;
            }

            $mtime = $stat['mtime'] ?? 0;
            $size = $stat['size'] ?? 0;

            if ($lastMtime === null) {
                $lastMtime = $mtime;
                $lastSize = $size;
                sleep($interval);
                continue;
            }

            if ($mtime > $lastMtime || $size > $lastSize) {
                $this->line('Alteração detectada (mtime/size). Enviando notificação...');
                $this->notify();
                $lastMtime = $mtime;
                $lastSize = $size;
            }

            sleep($interval);
        }
    }
}
