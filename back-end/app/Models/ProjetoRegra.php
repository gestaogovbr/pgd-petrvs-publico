<?php

namespace App\Models;

use App\Casts\AsJson;
use App\Models\ModelBase;
use App\Models\Projeto;

class ProjetoRegra extends ModelBase
{
    protected $table = 'projetos_regras';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'nome', /* varchar(256); NOT NULL; */// Nome da regra
        'projeto_id', /* char(36); NOT NULL; */
        'tipo_recurso', /* enum('HUMANO','MATERIAL','SERVICO','CUSTO','DEPARTAMENTO'); NOT NULL; DEFAULT: 'MATERIAL'; */// Tipo do recurso que se aplica a regra
        'perfis', /* json; */// Perfis de capacidade aplicáveis a quem possuir a regra
        //'deleted_at', /* timestamp; */
        //'finalidade', /* enum('OUTRA','ESCRITORIO_PROJETO','GERENTE_PROJETO','GERENTE_RISCO','GERENTE_COMUNICACAO','GERENTE_RECURSO','PATROCINADOR','GESTOR_NEGOCIAL','MEMBRO'); NOT NULL; */// Finalidade/Papel
    ];

    /*public $fillable_changes = [
    ];

    public $fillable_relations = [
    ];*/

    public $delete_cascade = [];

    // Casting
    protected $casts = [
        'perfis' => AsJson::class
    ];
    
    // Has
    //public function () { return $this->hasMany(::class); }    
    // Belongs
    public function projeto() { return $this->belongsTo(Projeto::class); }    

}