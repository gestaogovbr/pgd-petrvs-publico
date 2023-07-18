<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Unidade;
use App\Models\Usuario;

class UnidadeIntegrante extends ModelBase
{
    protected $table = 'unidades_integrantes';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'unidade_id', /* char(36); NOT NULL; */// Unidade participante do vínculo
        'usuario_id', /* char(36); NOT NULL; */// Servidor participante do vínculo
        //'deleted_at', /* timestamp; */
    ];

    // Has
    public function atribuicoes() { return $this->hasMany(UnidadeIntegranteAtribuicao::class); } //OK//
    // Belongs
    public function unidade() { return $this->belongsTo(Unidade::class); }//OK//
    public function usuario() { return $this->belongsTo(Usuario::class); }//OK//
}
