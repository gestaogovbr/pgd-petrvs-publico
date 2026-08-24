<?php

declare(strict_types=1);

namespace App\Repository;

use App\Models\DocumentoAssinatura;
use App\Repository\DocumentoAssinatura\Contracts\DocumentoAssinaturaReadRepositoryContract;
use App\Repository\DocumentoAssinatura\Contracts\DocumentoAssinaturaWriteRepositoryContract;
use App\V2\PlanoTrabalho\Documento\TCR\DTOs\TCRAssinaturaDTO;
use Illuminate\Database\Eloquent\Collection;

class DocumentoAssinaturaRepository
{
    public function __construct(
        private readonly DocumentoAssinaturaReadRepositoryContract $readRepository,
        private readonly DocumentoAssinaturaWriteRepositoryContract $writeRepository,
    ) {}

    public function usuarioJaAssinou(string $documentoId, string $cpf): bool
    {
        return $this->readRepository->existsByDocumentoAndCpf($documentoId, $cpf);
    }

    public function findByDocumentoAndUsuario(string $documentoId, string $usuarioId): ?DocumentoAssinatura
    {
        return $this->readRepository->findByDocumentoAndUsuario($documentoId, $usuarioId);
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

    public function gestorTitularDiferenteDoParticipanteAssinou(string $documentoId, string $unidadeId, string $participanteId): bool
    {
        return $this->readRepository->gestorTitularDiferenteDoParticipanteAssinou($documentoId, $unidadeId, $participanteId);
    }

    public function gestorSubstitutoDiferenteDoParticipanteAssinou(string $documentoId, string $unidadeId, string $participanteId): bool
    {
        return $this->readRepository->gestorSubstitutoDiferenteDoParticipanteAssinou($documentoId, $unidadeId, $participanteId);
    }

    public function existeAlgumaAssinatura(string $documentoId): bool
    {
        return $this->readRepository->existeAlgumaAssinatura($documentoId);
    }

    public function existeAssinaturaDeNaoParticipante(string $documentoId, string $participanteId): bool
    {
        return $this->readRepository->existeAssinaturaDeNaoParticipante($documentoId, $participanteId);
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

    public function deleteAssinaturasDocumento(string $documentoId): int
    {
        return $this->writeRepository->deleteByDocumentoId($documentoId);
    }

    public function subqueryUsuarioJaAssinou(\Illuminate\Database\Query\Builder $query, string $usuarioId, string $documentoIdColumn = 'planos_trabalhos.documento_id'): void
    {
        $this->readRepository->subqueryUsuarioJaAssinou($query, $usuarioId, $documentoIdColumn);
    }

    /** @return Collection<int, DocumentoAssinatura> */
    public function listarRevogadasPorPlanoTrabalho(string $planoTrabalhoId): Collection
    {
        return $this->readRepository->listarRevogadasPorPlanoTrabalho($planoTrabalhoId);
    }
}
