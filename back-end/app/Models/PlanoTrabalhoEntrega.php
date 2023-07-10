<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\PlanoTrabalho;
use App\Models\Entrega;
use App\Models\PlanoEntregaEntrega;

class PlanoTrabalhoEntrega extends ModelBase
{
    protected $table = 'planos_trabalhos_entregas';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'data_inicio', /* datetime; NOT NULL; */// Data inicio da vigência do registro
        'plano_id', /* char(36); NOT NULL; */
        'plano_entrega_entrega_id', /* char(36); */
        'entrega_id', /* char(36); */
        'descricao', /* varchar(256); NOT NULL; */// Detalhamento da entrega
        'forca_trabalho', /* decimal(5,2); NOT NULL; DEFAULT: '0.00'; */// Percentual da força de trabalho
        //'data_fim', /* datetime; */// Data fim da vigência do registro
    ];

    public $delete_cascade = [];

    // Has
    // Belongs
    public function planoTrabalho() { return $this->belongsTo(PlanoTrabalho::class); }
    public function planoEntregaEntrega() { return $this->belongsTo(PlanoEntregaEntrega::class); }
    public function entrega() { return $this->belongsTo(Entrega::class); }
}
