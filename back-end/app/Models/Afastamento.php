<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Usuario;
use App\Models\TipoMotivoAfastamento;

class Afastamento extends ModelBase
{
    protected $table = 'afastamentos';
   
    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'observacoes', /* text; */// Observação sobre o afastamento
        'inicio_afastamento', /* datetime; NOT NULL; */// Inicio do afastamento
        'fim_afastamento', /* datetime; NOT NULL; */// Fim do afastamento
        'usuario_id', /* char(36); NOT NULL; */
        'tipo_motivo_afastamento_id', /* char(36); NOT NULL; */
        //'deleted_at', /* timestamp; */
    ];

    // Belongs
    public function usuario() { return $this->belongsTo(Usuario::class); }    
    public function tipoMotivoAfastamento() { return $this->belongsTo(TipoMotivoAfastamento::class); }    
}
