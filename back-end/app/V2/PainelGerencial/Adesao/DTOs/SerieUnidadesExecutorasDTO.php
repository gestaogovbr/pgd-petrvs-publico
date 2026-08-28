<?php

declare(strict_types=1);

namespace App\V2\PainelGerencial\Adesao\DTOs;

use App\Models\Unidade;

class SerieUnidadesExecutorasDTO
{
    public function __construct(
        public readonly string $unidadeId,
        public readonly string $unidadeSigla,
        public readonly string $unidadeNome,
        public readonly ?string $unidadePaiId,
        public readonly string $periodo,
        public readonly int $executorasQtd,
        public readonly int $naoExecutorasQtd,
    ) {}

    public static function fromUnidade(Unidade $unidade, string $periodo, int $executorasQtd, int $naoExecutorasQtd): self
    {
        return new self(
            unidadeId: $unidade->id,
            unidadeSigla: $unidade->sigla,
            unidadeNome: $unidade->nome,
            unidadePaiId: $unidade->unidade_pai_id,
            periodo: $periodo,
            executorasQtd: $executorasQtd,
            naoExecutorasQtd: $naoExecutorasQtd,
        );
    }
}
