<?php

declare(strict_types=1);

namespace App\Repository\DocumentoAssinatura\Eloquent;

use App\Models\DocumentoAssinatura;
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use App\Repository\DocumentoAssinatura\Contracts\DocumentoAssinaturaReadRepositoryContract;
use Illuminate\Database\Eloquent\Collection;

/**
 * @extends AbstractEloquentReadRepository<DocumentoAssinatura>
 */
class EloquentDocumentoAssinaturaReadRepository extends AbstractEloquentReadRepository implements DocumentoAssinaturaReadRepositoryContract
{
    public function __construct(DocumentoAssinatura $model)
    {
        $this->model = $model;
    }

    public function existsByDocumentoAndUsuario(string $documentoId, string $usuarioId): bool
    {
        return $this->query()
            ->where('documento_id', $documentoId)
            ->where('usuario_id', $usuarioId)
            ->exists();
    }

    public function findByDocumentoAndUsuario(string $documentoId, string $usuarioId): ?DocumentoAssinatura
    {
        /** @var DocumentoAssinatura|null */
        return $this->query()
            ->where('documento_id', $documentoId)
            ->where('usuario_id', $usuarioId)
            ->first();
    }

    public function participanteAssinou(string $documentoId, string $participanteId): bool
    {
        return $this->existsByDocumentoAndUsuario($documentoId, $participanteId);
    }

    public function gestorUnidadeAssinou(string $documentoId, string $unidadeId): bool
    {
        return $this->query()
            ->where('documento_id', $documentoId)
            ->whereHas('usuario.unidadesIntegrantes', function ($q) use ($unidadeId) {
                $q->where('unidade_id', $unidadeId)
                  ->whereHas('atribuicoes', fn ($q2) => $q2->whereIn('atribuicao', ['GESTOR', 'GESTOR_SUBSTITUTO', 'GESTOR_DELEGADO']));
            })
            ->exists();
    }

    public function gestorDiferenteDoParticipanteAssinou(string $documentoId, string $unidadeId, string $participanteId): bool
    {
        return $this->query()
            ->where('documento_id', $documentoId)
            ->where('usuario_id', '!=', $participanteId)
            ->whereHas('usuario.unidadesIntegrantes', function ($q) use ($unidadeId) {
                $q->where('unidade_id', $unidadeId)
                  ->whereHas('atribuicoes', fn ($q2) => $q2->whereIn('atribuicao', ['GESTOR', 'GESTOR_SUBSTITUTO', 'GESTOR_DELEGADO']));
            })
            ->exists();
    }

    public function gestorTitularDiferenteDoParticipanteAssinou(string $documentoId, string $unidadeId, string $participanteId): bool
    {
        return $this->query()
            ->where('documento_id', $documentoId)
            ->where('usuario_id', '!=', $participanteId)
            ->whereHas('usuario.unidadesIntegrantes', function ($q) use ($unidadeId) {
                $q->where('unidade_id', $unidadeId)
                  ->whereHas('atribuicoes', fn ($q2) => $q2->where('atribuicao', 'GESTOR'));
            })
            ->exists();
    }

    public function existeAlgumaAssinatura(string $documentoId): bool
    {
        return $this->query()
            ->where('documento_id', $documentoId)
            ->exists();
    }

    public function listarRevogadasPorPlanoTrabalho(string $planoTrabalhoId): Collection
    {
        /** @var Collection<int, DocumentoAssinatura> */
        return $this->model->newQuery()
            ->onlyTrashed()
            ->whereHas('documento', function ($query) use ($planoTrabalhoId) {
                $query->withTrashed()
                    ->where('plano_trabalho_id', $planoTrabalhoId)
                    ->where('especie', 'TCR');
            })
            ->with(['usuario:id,nome,nome_social'])
            ->orderByDesc('deleted_at')
            ->get();
    }
}
