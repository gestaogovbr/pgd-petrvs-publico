<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Usuario;
use App\Models\Demanda;

class Comentario extends ModelBase
{
    protected $with = [];
    
    public $fillable = [
        'texto',
        'path',
        'data_hora',
        'tipo',
        'privacidade',
        'usuario_id',
        'comentario_id',
        'demanda_id',
        'entrega_id'
    ];

    protected $table = 'comentarios';
   
    public $delete_cascade = ['comentarios'];

    // Has
    public function comentarios() { return $this->hasMany(Comentario::class); }
    // Belongs
    public function usuario() { return $this->belongsTo(Usuario::class, 'usuario_id'); }    
    public function comentario() { return $this->belongsTo(Comentario::class, 'comentario_id'); } 
    public function demanda() { return $this->belongsTo(Demanda::class, 'demanda_id'); } 
    public function entrega() { return $this->belongsTo(Entrega::class, 'entrega_id'); } 
}
