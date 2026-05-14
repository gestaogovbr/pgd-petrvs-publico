<?php

declare(strict_types=1);

namespace App\Repository\PlanejamentoObjetivo\Contracts;

use App\Models\PlanejamentoObjetivo;
use App\V2\Planejamento\Objetivo\DTOs\EsforcoNodeDTO;
use App\V2\Planejamento\Objetivo\DTOs\EntregasPorUnidadeDTO;
use Illuminate\Database\Eloquent\Model;

/**
 * @see \App\Repository\PlanejamentoObjetivo\Eloquent\EloquentPlanejamentoObjetivoReadRepository
 */
interface PlanejamentoObjetivoReadRepositoryContract
{
    /** @return PlanejamentoObjetivo|null */
    public function find(string|int $id): ?Model;

    /** @return array<string, EsforcoNodeDTO> */
    public function getEsforcoTotal(PlanejamentoObjetivo $objetivo): array;

    /** @return EntregasPorUnidadeDTO[] */
    public function getEntregasAgrupadasPorUnidade(string $objetivoId): array;
}
