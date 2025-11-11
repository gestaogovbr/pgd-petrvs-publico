<?php

namespace App\Services;

use App\Models\PlanoTrabalhoEntrega;
use App\Services\ServiceBase;
use App\Exceptions\ServerException;

class PlanoTrabalhoEntregaService extends ServiceBase
{

  public function extraStore($planoTrabalhoEntrega, $unidade, $action)
  {
    /* (RN_PTR_M) ... 
    - Após alterado, e no caso se exija assinaturas no TCR, o Plano de Trabalho precisa ser repactuado (novo TCR), e o plano retorna ao status 'AGUARDANDO_ASSINATURA';
    */
    $this->planoTrabalhoService->repactuar($planoTrabalhoEntrega->plano_trabalho_id, true);
  }

  public function extraDestroy($planoTrabalhoEntrega) {
    /* (RN_PTR_M) ... 
    - Após alterado, e no caso se exija assinaturas no TCR, o Plano de Trabalho precisa ser repactuado (novo TCR), e o plano retorna ao status 'AGUARDANDO_ASSINATURA';
    */
    $this->planoTrabalhoService->repactuar($planoTrabalhoEntrega->plano_trabalho_id, true);      
  }


  public function hasContribuicoes($entrega)
  {
      return PlanoTrabalhoEntrega::where('plano_entrega_entrega_id', $entrega->id)->exists();
  }
}
