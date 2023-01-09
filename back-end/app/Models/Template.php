<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Unidade;
use App\Models\Entidade;
use Illuminate\Support\Facades\DB;

class Template extends ModelBase
{
    protected $table = 'templates';

    protected $with = [];

    protected static function booted()
    {
        static::creating(function ($template) {
            $template->numero = DB::select("CALL sequence_template_numero()")[0]->number;
        });
    }

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'numero', /* varchar(256); NOT NULL; */// Nome da tarefa
        'tipo', /* double(8,2); NOT NULL; */// Tempo estimado para a execução da tarefa (Horas decimais)
        'titulo', /* tinyint; NOT NULL; */// Se a entrega requer obrigatoriamente um documento
        'conteudo', /* text; */// Comentário predefinida para a tarefa
        'data_set', /* text; */// Comentário predefinida para a tarefa
        'data_inicio', /* datetime; NOT NULL; DEFAULT: 'CURRENT_TIMESTAMP'; */// Data inicio da vigência
        'data_fim', /* datetime; */// Data fim da vigência
    ];

    // Mutattors e Casts
    public function getDatasetAttribute($value)
    {
        return json_decode($value);
    }
    public function setDatasetAttribute($value)
    {
        $this->attributes['data_set'] = json_encode($value);
    }

}
