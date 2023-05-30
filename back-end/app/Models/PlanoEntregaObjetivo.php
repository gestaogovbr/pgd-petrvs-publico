<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Usuario;
use App\Models\Unidade;
use App\Models\Programa;
use App\Models\Documento;
use App\Models\TipoModalidade;
use App\Models\PlanoAtividade;
use App\Traits\AutoDataInicio;
use App\Traits\HasDataFim;
use Illuminate\Support\Facades\DB;

class PlanoEntregaObjetivo extends ModelBase
{
    use AutoDataInicio, HasDataFim;

    protected $table = 'planos_entregas_objetivos';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        // 'data_inicio', /* datetime; NOT NULL; */// Data inicio da vigência
        // 'data_fim', /* datetime; */// Data fim da vigência
        'plano_entrega_entrega_id', /* char(36); NOT NULL; */
        'objetivo_id', /* char(36); NOT NULL; */
    ];

    public $fillable_changes = [];

    public $delete_cascade = [];

    // Has
    // public function atividades() { return $this->hasMany(PlanoAtividade::class); }
    // Belongs
    public function objetivo() { return $this->belongsTo(PlanejamentoObjetivo::class, 'objetivo_id'); }
    public function entrega() { return $this->belongsTo(PlanoEntregaEntrega::class, 'plano_entrega_entrega_id'); }
}
