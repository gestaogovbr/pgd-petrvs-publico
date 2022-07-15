<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Unidade;
use App\Models\Entidade;

class Tarefa extends ModelBase
{

    protected $table = 'tarefas';

    public $fillable = [
        'nome',
        'tempo_estimado',
        'documental',
        'comentario_predefinido',
        'entidade_id',
        'unidade_id'
    ];
    
    // Belongs
    public function unidade() { return $this->belongsTo(Unidade::class); }    
    public function entidade() { return $this->belongsTo(Entidade::class); }    
}