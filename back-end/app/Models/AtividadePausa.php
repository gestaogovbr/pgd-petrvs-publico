<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Atividade;

class AtividadePausa extends ModelBase
{
    protected $table = 'atividades_pausas';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'atividade_id', /* char(36); NOT NULL; */
        //'deleted_at', /* timestamp; */
        'inicio', /* datetime; NOT NULL; */// Data inicio da pausa
        'fim', /* datetime; */// Data de retorno

    ];
    
    // Belongs
    public function atividade() { return $this->belongsTo(Atividade::class); }    
}
