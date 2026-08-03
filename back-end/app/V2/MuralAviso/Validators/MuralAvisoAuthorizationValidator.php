<?php

declare(strict_types=1);

namespace App\V2\MuralAviso\Validators;

use App\Exceptions\ForbiddenException;
use App\Exceptions\NotFoundException;
use App\Models\MuralAviso;
use App\Repository\MuralAviso\MuralAvisoRepository;

class MuralAvisoAuthorizationValidator
{
    private const NIVEL_ORGAO_CENTRAL = 1;

    public function __construct(
        private readonly MuralAvisoRepository $repository,
    ) {}

    /**
     * Valida que o aviso existe e que o usuário pode modificá-lo.
     * Retorna a entidade carregada para reuso no service.
     *
     * @param list<string> $tenantIdsDoUsuario
     */
    public function validar(string $avisoId, int $nivelUsuario, array $tenantIdsDoUsuario): MuralAviso
    {
        $aviso = $this->repository->findById($avisoId);

        if ($aviso === null) {
            throw new NotFoundException('Aviso não encontrado.');
        }

        if ($nivelUsuario === self::NIVEL_ORGAO_CENTRAL) {
            return $aviso;
        }

        $isAvisoGlobal = $aviso->destinatario === 'TODOS';
        $isDoTenantDoUsuario = in_array($aviso->tenant_id, $tenantIdsDoUsuario, true);

        if ($isAvisoGlobal || !$isDoTenantDoUsuario) {
            throw new ForbiddenException('Você não tem permissão para alterar este aviso.');
        }

        return $aviso;
    }
}
