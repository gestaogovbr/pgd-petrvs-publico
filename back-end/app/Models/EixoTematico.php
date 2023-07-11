<?php

namespace App\Models;

use App\Models\ModelBase;

class EixoTematico extends ModelBase
{
    protected $table = 'eixos_tematicos';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'nome', /* varchar(256); NOT NULL; */// Nome do eixo temático
        'icone', /* varchar(100); NOT NULL; */// Classe CSS do icone relacionado ao eixo temático
        'cor', /* varchar(100); NOT NULL; */// Código HEX da cor relacionada ao eixo temático
        'descricao', /* varchar(256); NOT NULL; */// Descrição do eixo temático
        //'deleted_at', /* timestamp; */
    ];
}