<?php

namespace App\Models;

use App\Traits\AutoDataInicio;
use App\Traits\HasDataFim;
use App\Models\ModelBase;
use App\Models\Afastamento;

class TipoMotivoAfastamento extends ModelBase
{
    use AutoDataInicio, HasDataFim;

    protected $table = 'tipos_motivos_afastamentos';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'codigo', /* varchar(50); */// Código do afastamento
        'nome', /* varchar(256); NOT NULL; */// Nome do motivo de afastamento
        'icone', /* varchar(100); NOT NULL; */// Class do icone relacionado ao afastamento
        'cor', /* varchar(100); NOT NULL; */// Código da cor em formato hex
        'horas', /* tinyint; NOT NULL; */// Se o afastamento é medido em horas
        'integracao', /* tinyint; NOT NULL; */// Se o tipo de motivo de afastamento é integrado a outro sistema
        //'deleted_at', /* timestamp; */
        /*'data_inicio',*/// REMOVED
    ];

    // Has
    public function afastamentos() { return $this->hasMany(Afastamento::class, 'tipo_motivo_afastamento_id'); }    
}
