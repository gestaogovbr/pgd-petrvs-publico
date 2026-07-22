<?php

declare(strict_types=1);

namespace App\Repository\DocumentoAssinatura\Contracts;

use App\Models\DocumentoAssinatura;

interface DocumentoAssinaturaReadRepositoryContract
{
    public function existsByDocumentoAndUsuario(string $documentoId, string $usuarioId): bool;

    public function existsByDocumentoAndCpf(string $documentoId, string $cpf): bool;

    public function findByDocumentoAndUsuario(string $documentoId, string $usuarioId): ?DocumentoAssinatura;

    public function participanteAssinou(string $documentoId, string $participanteId): bool;

    public function gestorUnidadeAssinou(string $documentoId, string $unidadeId): bool;

    public function gestorDiferenteDoParticipanteAssinou(string $documentoId, string $unidadeId, string $participanteId): bool;

    public function gestorTitularDiferenteDoParticipanteAssinou(string $documentoId, string $unidadeId, string $participanteId): bool;

    public function gestorSubstitutoDiferenteDoParticipanteAssinou(string $documentoId, string $unidadeId, string $participanteId): bool;

    public function existeAlgumaAssinatura(string $documentoId): bool;

    /**
     * Constrói subquery correlacionada para verificar se o usuário já assinou um documento.
     * Uso: whereNotExists(fn ($sub) => $repo->subqueryUsuarioJaAssinou($sub, $usuarioId))
     */
    public function subqueryUsuarioJaAssinou(\Illuminate\Database\Query\Builder $query, string $usuarioId, string $documentoIdColumn = 'planos_trabalhos.documento_id'): void;
}
