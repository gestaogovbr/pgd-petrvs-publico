<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Demanda;
use App\Traits\AutoDataInicio;
use App\Traits\HasDataFim;

class TipoDocumento extends ModelBase
{
    use AutoDataInicio, HasDataFim;
    
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
