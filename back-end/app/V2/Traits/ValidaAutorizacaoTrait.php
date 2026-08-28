<?php

declare(strict_types=1);

namespace App\V2\Traits;

use App\Contracts\HasOwnership;
use App\Exceptions\ForbiddenException;
use App\Repository\UnidadeRepository;

/**
 * Trait para validação de autorização em entidades que implementam HasOwnership.
 *
 * @property-read UnidadeRepository $unidadeRepository
 */
trait ValidaAutorizacaoTrait
{
    protected function isDonoOuChefia(
        HasOwnership $entity,
        string $usuarioId,
        string $unidadeId,
    ): bool {
        if (in_array($usuarioId, $entity->getOwnerIds(), true)) {
            return true;
        }

        return $this->unidadeRepository->isUsuarioGestorRecursivo($unidadeId, $usuarioId);
    }

    protected function autorizarDonoOuChefia(
        HasOwnership $entity,
        string $usuarioId,
        string $unidadeId,
        string $mensagem = 'Usuário não tem permissão para realizar esta ação.',
    ): void {
        if ($this->isDonoOuChefia($entity, $usuarioId, $unidadeId)) {
            return;
        }

        throw new ForbiddenException($mensagem);
    }
}
