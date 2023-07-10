<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\TipoAvaliacao;
use App\Models\TipoJustificativa;

class TipoAvaliacaoJustificativa extends ModelBase
{
    protected $table = 'tipos_avaliacoes_justificativas';

    protected $with = ["tipoJustificativa"];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'tipo_avaliacao_id', /* char(36); NOT NULL; */
        'tipo_justificativa_id', /* char(36); NOT NULL; */
        //'deleted_at', /* timestamp; */
    ];

    // Belongs
    public function tipoAvaliacao() { return $this->belongsTo(TipoAvaliacao::class, 'tipo_avaliacao_id'); }    
    public function tipoJustificativa() { return $this->belongsTo(TipoJustificativa::class, 'tipo_justificativa_id'); }    
}
