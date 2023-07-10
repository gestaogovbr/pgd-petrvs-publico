<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Perfil;
use App\Models\TipoCapacidade;

class Capacidade extends ModelBase
{
    protected $table = 'capacidades';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'id', /* char(36); NOT NULL; */
        'perfil_id', /* char(36); */
        'tipo_capacidade_id', /* char(36); NOT NULL; */
    ];

    // Belongs
    public function perfil() { return $this->belongsTo(Perfil::class, 'perfil_id'); }
    public function tipoCapacidade() { return $this->belongsTo(TipoCapacidade::class, 'tipo_capacidade_id'); }
}
