<?php

namespace App\Jobs\Envio\Resources;

use App\Exceptions\ExportPgdException;
use App\Support\ModalidadePgd;
use Illuminate\Http\Resources\Json\JsonResource;

class ModalidadeResource extends JsonResource
{
    public function get()
    {
        $code = ModalidadePgd::apiPgdCode($this->resource);

        if ($code === null) {
            throw new ExportPgdException('Modalidade inválida: ' . (string) $this->resource);
        }

        return $code;
    }
}
