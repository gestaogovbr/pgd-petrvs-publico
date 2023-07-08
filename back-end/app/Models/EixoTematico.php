<?php

namespace App\Models;

use App\Models\ModelBase;

class EixoTematico extends ModelBase
{
    protected $table = 'eixos_tematicos';

    protected $with = [];

    public $fillable = [ // TYPE; NULL?; DEFAULT?; // COMMENT

    ];
}

/*
        'nome', // varchar(256); NOT NULL; // Nome
        'icone', // varchar(100); NOT NULL; // Class do icone relacionado ao afastamento
        'cor', // varchar(100); NOT NULL; // Código da cor em formato hex
        'descricao', // varchar(256); NOT NULL; // Descrição
        //'data_inicio', // datetime; NOT NULL; // Data inicio da vigência
        //'data_fim', // datetime; // Data fim da vigência

*/