<?php

declare(strict_types=1);

namespace App\Repository\RelatorioLacunaPlanoTrabalho\Contracts;

interface RelatorioLacunaPlanoTrabalhoReadRepositoryContract
{
    /**
     * @param  array{filters?: array<string, mixed>, page?: int|string|null, limit?: int|string|null, orderBy?: array}  $data
     * @return array{count: int, rows: list<object|array>}
     */
    public function query(array $data): array;
}
