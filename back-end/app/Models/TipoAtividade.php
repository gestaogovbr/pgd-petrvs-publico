<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Atividade;
use App\Traits\AutoDataInicio;
use App\Traits\HasDataFim;

class TipoAtividade extends ModelBase
{
    use AutoDataInicio, HasDataFim;
    
    protected $table = 'tipos_atividades';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'nome', /* varchar(256); NOT NULL; */// Descrição do tipo/categoria da atividade
        'icone', /* varchar(100); NOT NULL; */// Classe do icone
        'cor', /* varchar(100); NOT NULL; */// Código da cor em hex
        'data_inicio', /* datetime; NOT NULL; */// Data inicio da vigência
        //'data_fim', /* datetime; */// Data final da vigência
    ];
    
    // Has
    public function atividades() { return $this->hasMany(Atividade::class, 'tipo_atividade_id'); }    
}
