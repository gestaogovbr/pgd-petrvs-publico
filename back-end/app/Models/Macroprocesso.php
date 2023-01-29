<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Traits\AutoDataInicio;
use App\Traits\HasDataFim;
use Illuminate\Database\Eloquent\Casts\AsArrayObject;

class Macroprocesso extends ModelBase
{
    use AutoDataInicio, HasDataFim;

    protected $table = 'tipos_processos_cadeias';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'nome', /* varchar(256); NOT NULL; */// Nome
        //'data_inicio', /* datetime; NOT NULL; */// Data inicio da vigência
        //'data_fim', /* datetime; */// Data fim da vigência
    ];
}
