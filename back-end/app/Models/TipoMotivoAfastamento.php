<?php

namespace App\Models;

use App\Traits\AutoDataInicio;
use App\Traits\HasDataFim;
use App\Models\ModelBase;
use App\Models\Afastamento;

class TipoMotivoAfastamento extends ModelBase
{
    use AutoDataInicio, HasDataFim;
    
    public $fillable = [
        'codigo',
        'nome',
        'icone',
        'cor',
        'horas',
        'integracao',
        'data_inicio',
        //'data_fim'
    ];

    protected $table = 'tipos_motivos_afastamentos';
    // Has
    public function afastamentos() { return $this->hasMany(Afastamento::class, 'tipo_motivo_afastamento_id'); }    
}
