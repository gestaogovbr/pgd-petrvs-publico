<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Traits\AutoDataInicio;
use App\Models\Perfil;
use App\Models\TipoCapacidade;
use App\Traits\HasDataFim;

class Capacidade extends ModelBase
{
    use AutoDataInicio, HasDataFim;

    protected $table = 'capacidades';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'id', /* char(36); NOT NULL; */
        'data_inicio', /* datetime; NOT NULL; */// Data inicio da vigência
        'perfil_id', /* char(36); */
        'tipo_capacidade_id', /* char(36); NOT NULL; */
        //'data_fim', /* datetime; */// Data final da vigência
    ];

    // Belongs
    public function perfil() { return $this->belongsTo(Perfil::class, 'perfil_id'); }
    public function tipoCapacidade() { return $this->belongsTo(TipoCapacidade::class, 'tipo_capacidade_id'); }
}
