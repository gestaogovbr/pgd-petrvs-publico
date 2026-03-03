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

    public function getServidor(string $cpf, string $matricula): ?IntegracaoServidor
    {
        return $this->readRepository->getServidor($cpf, $matricula);
    }

    public function getMatriculaByCpf(string $cpf): ?string
    {
        return $this->readRepository->getMatriculaByCpf($cpf);
    }

    public function save(IntegracaoServidor $entidade): bool
    {
        return $this->writeRepository->save($entidade);
    }

    /**
     * @param array<string, mixed> $data
     */
    public function update(string $cpf, string $matricula, array $data): bool
    {
        return $this->writeRepository->updateByCpfAndMatricula($cpf, $matricula, $data);
    }

    public function buscarAtualizacoesDados(): array
    {
        return $this->readRepository->buscarAtualizacoesDados();
    }

    public function getAtualizacoesLotacoes(): array
    {
        return $this->readRepository->getAtualizacoesLotacoes();
    }

    public function getServidoresInseridosNaoLotados(): array
    {
        return $this->readRepository->getServidoresInseridosNaoLotados();
    }

    public function getUsuariosAusentes(): array
    {
        return $this->readRepository->getUsuariosAusentes();
    }
}
