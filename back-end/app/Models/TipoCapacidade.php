<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Capacidade;

class TipoCapacidade extends ModelBase
{
    public $fillable = [
        'id',
        'codigo',
        'descricao'
    ];

    protected $table = 'tipos_capacidades';
    // Has
    public function capacidades() { return $this->hasMany(Capacidade::class, 'tipo_capacidade_id'); }
}
