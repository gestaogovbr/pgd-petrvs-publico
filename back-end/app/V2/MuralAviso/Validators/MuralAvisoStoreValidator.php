<?php

declare(strict_types=1);

namespace App\V2\MuralAviso\Validators;

use App\Enums\MuralAvisoDestinatario;
use App\Exceptions\ValidateException;
use App\V2\MuralAviso\DTOs\MuralAvisoStoreDTO;

class MuralAvisoStoreValidator
{
    private const NIVEL_ORGAO_CENTRAL = 1;

    /**
     * Valida regras de negócio para criação/atualização de aviso.
     */
    public function validar(MuralAvisoStoreDTO $dto): void
    {
        $this->validarDestinatarioTodos($dto);
        $this->validarDestinatarioTenantEspecifico($dto);
    }

    private function validarDestinatarioTodos(MuralAvisoStoreDTO $dto): void
    {
        if ($dto->destinatario !== MuralAvisoDestinatario::TODOS->value) {
            return;
        }

        if ($dto->nivelUsuario !== self::NIVEL_ORGAO_CENTRAL) {
            throw new ValidateException('Apenas o Órgão Central pode publicar avisos para todos os tenants.');
        }
    }

    private function validarDestinatarioTenantEspecifico(MuralAvisoStoreDTO $dto): void
    {
        if ($dto->destinatario !== MuralAvisoDestinatario::TENANT_ESPECIFICO->value) {
            return;
        }

        if (empty($dto->tenantId)) {
            throw new ValidateException('É necessário informar o tenant destinatário.');
        }

        if ($dto->nivelUsuario === self::NIVEL_ORGAO_CENTRAL) {
            return;
        }

        if (!in_array($dto->tenantId, $dto->tenantIds, true)) {
            throw new ValidateException('Você só pode publicar avisos para tenants aos quais está vinculado.');
        }
    }
}
