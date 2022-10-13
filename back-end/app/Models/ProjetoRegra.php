<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Projeto;
use App\Traits\AutoDataInicio;
use App\Traits\HasDataFim;

class ProjetoRegra extends ModelBase
{
    use AutoDataInicio, HasDataFim;

    protected $table = 'projetos_regras';

    public $fillable = [
        'nome',
        'recurso_tipo',
        'finalidade',
        //'data_inicio',
        //'data_fim',
        'projeto_id'
    ];

    /*public $fillable_changes = [
    ];

    public $fillable_relations = [
    ];*/

    public $delete_cascade = [];

    // Has
    //public function () { return $this->hasMany(::class); }    
    // Belongs
    public function projeto() { return $this->belongsTo(Projeto::class); }    
}