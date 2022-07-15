<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Usuario;
use App\Models\Comentario;

class Anexo extends ModelBase
{
    protected $with = [];
    
    public $fillable = [
        'nome',
        'descricao',
        'data_hora',
        'path',
        'base64',
        'usuario_id',
        'comentario_id'
    ];

    protected $table = 'anexos';
   
    // Belongs
    public function usuario() { return $this->belongsTo(Usuario::class, 'usuario_id'); }    
    public function comentario() { return $this->belongsTo(Comentario::class, 'comentario_id'); }    
}
