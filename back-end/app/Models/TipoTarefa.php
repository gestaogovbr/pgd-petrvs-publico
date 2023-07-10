<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Unidade;
use App\Models\Entidade;

class TipoTarefa extends ModelBase
{
    protected $table = 'tipos_tarefas';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'nome', /* varchar(256); NOT NULL; */// Nome do tipo de tarefa
        'tempo_estimado', /* double(8,2); NOT NULL; */// Tempo estimado para a execução do tipo de tarefa (Horas decimais)
        'documental', /* tinyint; NOT NULL; */// Se o tipo de tarefa requer obrigatoriamente um documento
        'comentario_predefinido', /* text; */// Comentário predefinida para o tipo de tarefa
        'entidade_id', /* char(36); */
        'unidade_id', /* char(36); */
        //'deleted_at', /* timestamp; */
    ];
    
    // Belongs
    public function unidade() { return $this->belongsTo(Unidade::class); }    
    public function entidade() { return $this->belongsTo(Entidade::class); }    
}