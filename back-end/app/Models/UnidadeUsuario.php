<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Unidade;
use App\Models\Usuario;

class UnidadeUsuario extends ModelBase
{
    protected $table = 'unidade_usuario';

    protected $with = [];

    protected $delete_cascade = ["atribuicoes"];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'unidade_id', /* char(36); NOT NULL; */// Unidade participante do vínculo
        'usuario_id', /* char(36); NOT NULL; */// Servidor participante do vínculo
        //'deleted_at', /* timestamp; */
    ];
    // Has
    public function atribuicoes() { return $this->hasMany(Atribuicao::class); } 
    // Belongs
    public function unidade() { return $this->belongsTo(Unidade::class); }
    public function usuario() { return $this->belongsTo(Usuario::class); }
    //Mutator e casts
}
