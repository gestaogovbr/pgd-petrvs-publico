<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Traits\AutoDataInicio;
use App\Traits\HasDataFim;
use App\Models\Projeto;

class TipoProjeto extends ModelBase
{
    use AutoDataInicio, HasDataFim;

    protected $table = 'tipos_projetos';

    /*public $fillable_changes = [
    ];

    public $fillable_relations = [
    ];*/

    public $fillable = [
        'nome',
        'icone',
        'cor',
        //'data_inicio',
        //'data_fim'
    ];

    //public $delete_cascade = [];
    
    // Has
    public function projetos() { return $this->hasMany(Projeto::class, 'tipo_avaliacao_id'); }    
}
