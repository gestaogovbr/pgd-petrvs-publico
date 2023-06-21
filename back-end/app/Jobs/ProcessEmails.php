<?php

namespace App\Jobs;

use App\Mails\NotificacaoMail;
use App\Models\NotificacaoDestinatario;
use App\Models\Tenant;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class ProcessEmails implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $details;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($details)
    {
        $this->details = $details;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $tenant = Tenant::find($this->details['tenant']);
        if($tenant) {
            $details = $this->details;
            $tenant->run(function () use ($details) {
                Mail::to($details['email'])->send(new NotificacaoMail($details['message'], $details["signature"]));
                if(!empty($details["notificacao_destinatario_id"])) {
                    $destinatario = NotificacaoDestinatario::find($details["notificacao_destinatario_id"]);
                    $destinatario->data_envio = now();
                    $destinatario->save();
                }
            });
        }
    }
}
