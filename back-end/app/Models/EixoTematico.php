<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Traits\AutoDataInicio;
use App\Traits\HasDataFim;

class EixoTematico extends ModelBase
{
    use AutoDataInicio, HasDataFim;

    protected $table = 'eixos_tematicos';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'nome', /* varchar(256); NOT NULL; */// Nome
        //'data_inicio', /* datetime; NOT NULL; */// Data inicio da vigência do registro (criação)
        //'data_fim', /* datetime; */// Data fim da vigência do registro (deleção soft delete)
        'icone', /* varchar(100); NOT NULL; */// Class do icone relacionado ao eixo temático
        'cor', /* varchar(100); NOT NULL; */// Código da cor em formato hex
        'descricao', /* varchar(256); NOT NULL; */// Descrição
    ];
}
