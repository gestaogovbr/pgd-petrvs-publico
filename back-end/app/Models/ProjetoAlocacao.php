<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Projeto;
use App\Models\ProjetoTarefa;
use App\Models\ProjetoRecurso;
use App\Models\ProjetoAlocacaoRegra;

class ProjetoAlocacao extends ModelBase
{

    protected $table = 'projetos_alocacoes';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'descricao', /* varchar(256); NOT NULL; */// Descrição
        'quantidade', /* double(8,2); NOT NULL; */// Quantidade do recurso
        'projeto_id', /* char(36); NOT NULL; */
        'tarefa_id', /* char(36); */
        'recurso_id', /* char(36); NOT NULL; */
        //'data_inicio', /* datetime; NOT NULL; DEFAULT: 'CURRENT_TIMESTAMP'; */// Data inicio da vigência
        //'data_fim', /* datetime; */// Data fim da vigência
    ];

    public $fillable_changes = ["regras"];

    public $fillable_relations = [];

    public $delete_cascade = ["regras"];

    // Has
    public function regras() { return $this->hasMany(ProjetoAlocacaoRegra::class); }    
    // Belongs
    public function projeto() { return $this->belongsTo(Projeto::class); }    
    public function tarefa() { return $this->belongsTo(ProjetoTarefa::class); }    
    public function recurso() { return $this->belongsTo(ProjetoRecurso::class); }    
}