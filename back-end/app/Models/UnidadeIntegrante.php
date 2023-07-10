<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Unidade;
use App\Models\Usuario;

class UnidadeIntegrante extends ModelBase
{
    protected $table = 'unidades_integrantes';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'data_inicio', /* datetime; NOT NULL; */// Data inicio da vigência
        'atribuicao', /* enum('AVALIADOR_DEMANDAS'); NOT NULL; */// Tipo do vinculo
        'unidade_id', /* char(36); NOT NULL; */
        'usuario_id', /* char(36); NOT NULL; */
        //'data_fim', /* datetime; */// Data fim da vigência
    ];

    // Has
    // Belongs
    public function unidade() { return $this->belongsTo(Unidade::class); }
    public function usuario() { return $this->belongsTo(Usuario::class); }
}
