<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\PlanejamentoObjetivo;

class EixoTematico extends ModelBase
{
    protected $table = 'eixos_tematicos';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'nome', /* varchar(256); NOT NULL; */// Nome do eixo temático
        'icone', /* varchar(100); NOT NULL; */// Classe CSS do icone relacionado ao eixo temático
        'cor', /* varchar(100); NOT NULL; */// Código HEX da cor relacionada ao eixo temático
        'descricao', /* text; */
        //'deleted_at', /* timestamp; */
    ];

    //Has
    public function objetivos() { return $this->hasMany(PlanejamentoObjetivo::class); }

}