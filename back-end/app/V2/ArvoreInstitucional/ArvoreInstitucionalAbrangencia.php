<?php

namespace App\V2\ArvoreInstitucional;

/**
 * Escopos do filtro "Abrangência" do detalhamento de entregas.
 * Compartilhado entre Planejamento Institucional e Cadeia de Valor.
 */
enum ArvoreInstitucionalAbrangencia: string
{
    case ITEM_SELECIONADO = 'item_selecionado';
    case ITENS_SUBORDINADOS = 'itens_subordinados';
    case ITEM_E_SUBORDINADOS = 'item_e_subordinados';
    case UNIDADE_SELECIONADA = 'unidade_selecionada';
    case UNIDADE_E_SUBORDINADAS = 'unidade_e_subordinadas';

    public function label(): string
    {
        return match ($this) {
            self::ITEM_SELECIONADO => 'Item selecionado',
            self::ITENS_SUBORDINADOS => 'Itens subordinados',
            self::ITEM_E_SUBORDINADOS => 'Item selecionado e itens subordinados',
            self::UNIDADE_SELECIONADA => 'Unidade selecionada',
            self::UNIDADE_E_SUBORDINADAS => 'Unidade selecionada e unidades subordinadas',
        };
    }
}
