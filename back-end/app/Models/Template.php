<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Unidade;
use App\Models\Entidade;
use App\Traits\HasDataFim;
use Illuminate\Support\Facades\DB;

class Template extends ModelBase
{
    use HasDataFim;

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
        'especie', /* enum('TERMO_ADESAO','SEI','TCR'); */// Especificação da espécie do template (interno do sistema)
        'titulo', /* varchar(256); NOT NULL; */// Nome da tarefa
        'conteudo', /* text; */// Comentário predefinida para a tarefa
        'dataset', /* json; */// Dados da parametrização
        'data_inicio', /* datetime; NOT NULL; */// Data inicio da vigência
        'data_fim', /* datetime; */// Data fim da vigência
    ];

    // Casting
    protected $casts = [
        'dataset' => AsJson::class
    ];
    
}
