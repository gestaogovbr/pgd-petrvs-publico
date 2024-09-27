<?php

namespace App\Mails\ErroLotacao;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ConfirmarAjusteLotacaoMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public string $nome
    )
    {}  

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: ' Solicitação de ajuste de lotação no Siape atendida',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'mails.confirmar-ajuste-lotacao'
        );
    }

}
