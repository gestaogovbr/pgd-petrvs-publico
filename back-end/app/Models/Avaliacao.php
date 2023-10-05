<?php

namespace App\Models;

use App\Casts\AsJson;
use App\Models\ModelBase;
use App\Models\Usuario;
use App\Models\TipoAvaliacao;
use App\Models\AvaliacaoJustificativa;
use App\Models\AvaliacaoEntregaChecklist;

class Avaliacao extends ModelBase
{
    protected $table = 'avaliacoes';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'nota', /* json; NOT NULL; */// Nota da avaliação
        'justificativa', /* json; NOT NULL; DEFAULT: 'json_array()'; */// Justificativa
        'tipo_avaliacao_id', /* char(36); NOT NULL; */
        'data_avaliacao',
        //'recurso',
        //'deleted_at', /* timestamp; */
        //'comentarios', /* text; */// Comentário referente à avaliação, pelo avaliador
        //'recurso', /* text; */// Recurso contra a nota atribuída, pelo avaliado
        'avaliador_id', /* char(36); NOT NULL; */
        'plano_trabalho_consolidacao_id', /* char(36); NOT NULL; */
        'plano_entrega_id',
        'tipo_avaliacao_id',
        /*'usuario_id',*/// REMOVED
    ];

    public $delete_cascade = [
        "justificativas",
        "entregasChecklist"
    ];

    public $fillable_changes = [
        "justificativas",
        "entregasChecklist"
    ];

    // Casting
    protected $casts = [
        'nota' => AsJson::class
    ];
    
    // Has
    public function justificativas() { return $this->hasMany(AvaliacaoJustificativa::class); }   
    public function entregasChecklist() { return $this->hasMany(AvaliacaoEntregaChecklist::class); }   
    // Belongs
    public function avaliador() { return $this->belongsTo(Usuario::class); }
    public function tipoAvaliacao() { return $this->belongsTo(TipoAvaliacao::class); }
    public function planoEntrega() { return $this->belongsTo(PlanoEntrega::class); }
    public function planoTrabalhoConsolidacao() { return $this->belongsTo(PlanoTrabalhoConsolidacao::class); }
}
