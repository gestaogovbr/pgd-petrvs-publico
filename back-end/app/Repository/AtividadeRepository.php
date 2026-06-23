<?php

declare(strict_types=1);

namespace App\Repository;

use App\Models\Atividade;
use App\Repository\Atividade\Contracts\AtividadeReadRepositoryContract;
use App\Repository\Atividade\Contracts\AtividadeWriteRepositoryContract;
use Illuminate\Support\Collection;

class AtividadeRepository
{
    public function __construct(
        private readonly AtividadeReadRepositoryContract $readRepository,
        private readonly AtividadeWriteRepositoryContract $writeRepository,
    ) {}

    public function findById(string $id): ?Atividade
    {
        /** @var Atividade|null */
        return $this->readRepository->findById($id);
    }

    /**
     * @return Collection<int, string>
     */
    public function entregaIdsComAtividade(string $consolidacaoId): Collection
    {
        return $this->readRepository->entregaIdsComAtividade($consolidacaoId);
    }

    public function create(array $attributes): Atividade
    {
        /** @var Atividade */
        return $this->writeRepository->create($attributes);
    }

    public function update(string $id, array $attributes): ?Atividade
    {
        /** @var Atividade|null */
        return $this->writeRepository->update($id, $attributes);
    }

    public function delete(string $id): bool
    {
        return $this->writeRepository->delete($id);
    }

    public function findWithPlanoTrabalho(string|int $id): ?Atividade
    {
        return $this->readRepository->findWithPlanoTrabalho($id);
    }
}
