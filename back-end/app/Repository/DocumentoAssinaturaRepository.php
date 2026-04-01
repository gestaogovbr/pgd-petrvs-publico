<?php

declare(strict_types=1);

namespace App\Repository;

use App\Models\DocumentoAssinatura;
use App\Models\PlanoTrabalho;
use App\Models\Unidade;
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
            if (!$this->gestorHierarquicoAssinou($documentoId, $plano)) {
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

    private function gestorHierarquicoAssinou(string $documentoId, PlanoTrabalho $plano): bool # TODO: essas funções estão muito "inteligentes" para o repositoory, parecem-me serem mais pertencentes à vlasse de validação.
    {
        $unidade = $plano->unidade ?? Unidade::find($plano->unidade_id);

        while ($unidade !== null) {
            if ($this->readRepository->gestorDiferenteDoParticipanteAssinou($documentoId, $unidade->id, $plano->usuario_id)) {
                return true;
            }

            if ($unidade->unidade_pai_id) {
                $unidade = Unidade::find($unidade->unidade_pai_id);
                continue;
            }

            break;
        }

        $unidadePt = $plano->unidade ?? Unidade::find($plano->unidade_id);
        $semSuperior = $unidadePt->unidade_pai_id === null;
        $participanteEhGestor = $this->readRepository->gestorUnidadeAssinou($documentoId, $unidadePt->id);

        return $semSuperior && $participanteEhGestor;
    }
}
