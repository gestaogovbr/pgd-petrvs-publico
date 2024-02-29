<?php

namespace App\Models;
use App\Models\ModelBase;
use App\Models\Afastamento;

class TipoMotivoAfastamento extends ModelBase
{
    protected $table = 'tipos_motivos_afastamentos';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        
        'codigo', /* varchar(50); */// Código do afastamento
        'sigla',
        'nome', /* varchar(256); NOT NULL; */// Nome do motivo de afastamento
        'data_inicio',
        'data_fim',
        'ativo_no_siape',
        'icone', /* varchar(100); NOT NULL; */// Class do icone relacionado ao afastamento
        'cor', /* varchar(100); NOT NULL; */// Código da cor em formato hex
        'horas', /* tinyint; NOT NULL; */// Se o afastamento é medido em horas
        'integracao', /* tinyint; NOT NULL; */// Se o tipo de motivo de afastamento é integrado a outro sistema
        //'deleted_at', /* timestamp; */
    ];

    // Has
    public function afastamentos() { return $this->hasMany(Afastamento::class); }    
}
