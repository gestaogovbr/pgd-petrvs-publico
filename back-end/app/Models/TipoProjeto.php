<?php

namespace App\Models;
use App\Models\ModelBase;
use App\Models\Projeto;

class TipoProjeto extends ModelBase
{
    protected $table = 'tipos_projetos';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'nome', /* varchar(256); NOT NULL; */// Descrição do tipo da projeto
        'icone', /* varchar(100); NOT NULL; */// Classe do icone
        'cor', /* varchar(100); NOT NULL; */// Código da cor em hex
        //'deleted_at', /* timestamp; */
    ];

    //public $delete_cascade = [];
    
    // Has
    public function projetos() { return $this->hasMany(Projeto::class); }    
}
