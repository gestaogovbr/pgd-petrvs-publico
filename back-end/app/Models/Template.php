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
        'numero', /* int; NOT NULL; */// Número do template (Gerado pelo sistema)
        'especie', /* enum('TCR'); NOT NULL; */// Especificação do tipo do template (interno do sistema)
        'titulo', /* varchar(256); NOT NULL; */// Nome da tarefa
        'conteudo', /* text; */// Comentário predefinida para a tarefa
        'data_set', /* json; */// Dados da parametrização
        'data_inicio', /* datetime; NOT NULL; */// Data inicio da vigência
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
