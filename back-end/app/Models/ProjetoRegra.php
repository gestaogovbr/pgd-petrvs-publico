<?php

namespace App\Models;

use App\Casts\AsJson;
use App\Models\ModelBase;
use App\Models\Projeto;
use App\Models\ProjetoAlocacaoRegra;

class ProjetoRegra extends ModelBase
{
    protected $table = 'projetos_regras';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'nome', /* varchar(256); NOT NULL; */// Nome da regra
        'tipo_recurso', /* enum('HUMANO','MATERIAL','SERVICO','CUSTO','DEPARTAMENTO'); NOT NULL; DEFAULT: 'MATERIAL'; */// Tipo do recurso que se aplica a regra
        'perfis', /* json; */// Perfis de capacidade aplicáveis a quem possuir a regra
        'finalidade', /* enum('OUTRA','ESCRITORIO_PROJETO','GERENTE_PROJETO','GERENTE_RISCO','GERENTE_COMUNICACAO','GERENTE_RECURSO','PATROCINADOR','GESTOR_NEGOCIAL','MEMBRO'); NOT NULL; */// Finalidade/Papel
        'projeto_id', /* char(36); NOT NULL; */// Projeto
        //'deleted_at', /* timestamp; */
    ];

    public $fillable_changes = [];

    public $fillable_relations = [];

    public $delete_cascade = [];

    // Casting
    protected $casts = [
        'perfis' => AsJson::class
    ];
    
    // Has
    public function regrasAlocacao() { return $this->hasMany(ProjetoAlocacaoRegra::class, 'regra_id'); }    
    // Belongs
    public function projeto() { return $this->belongsTo(Projeto::class); }    

}