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

class PlanoEntregaPontoControle extends ModelBase
{
    use AutoDataInicio, HasDataFim;

    protected $table = 'planos_entregas_pontos_controles';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'data_inicio', /* datetime; NOT NULL; */// Data inicio da vigência
        'data_fim', /* datetime; */// Data fim da vigência
        'inicio', /* datetime; NOT NULL; */// Data inicio
        'fim', /* datetime; NOT NULL; */// Data fim
        'nota_atribuida', /* int; NOT NULL; */// Nota da avaliação 0 - 10
        'justificativas', /* json; */// Justificativas da avaliação
        'comentarios', /* text; */// Comentário referente a nota
        'plano_entrega_id', /* char(36); NOT NULL; */
        'gestor_id', /* char(36); */
        'avaliador_id', /* char(36); */
        'tipo_avaliacao_id', /* char(36); */
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
