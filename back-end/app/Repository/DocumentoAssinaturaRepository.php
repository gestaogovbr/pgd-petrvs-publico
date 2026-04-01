<?php

declare(strict_types=1);

namespace App\Repository;

use App\Models\DocumentoAssinatura;
use App\Models\PlanoTrabalho;
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

    public function todasAssinaturasRealizadas(PlanoTrabalho $plano, string $documentoId): bool
    {
        $programa = $plano->programa;

        if ($programa->plano_trabalho_assinatura_participante) {
            if (!$this->readRepository->participanteAssinou($documentoId, $plano->usuario_id)) {
                return false;
            }
        }

        if ($programa->plano_trabalho_assinatura_gestor_unidade) {
            if (!$this->readRepository->gestorUnidadeAssinou($documentoId, $plano->unidade_id)) {
                return false;
            }
        }

        return true;
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

    public function existeAlgumaAssinatura(string $documentoId): bool
    {
        return $this->readRepository->existeAlgumaAssinatura($documentoId);
    }
}
