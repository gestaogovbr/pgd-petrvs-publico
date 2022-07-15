<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Demanda;
use App\Traits\AutoDataInicio;

class TipoDocumento extends ModelBase
{
    use AutoDataInicio;
    
    public $fillable = [
        'codigo',
        'nome',
        'entregavel',
        'data_inicio',
        //'data_fim'
    ];


    protected $table = 'tipos_documentos';
    // Has
    public function demandas() { return $this->hasMany(Demanda::class, 'tipo_documento_id'); }        
}
