<?php

namespace App\Mails;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Auth;

class NotificacaoMail extends Mailable
{
    use Queueable, SerializesModels;

    public $mensagem;
    public $signature;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($mensagem, $signature)
    {
        $this->mensagem = $mensagem;
        $this->signature = $signature;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('mails.notificacao')->with([
            'usuario' => Auth::user(),
            'signature' => $this->signature,
            'mensagem' => $this->mensagem
        ]);
    }
}
