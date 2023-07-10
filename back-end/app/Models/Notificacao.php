<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\NotificacaoDestinatario;
use App\Casts\AsJson;
use Illuminate\Support\Facades\DB;

class Notificacao extends ModelBase
{
    protected $table = 'notificacoes';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'codigo', /* varchar(255); NOT NULL; */// Código da mensagem
        'data_registro', /* datetime; NOT NULL; */// Data e hora da inclusão da mensagem
        'mensagem', /* longtext; NOT NULL; */// Mensagem
        //'numero', /* int; NOT NULL; */// Número da mensagem (Gerado pelo sistema)
    ];

    protected static function booted()
    {
        static::creating(function ($demanda) {
            $demanda->numero = DB::select("CALL sequence_notificacao_numero()")[0]->number;
        }); 
    }

    protected $casts = [];

    // Has
    public function destinatarios() { return $this->hasMany(NotificacaoDestinatario::class); }    
    // Belongs
    
}
   