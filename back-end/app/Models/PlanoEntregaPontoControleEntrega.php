<?php

namespace App\Models;

use App\Casts\AsJson;
use App\Models\ModelBase;
use App\Traits\AutoDataInicio;
use App\Traits\HasDataFim;
use App\Models\PlanoEntregaPontoControle;
use App\Models\PlanoEntregaEntrega;

class PlanoEntregaPontoControleEntrega extends ModelBase
{
    use AutoDataInicio, HasDataFim;

    protected $table = 'planos_entregas_pontos_controles_entregas';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'data_inicio', /* datetime; NOT NULL; */// Data inicio da vigência
        'meta', /* json; NOT NULL; */// Meta para a entrega
        'realizado', /* json; */// Valor realizado
        'plano_entrega_ponto_controle_id', /* char(36); NOT NULL; */
        'plano_entrega_entrega_id', /* char(36); NOT NULL; */
        //'data_fim', /* datetime; */// Data fim da vigência
    ];

    // Casting
    protected $casts = [
        'meta' => AsJson::class,
        'realizado' => AsJson::class
    ];

    // Belongs
    public function pontoControle() { return $this->belongsTo(PlanoEntregaPontoControle::class, 'plano_entrega_ponto_controle_id'); }
    public function planoEntregaEntrega() { return $this->belongsTo(PlanoEntregaEntrega::class, 'plano_entrega_entrega_id'); }
}
