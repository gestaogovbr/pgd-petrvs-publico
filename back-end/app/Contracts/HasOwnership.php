<?php

declare(strict_types=1);

namespace App\Contracts;

/**
 * Entidades que possuem "donos" identificáveis para fins de autorização.
 *
 * Implementar em models cujo acesso deve ser restrito ao criador, participante
 * ou chefia da unidade vinculada.
 */
interface HasOwnership
{
    /**
     * Retorna os IDs dos usuários considerados "donos" desta entidade.
     *
     * @return string[]
     */
    public function getOwnerIds(): array;
}
