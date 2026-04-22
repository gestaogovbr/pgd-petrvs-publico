<?php

declare(strict_types=1);

namespace App\Repository\TipoModalidade\Contracts;

interface TipoModalidadeReadRepositoryContract
{
    public function getDefaultId(): ?string;
    public function findById(string|int $id): ?\App\Models\TipoModalidade;
    public function findOneBy(array $criteria): ?object;
}
