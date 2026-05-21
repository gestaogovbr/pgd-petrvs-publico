<?php

declare(strict_types=1);

namespace App\Repository\DocumentoAssinatura\Eloquent;

use App\Models\DocumentoAssinatura;
use App\Repository\Eloquent\AbstractEloquentWriteRepository;
use App\Repository\DocumentoAssinatura\Contracts\DocumentoAssinaturaWriteRepositoryContract;

/**
 * @extends AbstractEloquentWriteRepository<DocumentoAssinatura>
 */
class EloquentDocumentoAssinaturaWriteRepository extends AbstractEloquentWriteRepository implements DocumentoAssinaturaWriteRepositoryContract
{
    public function __construct(DocumentoAssinatura $model)
    {
        $this->model = $model;
    }

    public function deleteByDocumentoAndUsuario(string $documentoId, string $usuarioId): bool
    {
        return $this->model->newQuery()
            ->where('documento_id', $documentoId)
            ->where('usuario_id', $usuarioId)
            ->delete() >= self::MINIMUM_DELETED_ROWS;
    }

    public function deleteByDocumentoId(string $documentoId): int
    {
        return $this->model->newQuery()
            ->where('documento_id', $documentoId)
            ->delete();
    }
}