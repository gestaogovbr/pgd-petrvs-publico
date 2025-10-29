<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use NotificationChannels\MicrosoftTeams\MicrosoftTeamsChannel;
use NotificationChannels\MicrosoftTeams\Actions\ActionOpenUrl;
use NotificationChannels\MicrosoftTeams\MicrosoftTeamsAdaptiveCard;
use NotificationChannels\MicrosoftTeams\ContentBlocks\TextBlock;

class TesteNotificacao extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct()
    {
        //
    }

    public function getKey()
    {
        return 1;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return [MicrosoftTeamsChannel::class];
    }

    public function toMicrosoftTeams($notifiable)
    {
        return MicrosoftTeamsAdaptiveCard::create()
            ->to(config('services.microsoft_teams.coges_url'))
            ->title('Teste de Notificação - Petrvs PGD')
            ->content([
                TextBlock::create()
                    ->setText('Olá, você tem uma nova **notificação**.')
                    ->setFontType('Monospace')
                    ->setWeight('Bolder')
                    ->setSize('ExtraLarge')
                    ->setSpacing('ExtraLarge')
                    ->setStyle('Heading')
                    ->setHorizontalAlignment('Center')
                    ->setSeparator(true)
            ])
            ->actions([
                ActionOpenUrl::create()
                    ->setMode('Primary')
                    ->setStyle('Positive')
                    ->setTitle('Contate o suporte')
                    ->setUrl("https://mgi.pgd.gestao.gov.br/"),
            ]);
    }
}
