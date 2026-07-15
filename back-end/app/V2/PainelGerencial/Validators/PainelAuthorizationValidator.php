<?php

declare(strict_types=1);

namespace App\V2\PainelGerencial\Validators;

use App\Enums\PerfilEnum;
use App\Exceptions\ForbiddenException;
use App\Models\Usuario;

class PainelAuthorizationValidator
{
    /**
     * RN02/RN11: Todos os perfis têm acesso, exceto Perfil Consulta.
     */
    public function validar(Usuario $usuario): void
    {
        if ($usuario->perfil?->nivel === PerfilEnum::CONSULTA->value) {
            throw new ForbiddenException('Perfil Consulta não possui acesso aos Painéis Gerenciais.');
        }
    }
}
