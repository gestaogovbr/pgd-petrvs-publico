<?php

declare(strict_types=1);

namespace App\Repository\DocumentoAssinatura\Contracts;

use App\Models\DocumentoAssinatura;
use Illuminate\Database\Eloquent\Collection;

interface DocumentoAssinaturaReadRepositoryContract
{
    public function existsByDocumentoAndUsuario(string $documentoId, string $usuarioId): bool;

    public function findByDocumentoAndUsuario(string $documentoId, string $usuarioId): ?DocumentoAssinatura;

    public function participanteAssinou(string $documentoId, string $participanteId): bool;

    public function gestorUnidadeAssinou(string $documentoId, string $unidadeId): bool;

    public function gestorDiferenteDoParticipanteAssinou(string $documentoId, string $unidadeId, string $participanteId): bool;

    public function gestorTitularDiferenteDoParticipanteAssinou(string $documentoId, string $unidadeId, string $participanteId): bool;

    public function existeAlgumaAssinatura(string $documentoId): bool;

    /** @return Collection<int, DocumentoAssinatura> */
    public function listarRevogadasPorPlanoTrabalho(string $planoTrabalhoId): Collection;
}
