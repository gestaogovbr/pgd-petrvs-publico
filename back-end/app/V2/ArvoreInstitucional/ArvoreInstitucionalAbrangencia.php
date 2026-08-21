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

    /**
     * Resolve IDs de nós e unidades conforme o escopo de abrangência.
     *
     * @param callable(string): list<string> $coletarSubordinados Retorna IDs do nó + subordinados
     * @param callable(string): list<string> $coletarUnidades Retorna IDs da unidade + subordinadas
     * @return array{0: list<string>, 1: list<string>|null}
     */
    public static function resolverEscopo(
        string $nodeId,
        ?string $unidadeId,
        ?string $abrangencia,
        callable $coletarSubordinados,
        callable $coletarUnidades,
    ): array {
        $enum = self::tryFrom($abrangencia ?? '');

        $nodeIds = [$nodeId];
        $unidadeIds = $unidadeId ? [$unidadeId] : null;

        return match ($enum) {
            self::ITEM_SELECIONADO => [$nodeIds, $unidadeIds],
            self::ITENS_SUBORDINADOS => [
                array_values(array_filter(
                    $coletarSubordinados($nodeId),
                    static fn (string $id): bool => $id !== $nodeId,
                )),
                $unidadeIds,
            ],
            self::ITEM_E_SUBORDINADOS => [
                $coletarSubordinados($nodeId),
                $unidadeIds,
            ],
            self::UNIDADE_SELECIONADA => [
                $nodeIds,
                $unidadeId ? [$unidadeId] : [],
            ],
            self::UNIDADE_E_SUBORDINADAS => [
                $nodeIds,
                $unidadeId ? $coletarUnidades($unidadeId) : [],
            ],
            default => [$nodeIds, $unidadeIds],
        };
    }
}
