<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Atividade;
use App\Traits\AutoDataInicio;

class TipoAtividade extends ModelBase
{
    use AutoDataInicio;
    protected $table = 'tipos_atividades';

    public $fillable = [
        'nome',
        'icone',
        'cor',
        'data_inicio',
        //'data_fim'
    ];
    
    // Has
    public function atividades() { return $this->hasMany(Atividade::class, 'tipo_atividade_id'); }    
}
