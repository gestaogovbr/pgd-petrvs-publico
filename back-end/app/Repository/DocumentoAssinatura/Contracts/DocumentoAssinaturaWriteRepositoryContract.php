<?php

declare(strict_types=1);

namespace App\Repository\DocumentoAssinatura\Contracts;

use Illuminate\Database\Eloquent\Model;

interface DocumentoAssinaturaWriteRepositoryContract
{
    /** @return \App\Models\DocumentoAssinatura */
    public function create(array $attributes): Model;

    public function deleteByDocumentoAndUsuario(string $documentoId, string $usuarioId): bool;

    public function deleteByDocumentoId(string $documentoId): int;
}
