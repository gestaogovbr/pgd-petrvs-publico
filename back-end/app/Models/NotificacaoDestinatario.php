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
        'tipo', /* enum('PETRVS','EMAIL','WHATSAPP'); NOT NULL; DEFAULT: 'PETRVS'; */// Tipo do envio
        'notificacao_id', /* char(36); NOT NULL; */
        'usuario_id', /* char(36); NOT NULL; */
        //'deleted_at', /* timestamp; */
        'data_leitura', /* datetime; */// Data e hora da leitura
        'data_envio', /* datetime; */// Data e hora do envio, utilizado quando realmente a mensagem foi despachada
        'opcoes', /* json; */// Opções
    ];

    protected $casts = [
        'opcoes' => AsJson::class,
    ];

    // Has
    // Belongs
    public function notificacao() { return $this->belongsTo(Notificacao::class); }//OK//
    public function usuario() { return $this->belongsTo(Usuario::class); }//OK//
    
}
   