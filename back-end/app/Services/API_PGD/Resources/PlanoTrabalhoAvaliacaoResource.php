<?php

namespace App\Services\API_PGD\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class PlanoTrabalhoAvaliacaoResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            "id_periodo_avaliativo"           => $this->id,
            "data_inicio_periodo_avaliativo"  => $this->data_inicio,
            "data_fim_periodo_avaliativo"     => $this->data_fim,
            "avaliacao_registros_execucao"    => $this->converteAvaliacao($this->avaliacao->nota),
            "data_avaliacao_registros_execucao" => Carbon::parse($this->avaliacao->data_avaliacao ?? '')->format('Y-m-d'),
        ];
    }

    function converteAvaliacao($nota)
    {
        \Log::info("Nota recebida: ".str_replace('"', "", $nota));
        switch(str_replace('"', "", $nota)) {
            case 'Excepcional':
            return 1;
            case 'Alto desempenho':
            return 2;
            case 'Adequado':
            return 3;
            case 'Inadequado':
            return 4;
            case 'Não executado':
            return 5;
            default:
            return 5;
      }
    }
}
