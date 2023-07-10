<?php

namespace App\Models;
use App\Models\ModelBase;
use App\Models\Avaliacao;
use App\Models\TipoAvaliacaoJustificativa;

class TipoAvaliacao extends ModelBase
{
    protected $table = 'tipos_avaliacoes';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'nome', /* varchar(256); NOT NULL; */// Nome do tipo de avaliação
        'tipo', /* set('QUALITATIVO','QUANTITATIVO'); NOT NULL; */// Se a nota será um número ou um conceito
        'notas', /* json; NOT NULL; */// Notas
    ];

    public $fillable_relations = [
        'tipos_avaliacoes_justificativas'
    ];
    
    public $delete_cascade = [
        'tipos_avaliacoes_justificativas'
    ];
    
    // Has
    public function avaliacoes() { return $this->hasMany(Avaliacao::class, 'tipo_avaliacao_id'); }    
    public function tiposAvaliacoesJustificativas() { return $this->hasMany(TipoAvaliacaoJustificativa::class, 'tipo_avaliacao_id'); }    
}
