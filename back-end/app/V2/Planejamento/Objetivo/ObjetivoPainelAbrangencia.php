<?php

declare(strict_types=1);

namespace App\V2\Planejamento\Objetivo;

/**
 * Escopos do filtro "Abrangência" do detalhamento de entregas (RN33–RN39).
 */
final class ObjetivoPainelAbrangencia
{
    public const ITEM_SELECIONADO = 'item_selecionado';
    public const ITENS_SUBORDINADOS = 'itens_subordinados';
    public const ITEM_E_SUBORDINADOS = 'item_e_subordinados';
    public const UNIDADE_SELECIONADA = 'unidade_selecionada';
    public const UNIDADE_E_SUBORDINADAS = 'unidade_e_subordinadas';

    /** @return list<string> */
    public static function valores(): array
    {
        return [
            self::ITEM_SELECIONADO,
            self::ITENS_SUBORDINADOS,
            self::ITEM_E_SUBORDINADOS,
            self::UNIDADE_SELECIONADA,
            self::UNIDADE_E_SUBORDINADAS,
        ];
    }

    public static function isValida(?string $valor): bool
    {
        return $valor !== null && $valor !== '' && in_array($valor, self::valores(), true);
    }
}
