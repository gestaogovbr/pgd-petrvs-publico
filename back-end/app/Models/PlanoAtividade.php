<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Plano;
use App\Models\Atividade;

class PlanoAtividade extends ModelBase
{
    protected $table = 'planos_atividades';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'plano_id', /* char(36); NOT NULL; */
        'atividade_id', /* char(36); NOT NULL; */
    ];
    
    // Belongs
    public function plano() { return $this->belongsTo(Plano::class, 'plano_id'); }   
    public function atividade() { return $this->belongsTo(Atividade::class, 'atividade_id'); }   
}
