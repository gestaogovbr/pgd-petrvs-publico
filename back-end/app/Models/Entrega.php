<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Casts\AsJson;

class Entrega extends ModelBase
{
    protected $table = 'entregas';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'nome', /* varchar(256); NOT NULL; */// Nome da entrega
        'descricao', /* varchar(255); NOT NULL; */// Descrição da entrega
        'tipo_indicador', /* enum('QUANTIDADE','VALOR','PORCENTAGEM','QUALITATIVO'); NOT NULL; */// Tipo do indicador da entrega
        'lista_qualitativos', /* json; */// Lista de valores para entrega do tipo qualitativo
    ];

    protected $casts = [
        'lista_qualitativos' => AsJson::class,
    ];
}