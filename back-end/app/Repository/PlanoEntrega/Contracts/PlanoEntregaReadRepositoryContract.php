<?php

declare(strict_types=1);

namespace App\Repository\PlanoEntrega\Contracts;

use App\Models\PlanoEntrega;
use Illuminate\Database\Eloquent\Collection;

interface PlanoEntregaReadRepositoryContract
{
    public function findById(string|int $id): ?PlanoEntrega;

    public function findOneParaEnvio(string|int $id): ?PlanoEntrega;

    public function findAllParaEnvio(int $chunkSize, callable $onChunk): void;

    public function getPlanosEntregaAvaliacao(array $unidadesIds): Collection;

    public function getPlanosEntregaHomologacao(array $unidadesIds): Collection;

    public function getEntregasPlanoEntregaHomologacao(array $unidadesIds): Collection;

    public function getEntregasPlanoEntregaExecucao(array $unidadesIds): Collection;
}
