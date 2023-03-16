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

class PlanoEntregaEntrega extends ModelBase
{
    use AutoDataInicio, HasDataFim;

    protected $table = 'planos_entregas_entregas';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'data_inicio', /* datetime; NOT NULL; */// Data inicio da vigência
        'data_fim', /* datetime; */// Data fim da vigência
        'inicio', /* datetime; NOT NULL; */// Data inicio
        'fim', /* datetime; */// Data fim
        'descricao', /* varchar(256); NOT NULL; */// Descrição da entrega
        'cliente', /* text; NOT NULL; */// Cliente da entrega
        'homologado', /* tinyint; NOT NULL; */// Se a entrega foi homologada
        'meta', /* json; NOT NULL; */// Meta para a entrega
        'realizado', /* json; */// Valor realizado
        'plano_entrega_id', /* char(36); NOT NULL; */
        'entrega_id', /* char(36); NOT NULL; */
        'entrega_pai_id', /* char(36); */
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
