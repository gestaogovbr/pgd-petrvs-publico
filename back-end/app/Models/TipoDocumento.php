<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Demanda;
use App\Traits\AutoDataInicio;
use App\Traits\HasDataFim;

class TipoDocumento extends ModelBase
{
    use AutoDataInicio, HasDataFim;

    protected $table = 'tipos_documentos';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'codigo', /* varchar(50); */// Código do tipo de documento
        'nome', /* varchar(256); NOT NULL; */// Tipo do documento da requisição ou da entrega
        'entregavel', /* tinyint; NOT NULL; */// Se é um documento de entrega
        'data_inicio', /* datetime; NOT NULL; */// Data inicio da vigência
        //'data_fim', /* datetime; */// Data final da vigência
    ];

    // Has
    public function demandas() { return $this->hasMany(Demanda::class, 'tipo_documento_id'); }        
}
