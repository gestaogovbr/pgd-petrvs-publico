<?php

namespace App\Models;

use App\Casts\AsJson;
use App\Models\ModelBase;
use App\Models\Unidade;
use App\Models\Programa;
use App\Models\Documento;
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
        'especie', /* enum('TERMO_ADESAO','SEI','TCR','NOTIFICACAO'); NOT NULL; */// Especificação da espécie do template (interno do sistema)
        'codigo', /* varchar(255); */// Código opcional para o template
        'titulo', /* varchar(256); NOT NULL; */// Nome da tarefa
        'conteudo', /* text; */// Comentário predefinida para a tarefa
        'entidade_id', /* char(36); */
        'unidade_id', /* char(36); */
        //'deleted_at', /* timestamp; */
        //'dataset', /* json; */// Dados da parametrização
    ];

    // Casting
    protected $casts = [
        'dataset' => AsJson::class
    ];
    
    // Has
    public function programas() { return $this->hasMany(Programa::class); }//OK//
    public function documentos() { return $this->hasMany(Documento::class); }//OK//
    // Belongs
    public function entidade() { return $this->belongsTo(Entidade::class); }    //OK//  //nullable
    public function unidade() { return $this->belongsTo(Unidade::class); }    //OK//    //nullable
    
}
