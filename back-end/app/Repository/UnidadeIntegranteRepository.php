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

    public function findAllCuradoresByUsuario(string $usuarioId): Collection
    {
        return $this->readRepository->findAllCuradoresByUsuario($usuarioId);
    }

    public function findAllColaboracoesByUsuario(string $usuarioId): Collection
    {
        return $this->readRepository->findAllColaboracoesByUsuario($usuarioId);
    }

    public function findAllGerenciasSubstitutasByUsuario(string $usuarioId): Collection
    {
        return $this->readRepository->findAllGerenciasSubstitutasByUsuario($usuarioId);
    }

    public function findAllGerenciasDelegadasByUsuario(string $usuarioId): Collection
    {
        return $this->readRepository->findAllGerenciasDelegadasByUsuario($usuarioId);
    }

    public function findAllGerenciasTitularesByUsuario(string $usuarioId): Collection
    {
        return $this->readRepository->findAllGerenciasTitularesByUsuario($usuarioId);
    }

    public function findAllLotacoesByUsuario(string $usuarioId): Collection
    {
        return $this->readRepository->findAllLotacoesByUsuario($usuarioId);
    }

    public function findGestorByUnidade(string $unidadeId): ?UnidadeIntegrante
    {
        return $this->readRepository->findGestorByUnidade($unidadeId);
    }

    public function findUnidadeIntegrante(string $usuarioId, string $unidadeId): ?UnidadeIntegrante
    {
        return $this->readRepository->findUnidadeIntegrante($usuarioId, $unidadeId);
    }

    public function findAllByUsuario(string $usuarioId): Collection
    {
        return $this->readRepository->findAllByUsuario($usuarioId);
    }
}
