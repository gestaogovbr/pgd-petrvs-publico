<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\ProjetoAlocacao;
use App\Models\ProjetoRegra;
use App\Traits\AutoDataInicio;
use App\Traits\HasDataFim;

class ProjetoAlocacaoRegra extends ModelBase
{
    use AutoDataInicio, HasDataFim;

    protected $table = 'projetos_alocacoes_regras';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'projeto_alocacao_id', /* char(36); NOT NULL; */
        'regra_id', /* char(36); NOT NULL; */
        'data_inicio', /* datetime; NOT NULL; DEFAULT: 'CURRENT_TIMESTAMP'; */// Data inicio da vigência
        //'data_fim', /* datetime; */// Data fim da vigência
    ];

    /*public $fillable_changes = [
    ];

    public $fillable_relations = [
    ];*/

    public $delete_cascade = [];

    // Has
    //public function () { return $this->hasMany(::class); }    
    // Belongs
    public function projetoAlocacao() { return $this->belongsTo(ProjetoAlocacao::class); }    
    public function regra() { return $this->belongsTo(ProjetoRegra::class); }    
}