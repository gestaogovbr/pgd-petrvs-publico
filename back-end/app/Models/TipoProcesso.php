<?php

namespace App\Models;
use App\Models\ModelBase;
use App\Models\Unidade;

class TipoProcesso extends ModelBase
{
    protected $table = 'tipos_processos';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'nome', /* text; NOT NULL; */// Nome do Tipo de Processo
        'codigo', /* varchar(50); */// Código do tipo de Processo
        'etiquetas', /* json; NOT NULL; */// Nome das etiquetas predefinidas
        'checklist', /* json; NOT NULL; */// Nome dos checklist predefinidas
    ];

    protected static function booted()
    {
        static::creating(function ($tipoProcesso) {
            $tipoProcesso->etiquetas = $tipoProcesso->etiquetas ?? [];
            $tipoProcesso->checklist = $tipoProcesso->checklist ?? [];
        });  
    }

    // Casting
    protected $casts = [
        'etiquetas' => AsJson::class,
        'checklist' => AsJson::class
    ];

    // Has
    public function unidade() { return $this->hasMany(Unidade::class, 'tipo_processo_id'); }        

}
