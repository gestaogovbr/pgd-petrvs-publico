<?php

declare(strict_types=1);

namespace App\Repository;

use App\Models\DocumentoAssinatura;
use App\Repository\DocumentoAssinatura\Contracts\DocumentoAssinaturaReadRepositoryContract;
use App\Repository\DocumentoAssinatura\Contracts\DocumentoAssinaturaWriteRepositoryContract;
use App\V2\PlanoTrabalho\Documento\TCR\TCRAssinaturaDTO;

class DocumentoAssinaturaRepository
{
    public function __construct(
        private readonly DocumentoAssinaturaReadRepositoryContract $readRepository,
        private readonly DocumentoAssinaturaWriteRepositoryContract $writeRepository,
    ) {}

    public function usuarioJaAssinou(string $documentoId, string $usuarioId): bool
    {
        return $this->readRepository->existsByDocumentoAndUsuario($documentoId, $usuarioId);
    }

    public function participanteAssinou(string $documentoId, string $participanteId): bool
    {
        return $this->readRepository->participanteAssinou($documentoId, $participanteId);
    }

    public function gestorUnidadeAssinou(string $documentoId, string $unidadeId): bool
    {
        return $this->readRepository->gestorUnidadeAssinou($documentoId, $unidadeId);
    }

    public function gestorDiferenteDoParticipanteAssinou(string $documentoId, string $unidadeId, string $participanteId): bool
    {
        return $this->readRepository->gestorDiferenteDoParticipanteAssinou($documentoId, $unidadeId, $participanteId);
    }

    public function existeAlgumaAssinatura(string $documentoId): bool
    {
        return $this->readRepository->existeAlgumaAssinatura($documentoId);
    }

    public function createFromTCR(TCRAssinaturaDTO $dto): DocumentoAssinatura
    {
        /** @var DocumentoAssinatura */
        return $this->writeRepository->create($dto->toArray());
    }

    public function deleteAssinaturaUsuario(string $documentoId, string $usuarioId): bool
    {
        return $this->writeRepository->deleteByDocumentoAndUsuario($documentoId, $usuarioId);
    }
}
