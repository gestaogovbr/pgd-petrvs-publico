<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Unidade;
use App\Traits\AutoDataInicio;
use App\Traits\HasDataFim;

class CadeiaValor extends ModelBase
{
    use AutoDataInicio, HasDataFim;

    protected $table = 'cadeias_valores';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'inicio', /* datetime; NOT NULL; */// Data inicio do planejamento
        'fim', /* datetime; */// Data fim do planejamento
        'nome', /* varchar(256); NOT NULL; */// Nome do planejamento estratégico
        'unidade_id', /* char(36); */
        //'data_inicio', /* datetime; NOT NULL; */// Data inicio da vigência do registro
        //'data_fim', /* datetime; */// Data fim da vigência do registro
        //'entidade_id', /* char(36); NOT NULL; */
    ];

    // Belongs
    public function unidade() { return $this->belongsTo(Unidade::class, 'unidade_id'); }
}
