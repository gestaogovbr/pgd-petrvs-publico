<?php

namespace App\Models;
use App\Models\ModelBase;
use App\Models\Demanda;

class TipoDocumento extends ModelBase
{
    protected $table = 'tipos_documentos';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'codigo', /* varchar(50); */// Código do tipo de documento
        'nome', /* varchar(256); NOT NULL; */// Tipo do documento da requisição ou da entrega
        'entregavel', /* tinyint; NOT NULL; */// Se é um documento de entrega
    ];

    // Has
    public function demandas() { return $this->hasMany(Demanda::class, 'tipo_documento_id'); }        
}
