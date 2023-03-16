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
        'data_inicio', /* datetime; NOT NULL; */// Data inicio da vigência
        'data_fim', /* datetime; */// Data fim da vigência
        'objetivo_id', /* char(36); NOT NULL; */
    ];

    public $fillable_changes = [];

    public $delete_cascade = [];

  
    // Has
    // public function atividades() { return $this->hasMany(PlanoAtividade::class); }
    // Belongs
    // public function planejamentos() { return $this->belongsTo(Planejamneto::class, 'planejamento_id'); }
    // public function cadeiaValor() { return $this->belongsTo(CadeiaValor::class, 'cadeia_valor_id'); }
    // public function unidade() { return $this->belongsTo(Unidade::class, 'unidade_id'); }
}
