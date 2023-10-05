<?php

namespace App\Models;

use App\Casts\AsJson;
use App\Models\ModelBase;
use App\Models\Usuario;
use App\Models\TipoAvaliacao;
use App\Models\AvaliacaoEntregaChecklist;

class AvaliacaoJustificativa extends ModelBase
{
    protected $table = 'avaliacoes_justificativas';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'avaliacao_id', /* char(36); NOT NULL; */
        'tipo_justificativa_id'
    ];

    public $delete_cascade = [];

    // Casting
    protected $casts = [];
    
    // Has
    // Belongs
    public function avaliacao() { return $this->belongsTo(Avaliacao::class); }
    public function tipoJustificativa() { return $this->belongsTo(TipoJustificativa::class); }

}
