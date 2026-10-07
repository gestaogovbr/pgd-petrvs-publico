<?php

declare(strict_types=1);

namespace App\V2\RelatorioPlanoEntregaLacuna\DTOs;

/**
 * Parâmetros tipados da consulta ao repositório de leitura do relatório de lacunas de plano de entrega.
 */
final class RelatorioPlanoEntregaLacunaQueryDTO
{
    /** @var list<array{0: string, 1: string}> */
    public const ORDEM_PADRAO = [
        ['unidadeHierarquia', 'asc'],
        ['data_inicio', 'asc'],
    ];

    /**
     * @param list<array{0: string, 1: string}> $orderBy
     */
    public function __construct(
        public readonly int $page,
        public readonly int $limit,
        public readonly RelatorioPlanoEntregaLacunaFiltersDTO $filters,
        public readonly array $orderBy,
    ) {}

    public static function fromIndexDto(RelatorioPlanoEntregaLacunaIndexDTO $index, int $limit): self
    {
        return new self(
            page: $index->page,
            limit: $limit,
            filters: $index->filters,
            orderBy: self::ORDEM_PADRAO,
        );
    }
}
