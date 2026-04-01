<?php

declare(strict_types=1);

namespace App\Repository;

use App\Models\PlanoTrabalho;
use App\Repository\Interfaces\AbstractEnvioRepository;
use App\Repository\PlanoTrabalho\Contracts\PlanoTrabalhoReadRepositoryContract;
use App\Repository\PlanoTrabalho\Contracts\PlanoTrabalhoWriteRepositoryContract;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * @implements AbstractEnvioRepository<PlanoTrabalho>
 */
class PlanoTrabalhoRepository implements AbstractEnvioRepository
{
    public function __construct(
        private readonly PlanoTrabalhoReadRepositoryContract $readRepository,
        private readonly PlanoTrabalhoWriteRepositoryContract $writeRepository
    ) {}

    public function findById(string $id): ?PlanoTrabalho
    {
        return $this->readRepository->findById($id);
    }

    public function findOneParaEnvio(string|int $id): ?PlanoTrabalho
    {
        return $this->readRepository->findOneParaEnvio($id);
    }

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

    public function findAllParaEnvio(int $chunkSize, callable $onChunk): void
    {
        $this->readRepository->findAllParaEnvio($chunkSize, $onChunk);
    }

    public function chunkEnviosPendentes(int $size, callable $callback): void
    {
        $this->readRepository->chunkEnviosPendentes($size, $callback);
    }

    public function agendarEnvio(Model $planoTrabalho, Carbon $dataAgendamento): void
    {
        /** @var PlanoTrabalho $planoTrabalho */
        $this->writeRepository->agendarEnvio($planoTrabalho, $dataAgendamento);
    }

    public function registrarTentativa(Model $planoTrabalho): void
    {
        /** @var PlanoTrabalho $planoTrabalho */
        $this->writeRepository->registrarTentativa($planoTrabalho);
    }

    public function registrarSucesso(Model $planoTrabalho): void
    {
        /** @var PlanoTrabalho $planoTrabalho */
        $this->writeRepository->registrarSucesso($planoTrabalho);
    }

    public function registrarInsucesso(Model $planoTrabalho, string $mensagem): void
    {
        /** @var PlanoTrabalho $planoTrabalho */
        $this->writeRepository->registrarInsucesso($planoTrabalho, $mensagem);
    }
}
