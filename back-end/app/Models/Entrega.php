<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Traits\AutoDataInicio;
use App\Traits\HasDataFim;
use Illuminate\Database\Eloquent\Casts\AsArrayObject;

class Entrega extends ModelBase
{
    use AutoDataInicio, HasDataFim;

    protected $table = 'entregas';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'nome', /* varchar(256); NOT NULL; */// Nome
        'tipo_indicador', /* enum('QUANTIDADE','VALOR','PORCENTAGEM','QUALITATIVO'); NOT NULL; */// Tipo do indicador
        'lista_qualitativos', /* json; */// valores do qualitativo
        //'data_inicio', /* datetime; NOT NULL; */// Data inicio da vigência
        //'data_fim', /* datetime; */// Data fim da vigência
    ];

    protected $casts = [
        'lista_qualitativos' => AsArrayObject::class,
    ];
}
   