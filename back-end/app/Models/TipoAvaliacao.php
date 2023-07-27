<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Avaliacao;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\TipoAvaliacaoJustificativa;

class TipoAvaliacao extends ModelBase
{
    protected $table = 'tipos_avaliacoes';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'nome', /* varchar(256); NOT NULL; */// Nome do tipo de avaliação
        'tipo', /* set('QUALITATIVO','QUANTITATIVO'); NOT NULL; */// Se a nota será um número ou um conceito
        'notas', /* json; NOT NULL; */// Notas
        //'deleted_at', /* timestamp; */
    ];

    public $fillable_relations = [
        'tipos_avaliacoes_justificativas'
    ];
    
    public $delete_cascade = [
        'tipos_avaliacoes_justificativas'
    ];
    
    // Has
    public function avaliacoes() { return $this->hasMany(Avaliacao::class); }    
    public function consolidacoes() { return $this->hasMany(PlanoTrabalhoConsolidacao::class); }    
    public function tiposAvaliacoesJustificativas() { return $this->hasMany(TipoAvaliacaoJustificativa::class); }    
}
