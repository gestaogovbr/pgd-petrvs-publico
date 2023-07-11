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
        'atribuicao', /* enum('AVALIADOR_ATIVIDADE','AVALIADOR_PLANO_ENTREGA','AVALIADOR_PLANO_TRABALHO','HOMOLOGADOR_PLANO_ENTREGA'); NOT NULL; */// Vínculo que o servidor tem com a unidade
        'unidade_id', /* char(36); NOT NULL; */// Unidade participante do vínculo
        'usuario_id', /* char(36); NOT NULL; */// Servidor participante do vínculo
        //'deleted_at', /* timestamp; */
    ];

    // Has
    // Belongs
    public function unidade() { return $this->belongsTo(Unidade::class); }
    public function usuario() { return $this->belongsTo(Usuario::class); }
}
