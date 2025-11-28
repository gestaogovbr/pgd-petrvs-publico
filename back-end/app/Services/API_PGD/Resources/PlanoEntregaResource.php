<?php
namespace App\Services\API_PGD\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;
use App\Exceptions\ExportPgdException;

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
                return 3;
            case 'CONCLUIDO':
              return 4;
            case 'AVALIADO':
                return 5;
            default:
                throw new ExportPgdException('Plano de Entrega com status inválido para Envio: '.$this->status);
        }
    }

    function getAvaliacao() {
      switch(str_replace('"', "", $this->avaliacao?->nota)) {
        case "Adequado":
          return 3; 
        case "Superou o acordado":
        case "Alto desempenho":
          return 2;
        case "Atendeu ao acordado":
          return 3;
        case "Excepcional":
          return 1;
        case "Inadequado":
        case "Não executado":
          return 5;
        case "Atendeu parcialmente ao adequado":
          return 4;
        default: 
          return null;
      }
    }
}