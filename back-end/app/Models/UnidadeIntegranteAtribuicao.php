<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\UnidadeIntegrante;

class UnidadeIntegranteAtribuicao extends ModelBase
{
  protected $table = 'unidades_integrantes_atribuicoes';

  protected $with = [];

  public $fillable = [ /* TYPE; NULL?; DEFAULT?; */ // COMMENT
    'atribuicao', /* set('AVALIADOR_PLANO_ENTREGA', 'AVALIADOR_PLANO_TRABALHO', 'HOMOLOGADOR_PLANO_ENTREGA', 'LOTADO', 'COLABORADOR', 'GESTOR', 'GESTOR_SUBSTITUTO', 'GESTOR_DELEGADO'); NOT NULL; DEFAULT: 'COLABORADOR'; */ // Vínculo que o servidor tem com a unidade
    'unidade_integrante_id', /* char(36); NOT NULL; */
    //'deleted_at', /* timestamp; */
  ];

  // Has
  // Belongs
  public function vinculo()
  {
    return $this->belongsTo(UnidadeIntegrante::class, 'unidade_integrante_id');
  }
}
