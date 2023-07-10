<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\TipoAvaliacaoJustificativa;
use App\Traits\AutoDataInicio;
use App\Traits\HasDataFim;

class TipoJustificativa extends ModelBase
{
    use AutoDataInicio, HasDataFim;
    
    protected $table = 'tipos_justificativas';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'nome', /* varchar(256); NOT NULL; */// Tipo da justificativa da avaliação
        'data_inicio', /* datetime; NOT NULL; */// Data inicio da vigência
        //'data_fim', /* datetime; */// Data final da vigência
    ];

    public $delete_cascade = ['tipos_avaliacoes_justificativas'];

    // Has
    public function tiposAvaliacoesJustificativas() { return $this->hasMany(TipoAvaliacaoJustificativa::class, 'tipo_justificativa_id'); }    
}
