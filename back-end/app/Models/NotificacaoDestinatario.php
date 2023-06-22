<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Notificacao;
use App\Models\Usuario;
use App\Casts\AsJson;

class NotificacaoDestinatario extends ModelBase
{

    protected $table = 'notificacoes_destinatarios';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        //'tipo', /* enum('petrvs','email','whatsapp'); NOT NULL; */// Tipo do envio
        //'data_leitura', /* datetime; */// Data e hora da leitura
        //'opcoes', /* json; */// Opções
        //'notificacao_id', /* char(36); NOT NULL; */
        //'usuario_id', /* char(36); NOT NULL; */
    ];

    protected $casts = [
        'opcoes' => AsJson::class,
    ];

    // Has
    // Belongs
    public function notificacao() { return $this->belongsTo(Notificacao::class); }
    public function usuario() { return $this->belongsTo(Usuario::class); }
    
}
   