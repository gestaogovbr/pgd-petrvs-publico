<?php

namespace App\Models;

use App\Casts\AsJson;
use App\Models\ModelBase;
use App\Models\Usuario;

class NotificacaoWhatsapp extends ModelBase
{
    protected $table = 'notificacoes_whatsapp';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'data_hora', /* datetime; NOT NULL; DEFAULT: 'CURRENT_TIMESTAMP'; */// Data hora do início da sessão
        'finalizacao', /* datetime; */// Data hora da finalizacao da sessão (utilizado posteriormente para alertar o usuário que seu atendimento acabou)
        'ultima_interacao', /* datetime; NOT NULL; DEFAULT: 'CURRENT_TIMESTAMP'; */// Data hora utilizada para fazer o controle do tempo de sessão
        'interacoes', /* json; NOT NULL; DEFAULT: 'json_array()'; */// Interações (histórico do campo atual)
        'atual', /* tinyint; NOT NULL; */// Informações da posição atual no menu
        'usuario_id', /* char(36); */
        //'deleted_at', /* timestamp; */
    ];

    protected static function booted()
    {
        static::creating(function ($unidade) {
            $unidade->data_hora = now();
        });
    }

    // Casting
    protected $casts = [
        'interacoes' => AsJson::class,
        'atual' => AsJson::class
    ];

    // Has
    // Belongs
    public function usuario() { return $this->belongsTo(Usuario::class); }    //nullable
}
