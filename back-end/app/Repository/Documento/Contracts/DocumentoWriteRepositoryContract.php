<?php

declare(strict_types=1);

namespace App\Repository\Documento\Contracts;

use Illuminate\Database\Eloquent\Model;

/**
 * @see \App\Repository\Documento\Eloquent\EloquentDocumentoWriteRepository
 */
interface DocumentoWriteRepositoryContract
{
    /** @return \App\Models\Documento */
    public function create(array $attributes): Model;

    public function delete(string|int $id): bool;
}
