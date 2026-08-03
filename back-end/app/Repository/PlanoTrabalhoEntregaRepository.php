<?php

declare(strict_types=1);

namespace App\Repository;

use App\Models\PlanoTrabalhoEntrega;
use App\Repository\PlanoTrabalhoEntrega\Contracts\PlanoTrabalhoEntregaReadRepositoryContract;
use App\Repository\PlanoTrabalhoEntrega\Contracts\PlanoTrabalhoEntregaWriteRepositoryContract;
use App\V2\PlanoTrabalho\Entrega\DTOs\ResumoForcaTrabalhoDTO;
use App\V2\PlanoTrabalho\Entrega\DTOs\SomatoriosEsforcoDTO;
use Illuminate\Support\Collection;

class PlanoTrabalhoEntregaRepository
{
    public function __construct(
        private readonly PlanoTrabalhoEntregaReadRepositoryContract $readRepository,
        private readonly PlanoTrabalhoEntregaWriteRepositoryContract $writeRepository,
    ) {}

    public function create(array $attributes): PlanoTrabalhoEntrega
    {
        /** @var PlanoTrabalhoEntrega */
        $entrega = $this->writeRepository->create($attributes);

        $entrega->load([
            'planoEntregaEntrega:id,descricao,entrega_id,plano_entrega_id',
            'planoEntregaEntrega.entrega:id,nome',
            'planoEntregaEntrega.planoEntrega:id,nome,unidade_id',
            'planoEntregaEntrega.planoEntrega.unidade:id,sigla,nome',
        ]);

        return $entrega;
    }

    public function update(string $id, array $attributes): ?PlanoTrabalhoEntrega
    {
        /** @var PlanoTrabalhoEntrega|null */
        $entrega = $this->writeRepository->update($id, $attributes);

        if ($entrega === null) {
            return null;
        }

        $entrega->load([
            'planoEntregaEntrega:id,descricao,entrega_id,plano_entrega_id',
            'planoEntregaEntrega.entrega:id,nome',
            'planoEntregaEntrega.planoEntrega:id,nome,unidade_id',
            'planoEntregaEntrega.planoEntrega.unidade:id,sigla,nome',
        ]);

        return $entrega;
    }

    public function delete(string $id): bool
    {
        return $this->writeRepository->delete($id);
    }

    public function existeVinculo(string $planoTrabalhoId, string $planoEntregaEntregaId, ?string $excludeId = null): bool
    {
        return $this->readRepository->existeVinculo($planoTrabalhoId, $planoEntregaEntregaId, $excludeId);
    }

    public function resumoForcaTrabalhoPorPlano(string $planoTrabalhoId): ResumoForcaTrabalhoDTO
    {
        return $this->readRepository->resumoForcaTrabalhoPorPlano($planoTrabalhoId);
    }

    public function somatoriosEsforcoProjetados(
        string $planoTrabalhoId,
        ?string $entregaIdEmEdicao,
        float $forcaTrabalhoProjeto,
        float $esforcoExecutadoProjeto,
    ): SomatoriosEsforcoDTO {
        return $this->readRepository->somatoriosEsforcoProjetados(
            $planoTrabalhoId,
            $entregaIdEmEdicao,
            $forcaTrabalhoProjeto,
            $esforcoExecutadoProjeto,
        );
    }

    /**
     * @param array<string> $planoIds
     * @return Collection
     */
    public function buscarEntregasParaIndicadores(array $planoIds): Collection
    {
        return $this->readRepository->buscarEntregasParaIndicadores($planoIds);
    }
}
