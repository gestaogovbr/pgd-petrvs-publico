<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Plano;
use App\Models\PlanoEntregaEntrega;
use App\Traits\AutoDataInicio;
use App\Traits\HasDataFim;
use Illuminate\Support\Facades\DB;

class PlanoTrabalhoEntrega extends ModelBase
{
    use AutoDataInicio, HasDataFim;

    protected $table = 'planos_trabalhos_entregas';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'nome', 
        'data_inicio', /* datetime; NOT NULL; */// Data inicio da vigência
        'plano_id', /* char(36); */
        'plano_entrega_entrga_id', /* char(36); NOT NULL; */
        //'data_fim', /* datetime; */// Data fim da vigência
    ];

    public $fillable_changes = [];

    public $delete_cascade = [];

    // Has
    // Belongs
    public function plano() { return $this->belongsTo(Plano::class, 'plano_id'); }
    public function entrega() { return $this->belongsTo(PlanoEntregaEntrega::class, 'plano_entrega_entrega_id'); }
}
