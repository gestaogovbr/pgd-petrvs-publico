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
use Illuminate\Database\Eloquent\Casts\AsArrayObject;

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

    //Casting
    protected $casts = [
        'meta' => AsArrayObject::class
    ];

    // HasMany
    public function entregasPontosControle() { return $this->hasMany(PlanoEntregaPontoControleEntrega::class, 'plano_entrega_entrega_id'); }
    
    // Belongs
    public function planoEntrega() { return $this->belongsTo(PlanoEntrega::class, 'plano_entrega_id'); }
    public function entrega() { return $this->belongsTo(Entrega::class); }
    public function entregaPai() { return $this->belongsTo(Entrega::class, 'entrega_pai_id'); }
}
