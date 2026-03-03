<?php

declare(strict_types=1);

namespace App\Repository\PlanoTrabalhoConsolidacao\Contracts;

use App\DTOs\PlanoTrabalho\PlanoTrabalhoConsolidacaoDataDTO;
use App\Models\PlanoTrabalhoConsolidacao;

interface PlanoTrabalhoConsolidacaoReadRepositoryContract
{
    public function getConsolidacaoData(string $id): ?PlanoTrabalhoConsolidacaoDataDTO;

    public function findConsolidacaoById(string $id): ?PlanoTrabalhoConsolidacao;

    public function getPendentesAvaliacao(array $unidadesIds, string $usuarioId, \DateTimeInterface $dataCorte): \Illuminate\Database\Eloquent\Collection;
}

