<?php

declare(strict_types=1);

namespace App\Repository\DocumentoAssinatura\Contracts;

interface DocumentoAssinaturaReadRepositoryContract
{
    public function existsByDocumentoAndUsuario(string $documentoId, string $usuarioId): bool;

    public function participanteAssinou(string $documentoId, string $participanteId): bool;

    public function gestorUnidadeAssinou(string $documentoId, string $unidadeId): bool;

    public function existeAlgumaAssinatura(string $documentoId): bool;
}
