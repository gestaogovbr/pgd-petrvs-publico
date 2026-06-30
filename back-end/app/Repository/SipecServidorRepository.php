<?php

declare(strict_types=1);

namespace App\Repository;

use App\Repository\SipecServidor\Contracts\SipecServidorReadRepositoryContract;
use App\Repository\SipecServidor\Contracts\SipecServidorWriteRepositoryContract;
use Illuminate\Database\Eloquent\Model;

class SipecServidorRepository
{
    public function __construct(
        private readonly SipecServidorReadRepositoryContract $readRepository,
        private readonly SipecServidorWriteRepositoryContract $writeRepository,
    ) {
    }

    /**
     * @return Model|null
     */
    public function findByCpfAndMatricula(string $cpf, ?string $matricula): ?Model
    {
        return $this->readRepository->findByCpfAndMatricula($cpf, $matricula);
    }

    /**
     * @return Model
     */
    public function updateOrCreateByCpfAndMatricula(string $cpf, ?string $matricula, string $response, bool $processado, ?string $dataModificacao): Model
    {
        return $this->writeRepository->updateOrCreateByCpfAndMatricula($cpf, $matricula, $response, $processado, $dataModificacao);
    }
}
