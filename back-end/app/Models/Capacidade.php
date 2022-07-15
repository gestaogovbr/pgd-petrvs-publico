<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Traits\AutoDataInicio;
use App\Models\Perfil;
use App\Models\TipoCapacidade;

class Capacidade extends ModelBase
{
    use AutoDataInicio;
    protected $with = [];

    public $fillable = [
        'id',
        'data_inicio',
        //'data_fim',
        'perfil_id',
        'tipo_capacidade_id'
    ];

    protected $table = 'capacidades';

    // Belongs
    public function perfil() { return $this->belongsTo(Perfil::class, 'perfil_id'); }
    public function tipoCapacidade() { return $this->belongsTo(TipoCapacidade::class, 'tipo_capacidade_id'); }
}
