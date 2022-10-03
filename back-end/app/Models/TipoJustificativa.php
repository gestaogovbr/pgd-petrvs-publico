<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\TipoAvaliacaoJustificativa;
use App\Traits\AutoDataInicio;
use App\Traits\HasDataFim;

class TipoJustificativa extends ModelBase
{
    use AutoDataInicio, HasDataFim;
    
    public $fillable = [
        'nome',
        'data_inicio',
        //'data_fim'
    ];

    public $delete_cascade = ['tiposAvaliacoesJustificativas'];

    protected $table = 'tipos_justificativas';
    // Has
    public function tiposAvaliacoesJustificativas() { return $this->hasMany(TipoAvaliacaoJustificativa::class, 'tipo_justificativa_id'); }    
}
