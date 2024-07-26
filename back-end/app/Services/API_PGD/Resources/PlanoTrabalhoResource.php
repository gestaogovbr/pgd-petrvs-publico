<?php

namespace App\Services\API_PGD\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Services\CalendarioService;
use Carbon\Carbon;

class PlanoTrabalhoResource extends JsonResource
{
    public function toArray($request)
    {
        $calendarioService = new CalendarioService;
        $diasUteis = $calendarioService->qtdDiasUteis(
            $this->data_inicio, $this->data_fim, 
            $this->unidade_id
        );

        return [
            "origem_unidade"            => "SIAPE",
            "cod_unidade_autorizadora"  => 1, //$this->programa->unidade_id,
            "id_plano_trabalho"         => $this->id,
            "status"                    => $this->converteStatus($this->status) ?? '3',
            "cod_unidade_executora"     => 1, //$this->unidade_id,
            "cpf_participante"          => $this->usuario->cpf ?? '',
            "matricula_siape"           => $this->usuario->matricula ?? '',
            "data_inicio"               => Carbon::parse($this->data_inicio)->format('Y-m-d'),
            "data_termino"              => Carbon::parse($this->data_fim)->format('Y-m-d'),
            "carga_horaria_disponivel"  => $diasUteis * $this->carga_horaria,
            "contribuicoes"             => $this->entregas 
                ? PlanoTrabalhoContribuicaoResource::collection($this->entregas) 
                : [],
            "avaliacoes_registros_execucao" => $this->consolidacoes
                ? PlanoTrabalhoAvaliacaoResource::collection($this->consolidacoes)
                : [],
            "participante" => new ParticipanteResource($this->usuario)
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
