<?php

declare(strict_types=1);

namespace App\Repository\Documento\Contracts;

use Illuminate\Database\Eloquent\Model;

/**
 * @see \App\Repository\Documento\Eloquent\EloquentDocumentoReadRepository
 */
interface DocumentoReadRepositoryContract
{
    /** @return \App\Models\Documento|null */
    public function findTcrByPlanoTrabalhoId(string $planoTrabalhoId): ?Model;
}
