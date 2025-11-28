<?php

namespace App\Services\API_PGD\Resources;

use App\Exceptions\ExportPgdException;
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

        //$participante = new ParticipanteResource($this->usuario);

        return [
            "id"                        => $this->id,
            "tipo"                      => 'trabalho',
            "origem_unidade"            => "SIAPE",
            "id_plano_trabalho"         => $this->id,
            "status"                    => $this->converteStatus($this->status) ?? '3',
            "cod_unidade_executora"     => $this->unidade->codigo ?? null,
            "cpf_participante"          => $this->usuario->cpf ?? '',
            "matricula_siape"           => $this->usuario->matricula ? str_pad($this->usuario->matricula, 7, '0', STR_PAD_LEFT): '',
            "cod_unidade_lotacao_participante" => $this->usuario->lotacao?->unidade?->codigo,
            "data_inicio"               => Carbon::parse($this->data_inicio)->format('Y-m-d'),
            "data_termino"              => Carbon::parse($this->data_fim)->format('Y-m-d'),
            "carga_horaria_disponivel"  => $diasUteis * $this->carga_horaria,
            "contribuicoes"             => $this->entregas
                ? PlanoTrabalhoContribuicaoResource::collection($this->entregas) 
                : [],
            "avaliacoes_registros_execucao" => $this->consolidacoes
                ? PlanoTrabalhoAvaliacaoResource::collection($this->consolidacoes)
                : [],
            // "participante"              => $participante->toArray($request)
          ];
    }

    function converteStatus($status)
    {
        switch ($status) {
            case 'ATIVO':
                return 3;
            case 'CONCLUIDO':
            case 'AVALIADO':
                return 4;
            default:
                // return 4; // somente para testes
                throw new ExportPgdException('Plano de Trabalho com status inválido para Envio: '.$status);
        }
    }
}
