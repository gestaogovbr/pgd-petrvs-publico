<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Usuario;

class NotificacaoWhatsapp extends ModelBase
{

    public $fillable = [
        'data_hora',
        'finalizacao',
        'ultima_interacao',
        'interacoes',
        'atual',
        'usuario_id'
    ];

    protected $table = 'notificacoes_whatsapp';

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
