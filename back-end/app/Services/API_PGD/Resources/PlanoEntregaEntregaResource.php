<?php
namespace App\Services\API_PGD\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class PlanoEntregaEntregaResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            "id_entrega"                => $this->id,
            "nome_entrega"              => $this->descricao,
            "meta_entrega"              => $this->progresso_realizado,
            "tipo_meta"                 => 'unidade', //$this->meta, //*
            "data_entrega"              => $this->data_fim ? 
                                            Carbon::parse($this->data_fim)->format('Y-m-d')
                                            : null,
            "nome_unidade_demandante" => $this->unidade->nome,
            "nome_unidade_destinataria" => $this->destinatario
        ];
    }

}