<?php

declare(strict_types=1);

namespace App\Enums;

/**
 * Origem da execução de uma contribuição de período avaliativo.
 */
enum ContribuicaoExecucaoOrigem: string
{
    case PROPRIA_UNIDADE = 'PROPRIA_UNIDADE';
    case OUTRA_UNIDADE = 'OUTRA_UNIDADE';
    case OUTRO_ORGAO = 'OUTRO_ORGAO';
    case SEM_ENTREGA = 'SEM_ENTREGA';

    /**
     * Origens que exigem vínculo com uma entrega do plano de entregas.
     */
    public function isVinculadaAEntrega(): bool
    {
        return match ($this) {
            self::PROPRIA_UNIDADE, self::OUTRA_UNIDADE => true,
            self::OUTRO_ORGAO, self::SEM_ENTREGA => false,
        };
    }

    /**
     * Origens que exigem a informação do órgão.
     */
    public function exigeOrgao(): bool
    {
        return $this === self::OUTRO_ORGAO;
    }

    /**
     * @return list<string>
     */
    public static function values(): array
    {
        return array_map(static fn (self $origem): string => $origem->value, self::cases());
    }
}
