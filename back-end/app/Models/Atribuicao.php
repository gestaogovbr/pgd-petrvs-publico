<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\UnidadeIntegrante;

class Atribuicao extends ModelBase
{
    protected $table = 'atribuicoes';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'atribuicao', /* set('AVALIADOR_PLANO_ENTREGA','AVALIADOR_PLANO_TRABALHO','HOMOLOGADOR_PLANO_ENTREGA','LOTADO','COLABORADOR','GESTOR','GESTOR_SUBSTITUTO'); NOT NULL; */// Vínculo que o servidor tem com a unidade
        'unidade_usuario_id', /* char(36); NOT NULL; */// Vínculo entre unidade/usuário ao qual se refere a atribuição
        //'deleted_at', /* timestamp; */
    ];

    // Has
    // Belongs
    public function vinculo() { return $this->belongsTo(UnidadeIntegrante::class, 'unidade_usuario_id'); }
}