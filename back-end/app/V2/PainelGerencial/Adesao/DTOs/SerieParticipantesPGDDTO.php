<?php

declare(strict_types=1);

namespace App\V2\PainelGerencial\Adesao\DTOs;

use App\Models\Unidade;

class SerieParticipantesPGDDTO
{
    public function __construct(
        public readonly string $unidadeId,
        public readonly string $unidadeSigla,
        public readonly ?string $unidadePaiId,
        public readonly string $periodo,
        public readonly int $participantesQtd,
        public readonly int $naoParticipantesQtd,
    ) {}

    public static function fromUnidade(Unidade $unidade, string $periodo, int $participantesQtd, int $naoParticipantesQtd): self
    {
        return new self(
            unidadeId: $unidade->id,
            unidadeSigla: $unidade->sigla,
            unidadePaiId: $unidade->unidade_pai_id,
            periodo: $periodo,
            participantesQtd: $participantesQtd,
            naoParticipantesQtd: $naoParticipantesQtd,
        );
    }
}
