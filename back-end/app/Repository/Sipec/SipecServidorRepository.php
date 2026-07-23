<?php

declare(strict_types=1);

namespace App\Repository\Sipec;

use App\Models\SipecServidor;
use App\Repository\Sipec\SipecServidor\Contracts\SipecServidorReadRepositoryContract;
use App\Repository\Sipec\SipecServidor\Contracts\SipecServidorWriteRepositoryContract;

class SipecServidorRepository
{
    public function __construct(
        private readonly SipecServidorReadRepositoryContract $readRepository,
        private readonly SipecServidorWriteRepositoryContract $writeRepository,
    ) {
    }

    /**
     * @return SipecServidor|null
     */
    public function findByCpfAndMatricula(string $cpf, ?string $matricula): ?SipecServidor
    {
        /** @var SipecServidor|null */
        return $this->readRepository->findByCpfAndMatricula($cpf, $matricula);
    }

    /**
     * @return SipecServidor
     */
    public function updateOrCreateByCpfAndMatricula(string $cpf, ?string $matricula, string $response, bool $processado, ?string $dataModificacao): SipecServidor
    {
        /** @var SipecServidor */
        return $this->writeRepository->updateOrCreateByCpfAndMatricula($cpf, $matricula, $response, $processado, $dataModificacao);
    }

    public function chunkNaoProcessados(int $chunkSize, callable $callback): void
    {
        $this->readRepository->chunkNaoProcessados($chunkSize, $callback);
    }

    public function marcarComoProcessado(SipecServidor $registro): bool
    {
        return $this->writeRepository->marcarComoProcessado($registro);
    }
}
