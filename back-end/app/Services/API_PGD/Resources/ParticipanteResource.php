<?php

namespace App\Services\API_PGD\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Services\CalendarioService;
use Carbon\Carbon;

class ParticipanteResource extends JsonResource
{
    public function toArray(Request $request)
    {
        return [
            "origem_unidade"            => "SIAPE",
            "cod_unidade_autorizadora"  => 1, //$this->programa->unidade_id,
            "matricula_siape"           => $this->matricula,
            "cod_unidade_instituidora"  => 1, //$this->unidade_id,
            "cod_unidade_lotacao"       => 1, //$this->unidade_id,
            "cpf"                       => $this->cpf,
            "situacao"                  => 1,
            "modalidade_execucao"       => 1,
            "data_assinatura_tcr"       => '2024-06-23T04:34:55.094Z'
          ];
    }

    function converteStatus($status)
    {
        switch ($status) {
        case 'CANCELADO':
            return 1;
        case 'ATIVO':
            return 3;
        case 'CONCLUIDO':
            return 4;
        }
    }
}
