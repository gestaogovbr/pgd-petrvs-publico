<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Usuario;
use App\Models\Capacidade;
use App\Traits\AutoDataInicio;
use App\Traits\HasDataFim;

class Perfil extends ModelBase
{
    use AutoDataInicio, HasDataFim;

    protected $table = 'perfis';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'id', /* char(36); NOT NULL; */
        'nivel', /* int; NOT NULL; */// Evita que usuários de nível inferior atribuam perfis de nível superior
        'nome', /* varchar(256); NOT NULL; */// Nome do perfil
        'descricao', /* text; NOT NULL; */// Descrição do perfil
        //'data_inicio', /* datetime; NOT NULL; */// Data inicio da vigência
        //'data_fim', /* datetime; */// Data final da vigência
    ];

    public $fillable_changes = [
        'capacidades'
    ];

    public $delete_cascade = ['capacidades'];

    // Has
    public function usuarios() { return $this->hasMany(Usuario::class, 'perfil_id'); }
    public function capacidades() { return $this->hasMany(Capacidade::class, 'perfil_id'); }
}
