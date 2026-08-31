<?php

declare(strict_types=1);

namespace App\Repository\RelatorioPlanoEntregaLacuna\Contracts;

interface RelatorioPlanoEntregaLacunaReadRepositoryContract
{
    /**
     * @param array{
     *     page?: int,
     *     limit?: int,
     *     orderBy?: list<array{0: string, 1: string}>,
     *     where?: list<array{0: string, 1: string, 2: mixed}>
     * } $data
     * @return array{count: int, rows: \Illuminate\Support\Collection}
     */
    public function query(array $data): array;
}
