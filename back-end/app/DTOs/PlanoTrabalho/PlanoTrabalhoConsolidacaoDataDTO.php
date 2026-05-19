<?php

declare(strict_types=1);

namespace App\DTOs\PlanoTrabalho;

use App\Models\PlanoEntrega;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacao;
use Illuminate\Database\Eloquent\Collection;

class PlanoTrabalhoConsolidacaoDataDTO
{
    public function __construct(
        public readonly ?PlanoTrabalho $planoTrabalho,
        public readonly mixed $programa,
        public readonly Collection $planosEntregas,
        public readonly Collection $atividades,
        public readonly Collection $afastamentos,
        public readonly Collection $ocorrencias,
        public readonly Collection $comparecimentos,
        public readonly string $status,
        public readonly ?string $justificativaConclusao,
        public readonly PlanoTrabalhoConsolidacao $consolidacao,
    ) {
    }
}

