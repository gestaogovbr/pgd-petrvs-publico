<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\PlanoTrabalhoConsolidacao;
use NotificationChannels\MicrosoftTeams\MicrosoftTeamsMessage;
use NotificationChannels\MicrosoftTeams\MicrosoftTeamsChannel;

use App\Models\Usuario;

class AvaliarConsolidacao extends Notification
{
    use Queueable;

    protected $consolidacao;

    /**
     * Create a new notification instance.
     */
    public function __construct(PlanoTrabalhoConsolidacao $consolidacao)
    {
        $this->consolidacao = $consolidacao;
    }

    /**
     * Get the notification's delivery channels.
     */
    public function via(object $notifiable): array
    {
        return ['mail', 'database', MicrosoftTeamsChannel::class];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $nomeUsuario = $this->consolidacao->planoTrabalho->usuario->nome ?? 'Usuário';
        $numeroPlano = $this->consolidacao->planoTrabalho->numero ?? 'N/A';
        $unidadeNome = $this->consolidacao->planoTrabalho->unidade->nome ?? 'Unidade não informada';
        $dataInicio = $this->consolidacao->data_inicio ? 
            \Carbon\Carbon::parse($this->consolidacao->data_inicio)->format('d/m/Y') : 'N/A';
        $dataFim = $this->consolidacao->data_fim ? 
            \Carbon\Carbon::parse($this->consolidacao->data_fim)->format('d/m/Y') : 'N/A';
       
        return (new MailMessage)
                    ->subject('Consolidacao de Plano de Trabalho Aguardando Avaliação - #' . $numeroPlano)
                    ->greeting('Olá!')
                    ->line('Um plano de trabalho está aguardando sua avaliação.')
                    ->line('**Detalhes do Plano:**')
                    ->line('• Número: #' . $numeroPlano)
                    ->line('• Participante: ' . $nomeUsuario)
                    ->line('• Unidade: ' . $unidadeNome)
                    ->line('• Período: ' . $dataInicio . ' a ' . $dataFim)
                    ->line('• Status: ' . ($this->consolidacao->latestStatus->status ?? 'CONCLUIDO'))
                    ->action('Avaliar Consolidacao de Plano de Trabalho', url('/planos-trabalho/' . $this->consolidacao->id))
                    ->line('Por favor, acesse o sistema para realizar a avaliação do plano de trabalho.')
                    ->salutation('Atenciosamente, Sistema PETRVS');
    }

    /**
     * Get the array representation of the notification.
     */
    public function toArray(object $notifiable): array
    {
        return [
            'tipo' => 'avaliar_consolidacao',
            'consolidacao_id' => $this->consolidacao->id,
            'numero_plano' => $this->consolidacao->planoTrabalho->numero,
            'usuario_nome' => $this->consolidacao->planoTrabalho->usuario->nome ?? 'Usuário',
            'unidade_nome' => $this->consolidacao->planoTrabalho->unidade->nome ?? 'Unidade não informada',
            'data_inicio' => $this->consolidacao->data_inicio,
            'data_fim' => $this->consolidacao->data_fim,
            'status' => $this->consolidacao->latestStatus->status ?? 'CONCLUIDO',
            'avaliador_id' => $this->consolidacao->avaliacao?->avaliador?->id,
            'titulo' => 'Consolidacao de Plano de Trabalho Aguardando Avaliação',
            'mensagem' => 'A consolidacao de #' . $this->consolidacao->planoTrabalho->numero . 
                         ' de ' . ($this->consolidacao->planoTrabalho->usuario->nome ?? 'Usuário') . 
                         ' está aguardando sua avaliação.',
            'url' => '/planos-trabalho/' . $this->consolidacao->id
        ];
    }

    public function toTeams(object $notifiable)
    {
        return MicrosoftTeamsMessage::create()
            ->to('https://mtegovbr.webhook.office.com/webhookb2/4a813ce6-d43f-4b2a-b3f7-c8ce8309d1fe@3ec92969-5a51-4f18-8ac9-ef98fbafa978/IncomingWebhook/604e8722f37b4489a176b028cb1b57fb/61e8613c-7173-4b24-8fe1-211f3a67163e/V2VcSRvTQUPVOGPSbfyxefFKV22a-6HOMrTVGcuwJ79Kg1')
            ->title($this->toArray($notifiable)['titulo'])
            ->content($this->toArray($notifiable)['mensagem']);
    }
}
