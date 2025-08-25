<?php

namespace App\Services\API_PGD\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PlanoTrabalhoContribuicaoResource extends JsonResource
{
    public function toArray($request)
    {
      return [
        "id_contribuicao"     => $this->id,
        "tipo_contribuicao"   => $this->planoEntregaEntrega
          ? (($this->planoEntregaEntrega && ($this->planoEntregaEntrega->unidade_id == $this->planoTrabalho->unidade_id)) ? 1 : 3)
          : 2,
        "percentual_contribuicao" => floor($this->forca_trabalho ?? 0),
        "id_plano_entregas"   => $this->planoEntregaEntrega->plano_entrega_id ?? null,
        "id_entrega"          => $this->planoEntregaEntrega->id ?? null
      ];
    }
}
