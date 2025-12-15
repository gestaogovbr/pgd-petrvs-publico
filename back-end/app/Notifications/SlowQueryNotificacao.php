<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use NotificationChannels\MicrosoftTeams\MicrosoftTeamsChannel;
use NotificationChannels\MicrosoftTeams\MicrosoftTeamsAdaptiveCard;
use NotificationChannels\MicrosoftTeams\ContentBlocks\TextBlock;

class SlowQueryNotificacao extends Notification
{
    use Queueable;

    private array $data;

    public function __construct(array $data)
    {
        $this->data = $data;
    }

    public function via(object $notifiable): array
    {
        return [MicrosoftTeamsChannel::class];
    }

    public function toMicrosoftTeams($notifiable)
    {
        $enabled = (bool)config('services.microsoft_teams.enabled');
        $cogesUrl = trim((string)config('services.microsoft_teams.coges_url'));
        if (!$enabled || $cogesUrl === '') {
            return null;
        }
        $sql = (string)($this->data['sql'] ?? '');
        $timeMs = (int)($this->data['time_ms'] ?? 0);
        $tenant = (string)($this->data['tenant'] ?? '');
        $file = (string)($this->data['file'] ?? '');

        return MicrosoftTeamsAdaptiveCard::create()
            ->to(config('services.microsoft_teams.coges_url'))
            ->title('Alerta: Consulta Lenta Detectada')
            ->content([
                TextBlock::create()
                    ->setText('Uma consulta lenta foi registrada.')
                    ->setWeight('Bolder')
                    ->setSize('Large')
                    ->setSpacing('Large')
                    ->setSeparator(true),
                TextBlock::create()
                    ->setText('Tempo de execução: **' . $timeMs . ' ms**')
                    ->setWeight('Bolder')
                    ->setSize('ExtraLarge')
                    ->setSpacing('Large')
                    ->setSeparator(true),
                TextBlock::create()
                    ->setText('Tenant: ' . ($tenant !== '' ? $tenant : '(nulo)'))
                    ->setSpacing('Medium')
                    ->setSeparator(true),
                TextBlock::create()
                    ->setText('Arquivo: ' . ($file !== '' ? $file : '(nulo)'))
                    ->setSpacing('Medium')
                    ->setSeparator(true),
                TextBlock::create()
                    ->setText('Query:')
                    ->setWeight('Bolder')
                    ->setSpacing('Medium'),
                TextBlock::create()
                    ->setText($sql)
                    ->setFontType('Monospace')
                    ->setWrap(true)
                    ->setSpacing('Medium')
                    ->setSeparator(true),
            ]);
    }
}
