<?php

namespace App\Models;

use App\Casts\AsJson;
use App\Models\ModelBase;
use App\Traits\AutoDataInicio;
use App\Traits\HasDataFim;

class   PlanoEntregaEntrega extends ModelBase
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
        'plano_entrega_id', /* char(36); */
        'entrega_id', /* char(36); NOT NULL; */
        'entrega_pai_id', /* char(36); */
        'progresso_esperado', /* decimal(5,2); DEFAULT: '0.00'; */// Percentual de progresso do Plano de Entregas esperado
        'progresso_realizado', /* decimal(5,2); DEFAULT: '0.00'; */// Percentual de progresso do Plano de Entregas realizado
        'destinatario', /* varchar(255); */// Destinatário da entrega
        //'demandante', /* char(36); NOT NULL; */
        /*'unidade_id',*/// REMOVED
    ];

    public $fillable_changes = ['objetivos', 'processos']; 

    // Casting
    protected $casts = [
        'meta' => AsJson::class,
        'realizado' => AsJson::class
    ];

    // HasMany
    public function objetivos() { return $this->hasMany(PlanoEntregaObjetivo::class, 'plano_entrega_entrega_id'); }
    public function processos() { return $this->hasMany(PlanoEntregaProcesso::class, 'plano_entrega_entrega_id'); }
    // Belongs
    public function planoEntrega() { return $this->belongsTo(PlanoEntrega::class, 'plano_entrega_id'); }
    public function entrega() { return $this->belongsTo(Entrega::class); }
    public function entregaPai() { return $this->belongsTo(PlanoEntregaEntrega::class, 'entrega_pai_id'); }

}
