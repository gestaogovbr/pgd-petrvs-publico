<?php

declare(strict_types=1);

namespace App\Repository;

use App\Models\UnidadeIntegrante;
use App\Repository\UnidadeIntegrante\Contracts\UnidadeIntegranteReadRepositoryContract;
use App\Repository\UnidadeIntegrante\Contracts\UnidadeIntegranteWriteRepositoryContract;
use Illuminate\Database\Eloquent\Collection;

class UnidadeIntegranteRepository
{
    public function __construct(
        private readonly UnidadeIntegranteReadRepositoryContract $readRepository,
        private readonly UnidadeIntegranteWriteRepositoryContract $writeRepository,
    ) {
    }

    public function findCuradoresByUsuario(string $usuarioId): Collection
    {
        return $this->readRepository->findCuradoresByUsuario($usuarioId);
    }

    public function findColaboracoesByUsuario(string $usuarioId): Collection
    {
        return $this->readRepository->findColaboracoesByUsuario($usuarioId);
    }

    public function findGerenciasSubstitutasByUsuario(string $usuarioId): Collection
    {
        return $this->readRepository->findGerenciasSubstitutasByUsuario($usuarioId);
    }

    public function findGerenciasDelegadasByUsuario(string $usuarioId): Collection
    {
        return $this->readRepository->findGerenciasDelegadasByUsuario($usuarioId);
    }

    public function findGerenciasTitularesByUsuario(string $usuarioId): Collection
    {
        return $this->readRepository->findGerenciasTitularesByUsuario($usuarioId);
    }

    public function findLotacoesByUsuario(string $usuarioId): Collection
    {
        return $this->readRepository->findLotacoesByUsuario($usuarioId);
    }

    public function findGestorByUnidade(string $unidadeId): ?UnidadeIntegrante
    {
        return $this->readRepository->findGestorByUnidade($unidadeId);
    }

    public function findUnidadeIntegrante(string $usuarioId, string $unidadeId): ?UnidadeIntegrante
    {
        return $this->readRepository->findUnidadeIntegrante($usuarioId, $unidadeId);
    }
}
