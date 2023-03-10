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
        'tipo_recurso', /* enum('HUMANO','MATERIAL','SERVICO','CUSTO','DEPARTAMENTO'); NOT NULL; DEFAULT: 'MATERIAL'; */// Tipo do recurso que se aplica a regra
        'data_inicio', /* datetime; NOT NULL; */// Data inicio da vigência
        'perfis', /* json; */// Perfis de capacidade aplicáveis a quem possuir a regra
        //'data_fim', /* datetime; */// Data final da vigência
        //'recurso_tipo', /* enum('HUMANO','MATERIAL','SERVICO','CUSTO','DEPARTAMENTO'); NOT NULL; */// Tipo do recurso
        //'finalidade', /* enum('OUTRA','ESCRITORIO_PROJETO','GERENTE_PROJETO','GERENTE_RISCO','GERENTE_COMUNICACAO','GERENTE_RECURSO','PATROCINADOR','GESTOR_NEGOCIAL','MEMBRO'); NOT NULL; */// Finalidade/Papel
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
    // Mutattors e Casts
    public function getPerfisAttribute($value)
    {
        return json_decode($value);
    }   
    public function setPerfisAttribute($value)
    {
        $this->attributes['perfis'] = json_encode($value);
    }
}