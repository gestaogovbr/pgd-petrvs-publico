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
        //'deleted_at', /* timestamp; */
    ];

    // Belongs
    public function perfil() { return $this->belongsTo(Perfil::class); }//OK//      //nullable
    public function tipoCapacidade() { return $this->belongsTo(TipoCapacidade::class); }//OK//
}
