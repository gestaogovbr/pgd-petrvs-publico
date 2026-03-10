<?php

declare(strict_types=1);

namespace App\Repository;

use App\Models\UnidadeIntegranteAtribuicao;
use App\Repository\UnidadeIntegranteAtribuicao\Contracts\UnidadeIntegranteAtribuicaoReadRepositoryContract;
use App\Repository\UnidadeIntegranteAtribuicao\Contracts\UnidadeIntegranteAtribuicaoWriteRepositoryContract;
use Illuminate\Database\Eloquent\Model;

class UnidadeIntegranteAtribuicaoRepository
{
    public function __construct(
        private readonly UnidadeIntegranteAtribuicaoReadRepositoryContract $readRepository,
        private readonly UnidadeIntegranteAtribuicaoWriteRepositoryContract $writeRepository,
    ) {
    }

    /**
     * @param array<string, mixed> $attributes
     */
    public function create(array $attributes): Model
    {
        return $this->writeRepository->create($attributes);
    }

    public function delete(string $id): bool
    {
        return $this->writeRepository->delete($id);
    }
}
