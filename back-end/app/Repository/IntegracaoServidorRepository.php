<?php

declare(strict_types=1);

namespace App\Repository;

use App\Models\IntegracaoServidor;
use App\Repository\IntegracaoServidor\Contracts\IntegracaoServidorReadRepositoryContract;
use App\Repository\IntegracaoServidor\Contracts\IntegracaoServidorWriteRepositoryContract;

class IntegracaoServidorRepository
{
    public function __construct(
        private readonly IntegracaoServidorReadRepositoryContract $readRepository,
        private readonly IntegracaoServidorWriteRepositoryContract $writeRepository,
    ) {
    }

    public function getServidor(string $cpf, string $matricula, string $codigoOrgao): ?IntegracaoServidor
    {
        return $this->readRepository->getServidor($cpf, $matricula, $codigoOrgao);
    }

    public function getMatriculaByCpf(string $cpf, string $codigoOrgao): ?string
    {
        return $this->readRepository->getMatriculaByCpf($cpf, $codigoOrgao);
    }

    public function findByCpfAndCodigoExercicio(string $cpf, string $codigoExercicio, string $codigoOrgao): ?IntegracaoServidor
    {
        return $this->readRepository->findByCpfAndCodigoExercicio($cpf, $codigoExercicio, $codigoOrgao);
    }

    public function save(IntegracaoServidor $entidade): bool
    {
        return $this->writeRepository->save($entidade);
    }

    /**
     * @param array<string, mixed> $data
     */
    public function update(string $cpf, string $matricula, array $data, string $codigoOrgao): bool
    {
        return $this->writeRepository->updateByCpfAndMatricula($cpf, $matricula, $data, $codigoOrgao);
    }

    public function buscarAtualizacoesDados(string $codigoOrgao, ?array $escopoServidor = null): array
    {
        return $this->readRepository->buscarAtualizacoesDados($codigoOrgao, $escopoServidor);
    }

    public function getAtualizacoesLotacoes(string $codigoOrgao, ?array $escopoServidor = null): array
    {
        return $this->readRepository->getAtualizacoesLotacoes($codigoOrgao, $escopoServidor);
    }

    public function getServidoresInseridosNaoLotados(string $codigoOrgao, ?array $escopoServidor = null): array
    {
        return $this->readRepository->getServidoresInseridosNaoLotados($codigoOrgao, $escopoServidor);
    }

    public function getUsuariosAusentes(string $codigoOrgao, ?array $escopoServidor = null): array
    {
        return $this->readRepository->getUsuariosAusentes($codigoOrgao, $escopoServidor);
    }
}
