<?php

namespace App\Models;

use App\Casts\AsJson;
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
        'especie', /* enum('TERMO_ADESAO','SEI','TCR'); */// Especificação da espécie do template (interno do sistema)
        'codigo',
        'titulo', /* varchar(256); NOT NULL; */// Nome da tarefa
        'conteudo', /* text; */// Comentário predefinida para a tarefa
        'data_inicio', /* datetime; NOT NULL; */// Data inicio da vigência
        'data_fim', /* datetime; */// Data fim da vigência
        'entidade_id',
        'unidade_id', 
        //'dataset', /* json; */// Dados da parametrização
    ];

    // Casting
    protected $casts = [
        'dataset' => AsJson::class
    ];
    
    // Has
    // Belongs
    public function entidade() { return $this->belongsTo(Entidade::class); }    
    public function unidade() { return $this->belongsTo(Unidade::class); }    
    
}
