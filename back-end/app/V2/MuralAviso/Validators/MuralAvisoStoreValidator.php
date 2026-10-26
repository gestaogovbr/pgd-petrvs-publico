<?php

declare(strict_types=1);

namespace App\V2\MuralAviso\Validators;

use App\Enums\MuralAvisoDestinatario;
use App\Exceptions\ValidateException;
use App\Repository\MuralAviso\MuralAvisoRepository;
use App\V2\MuralAviso\DTOs\MuralAvisoStoreDTO;

class MuralAvisoStoreValidator
{
    private const LIMITE_MENSAL_PUBLICACOES = 3;

    public function __construct(
        private readonly MuralAvisoRepository $repository,
    ) {}

    /**
     * Valida regras de negócio para criação/atualização de aviso.
     *
     * @param string|null $ignorarAvisoId id do aviso a desconsiderar na contagem (edição)
     */
    public function validar(MuralAvisoStoreDTO $dto, ?string $ignorarAvisoId = null): void
    {
        $this->validarDestinatarioTodos($dto);
        $this->validarDestinatarioTenantEspecifico($dto);
        $this->validarLimiteMensal($dto, $ignorarAvisoId);
    }

    private function validarLimiteMensal(MuralAvisoStoreDTO $dto, ?string $ignorarAvisoId): void
    {
        $dataPublicacao = new \DateTimeImmutable($dto->dataPublicacao);

        $total = $this->repository->countByEmissorNoMes(
            $dto->remetenteTipo()->value,
            $dto->remetenteTenantId(),
            (int) $dataPublicacao->format('Y'),
            (int) $dataPublicacao->format('n'),
            $ignorarAvisoId,
        );

        if ($total >= self::LIMITE_MENSAL_PUBLICACOES) {
            throw new ValidateException('Limite de ' . self::LIMITE_MENSAL_PUBLICACOES . ' avisos por mês atingido para este emissor.');
        }
    }

    private function validarDestinatarioTodos(MuralAvisoStoreDTO $dto): void
    {
        if ($dto->destinatario !== MuralAvisoDestinatario::TODOS->value) {
            return;
        }

        if (!$dto->isOrgaoCentral()) {
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

        if ($dto->isOrgaoCentral()) {
            return;
        }

        if (!in_array($dto->tenantId, $dto->tenantIds, true)) {
            throw new ValidateException('Você só pode publicar avisos para tenants aos quais está vinculado.');
        }
    }
}
