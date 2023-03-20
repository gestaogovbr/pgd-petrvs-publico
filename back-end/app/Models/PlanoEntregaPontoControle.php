<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Usuario;
use App\Models\PlanoEntrega;
use App\Models\TipoAvaliacao;
use App\Traits\AutoDataInicio;
use App\Traits\HasDataFim;

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

    //Casting
    protected $casts = [
        'justificativas' => AsArrayObject::class
    ];

    // HasMany
    public function entregas() { return $this->hasMany(PlanoEntregaPontoControleEntrega::class, 'plano_entrega_ponto_controle_id'); }
    
    // Belongs
    public function planoEntrega() { return $this->belongsTo(PlanoEntrega::class, 'plano_entrega_id'); }
    public function gestor() { return $this->belongsTo(Usuario::class, 'gestor_id'); }
    public function avaliador() { return $this->belongsTo(Usuario::class, 'avaliador_id'); }
    public function tipoAvaliacao() { return $this->belongsTo(TipoAvaliacao::class, 'tipo_avaliacao_id'); }
}
