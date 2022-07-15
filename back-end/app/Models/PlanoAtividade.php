<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Plano;
use App\Models\Atividade;

class PlanoAtividade extends ModelBase
{
   
    public $fillable = [
        'plano_id',
        'atividade_id'        
    ];
    
    protected $table = 'planos_atividades';
    // Belongs
    public function plano() { return $this->belongsTo(Plano::class, 'plano_id'); }   
    public function atividade() { return $this->belongsTo(Atividade::class, 'atividade_id'); }   
}
