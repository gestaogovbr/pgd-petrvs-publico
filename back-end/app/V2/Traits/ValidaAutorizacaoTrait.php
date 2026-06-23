<?php

declare(strict_types=1);

namespace App\V2\Traits;

use App\Exceptions\ForbiddenException;
use App\Repository\UnidadeRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Trait para validação de autorização em entidades vinculadas a um Plano de Trabalho.
 *
 * @property-read UnidadeRepository $unidadeRepository
 */
trait ValidaAutorizacaoTrait
{
    protected function isDonoOuChefia(
        Model $entity,
        string $usuarioId,
        string $unidadeId,
        string|array $ownerColumns = 'usuario_id',
    ): bool {
        foreach ((array) $ownerColumns as $column) {
            if ($entity->{$column} === $usuarioId) {
                return true;
            }
        }

        return $this->unidadeRepository->isUsuarioGestorRecursivo($unidadeId, $usuarioId);
    }

    protected function autorizarDonoOuChefia(
        Model $entity,
        string $usuarioId,
        string $unidadeId,
        string $mensagem = 'Usuário não tem permissão para realizar esta ação.',
        string|array $ownerColumns = 'usuario_id',
    ): void {
        if ($this->isDonoOuChefia($entity, $usuarioId, $unidadeId, $ownerColumns)) {
            return;
        }

        throw new ForbiddenException($mensagem);
    }
}
