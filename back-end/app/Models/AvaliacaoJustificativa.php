<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\DemandaAvaliacao;
use App\Models\TipoJustificativa;

class AvaliacaoJustificativa extends ModelBase
{
    protected $table = 'avaliacoes_justificativas';
    // Belongs
    public function avaliacao() { return $this->belongsTo(DemandaAvaliacao::class); }
    public function tipoJustificativa() { return $this->belongsTo(TipoJustificativa::class, 'tipo_justificativa_id'); }
}
