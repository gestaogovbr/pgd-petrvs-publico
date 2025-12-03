<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Factories\NotificationFactory;
use App\Notifications\SlowQueryNotificacao;
use Illuminate\Support\Facades\Notification;

class NotifySlowQuery extends Command
{
    protected $signature = 'db:slow-log:notify';
    protected $description = 'Lê o último registro do mysql-slow.log e envia notificação ao Microsoft Teams';

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

        $lastData = null;
        for ($i = count($lines) - 1; $i >= 0; $i--) {
            $trim = ltrim($lines[$i]);
            if ($trim === '' || str_starts_with($trim, 'mariadbd,') || str_starts_with($trim, '#')) {
                continue;
            }
            $data = json_decode($trim, true);
            if (is_array($data) && isset($data['sql'])) {
                $lastData = $data;
                break;
            }
        }

        if (!$lastData) {
            $this->warn('Nenhuma entrada JSON válida encontrada no slow log.');
            return 0;
        }

        $notification = NotificationFactory::make('slow_query', [
            'sql' => preg_replace('/\s+/', ' ', trim((string)($lastData['sql'] ?? ''))),
            'time_ms' => (int)($lastData['time_ms'] ?? 0),
        ]);

        if (!$notification instanceof SlowQueryNotificacao) {
            $this->error('Falha ao criar notificação.');
            return 1;
        }

        Notification::route('microsoftTeams', config('services.microsoft_teams.coges_url'))
            ->notify($notification);

        $this->info('Notificação enviada ao Microsoft Teams.');
        return 0;
    }
}
