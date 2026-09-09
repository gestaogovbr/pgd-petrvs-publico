<?php

declare(strict_types=1);

namespace App\V2\PainelGerencial\Validators;

use App\Exceptions\ForbiddenException;
use App\Models\Usuario;

class PainelAuthorizationValidator
{
    private const CAPACIDADE_PAINEL_GERENCIAL = 'MOD_PAINEL_GER';

    /**
     * Valida se o usuário possui a capacidade de acesso aos Painéis Gerenciais.
     */
    public function validar(Usuario $usuario): void
    {
        if (!$usuario->hasPermissionTo(self::CAPACIDADE_PAINEL_GERENCIAL)) {
            throw new ForbiddenException('Usuário não possui acesso aos Painéis Gerenciais.');
        }
    }
}
