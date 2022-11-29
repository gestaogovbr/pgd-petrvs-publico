<?php

namespace App\Models;

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
    ];

    protected static function booted()
    {
        static::creating(function ($unidade) {
            $unidade->data_hora = now();
        });
    }

    // Has
    // Belongs
    public function usuario() { return $this->belongsTo(Usuario::class); }
    // Mutattors e Casts
    public function getInteracoesAttribute($value)
    {
        return json_decode($value);
    }
    public function setInteracoesAttribute($value)
    {
        $this->attributes['interacoes'] = json_encode($value);
    }
    public function getAtualAttribute($value)
    {
        return json_decode($value);
    }
    public function setAtualAttribute($value)
    {
        $this->attributes['atual'] = json_encode($value);
    }
}
