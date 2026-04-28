<?php

declare(strict_types=1);

namespace App\Repository;

use App\Models\PlanoTrabalho;
use App\V2\PlanoTrabalho\DTOs\PlanoTrabalhoIndexDTO;
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

    public function findById(string $id): ?PlanoTrabalho
    {
        return $this->readRepository->findById($id);
    }

    public function getPlanosTrabalhoAssinatura(array $unidadesGerenciadasIds, array $unidadesSubordinadasIds, string $usuarioId): Collection
    {
        return $this->readRepository->getPlanosTrabalhoAssinatura($unidadesGerenciadasIds, $unidadesSubordinadasIds, $usuarioId);
    }

    public function findWithAtividades(string|int $id): ?PlanoTrabalho
    {
        return $this->readRepository->findWithAtividades($id);
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

    public function buscarPlanosListagem(PlanoTrabalhoIndexDTO $filtro): LengthAwarePaginator
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

    public function existeConflitoPeriodoExcluindo(string $usuarioId, string $dataInicio, string $dataFim, string $excluirPlanoId): bool
    {
        return $this->readRepository->existeConflitoPeriodoExcluindo($usuarioId, $dataInicio, $dataFim, $excluirPlanoId);
    }

    public function findByIdComRelacoes(string $id): ?PlanoTrabalho
    {
        /** @var PlanoTrabalho|null */
        return $this->readRepository->findByIdComRelacoes($id);
    }

    public function delete(string $id): bool
    {
        return $this->writeRepository->delete($id);
    }

    public function update(string $id, array $attributes): ?PlanoTrabalho
    {
        /** @var PlanoTrabalho|null */
        return $this->writeRepository->update($id, $attributes);
    }

    public function possuiAssinatura(string $planoId): bool
    {
        return $this->readRepository->possuiAssinatura($planoId);
    }

    public function loadRelacoesTCR(PlanoTrabalho $plano): PlanoTrabalho
    {
        return $plano->load([
            'programa.templateTcr',
            'unidade',
            'usuario',
            'entregas.entrega',
        ]);
    }
}
