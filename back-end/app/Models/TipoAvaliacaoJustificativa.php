<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\TipoAvaliacao;
use App\Models\TipoJustificativa;

class TipoAvaliacaoJustificativa extends ModelBase
{

    protected $with = ["tipoJustificativa"];

    public $fillable = [
        'tipo_avaliacao_id',
        'tipo_justificativa_id'
    ];

    protected $table = 'tipos_avaliacoes_justificativas';
    // Belongs
    public function tipoAvaliacao() { return $this->belongsTo(TipoAvaliacao::class, 'tipo_avaliacao_id'); }    
    public function tipoJustificativa() { return $this->belongsTo(TipoJustificativa::class, 'tipo_justificativa_id'); }    
}
