<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Usuario;

class AdesaoUsuario extends ModelBase
{
    protected $table = 'programas_adesoes_usuarios';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'programa_adesao_id', /* char(36); NOT NULL; */
        'usuario_id', /* char(36); */
    ];
   
    // Belongs
    public function usuario() { return $this->belongsTo(Usuario::class, 'usuario_id'); }
    public function adesao() { return $this->belongsTo(Adesao::class, 'programa_adesao_id'); }
}
