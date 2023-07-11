<?php

namespace App\Models;
use App\Models\ModelBase;
use App\Models\TipoAvaliacaoJustificativa;

class TipoJustificativa extends ModelBase
{
    protected $table = 'tipos_justificativas';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'nome', /* varchar(256); NOT NULL; */// Tipo da justificativa da avaliação
        //'deleted_at', /* timestamp; */
    ];

    public $delete_cascade = ['tipos_avaliacoes_justificativas'];

    // Has
    public function tiposAvaliacoesJustificativas() { return $this->hasMany(TipoAvaliacaoJustificativa::class, 'tipo_justificativa_id'); }    
}
