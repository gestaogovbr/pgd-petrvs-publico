<?php

declare(strict_types=1);

namespace App\Repository\Usuario\Contracts;

use App\Models\Usuario;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

/**
 * @see \App\Repository\Usuario\Eloquent\EloquentUsuarioReadRepository
 */
interface UsuarioReadRepositoryContract
{
    public function findById(string $id): ?Usuario;
    
    public function findByCpfOrEmail(string $cpf, string $email, ?string $exceptId = null, bool $withTrashed = false): ?Usuario;

    public function isParticipanteHabilitado(string $usuarioId, string $programaId): bool;

    public function isIntegrante(string $usuarioId, string $unidadeId, string $atribuicao): bool;

    public function isLotacao(string $usuarioId, string $unidadeId): bool;
    
    /**
     * @param array<string, mixed> $params
     * @return Collection|LengthAwarePaginator
     */
    public function search(array $params, int $limit = 0);
}
