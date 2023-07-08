<?php

namespace App\Models;

use App\Casts\AsJson;
use App\Models\ModelBase;
use App\Models\Unidade;
use App\Models\Entidade;
use App\Models\PlanejamentoObjetivo;

class Planejamento extends ModelBase
{
    protected $table = 'planejamentos';

    protected $with = [];

    public $fillable = [ // TYPE; NULL?; DEFAULT?; // COMMENT

    ];

    // Casting
    protected $casts = [
        'valores' => AsJson::class,
    ];

    public $fillable_changes = ['objetivos'];

    public $fillable_relations = [];

    public $delete_cascade = ["objetivos"];

    public function proxyFill(&$dataOrEntity, $unidade, $action) {
        $dataOrEntity['entidade_id'] = $unidade->entidade_id;
        return $this->fill($dataOrEntity);
    }

    // Has
    public function objetivos() { return $this->hasMany(PlanejamentoObjetivo::class); }    
    // Belongs
    public function unidade() { return $this->belongsTo(Unidade::class); }
    public function entidade() { return $this->belongsTo(Entidade::class); }
    public function planejamentoSuperior() { return $this->belongsTo(Planejamento::class); }

}


/*
        'inicio', // datetime; NOT NULL; // Data inicio do planejamento
        'fim', // datetime; // Data fim do planejamento
        'nome', // varchar(256); NOT NULL; // Nome do planejamento estratégico
        'unidade_id', // char(36); 
        'missao', // text; NOT NULL; // Missão
        'visao', // text; NOT NULL; // Visão
        'valores', // json; NOT NULL; // Valores
        'entidade_id', // char(36); NOT NULL; 
        'data_arquivamento', // datetime; // Data de arquivamento da demanda
        'planejamento_superior_id', // char(36); 
        //'data_inicio', // datetime; NOT NULL; // Data inicio da vigência do registro
        //'data_fim', // datetime; // Data fim da vigência do registro
*/