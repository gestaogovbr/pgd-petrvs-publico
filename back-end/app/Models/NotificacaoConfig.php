<?php

namespace App\Models;

class NotificacaoConfig {
    public $enviar_petrvs = true;
    public $enviar_email = true;
    public $enviar_whatsapp = true;
    public $nao_notificar = [];
}
