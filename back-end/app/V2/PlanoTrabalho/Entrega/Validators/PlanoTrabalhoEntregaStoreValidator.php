<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Entrega\Validators;

use App\Enums\StatusEnum;
use App\Exceptions\ServerException;
use App\Repository\PlanoTrabalhoRepository;

class PlanoTrabalhoEntregaStoreValidator
{
    private const STATUSES_PERMITIDOS = [
        StatusEnum::INCLUIDO,
        StatusEnum::AGUARDANDO_ASSINATURA,
    ];

    public function __construct(
        private readonly PlanoTrabalhoRepository $planoTrabalhoRepository,
    ) {}

    public function validar(string $planoTrabalhoId): void
    {
        $plano = $this->planoTrabalhoRepository->findById($planoTrabalhoId);

        if ($plano === null) {
            throw new ServerException('ValidatePlanoTrabalhoEntrega', 'Plano de Trabalho não encontrado.');
        }

        $statusPermitidos = array_map(fn (StatusEnum $s) => $s->value, self::STATUSES_PERMITIDOS);

        if (!in_array($plano->status, $statusPermitidos, true)) {
            throw new ServerException(
                'ValidatePlanoTrabalhoEntrega',
                'Entregas só podem ser adicionadas quando o Plano de Trabalho é um rascunho ou está aguardando assinatura.'
            );
        }
    }
}
