<?php

declare(strict_types=1);

namespace App\Repository;

use App\Models\RelatorioGeracao;
use App\Repository\RelatorioGeracao\Contracts\RelatorioGeracaoReadRepositoryContract;
use App\Repository\RelatorioGeracao\Contracts\RelatorioGeracaoWriteRepositoryContract;
use App\V2\RelatorioGeracao\DTOs\RelatorioGeracaoIndexDTO;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class RelatorioGeracaoRepository
{
    public function __construct(
        private readonly RelatorioGeracaoReadRepositoryContract $readRepository,
        private readonly RelatorioGeracaoWriteRepositoryContract $writeRepository,
    ) {
    }

    public function find(string $id): ?RelatorioGeracao
    {
        return $this->readRepository->find($id);
    }

    public function findForUsuario(string $id, string $usuarioId): ?RelatorioGeracao
    {
        return $this->readRepository->findForUsuario($id, $usuarioId);
    }

    /**
     * @param list<string> $ids
     * @return Collection<int, RelatorioGeracao>
     */
    public function findByIdsForUsuario(array $ids, string $usuarioId): Collection
    {
        return $this->readRepository->findByIdsForUsuario($ids, $usuarioId);
    }

    /**
     * @return LengthAwarePaginator<RelatorioGeracao>
     */
    public function paginateForUsuario(string $usuarioId, RelatorioGeracaoIndexDTO $dto): LengthAwarePaginator
    {
        return $this->readRepository->paginateForUsuario($usuarioId, $dto);
    }

    /**
     * @param array<string, mixed> $attributes
     */
    public function create(array $attributes): RelatorioGeracao
    {
        return $this->writeRepository->create($attributes);
    }

    /**
     * @param array<string, mixed> $attributes
     */
    public function update(string $id, array $attributes): ?RelatorioGeracao
    {
        return $this->writeRepository->update($id, $attributes);
    }

    public function marcarErroSeProcessando(string $id, ?string $mensagem): bool
    {
        return $this->writeRepository->marcarErroSeProcessando($id, $mensagem);
    }
}
