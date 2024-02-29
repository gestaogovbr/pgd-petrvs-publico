<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Avaliacao;
use App\Models\TipoAvaliacaoNota;

class TipoAvaliacao extends ModelBase
{
    protected $table = 'tipos_avaliacoes';

    protected $with = ['notas'];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'nome', /* varchar(256); NOT NULL; */// Nome do tipo de avaliação
        'tipo', /* set('QUALITATIVO','QUANTITATIVO'); NOT NULL; */// Se a nota será um número ou um conceito
        //'deleted_at', /* timestamp; */
    ];

    public $fillable_relations = [
        'notas'
    ];
    
    public $delete_cascade = [
        'notas'
    ];
    
    // Has
    public function avaliacoes() { return $this->hasMany(Avaliacao::class); }    
    public function notas() { return $this->hasMany(TipoAvaliacaoNota::class); }    
}
