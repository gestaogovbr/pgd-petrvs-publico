<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Projeto;

class ProjetoFase extends ModelBase
{
    protected $table = 'projetos_fases';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'inicio', /* datetime; */// Inicio (opcional)
        'termino', /* datetime; */// Termino (opcional)
        'cor', /* varchar(100); NOT NULL; */// Código da cor em formato hex
        'nome', /* varchar(100); NOT NULL; */// Nome
        'descricao', /* varchar(256); NOT NULL; */// Descrição
        'projeto_id', /* char(36); NOT NULL; */
        //'data_inicio', /* datetime; NOT NULL; DEFAULT: 'CURRENT_TIMESTAMP'; */// Data inicio da vigência
        //'data_fim', /* datetime; */// Data fim da vigência
    ];

    /*public $fillable_changes = [
    ];

    public $fillable_relations = [
    ];*/

    public $delete_cascade = [];

    // Has
    // Belongs
    public function projeto() { return $this->belongsTo(Projeto::class); }
}