<?php

namespace App\Models;

use App\Casts\AsJson;
use App\Models\ModelBase;
use App\Models\Usuario;
use App\Models\TipoAvaliacao;
use App\Models\AvaliacaoEntregaChecklist;

class Avaliacao extends ModelBase
{
    protected $table = 'avaliacoes';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'nota', /* json; NOT NULL; */// Nota da avaliação
        'justificativa', /* text; */// Comentário referente à avaliação, pelo avaliador
        'tipo_avaliacao_id', /* char(36); NOT NULL; */
        'data_avaliacao', /* datetime; NOT NULL; */// Data e hora da avaliação
        'justificativas', /* json; NOT NULL; DEFAULT: 'json_array()'; */// Justificativas
        'avaliador_id', /* char(36); NOT NULL; */
        'plano_trabalho_consolidacao_id', /* char(36); */
        'plano_entrega_id', /* char(36); */
        'tipo_avaliacao_id', /* char(36); NOT NULL; */
        //'deleted_at', /* timestamp; */
        //'recurso', /* text; */// Recurso contra a nota atribuída, pelo avaliado
    ];

    public $delete_cascade = [
        "entregas_checklist"
    ];

    public $fillable_relations = [
        "entregas_checklist"
    ];

    // Casting
    protected $casts = [
        'nota' => AsJson::class,
        'justificativas' => AsJson::class,
    ];
    
    // Has
    public function entregasChecklist() { return $this->hasMany(AvaliacaoEntregaChecklist::class); }   
    // Belongs
    public function avaliador() { return $this->belongsTo(Usuario::class); }
    public function tipoAvaliacao() { return $this->belongsTo(TipoAvaliacao::class); }
    public function planoEntrega() { return $this->belongsTo(PlanoEntrega::class); }
    public function planoTrabalhoConsolidacao() { return $this->belongsTo(PlanoTrabalhoConsolidacao::class); }
}
