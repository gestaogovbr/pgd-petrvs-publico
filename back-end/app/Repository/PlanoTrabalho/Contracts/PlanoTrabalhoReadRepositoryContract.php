<?php

declare(strict_types=1);

namespace App\Repository\PlanoTrabalho\Contracts;

use App\V2\PlanoTrabalho\DTOs\PlanoTrabalhoIndexDTO;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

interface PlanoTrabalhoReadRepositoryContract
{
    public function getPlanosTrabalhoAssinatura(array $unidadesGerenciadasIds, array $unidadesSubordinadasIds, string $usuarioId): Collection;

    public function planosAtivos(string $usuarioId): Collection;

    public function planosAtivosPorData(string $dataInicial, string $dataFinal, string $usuarioId): Collection;

    public function buscarPlanosPendentes(string $usuarioId, string $planoTrabalhoId, string $dataLimite): Collection;

    public function buscarPlanosListagem(PlanoTrabalhoIndexDTO $filtro): LengthAwarePaginator;

    public function existeConflitoPeriodo(string $usuarioId, string $dataInicio, string $dataFim): bool;

    /** @return \App\Models\PlanoTrabalho|null */
    public function findByIdComRelacoes(string $id): ?Model;

    /** @return \App\Models\PlanoTrabalho|null */
    public function findById(string|int $id): ?Model;

    /** @return \App\Models\PlanoTrabalho|null */
    public function findByIdParaTcr(string $id): ?Model;

    public function possuiAssinatura(string $planoId): bool;

    public function possuiEntregas(string $planoId): bool;

    public function getStatuses(): array;
}
