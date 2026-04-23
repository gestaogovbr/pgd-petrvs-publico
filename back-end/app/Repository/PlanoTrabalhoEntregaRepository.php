<?php

declare(strict_types=1);

namespace App\Repository;

use App\Models\PlanoTrabalhoEntrega;
use App\Repository\PlanoTrabalhoEntrega\Contracts\PlanoTrabalhoEntregaReadRepositoryContract;
use App\Repository\PlanoTrabalhoEntrega\Contracts\PlanoTrabalhoEntregaWriteRepositoryContract;

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

    public function update(string $id, array $attributes): PlanoTrabalhoEntrega
    {
        $this->writeRepository->update($id, $attributes);

        /** @var PlanoTrabalhoEntrega */
        $entrega = $this->readRepository->find($id);

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

    public function existeVinculo(string $planoTrabalhoId, string $planoEntregaEntregaId): bool
    {
        return $this->readRepository->existeVinculo($planoTrabalhoId, $planoEntregaEntregaId);
    }
}
