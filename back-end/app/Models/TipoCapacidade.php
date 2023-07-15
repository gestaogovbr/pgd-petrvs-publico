<?php

namespace App\Models;
use App\Models\ModelBase;
use App\Models\Capacidade;

class TipoCapacidade extends ModelBase
{
    protected $table = 'tipos_capacidades';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'id', /* char(36); NOT NULL; */
        'codigo', /* varchar(256); NOT NULL; */// Código da rotina no sistema (acesso)
        'descricao', /* text; NOT NULL; */// Descrição da capacidade (acesso)
        //'deleted_at', /* timestamp; */
    ];

    // Has
    public function capacidades() { return $this->hasMany(Capacidade::class, 'tipo_capacidade_id'); }//OK//
}
