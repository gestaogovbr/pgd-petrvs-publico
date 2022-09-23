<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Projeto;
use App\Traits\AutoDataInicio;

class ProjetoRegra extends ModelBase
{
    use AutoDataInicio;

    protected $table = 'projetos_regras';

    public $fillable = [
        'nome',
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