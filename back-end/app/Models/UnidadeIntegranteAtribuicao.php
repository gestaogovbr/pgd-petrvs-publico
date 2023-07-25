<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\UnidadeIntegrante;

class UnidadeIntegranteAtribuicao extends ModelBase
{
    protected $table = 'unidades_integrantes_atribuicoes';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'atribuicao', /* set('AVALIADOR_PLANO_ENTREGA','AVALIADOR_PLANO_TRABALHO','HOMOLOGADOR_PLANO_ENTREGA','LOTADO','COLABORADOR','GESTOR','GESTOR_SUBSTITUTO'); NOT NULL; DEFAULT: 'COLABORADOR'; */// Vínculo que o servidor tem com a unidade
        //'deleted_at', /* timestamp; */
        //'unidade_integrante_id', /* char(36); NOT NULL; */
    ];

    // Has
    // Belongs
    public function vinculo() { return $this->belongsTo(UnidadeIntegrante::class, 'unidade_usuario_id'); }
}