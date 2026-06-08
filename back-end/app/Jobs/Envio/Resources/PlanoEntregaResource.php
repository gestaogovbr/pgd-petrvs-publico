<?php
namespace App\Jobs\Envio\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;
use App\Exceptions\ExportPgdException;
use App\Enums\EnvioPlanoEntregaStatusEnum;
use App\Enums\EnvioPlanoEntregaAvaliacaoEnum;

/**
 * @mixin \App\Models\PlanoEntrega
 */
class PlanoEntregaResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            "id"                          => $this->id,
            "tipo"                        => 'entrega',
            "id_plano_entregas"           => $this->id,
            "origem_unidade"              => "SIAPE",
            "cod_unidade_instituidora"    => $this->programa->unidade->codigo,
            "cod_unidade_executora"       => $this->unidade->codigo,
            "data_inicio"                 => Carbon::parse($this->data_inicio)->format('Y-m-d'),
            "data_termino"                => Carbon::parse($this->data_fim)->format('Y-m-d'),
            "status"                      => $this->getStatus(),
            "avaliacao"                   => $this->getAvaliacao(),
            "data_avaliacao"              => $this->avaliacao?->data_avaliacao ?
                Carbon::parse($this->avaliacao?->data_avaliacao)->format('Y-m-d')
                : null,
            "entregas"                    => $this->entregas
              ? PlanoEntregaEntregaResource::collection($this->entregas)
              : [],
        ];
    }

    function getStatus()
    {
        switch ($this->status) {
            case 'ATIVO':
                return EnvioPlanoEntregaStatusEnum::EM_EXECUCAO->value;
            case 'CONCLUIDO':
              return EnvioPlanoEntregaStatusEnum::CONCLUIDO->value;
            case 'AVALIADO':
                return EnvioPlanoEntregaStatusEnum::AVALIADO->value;
            default:
                throw new ExportPgdException('Plano de Entrega com status inválido para Envio: '.$this->status);
        }
    }

    function getAvaliacao() {
      switch(str_replace('"', "", $this->avaliacao?->nota)) {
        case "Adequado":
          return EnvioPlanoEntregaAvaliacaoEnum::ADEQUADO->value;
        case "Superou o acordado":
        case "Alto desempenho":
          return EnvioPlanoEntregaAvaliacaoEnum::ALTO_DESEMPENHO->value;
        case "Atendeu ao acordado":
          return EnvioPlanoEntregaAvaliacaoEnum::ADEQUADO->value;
        case "Excepcional":
          return EnvioPlanoEntregaAvaliacaoEnum::EXCEPCIONAL->value;
        case "Inadequado":
        case "Não executado":
          return EnvioPlanoEntregaAvaliacaoEnum::INADEQUADO_OU_NAO_EXECUTADO->value;
        case "Atendeu parcialmente ao adequado":
          return EnvioPlanoEntregaAvaliacaoEnum::ATENDEU_PARCIALMENTE->value;
        default:
          return null;
      }
    }
}
