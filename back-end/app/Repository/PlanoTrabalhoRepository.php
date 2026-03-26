<?php

declare(strict_types=1);

namespace App\Repository;

use App\Models\PlanoTrabalho;
use App\V2\PlanoTrabalho\DTOs\PlanoTrabalhoListagemFiltro;
use App\Repository\PlanoTrabalho\Contracts\PlanoTrabalhoReadRepositoryContract;
use App\Repository\PlanoTrabalho\Contracts\PlanoTrabalhoWriteRepositoryContract;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
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

    public function buscarPlanosListagem(PlanoTrabalhoListagemFiltro $filtro): LengthAwarePaginator
    {
        return $this->readRepository->buscarPlanosListagem($filtro);
    }

    public function create(array $attributes): PlanoTrabalho
    {
        /** @var PlanoTrabalho */
        return $this->writeRepository->create($attributes);
    }

    public function existeConflitoPeriodo(string $usuarioId, string $dataInicio, string $dataFim): bool
    {
        return $this->readRepository->existeConflitoPeriodo($usuarioId, $dataInicio, $dataFim);
    }

    public function findByIdComRelacoes(string $id): ?PlanoTrabalho
    {
        /** @var PlanoTrabalho|null */
        return $this->readRepository->findByIdComRelacoes($id);
    }
}
