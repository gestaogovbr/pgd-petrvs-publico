<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Usuario;
use App\Models\Demanda;
use App\Models\Projeto;
use App\Models\ProjetoTarefa;

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
        'demanda_entrega_id',
        'projeto_id',
        'projeto_tarefa_id'
    ];

    protected $table = 'comentarios';
   
    public $delete_cascade = ['comentarios'];

    // Has
    public function comentarios() { return $this->hasMany(Comentario::class); }
    // Belongs
    public function usuario() { return $this->belongsTo(Usuario::class, 'usuario_id'); }    
    public function comentario() { return $this->belongsTo(Comentario::class, 'comentario_id'); } 
    public function demanda() { return $this->belongsTo(Demanda::class, 'demanda_id'); } 
    public function demandaEntrega() { return $this->belongsTo(DemandaEntrega::class, 'demanda_entrega_id'); } 
    public function projeto() { return $this->belongsTo(Projeto::class, 'projeto_id'); } 
    public function projetoTarefa() { return $this->belongsTo(ProjetoTarefa::class, 'projeto_tarefa_id'); } 
}
