<?php

namespace App\Services\API_PGD\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class ParticipanteResource extends JsonResource
{
    public function toArray(Request $request)
    {
        $modalidade = new ModalidadeResource($this);

        return [
            "origem_unidade"            => "SIAPE",
            "cod_unidade_autorizadora"  => $this->cod_unidade_autorizadora,
            "matricula_siape"           => $this->matricula,
            "cod_unidade_instituidora"  => $this->cod_unidade_instituidora,
            "cod_unidade_lotacao"       => $this->cod_unidade_lotacao,
            "cpf"                       => $this->cpf,
            "situacao"                  => $this->situacao,
            "modalidade_execucao"       => $modalidade->get(),
            "data_assinatura_tcr"       => Carbon::parse($this->data_assinatura)->toDateTimeLocalString()
          ];
    }
}
