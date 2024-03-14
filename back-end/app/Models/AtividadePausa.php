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
        'data_inicio', /* datetime; NOT NULL; */// Data de início da pausa
        'data_fim', /* datetime; */// Data de retorno
        //'deleted_at', /* timestamp; */
    ];
    
    // Belongs
    public function atividade() { return $this->belongsTo(Atividade::class); }    
}
