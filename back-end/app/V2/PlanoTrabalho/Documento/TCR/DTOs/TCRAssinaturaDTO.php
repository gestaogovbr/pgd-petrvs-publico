<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Documento\TCR\DTOs;

use App\Models\Documento;
use Carbon\Carbon;

class TCRAssinaturaDTO
{
    public function __construct(
        public readonly string $documentoId,
        public readonly string $usuarioId,
        public readonly Carbon $dataAssinatura,
        public readonly string $hash,
    ) {}

    public static function fromDocumento(Documento $documento, string $usuarioId): self
    {
        $dataAssinatura = now();

        return new self(
            documentoId: $documento->id,
            usuarioId: $usuarioId,
            dataAssinatura: $dataAssinatura,
            hash: hash('md5', $dataAssinatura->toDateTimeString() . $usuarioId . $documento->conteudo),
        );
    }

    public function toArray(): array
    {
        return [
            'documento_id' => $this->documentoId,
            'usuario_id' => $this->usuarioId,
            'data_assinatura' => $this->dataAssinatura,
            'assinatura' => $this->hash,
        ];
    }
}
