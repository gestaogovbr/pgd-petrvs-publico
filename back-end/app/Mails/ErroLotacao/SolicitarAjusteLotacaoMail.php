<?php

namespace App\Mails\ErroLotacao;

use App\Models\Unidade;
use App\Models\Usuario;
use Illuminate\Bus\Queueable;
use Illuminate\Support\Facades\Auth;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use App\DTOs\RelatoErroLotacaoDTO;

class SolicitarAjusteLotacaoMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public RelatoErroLotacaoDTO $relatoErroLotacaoDTO
    )
    {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Solicitação de ajuste de lotação no Siape',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'mails.solicitar-ajuste-lotacao',
            with: [
                'relato' => $this->relatoErroLotacaoDTO,
                'remetente' => Auth::user(),
                'nome' => $this->relatoErroLotacaoDTO->nome
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
