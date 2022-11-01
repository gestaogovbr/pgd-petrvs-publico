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

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'nome', /* varchar(256); NOT NULL; */// Nome da regra
        'projeto_id', /* char(36); NOT NULL; */
        //'data_inicio', /* datetime; NOT NULL; */// Data inicio da vigência
        //'data_fim', /* datetime; */// Data final da vigência
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