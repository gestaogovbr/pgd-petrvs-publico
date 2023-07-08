<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Unidade;
use App\Models\Entidade;

class TipoTarefa extends ModelBase
{
    protected $table = 'tipos_tarefas';

    protected $with = [];

    public $fillable = [ // TYPE; NULL?; DEFAULT?; // COMMENT

    ];
    
    // Belongs
    public function unidade() { return $this->belongsTo(Unidade::class); }    
    public function entidade() { return $this->belongsTo(Entidade::class); }    
}

/*
        'nome', // varchar(256); NOT NULL; // Nome da tarefa
        'tempo_estimado', // double(8,2); NOT NULL; // Tempo estimado para a execução da tarefa (Horas decimais)
        'documental', // tinyint; NOT NULL; // Se a entrega requer obrigatoriamente um documento
        'comentario_predefinido', // text; // Comentário predefinida para a tarefa
        'entidade_id', // char(36); 
        'unidade_id', // char(36); 
        //'data_inicio', // datetime; NOT NULL; DEFAULT: 'CURRENT_TIMESTAMP'; // Data inicio da vigência
        //'data_fim', // datetime; // Data fim da vigência
*/