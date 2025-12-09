<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use NotificationChannels\MicrosoftTeams\MicrosoftTeamsChannel;
use NotificationChannels\MicrosoftTeams\MicrosoftTeamsAdaptiveCard;
use NotificationChannels\MicrosoftTeams\ContentBlocks\TextBlock;
use Symfony\Component\HttpFoundation\Response;

class InternalServerErrorNotificacao extends Notification
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
        $message = (string)($this->data['message'] ?? '');
        $code = (int)($this->data['code'] ?? Response::HTTP_INTERNAL_SERVER_ERROR);
        $method = (string)($this->data['method'] ?? '');
        $url = (string)($this->data['url'] ?? '');
        $user = (string)($this->data['user'] ?? '');

        $targetUrl = config('services.microsoft_teams.errors_url') ?: config('services.microsoft_teams.coges_url');
        return MicrosoftTeamsAdaptiveCard::create()
            ->to($targetUrl)
            ->title('Erro interno do servidor')
            ->content([
                TextBlock::create()->setText('Código: **' . $code . '**')->setWeight('Bolder')->setSpacing('Medium')->setSeparator(true),
                TextBlock::create()->setText('Método: ' . ($method !== '' ? $method : '(nulo)'))->setSpacing('Medium')->setSeparator(true),
                TextBlock::create()->setText('URL: ' . ($url !== '' ? $url : '(nulo)'))->setSpacing('Medium')->setSeparator(true),
                TextBlock::create()->setText('Usuário: ' . ($user !== '' ? $user : '(anônimo)'))->setSpacing('Medium')->setSeparator(true),
                TextBlock::create()->setText('Mensagem:')->setWeight('Bolder')->setSpacing('Medium'),
                TextBlock::create()->setText($message)->setWrap(true)->setSpacing('Small')->setSeparator(true),
            ]);
    }
}
