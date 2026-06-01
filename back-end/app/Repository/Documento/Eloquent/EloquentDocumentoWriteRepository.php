<?php

declare(strict_types=1);

namespace App\Repository\Documento\Eloquent;

use App\Models\Documento;
use App\Repository\Eloquent\AbstractEloquentWriteRepository;
use App\Repository\Documento\Contracts\DocumentoWriteRepositoryContract;

/**
 * @extends AbstractEloquentWriteRepository<Documento>
 */
class EloquentDocumentoWriteRepository extends AbstractEloquentWriteRepository implements DocumentoWriteRepositoryContract
{
    public function __construct(Documento $model)
    {
        $this->model = $model;
    }
}