<?php

declare(strict_types=1);

namespace App\Repository;

use App\Models\PlanoEntrega;
use App\Repository\Interfaces\AbstractEnvioRepository;
use App\Repository\PlanoEntrega\Contracts\PlanoEntregaReadRepositoryContract;
use App\Repository\PlanoEntrega\Contracts\PlanoEntregaWriteRepositoryContract;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * @implements AbstractEnvioRepository<PlanoEntrega>
 */
class PlanoEntregaRepository implements AbstractEnvioRepository
{
    public function __construct(
        private readonly PlanoEntregaReadRepositoryContract $readRepository,
        private readonly PlanoEntregaWriteRepositoryContract $writeRepository
    ) {}

    public function findById(string|int $id): ?PlanoEntrega
    {
        return $this->readRepository->findById($id);
    }

    public function findOneParaEnvio(string|int $id): ?PlanoEntrega
    {
        return $this->readRepository->findOneParaEnvio($id);
    }

    public function findAllParaEnvio(int $chunkSize, callable $onChunk): void
    {
        $this->readRepository->findAllParaEnvio($chunkSize, $onChunk);
    }

    public function getPlanosEntregaAvaliacao(array $unidadesIds): Collection
    {
        return $this->readRepository->getPlanosEntregaAvaliacao($unidadesIds);
    }

    public function getPlanosEntregaHomologacao(array $unidadesIds): Collection
    {
        return $this->readRepository->getPlanosEntregaHomologacao($unidadesIds);
    }

    public function getEntregasPlanoEntregaHomologacao(array $unidadesIds): Collection
    {
        return $this->readRepository->getEntregasPlanoEntregaHomologacao($unidadesIds);
    }

    public function getEntregasPlanoEntregaExecucao(array $unidadesIds): Collection
    {
        return $this->readRepository->getEntregasPlanoEntregaExecucao($unidadesIds);
    }

    public function agendarEnvio(Model $planoEntrega, Carbon $dataAgendamento): void
    {
        /** @var PlanoEntrega $planoEntrega */
        $this->writeRepository->agendarEnvio($planoEntrega, $dataAgendamento);
    }

    public function registrarTentativa(Model $planoEntrega): void
    {
        /** @var PlanoEntrega $planoEntrega */
        $this->writeRepository->registrarTentativa($planoEntrega);
    }

    public function registrarSucesso(Model $planoEntrega): void
    {
        /** @var PlanoEntrega $planoEntrega */
        $this->writeRepository->registrarSucesso($planoEntrega);
    }

    public function registrarInsucesso(Model $planoEntrega, string $mensagem): void
    {
        /** @var PlanoEntrega $planoEntrega */
        $this->writeRepository->registrarInsucesso($planoEntrega, $mensagem);
    }
}
