<?php

declare(strict_types=1);

namespace App\V2\MuralAviso\Validators;

use App\Enums\MuralAvisoDestinatario;
use App\Enums\MuralAvisoRemetenteTipo;
use App\Enums\PainelUsuarioNivel;
use App\Exceptions\ForbiddenException;
use App\Exceptions\NotFoundException;
use App\Models\MuralAviso;
use App\Repository\MuralAviso\MuralAvisoRepository;

class MuralAvisoAuthorizationValidator
{
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

        if ($nivelUsuario === PainelUsuarioNivel::ORGAO_CENTRAL->value) {
            return $aviso;
        }

        $isAvisoGlobal = $aviso->destinatario === MuralAvisoDestinatario::TODOS->value;
        $isDoOrgaoCentral = $aviso->remetente_tipo === MuralAvisoRemetenteTipo::ORGAO_CENTRAL->value;
        $isDoTenantDoUsuario = in_array($aviso->tenant_id, $tenantIdsDoUsuario, true);

        if ($isAvisoGlobal || $isDoOrgaoCentral || !$isDoTenantDoUsuario) {
            throw new ForbiddenException('Você não tem permissão para alterar este aviso.');
        }

        return $aviso;
    }
}
