<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Usuario;
use App\Models\Capacidade;

class Perfil extends ModelBase
{
    protected $table = 'perfis';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'id', /* char(36); NOT NULL; */
        'nivel', /* int; NOT NULL; */// Evita que usuários de nível inferior atribuam perfis de nível superior
        'nome', /* varchar(256); NOT NULL; */// Nome do perfil
        'descricao', /* text; NOT NULL; */// Descrição do perfil
        //'deleted_at', /* timestamp; */
    ];

    public $fillable_changes = [
        'capacidades'
    ];

    public $delete_cascade = ['capacidades'];

    // Has
    public function usuarios() { return $this->hasMany(Usuario::class, 'perfil_id'); }//OK//
    public function capacidades() { return $this->hasMany(Capacidade::class, 'perfil_id'); }//OK//
}
