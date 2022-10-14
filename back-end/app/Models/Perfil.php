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

    public $fillable = [
        'id',
        'nivel',
        'nome',
        'descricao'
    ];

    public $fillable_changes = [
        'capacidades'
    ];

    public $delete_cascade = ['capacidades'];

    protected $table = 'perfis';
    // Has
    public function usuarios() { return $this->hasMany(Usuario::class, 'perfil_id'); }
    public function capacidades() { return $this->hasMany(Capacidade::class, 'perfil_id'); }
}
