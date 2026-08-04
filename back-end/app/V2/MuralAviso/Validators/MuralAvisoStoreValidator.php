<?php

declare(strict_types=1);

namespace App\V2\MuralAviso\Validators;

use App\Enums\MuralAvisoDestinatario;
use App\Exceptions\ValidateException;

class MuralAvisoStoreValidator
{
    private const NIVEL_ORGAO_CENTRAL = 1;

    /**
     * Valida regras de negócio para criação/atualização de aviso.
     *
     * @param list<string> $tenantIdsDoUsuario
     */
    public function validar(
        string $destinatario,
        ?string $tenantId,
        int $nivelUsuario,
        array $tenantIdsDoUsuario,
    ): void {
        $this->validarDestinatarioTodos($destinatario, $nivelUsuario);
        $this->validarDestinatarioTenantEspecifico($destinatario, $tenantId, $nivelUsuario, $tenantIdsDoUsuario);
    }

    private function validarDestinatarioTodos(string $destinatario, int $nivelUsuario): void
    {
        if ($destinatario !== MuralAvisoDestinatario::TODOS->value) {
            return;
        }

        if ($nivelUsuario !== self::NIVEL_ORGAO_CENTRAL) {
            throw new ValidateException('Apenas o Órgão Central pode publicar avisos para todos os tenants.');
        }
    }

    /**
     * @param list<string> $tenantIdsDoUsuario
     */
    private function validarDestinatarioTenantEspecifico(
        string $destinatario,
        ?string $tenantId,
        int $nivelUsuario,
        array $tenantIdsDoUsuario,
    ): void {
        if ($destinatario !== MuralAvisoDestinatario::TENANT_ESPECIFICO->value) {
            return;
        }

        if (empty($tenantId)) {
            throw new ValidateException('É necessário informar o tenant destinatário.');
        }

        if ($nivelUsuario === self::NIVEL_ORGAO_CENTRAL) {
            return;
        }

        if (!in_array($tenantId, $tenantIdsDoUsuario, true)) {
            throw new ValidateException('Você só pode publicar avisos para tenants aos quais está vinculado.');
        }
    }
}
