<?php
namespace App\Services\API_PGD\Resources;

use App\Exceptions\ExportPgdException;
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
            "tipo_meta"                 => $this->getMeta(), //$this->meta, //*
            "data_entrega"              => $this->data_fim ? 
                                            Carbon::parse($this->data_fim)->format('Y-m-d')
                                            : null,
            "nome_unidade_demandante" => $this->unidade->nome,
            "nome_unidade_destinataria" => $this->destinatario
        ];
    }

    public function getMeta() {
        $meta = $this->meta;
        if (is_string($this->meta)) {
            $meta = json_decode($this->meta);
        }

        if (isset($meta->porcentagem)) return 'percentual';
        if (isset($meta->quantitativo)) return 'unidade';

        throw new ExportPgdException('Meta inválida: '.$meta);
    }

}