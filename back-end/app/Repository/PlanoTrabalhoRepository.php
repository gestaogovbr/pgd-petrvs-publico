<?php

declare(strict_types=1);

namespace App\Repository;

use App\Repository\PlanoTrabalho\Contracts\PlanoTrabalhoReadRepositoryContract;
use App\Repository\PlanoTrabalho\Contracts\PlanoTrabalhoWriteRepositoryContract;
use Illuminate\Database\Eloquent\Collection;

class PlanoTrabalhoRepository
{
    public function __construct(
        private readonly PlanoTrabalhoReadRepositoryContract $readRepository,
        private readonly PlanoTrabalhoWriteRepositoryContract $writeRepository
    ) {}

    public function getPlanosTrabalhoAssinatura(array $unidadesGerenciadasIds, array $unidadesSubordinadasIds, string $usuarioId): Collection
    {
        return $this->readRepository->getPlanosTrabalhoAssinatura($unidadesGerenciadasIds, $unidadesSubordinadasIds, $usuarioId);
    }

    public function planosAtivos(string $usuarioId): Collection
    {
        return $this->readRepository->planosAtivos($usuarioId);
    }

    public function planosAtivosPorData(string $dataInicial, string $dataFinal, string $usuarioId): Collection
    {
        return $this->readRepository->planosAtivosPorData($dataInicial, $dataFinal, $usuarioId);
    }

    public function buscarPlanosPendentes(string $usuarioId, string $planoTrabalhoId, string $dataLimite): Collection
    {
        return $this->readRepository->buscarPlanosPendentes($usuarioId, $planoTrabalhoId, $dataLimite);
    }
}
