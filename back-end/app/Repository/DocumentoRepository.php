<?php

declare(strict_types=1);

namespace App\Repository;

use App\Models\Documento;
use App\Repository\Documento\Contracts\DocumentoReadRepositoryContract;
use App\Repository\Documento\Contracts\DocumentoWriteRepositoryContract;

class DocumentoRepository
{
    public function __construct(
        private readonly DocumentoReadRepositoryContract $readRepository,
        private readonly DocumentoWriteRepositoryContract $writeRepository,
    ) {}

    public function findTcrByPlanoTrabalhoId(string $planoTrabalhoId): ?Documento
    {
        /** @var Documento|null */
        return $this->readRepository->findTcrByPlanoTrabalhoId($planoTrabalhoId);
    }

    public function create(array $attributes): Documento
    {
        /** @var Documento */
        return $this->writeRepository->create($attributes);
    }
}
